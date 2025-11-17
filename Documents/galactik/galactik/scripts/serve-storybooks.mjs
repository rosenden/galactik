#!/usr/bin/env node
import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';

const PORT = Number(process.env.PORT || 5000);
const ROOT = resolve('dist/storybooks');

const routes = [
  { path: '/portal', dir: 'portal' },
  { path: '/react-ui', dir: 'react' },
  { path: '/vue-ui', dir: 'vue' },
  { path: '/angular-ui', dir: 'angular' },
  { path: '/wc-ui', dir: 'web-component' }
];

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

const server = createServer((req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host}`);
  if (url.pathname === '/') {
    res.writeHead(302, { Location: '/portal/' });
    res.end();
    return;
  }

  const base = routes.find(
    (route) => url.pathname === route.path || url.pathname.startsWith(`${route.path}/`)
  );

  if (!base) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
    return;
  }

  if (url.pathname === base.path) {
    res.writeHead(302, { Location: `${base.path}/` });
    res.end();
    return;
  }

  const relativePath = url.pathname.slice((base.path + '/').length);
  const filePath = relativePath === '' ? 'index.html' : relativePath;
  const absolute = join(ROOT, base.dir, filePath);

  if (!existsSync(absolute) || statSync(absolute).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Asset not found');
    return;
  }

  const ext = extname(absolute).toLowerCase();
  res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
  createReadStream(absolute).pipe(res);
});

server.listen(PORT, () => {
  console.log(`Storybooks served from ${ROOT}`);
  const logged = new Set();
  routes.forEach(({ path, dir }) => {
    if (logged.has(dir) && path.includes('-ui') === false) return;
    logged.add(dir);
    console.log(`  → http://localhost:${PORT}${path}`);
  });
  console.log(`Root redirect: http://localhost:${PORT}/ → /portal`);
});
