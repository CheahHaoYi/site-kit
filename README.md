# @cheahhaoyi/site-kit

> Single source of truth for design tokens and Astro UI components across the **@cheahhaoyi** multi-repo network engineering & AI security portfolio.

[![CI & Living Style Guide](https://github.com/cheahhaoyi/site-kit/actions/workflows/ci.yml/badge.svg)](https://github.com/cheahhaoyi/site-kit/actions/workflows/ci.yml)
[![Version](https://img.shields.io/badge/version-1.0.0-0284c7.svg)](https://github.com/cheahhaoyi/site-kit/releases/tag/v1.0.0)
[![License: MIT](https://img.shields.io/badge/License-MIT-slate.svg)](LICENSE)

---

## 1. Overview & Architecture

`site-kit` provides shared CSS design tokens, typography, and typed Astro components for every site in the multi-repo portfolio (root domain, CISSP/CCNA/RHCSA certification study guides, project showcases).

### Key Architectural Tenets:
- **Zero-Bundling Source Distribution**: Consuming Astro sites compile `.astro` components at *their* build time. No pre-bundled artifacts required.
- **Pure CSS Custom Properties**: All design tokens are defined as standard CSS variables in `tokens.css`. No Tailwind or CSS-in-JS dependencies required in consumer configs.
- **Base-Path Aware**: Components seamlessly resolve links whether deployed at domain root (`/`) or under subpaths (`/rhcsa`, `/cissp`).
- **Zero-Flash Dark Mode**: Instant theme initialization via an inline `<head>` script with `localStorage` persistence and `prefers-color-scheme` fallback.
- **WCAG AA Compliant**: High contrast ratios in both light and dark modes, visible keyboard focus indicators, and reduced-motion support.

---

## 2. Installation in Consumer Repositories

Add `@cheahhaoyi/site-kit` directly as a Git dependency in your consumer repository's `package.json`:

### Option A: Semver Range (Recommended)
Automatically receives backwards-compatible patch and minor token updates:

```json
{
  "dependencies": {
    "@cheahhaoyi/site-kit": "github:cheahhaoyi/site-kit#semver:^1.0.0"
  }
}
```

### Option B: Pinned Release Tag
Pins to an exact release tag:

```json
{
  "dependencies": {
    "@cheahhaoyi/site-kit": "github:cheahhaoyi/site-kit#v1.0.0"
  }
}
```

Then run:

```bash
npm install
```

---

## 3. Quick Start & Usage

### 3.1 Using the Base Layout

The `<Layout />` component automatically imports design tokens, initializes the theme without flash, sets up SEO metadata, and includes responsive navigation and footer.

```astro
---
import { Layout } from '@cheahhaoyi/site-kit';

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'RHCSA', href: '/rhcsa' },
  { label: 'Storage Automation' },
];
---

<Layout
  title="Storage & LVM Automation"
  description="Guide to configuring LVM thin provisioning and Stratis on RHEL 9."
  breadcrumbs={breadcrumbs}
>
  <div class="container">
    <h1>Storage &amp; LVM Automation</h1>
    <p>Article content goes here...</p>
  </div>
</Layout>
```

### 3.2 Markdown / MDX Blog Posts with `<Prose />`

Wrap any Markdown content in `<Prose />` to inherit typography rules (headings, lists, blockquotes, code, tables):

```astro
---
import { Layout, Prose, Callout, CodeBlock } from '@cheahhaoyi/site-kit';
---

<Layout title="BGP Route Origin Validation">
  <div class="container">
    <Prose>
      <h1>Configuring RPKI on Cisco IOS-XE</h1>
      <p>
        BGP prefix hijacking poses a fundamental risk to autonomous system routing.
      </p>

      <Callout variant="warning" title="Routing Caveat">
        Always ensure multiple RPKI validator caches are configured for high availability.
      </Callout>

      <CodeBlock
        filename="cisco-rpki.cfg"
        lang="cisco"
        code={`router bgp 65001
  neighbor 192.0.2.1 remote-as 65002
  neighbor 192.0.2.1 route-map RPKI-VALIDATION in`}
      />
    </Prose>
  </div>
</Layout>
```

---

## 4. Component Reference

All components are typed with TypeScript interfaces exported from `@cheahhaoyi/site-kit`.

| Component | Export Path | Description |
| :--- | :--- | :--- |
| `<Layout />` | `@cheahhaoyi/site-kit` | Base HTML shell with SEO meta, theme-init, Nav, Breadcrumbs, and Footer. |
| `<Prose />` | `@cheahhaoyi/site-kit` | Typographic container for Markdown/MDX blogs. |
| `<Button />` | `@cheahhaoyi/site-kit` | Polymorphic button or link (`href`). Variants: `primary`, `secondary`, `outline`, `ghost`, `danger`. |
| `<Card />` | `@cheahhaoyi/site-kit` | Teaser card for cert areas and projects with telemetry hover accent. |
| `<CodeBlock />` | `@cheahhaoyi/site-kit` | Shiki-powered syntax highlighter with copy button and terminal header. |
| `<Table />` | `@cheahhaoyi/site-kit` | Responsive table wrapper preventing horizontal overflow on mobile screens. |
| `<Nav />` | `@cheahhaoyi/site-kit` | Base-path aware header nav with mobile drawer and theme toggle. |
| `<Breadcrumbs />` | `@cheahhaoyi/site-kit` | Base-path aware navigation breadcrumb trail with microdata. |
| `<Callout />` | `@cheahhaoyi/site-kit` | Callout boxes for exam tips and notices (`info`, `tip`, `warning`, `danger`). |
| `<Tag />` | `@cheahhaoyi/site-kit` | Taxonomy tags with optional link behavior. |
| `<Badge />` | `@cheahhaoyi/site-kit` | Status pills with optional live pulse indicator (`pulse={true}`). |
| `<ThemeToggle />` | `@cheahhaoyi/site-kit` | Accessible light/dark theme switch button. |

---

## 5. Design Tokens (CSS Custom Properties)

Design tokens are located in `src/styles/tokens.css` (imported automatically by `<Layout />` or manually via `import '@cheahhaoyi/site-kit/tokens.css'`).

### 5.1 Color Palette
- **Surfaces**: `--color-bg-base`, `--color-bg-surface`, `--color-bg-elevated`, `--color-bg-sunken`
- **Text**: `--color-text-primary`, `--color-text-secondary`, `--color-text-muted`, `--color-text-inverse`
- **Borders**: `--color-border`, `--color-border-subtle`, `--color-border-hover`
- **Accents**: `--color-accent-primary` (Sky 600 / 400), `--color-accent-hover`, `--color-telemetry` (Amber 600 / 400)
- **Status Levels**:
  - Info: `--color-info-text`, `--color-info-bg`, `--color-info-border`, `--color-info-icon`
  - Success/Tip: `--color-success-text`, `--color-success-bg`, `--color-success-border`, `--color-success-icon`
  - Warning: `--color-warning-text`, `--color-warning-bg`, `--color-warning-border`, `--color-warning-icon`
  - Danger: `--color-danger-text`, `--color-danger-bg`, `--color-danger-border`, `--color-danger-icon`

### 5.2 Typography
- **Display / Headings**: `--font-display` (`Plus Jakarta Sans`)
- **Body Text**: `--font-body` (`Inter`)
- **Monospace / CLI**: `--font-mono` (`JetBrains Mono`)
- **Scale**: `--text-xs` (12px), `--text-sm` (14px), `--text-base` (16px), `--text-lg` (18px), `--text-xl` (20px), `--text-2xl` (24px), `--text-3xl` (30px), `--text-4xl` (36px), `--text-5xl` (48px)

### 5.3 Spacing (4px Base Scale)
`--space-1` (4px), `--space-2` (8px), `--space-3` (12px), `--space-4` (16px), `--space-6` (24px), `--space-8` (32px), `--space-12` (48px), `--space-16` (64px), `--space-20` (80px).

---

## 6. Local Development & Testing

```bash
# Clone the repository
git clone https://github.com/cheahhaoyi/site-kit.git
cd site-kit

# Install dependencies
npm install

# Start development server with live style-guide preview
npm run dev

# Run type checks across all Astro components
npm run check

# Build static smoke-test bundle
npm run build
```

---

## 7. License

MIT &copy; [Hao Yi Cheah](https://github.com/cheahhaoyi).
