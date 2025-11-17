#!/usr/bin/env node
// Minimal MCP HTTP proxy for Figma — no external deps
// Usage: FIGMA_ACCESS_TOKEN=xxx node scripts/mcp-fallback/server.mjs

import http from 'http';
import {URL} from 'url';

const PORT = process.env.MCP_PORT ? Number(process.env.MCP_PORT) : 3845;
const TOKEN = process.env.FIGMA_ACCESS_TOKEN || process.env['FIGMA_ACCESS_TOKEN'];

if (!TOKEN) {
  console.warn('Warning: FIGMA_ACCESS_TOKEN not set. The server will still run but Figma API calls will fail.');
}

function jsonResponse(res, obj, status=200) {
  const body = JSON.stringify(obj);
  res.writeHead(status, {'Content-Type':'application/json'});
  res.end(body);
}

async function handleFetchFile(fileKey) {
  const url = `https://api.figma.com/v1/files/${encodeURIComponent(fileKey)}`;
  const headers = {
    'Accept': 'application/json'
  };
  if (TOKEN) headers['Authorization'] = `Bearer ${TOKEN}`;

  try {
    const resp = await fetch(url, { headers });
    const data = await resp.json();
    return { status: resp.status, body: data };
  } catch (e) {
    return { status: 500, error: e.message };
  }
}

const server = http.createServer(async (req, res) => {
  const u = new URL(req.url, `http://${req.headers.host}`);
  if (req.method === 'POST' && u.pathname === '/mcp') {
    // read body
    let raw = '';
    for await (const chunk of req) raw += chunk;
    let payload;
    try {
      payload = JSON.parse(raw || '{}');
    } catch (e) {
      return jsonResponse(res, { error: 'Invalid JSON' }, 400);
    }

    // Basic handling: expect { type: 'figma.fetchFile', fileKey }
    if (payload.type === 'figma.fetchFile') {
      const fileKey = payload.fileKey || process.env.FIGMA_FILE_KEY;
      if (!fileKey) return jsonResponse(res, { error: 'fileKey missing' }, 400);
      const result = await handleFetchFile(fileKey);
      return jsonResponse(res, { ok: true, source: 'mcp-fallback', result: result }, result.status);
    }

    // Unknown request
    return jsonResponse(res, { error: 'Unsupported request type', received: payload }, 400);
  }

  // Simple health
  if (req.method === 'GET' && u.pathname === '/health') {
    return jsonResponse(res, { status: 'ok', mcp: 'fallback' });
  }

  // Not found
  res.writeHead(404, {'Content-Type':'application/json'});
  res.end(JSON.stringify({ error: 'not found' }));
});

server.listen(PORT, () => {
  console.log(`MCP fallback server listening on http://127.0.0.1:${PORT}/mcp`);
  if (!TOKEN) console.log('WARNING: FIGMA_ACCESS_TOKEN not set in env; calls will fail until token is provided.');
});
