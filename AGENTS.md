# AGENTS.md — Coding Agent Guide for `@cheahhaoyi/site-kit`

This document provides essential technical context, architectural rules, coding standards, and testing procedures for coding agents working within this repository or integrating `@cheahhaoyi/site-kit` into downstream portfolio repositories.

---

## 1. Project Overview

`@cheahhaoyi/site-kit` is the **single source of truth** for design tokens, typography, and typed UI components across the `@cheahhaoyi` multi-repo portfolio (root domain, CISSP, CCNA, RHCSA certification blogs, AI security showcases).

### Core Architectural Principles
1. **Zero-Bundling Source Distribution**: Consuming Astro sites import raw `.astro` components and compile them during *their* build step (`astro build`). Do not introduce a bundle/dist compile step for components.
2. **Pure CSS Custom Properties**: All design tokens live in standard CSS variables (`tokens.css`). TailwindCSS and CSS-in-JS are strictly forbidden unless explicitly requested.
3. **Synthesis of Google Material Design 3 & Apple HIG**:
   - **Google Material Design 3**: Tonal surface containers (`--color-bg-surface-container`), state layers (`:hover`, `:active`), clear semantic roles, and high accessibility contrast.
   - **Apple Human Interface Guidelines (HIG)**: Translucent frosted glass materials (`backdrop-filter: blur(16px)` + specular rim highlights), tactile spring micro-interactions (`transform: scale(0.975)`), crisp typography, and segmented controls.
4. **Base-Path Awareness**: All links and static asset references must handle subpath deployments (e.g. `/rhcsa`, `/cissp`) via `import.meta.env.BASE_URL` or `resolveUrl()`.
5. **Zero-Flash Theme Initialization**: Theme selection (`data-theme="light"` / `"dark"`) is set by an inline, render-blocking `<head>` script with `localStorage` and `prefers-color-scheme` fallback.

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
- Reference CSS variables defined in `src/styles/tokens.css` (e.g., `var(--color-bg-surface)`, `var(--space-4)`, `var(--radius-lg)`).
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
1. **Theme Switcher**: Click the theme toggle button in the navigation header. Ensure instantaneous light/dark transition across all surfaces, cards, and code blocks with zero layout shift.
2. **Tactile Spring Physics**: Click and hold buttons to verify the physical micro-press animation (`scale(0.975) translateY(1px)`).
3. **Glassmorphism**: Verify that glass cards (`variant="glass"`) render with backdrop blur, specular top rim, and subtle translucent border in both light and dark modes.
4. **Shiki Code Copy**: Click the copy button in `<CodeBlock />` and confirm the checkmark icon and text feedback appear before resetting.
5. **Mobile Responsiveness**: Test viewport down to 320px width. Confirm that `<Table />` scrolls horizontally without squishing headers and the mobile navigation drawer toggles cleanly.

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
   - The inline theme-init script in `<Layout.astro>` must only read/write `localStorage['site-kit-theme']` within a `try/catch` block to prevent exceptions when cookies or storage are disabled.

---

## 6. How Downstream Repositories Consume This Package

In consumer repository `package.json`:
```json
{
  "dependencies": {
    "@cheahhaoyi/site-kit": "github:cheahhaoyi/site-kit#v1.0.0"
  }
}
```

In consumer `.astro` files:
```astro
---
import { Layout, Prose, Button, Card, CodeBlock, Callout, Table } from '@cheahhaoyi/site-kit';
---
```
