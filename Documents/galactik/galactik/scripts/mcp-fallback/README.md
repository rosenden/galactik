MCP fallback server (HTTP only)

This is a minimal local MCP-style server intended to be used only for development/testing
when the configured package (e.g. @modelcontextprotocol/server-figma) is not available.

Files:
- `server.mjs` — minimal HTTP server that accepts POST /mcp with JSON body.

Usage:

1. Set your Figma token in the environment (do NOT commit it):

```bash
export FIGMA_ACCESS_TOKEN=figd_...   # or set in your shell profile
```

2. Start the server:

```bash
node scripts/mcp-fallback/server.mjs
```

3. The plugin UI included at `tools/figma-plugin/ui.html` has a "Fetch via HTTP" button that
POSTs to the configured MCP base (default `http://127.0.0.1:3845/mcp`). Use that button to fetch
Figma file data via the fallback server.

Notes:
- This server accepts a JSON payload of the shape `{ type: 'figma.fetchFile', fileKey }` and
  forwards a GET request to Figma API `https://api.figma.com/v1/files/{fileKey}` using the
  `FIGMA_ACCESS_TOKEN` env var.
- This is intentionally minimal and insecure for production — only for local dev.
- If you want the UI to connect over WebSocket, we can add a WS endpoint; for now the HTTP
  POST path is sufficient and requires no extra npm deps.
