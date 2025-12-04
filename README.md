# Galactik Design System

Galactik is a PNPM monorepo dedicated to building and distributing a multi-framework design system (React, Vue, Angular) backed by a Storybook portal. The repository centralizes UI components, design tokens, and a Figma-to-code synchronization workflow powered by a local MCP server.

## Quick Overview

- **Supported frameworks**: React 18, Vue 3, and Angular 17, each with its own Storybook (Vite or Angular builders).
- **Storybook portal**: the `apps/portal` app provides a single hub that links every Storybook instance and internal documentation.
- **Design tokens**: global styles (colors, typography, spacing…) live in `styles/` and are shared across frameworks.
- **Figma → Code**: `scripts/figma-*` scripts plus the MCP server (`pnpm run mcp:fallback`) extract and validate specs from Figma.
- **Visual CI**: Chromatic integration ready to use (`pnpm chromatic`, requires a project token).

## Monorepo Structure

| Directory | Purpose |
| --- | --- |
| `apps/storybook-react` | React Storybook (Vite builder) and showcase stories.
| `apps/storybook-vue` | Vue 3 Storybook with the composition API.
| `apps/storybook-angular` | Angular Storybook (official builder) and static export.
| `apps/portal` | Storybook portal consolidating the three frameworks and internal resources.
| `packages/react-ui` | React component library.
| `packages/vue-ui` | Vue component library.
| `packages/angular-ui` | Angular component library.
| `packages/storybook-config` | Shared Storybook configurations.
| `styles/` | CSS tokens, generated variables, and themes.
| `scripts/` | Automation scripts (multi-Storybook builds, MCP server, Figma sync, etc.).

## Requirements

- Node.js 20+ recommended (compatible with Vite/Storybook 8).
- PNPM 10 (pinned in `package.json`).
- Figma personal token to run MCP/Figma scripts.

## Installation

```bash
pnpm install
```

## Run Storybooks

| Command | Description | Default port |
| --- | --- | --- |
| `pnpm storybook:react` | React Storybook | 6006 |
| `pnpm storybook:vue` | Vue Storybook | 6007 |
| `pnpm storybook:angular` | Angular Storybook | 6008 |
| `pnpm --filter portal storybook` | Multi-framework Storybook portal | 6010 |

To generate a consolidated static preview (ideal for GitHub Pages):

```bash
pnpm build:storybooks
pnpm serve:storybooks # serves dist/storybooks at http://localhost:5000
```

## Useful Scripts

- `pnpm typecheck`: runs TypeScript across the monorepo using `tsconfig.base.json`.
- `pnpm audit` / `pnpm lint:deps`: dependency health checks.
- `pnpm chromatic`: triggers a Chromatic run (requires `CHROMATIC_PROJECT_TOKEN`).
- `pnpm mcp:run -- --list`: lists available MCP servers from your local config.

Custom scripts `scripts/build-storybooks.mjs` and `scripts/serve-storybooks.mjs` handle the multi-target build pipeline and static hosting.

## Design Tokens and Styles

- `styles/tokens.css`: main source of CSS variables (Onechaps palette, typography, spacing, etc.).
- `styles/tokens-generated.css` and `styles/tokens-generated-vars.js`: generated artifacts for multi-platform consumption.
- `styles/tokens-dark.css`: dark theme variant.

These files are automatically injected in Storybook to ensure visual consistency across frameworks.

## Figma ↔ Galactik Workflow

1. Configure your Figma token in `.env` (see `MCP_SETUP.md`).
2. Start the local MCP server:
	```bash
	pnpm run mcp:fallback
	```
3. Run the documented scripts `pnpm run figma:<component>:extract` / `validate` / `sync` (see `FIGMA_WORKFLOW.md`) to pull specs.
4. Update components (`packages/*/src/components/`) with the extracted values, then review them in Storybook.

The `scripts/mcp-fallback/` folder ships a lightweight HTTP server that proxies the Figma API locally, keeping tokens off the client side. A development Figma plugin (`tools/figma-plugin/`) is also available to test the integration.

## Quality and Validation

- **TypeScript**: `pnpm typecheck`.
- **Visual review**: Storybook + Chromatic.
- **Tokens**: Figma validation scripts (`pnpm run figma:<component>:validate`).

Add unit tests per framework where needed (`packages/*` folders are ready for Jest/Vitest, depending on your tooling preferences).

## Deployment and Publishing

- `pnpm preview:storybooks`: builds every Storybook and serves the static output (port 5000).
- The result lives in `dist/storybooks/` with an index and 404 fallback tailored for GitHub Pages.
- Each Storybook is also reachable through the production portal (`https://rosenden.github.io/galactik` + the path defined in `apps/portal/storybook-refs.*`).

## Internal Resources

- `FIGMA_WORKFLOW.md`: end-to-end guide for the Figma-to-components workflow.
- `MCP_SETUP.md`: detailed MCP server and Figma plugin setup.
- `scripts/README-mcp.md`: advanced MCP script usage.
- `tokens.json` / `tokens-solary.json`: raw design token sources.

## Contributing

1. Create a topic branch from `main`.
2. Implement and document your changes (stories, tokens, scripts).
3. Update the Storybook portal if new resources need exposure.
4. Open a pull request, ideally with screenshots or Storybook links for visual review.

Enjoy your journey across the Galactik universe 🚀
