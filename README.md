# @cheahhaoyi/site-kit

> Single source of truth for design tokens and Astro UI components across the **@cheahhaoyi** multi-repo network engineering & AI security portfolio.

[![CI & Living Style Guide](https://github.com/cheahhaoyi/site-kit/actions/workflows/ci.yml/badge.svg)](https://github.com/cheahhaoyi/site-kit/actions/workflows/ci.yml)
[![Version](https://img.shields.io/badge/version-1.0.0-0284c7.svg)](https://github.com/cheahhaoyi/site-kit/releases/tag/v1.0.0)
[![License: MIT](https://img.shields.io/badge/License-MIT-slate.svg)](LICENSE)

---

## 1. Overview & Architecture

`@cheahhaoyi/site-kit` provides shared CSS design tokens, typography, and typed Astro components for every site in the multi-repo portfolio (root domain, CISSP/CCNA/RHCSA certification study guides, project showcases).

### Key Architectural Tenets:
- **Light Mode by Default**: Interfaces load with a high-contrast, clean slate aesthetic by default, prioritizing technical readability.
- **Dark Mode Alternative**: Instant, zero-flash transition to a dark obsidian terminal aesthetic with `localStorage` persistence.
- **Design Framework Synthesis**:
  - **Google Material Design 3 (M3)**: Dynamic tonal surface elevation (`--color-bg-surface-container`), clear semantic roles, and interactive state layers.
  - **Apple Human Interface Guidelines (HIG)**: Translucent frosted glass materials (`backdrop-filter: blur(16px)` + specular rim highlights), tactile spring micro-presses, and strict typographic hierarchy.
- **Zero-Bundling Source Distribution**: Consuming Astro sites compile raw `.astro` components at *their* build time. No pre-bundled artifacts or JavaScript wrapper runtime.
- **Pure CSS Custom Properties**: All design tokens are defined as standard CSS variables in `tokens.css`. TailwindCSS and CSS-in-JS are strictly avoided.
- **Base-Path Aware**: Components seamlessly resolve links whether deployed at domain root (`/`) or under subpaths (`/rhcsa`, `/cissp`).
- **WCAG AA Compliant**: High contrast ratios in both light and dark modes, visible keyboard focus indicators, and reduced-motion safety.

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

The `<Layout />` component automatically imports design tokens, initializes light mode by default without flash, sets up SEO metadata, and includes responsive navigation and footer.

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

Wrap any Markdown content in `<Prose />` to inherit typography rules (headings, lists, blockquotes, code, tables) in both light and dark modes:

```astro
---
import { Layout, Prose, Callout, CodeBlock } from '@cheahhaoyi/site-kit';
---

<Layout title="BGP Route Origin Validation">
  <div class="container">
    <Prose>
      <h1>Configuring RPKI on Cisco IOS-XE</h1>
      <p>
        RPKI ensures that only authorized Autonomous Systems can announce specific IP prefixes.
      </p>

      <Callout variant="warning" title="Prefix Filtering Requirement">
        Ensure your router's clock is synchronized via NTP before enabling ROA cryptographic validation.
      </Callout>

      <CodeBlock
        filename="cisco-rpki.cfg"
        lang="bash"
        code={`router bgp 65000\n neighbor 192.0.2.1 remote-as 65001\n address-family ipv4 unicast\n  rpki validate`}
      />
    </Prose>
  </div>
</Layout>
```

---

## 4. Component Reference

| Component | Props Interface | Description |
|---|---|---|
| `<Layout />` | `LayoutProps` | Root HTML wrapper with light mode default, metadata, nav, breadcrumbs, and footer |
| `<Nav />` | `NavProps` | Responsive header navigation with frosted glass, mobile drawer, and theme switcher |
| `<Button />` | `ButtonProps` | Tactile spring buttons (`primary`, `secondary`, `outline`, `ghost`, `danger`) |
| `<Card />` | `CardProps` | Interactive cards with `default`, `tonal` (M3), and `glass` (Apple HIG) variants |
| `<CodeBlock />` | `CodeBlockProps` | Dual Shiki syntax highlighting (Light default + Dark alternative) and copy feedback |
| `<Table />` | `TableProps` | Inset tabular data container with full horizontal scroll safety on mobile |
| `<Callout />` | `CalloutProps` | Semantic notice banners (`info`, `tip`, `warning`, `danger`) |
| `<Badge />` | `BadgeProps` | Domain and certification status pills with optional pulsing telemetry light |
| `<Tag />` | `TagProps` | Interactive topic tags with hover and active states |
| `<Breadcrumbs />` | `BreadcrumbsProps` | Base-path aware breadcrumb trail with Schema.org JSON-LD |
| `<ThemeToggle />` | `ThemeToggleProps` | Synchronized light mode default / dark mode alternative toggle button |
| `<Prose />` | `ProseProps` | Typographic container formatting Markdown/MDX elements |

---

## 5. Development & Testing

```bash
# Install dependencies
npm install

# Start local Astro development server
npm run dev

# Run Astro TypeScript typechecking (0 errors / 0 warnings required)
npm run check

# Build static production smoke-test
npm run build
```

---

## 6. Live Test Pages

- **Style Guide Kitchen Sink**: `http://localhost:4321/`
- **Material 3 & Apple HIG Benchmark**: `http://localhost:4321/demo`
