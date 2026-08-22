# @cheahhaoyi/site-kit

> Single source of truth for design tokens, typography, and typed Astro UI components across the **@cheahhaoyi** multi-repo network engineering & AI security portfolio.

[![CI & Living Style Guide](https://github.com/cheahhaoyi/site-kit/actions/workflows/ci.yml/badge.svg)](https://github.com/cheahhaoyi/site-kit/actions/workflows/ci.yml)
[![Version](https://img.shields.io/badge/version-1.0.0-7c3aed.svg)](https://github.com/cheahhaoyi/site-kit/releases/tag/v1.0.0)
[![License: MIT](https://img.shields.io/badge/License-MIT-slate.svg)](LICENSE)

---

## 1. Overview & Aesthetic Framework

`@cheahhaoyi/site-kit` provides shared CSS design tokens, typography, and typed Astro components for every site in the multi-repo portfolio (root domain, CISSP/CCNA/RHCSA certification study guides, AI security showcases).

### Design Synthesis:
1. **Modern System Interface Standards**:
   - **System Font Hierarchy**: Tight typographic tracking (`-0.04em`), clear visual hierarchy, and monospace technical formatting.
   - **Translucent Frosted Glass (Vibrancy)**: `backdrop-filter: blur(20px)`, top specular rim highlights (`inset 0 1px 0 0 rgba(255,255,255,0.95)`), and translucent hairlines.
   - **System Accent Palette**: Built-in tokens for System Purple, Indigo, Blue, Mint, Green, Orange, and Pink.
   - **Double-Bezel (Doppelrand) Architecture**: Machined hardware aesthetic with nested concentric squircle enclosures.
   - **Meaningful Spring Physics**: Smooth natural motion curves (`cubic-bezier(0.32, 0.72, 0, 1)`) and tactile micro-presses (`scale(0.975)`).

2. **Material Design 3 (M3) Dynamic Principles**:
   - **Dynamic Tonal Color Capabilities**: All surface container levels, active tints, and state layers are dynamically derived from the key seed color **Purple (`#7c3aed`)**.
   - **Prominent Surface Elevations**: Tonal elevation system (Base, Surface Low, Level 1–3 Container, Elevated).
   - **Pill-Shaped Container Architecture**: Rounded capsule geometries for floating navigation islands, action buttons, status badges, and tags.

3. **Light Mode Default & Dark Mode Alternative**:
   - Interfaces load with high-contrast, luminous Light Mode as the primary default baseline, prioritizing technical reading legibility.
   - Seamless, zero-flash toggle to an Obsidian Dark Mode alternative stored in `localStorage['site-kit-theme']`.

---

## 2. Installation in Consumer Repositories

Add `@cheahhaoyi/site-kit` directly as a Git dependency in your consumer repository's `package.json`:

```json
{
  "dependencies": {
    "@cheahhaoyi/site-kit": "github:cheahhaoyi/site-kit#semver:^1.0.0"
  }
}
```

Then run:
```bash
npm install
```

For a comprehensive design guide and component implementation manual for downstream coding agents, see [DESIGN.md](DESIGN.md) and [AGENTS.md](AGENTS.md).

---

## 3. Quick Start & Usage

### 3.1 Base Layout with Floating Glass Nav

```astro
---
import { Layout, Button, Card, Badge, Tag } from '@cheahhaoyi/site-kit';

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'CISSP', href: '/cissp' },
  { label: 'Domain 4: Network Security' },
];
---

<Layout
  title="BGP Route Origin Validation"
  description="Guide to configuring RPKI and BGP ROV on enterprise edge routing infrastructure."
  breadcrumbs={breadcrumbs}
>
  <div class="container stack-lg">
    <div class="cluster">
      <Badge pill={true} iosColor="purple" pulse={true}>CISSP 2026</Badge>
      <Tag pill={true} variant="cert">BGP RPKI</Tag>
    </div>

    <h1>Configuring RPKI on Enterprise Edge Routers</h1>

    <Card variant="glass" doubleBezel={true} title="Verification Summary">
      <p>Cryptographic validation ensures AS origin authenticity and prevents route hijacking.</p>
      
      <Button pill={true} variant="primary" size="md">
        <span>Verify Route State</span>
        <span class="btn-icon-wrapper">&rarr;</span>
      </Button>
    </Card>
  </div>
</Layout>
```

---

## 4. Component Reference

| Component | Props Interface | Description |
|---|---|---|
| `<Layout />` | `LayoutProps` | Root HTML wrapper with light mode default, metadata, floating nav, and footer |
| `<Nav />` | `NavProps` | Floating frosted glass navigation island with mobile drawer and theme toggle |
| `<Button />` | `ButtonProps` | Spring-press buttons with `pill`, purple tonal states, and button-in-button trailing icons |
| `<Card />` | `CardProps` | Machined hardware cards with `default`, `tonal`, `glass`, and `doubleBezel` |
| `<CodeBlock />` | `CodeBlockProps` | Dual Shiki syntax highlighting (GitHub Light default + GitHub Dark alternative) |
| `<Table />` | `TableProps` | Inset tabular data container with smooth row hover layers and mobile scroll |
| `<Callout />` | `CalloutProps` | Semantic notice banners (`info`, `tip`, `warning`, `danger`) |
| `<Badge />` | `BadgeProps` | Pill status indicators with pulsing telemetry lights and native system color support |
| `<Tag />` | `TagProps` | Interactive topic pills with hover states and native system color support |
| `<Breadcrumbs />` | `BreadcrumbsProps` | Base-path aware breadcrumb trail with Schema.org JSON-LD |
| `<ThemeToggle />` | `ThemeToggleProps` | Synchronized Light Mode default / Dark Mode alternative toggle switch |
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

- **Style Guide Living Baseline**: `http://localhost:4321/`
- **Design System Benchmark Testbed**: `http://localhost:4321/demo`
