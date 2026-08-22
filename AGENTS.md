# AGENTS.md — Coding Agent Guide for `@cheahhaoyi/site-kit`

This document provides essential technical context, architectural rules, aesthetic standards, and testing procedures for coding agents working within this repository or integrating `@cheahhaoyi/site-kit` into downstream portfolio repositories.

For downstream implementation details, complete component APIs, design tokens, and layout patterns, see [DESIGN.md](DESIGN.md).

---

## 1. Project Overview & Aesthetic Synthesis

`@cheahhaoyi/site-kit` is the **single source of truth** for design tokens, typography, and typed UI components across the `@cheahhaoyi` multi-repo portfolio (root domain, CISSP, CCNA, RHCSA certification blogs, AI security showcases).

### Core Architectural & Aesthetic Principles
1. **Light Mode by Default**: All components, layouts, and typography are styled with **Light Mode as the default initial baseline**, offering maximum legibility on high-density technical and networking content.
2. **High-Contrast Dark Mode Alternative**: Full support for a high-contrast dark mode alternative (`data-theme="dark"`), saved in `localStorage['site-kit-theme']` and toggled with zero flash or layout shift.
3. **Synthesis of Modern Interface Standards & Material Design 3 Dynamic Tonal Science**:
   - **Material Design 3 Principles**:
     - Dynamic Color Tonal Palettes derived from key color **Purple (`#7c3aed`)** (`--color-accent-primary`, `--color-accent-subtle`, `--color-accent-on-container`).
     - Prominent surface elevations (`--color-bg-surface-container-low`, `--color-bg-surface-container`, `--color-bg-surface-container-high`).
     - Structured state layers and pill-shaped container geometry.
   - **Modern System Interface Standards**:
     - System typography hierarchy with tight negative tracking (`-0.04em`).
     - Translucent frosted glassmorphism (`backdrop-filter: blur(20px)`) with specular top rim reflections (`inset 0 1px 0 0 rgba(255,255,255,0.95)`).
     - Native system accent colors (`--ios-purple`, `--ios-indigo`, `--ios-blue`, `--ios-mint`, `--ios-green`, `--ios-orange`, `--ios-pink`).
     - Double-Bezel (Doppelrand) nested hardware architecture (`doubleBezel={true}`).
     - Button-in-Button trailing action icon architecture with kinetic spring hover tension.
     - Natural spring motion physics (`--ease-spring: cubic-bezier(0.32, 0.72, 0, 1)`).
4. **Zero-Bundling Source Distribution**: Consuming Astro sites import raw `.astro` components and compile them during *their* build step (`astro build`). Do not introduce a bundle/dist compile step for components.
5. **Pure CSS Custom Properties**: All design tokens live in standard CSS variables (`tokens.css`). TailwindCSS and CSS-in-JS are strictly forbidden unless explicitly requested.
6. **Dual-Theme Code Highlighting**: `<CodeBlock />` uses Shiki dual themes (`github-light` in default light mode, `github-dark` in dark mode).
7. **Base-Path Awareness**: All links and static asset references must handle subpath deployments (e.g. `/rhcsa`, `/cissp`) via `import.meta.env.BASE_URL` or `resolveUrl()`.
8. **Zero-Flash Theme Initialization**: Theme selection is initialized by an inline, render-blocking `<head>` script defaulting to `light` unless `dark` is explicitly stored in `localStorage`.

---

## 2. Build and Test Commands

All agents must execute and verify these commands before submitting changes:

```bash
# Install dependencies
npm install

# Start local Astro development server with living style guide & testbed
npm run dev

# Run Astro TypeScript typechecking & diagnostics (Must pass with 0 errors / 0 warnings)
npm run check

# Execute production static smoke-test build
npm run build
```

---

## 3. Code Style Guidelines

### 3.1 Astro & TypeScript
- Write all components in `.astro` format with standard frontmatter TypeScript (`---`).
- Every component must define an explicit `interface Props` extending or matching the types defined in `src/types.ts`.
- Export new components from `src/components/index.ts` and `src/index.ts`.
- Components must remain data-driven ("dumb") presentation layers. Avoid unnecessary client-side framework islands (React/Vue/Svelte) unless real DOM state manipulation is genuinely required (e.g. `ThemeToggle.astro`).

### 3.2 CSS & Design Tokens
- Place scoped styles within `<style>` blocks in each `.astro` file.
- Reference CSS variables defined in `src/styles/tokens.css` (e.g., `var(--color-accent-primary)`, `var(--color-bg-surface-container)`, `var(--glass-rim)`).
- Never hardcode arbitrary hex colors or pixel padding inside components; use token variables.
- Maintain responsive breakpoints:
  - Mobile: `< 640px`
  - Tablet: `min-width: 640px`
  - Laptop/Desktop: `min-width: 768px` / `min-width: 1024px`
- Ensure all interactive elements have visible `:focus-visible` outlines using `var(--color-accent-primary)` and `var(--shadow-focus)`.

### 3.3 Base-Path Resolution Rule
Always wrap URLs in `resolveUrl(path)` from `src/utils/url.ts` or read `import.meta.env.BASE_URL`:
```astro
---
import { resolveUrl } from '../utils/url';
const targetUrl = resolveUrl('/cissp');
---
<a href={targetUrl}>CISSP Notes</a>
```

---

## 4. Testing Instructions

### 4.1 Automated Validation
Run both typecheck and static compilation:
```bash
npm run check && npm run build
```
- `npm run check` must report `0 errors` and `0 warnings`.
- `npm run build` must cleanly generate all static routes (`/index.html`, `/demo/index.html`).

### 4.2 Visual & Functional Regression Checklist
1. **Default Light Mode & Purple Tonal Palette**: Verify the initial page load renders in Light Mode with vibrant Purple accents (`#7c3aed`), high-contrast slate typography, and soft purple-tinted container surfaces.
2. **Theme Switcher**: Click the theme toggle button in the floating navigation header. Ensure instantaneous light/dark transition across all surfaces, cards, and code blocks with zero layout shift.
3. **Dual Syntax Highlighting**: Verify `<CodeBlock />` switches from GitHub Light theme in light mode to GitHub Dark theme in dark mode.
4. **Tactile Spring Physics**: Click and hold buttons to verify the physical micro-press animation (`scale(0.975) translateY(1px)`).
5. **Glassmorphism & Double-Bezel**: Verify that glass cards (`variant="glass"`) and double-bezel enclosures render with backdrop blur, specular top rim, and subtle translucent border in both light and dark modes.
6. **Button-in-Button Micro-Interactions**: Hover over CTA buttons with trailing icons and verify the nested icon circle undergoes kinetic spring translation.
7. **Shiki Code Copy**: Click the copy button in `<CodeBlock />` and confirm the checkmark icon and text feedback appear before resetting.
8. **Mobile Responsiveness**: Test viewport down to 320px width. Confirm that `<Table />` scrolls horizontally without squishing headers and the mobile navigation drawer toggles cleanly.

---

## 5. Security Considerations

1. **Secret Scanning**:
   - All commits and pull requests trigger `gitleaks` in GitHub Actions CI.
   - Never commit API keys, private tokens, or sensitive network configurations to this repository.
2. **Minimal Workflow Permissions**:
   - Workflows must define `permissions: contents: read` globally.
   - Elevated permissions (`pages: write`, `id-token: write`) are strictly restricted to the deployment job on `main`.
   - All third-party GitHub Actions must be pinned by full commit SHA, not mutable tags.
3. **Safe Content Rendering**:
   - Do not use `set:html` with untrusted or unsanitized user inputs.
   - Shiki code highlighting in `<CodeBlock />` must use official Shiki engine tokenization with escaped HTML entities.
4. **Zero-Flash Inline Scripts**:
   - The inline theme-init script in `<Layout.astro>` must default to `light` mode and safely handle `localStorage` within a `try/catch` block.

---

## 6. How Downstream Repositories Consume This Package

In consumer repository `package.json`:
```json
{
  "dependencies": {
    "@cheahhaoyi/site-kit": "github:cheahhaoyi/site-kit#semver:^1.0.0"
  }
}
```

In consumer `.astro` files:
```astro
---
import { Layout, Prose, Button, Card, CodeBlock, Callout, Table, Badge, Tag } from '@cheahhaoyi/site-kit';
---
```

For the complete API reference, design tokens, utility classes, and agent design rules, see [DESIGN.md](DESIGN.md).
