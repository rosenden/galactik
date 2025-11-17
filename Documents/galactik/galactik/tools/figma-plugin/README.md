Galactik MCP Figma Connector — minimal plugin

Location: `tools/figma-plugin`

Files:
- `manifest.json` — Figma plugin manifest
- `code.js` — plugin controller (shows the UI)
- `ui.html` — plugin UI that connects to your MCP server via WebSocket (or POST to `/mcp`) and sends a simple request to fetch a Figma file

How it works

1. Start your MCP server as configured in `~/.config/mcp/config.json` (example: run OneChaps server):

```bash
node scripts/run-mcp.mjs "Figma API – OneChaps"
```

2. In the plugin UI set the MCP base URL (default `http://127.0.0.1:3845/mcp`) and the Figma file key you want to fetch.

3. Click **Connect WebSocket** to open a WS connection to the MCP server (the UI will try `ws://.../ws`).

4. Click **Fetch file via WS** to send a JSON message `{ type: 'figma.fetchFile', fileKey: '...' }` to the MCP server. The plugin will print responses returned over the WS.

Notes and troubleshooting

- The exact request format your MCP server expects may vary. If `@modelcontextprotocol/server-figma` expects a different payload, adjust `ui.html` accordingly.
- The UI also supports a fallback HTTP POST to `<base>/mcp` with the same JSON body.
- Keep your Figma tokens secret — do not commit them into git. If you exposed tokens publicly, rotate them immediately in Figma.

Loading the plugin into Figma (developer mode)

1. Open Figma Desktop.
2. Plugins → Development → "Import plugin from manifest..." and choose `tools/figma-plugin/manifest.json` from this repository.
3. Open the plugin from Plugins → Development → Galactik MCP Figma Connector.

If you want I can:
- Adapt the UI message format to match exactly what your MCP server expects (paste the server request example here).
- Add a small test harness to call the HTTP endpoints and display raw responses.
- Commit these files into a `figma-plugin` package structure if you prefer another location.
