# DESIGN.md — Design System & Component Specification for `@cheahhaoyi/site-kit`

> Master design guide, token dictionary, and UI component reference for AI coding agents and developers building sites across the **@cheahhaoyi** multi-repo portfolio.

---

## 1. Core Architectural & Aesthetic Principles

`@cheahhaoyi/site-kit` is the **single source of truth** for design tokens, typography, and typed UI components across all portfolio and blog repositories (root domain, CISSP, CCNA, RHCSA study notes, AI security showcases).

### 1.1 Aesthetic Synthesis
The design system combines precision hardware aesthetics with dynamic tonal color science:
1. **Light Mode Baseline (Default)**: All layouts, components, and typography default to a high-contrast, luminous Light Mode (`--color-bg-base: #fbfaff`) with Deep Purple (`#7c3aed`) accents, maximizing readability for dense technical documentation.
2. **Obsidian Dark Mode Alternative**: Full support for a rich Dark Mode alternative (`data-theme="dark"`, `--color-bg-base: #0c0914`), stored in `localStorage['site-kit-theme']` and toggled with zero flash or layout shift.
3. **Dynamic Tonal Elevation**: Derived from the primary seed key color **Purple (`#7c3aed`)**, surface container layers (`--color-bg-surface-container-low`, `--color-bg-surface-container`, `--color-bg-surface-container-high`, `--color-bg-surface-container-highest`) provide clear depth without harsh borders.
4. **Translucent Frosted Glass (Vibrancy)**: High-translucency frosted glass surfaces (`backdrop-filter: blur(20px)`) with specular top rim highlights (`inset 0 1px 0 0 rgba(255, 255, 255, 0.95)`).
5. **Double-Bezel (Doppelrand) Enclosure**: Concentric squircle hardware frames (`doubleBezel={true}`) for focal cards and callouts.
6. **Tactile Spring Physics**: Natural spring curves (`--ease-spring: cubic-bezier(0.32, 0.72, 0, 1)`) and tactile micro-press feedback (`scale(0.975)`).
7. **Pill-Shaped Geometry**: Rounded capsule containers for navigation bars, buttons, status badges, and topic tags.

---

## 2. Downstream Consumption & Setup

### 2.1 Installation
In any consuming Astro portfolio site, add `@cheahhaoyi/site-kit` to `package.json`:

```json
{
  "dependencies": {
    "@cheahhaoyi/site-kit": "github:cheahhaoyi/site-kit#semver:^1.0.0"
  }
}
```

Then install:
```bash
npm install
```

### 2.2 Zero-Bundling Source Architecture
Consuming Astro sites import raw `.astro` components directly from `@cheahhaoyi/site-kit` and compile them during their own `astro build` step:

```astro
---
import { Layout, Prose, Button, Card, CodeBlock, Callout, Table, Badge, Tag, Breadcrumbs } from '@cheahhaoyi/site-kit';
---
```

### 2.3 Base-Path Resolution Rule
When linking to internal pages or referencing static assets, **always** wrap the path in `resolveUrl()` or use `import.meta.env.BASE_URL` to support subpath deployments (e.g., GitHub Pages `/site-kit`, `/cissp`, `/rhcsa`):

```astro
---
import { resolveUrl } from '@cheahhaoyi/site-kit';
const cisspUrl = resolveUrl('/cissp');
---
<a href={cisspUrl}>CISSP Notes</a>
```

---

## 3. Design Tokens Reference

All design tokens are defined as standard CSS variables in `tokens.css` and are automatically loaded with `<Layout />`.

### 3.1 Color & Tonal Palette

| Token | Light Mode (Default) | Dark Mode (Alternative) | Usage / Description |
|---|---|---|---|
| `--color-accent-primary` | `#7c3aed` (Purple 600) | `#a78bfa` (Purple 400) | Primary brand accent & interactive elements |
| `--color-accent-hover` | `#6d28d9` (Purple 700) | `#c4b5fd` (Purple 300) | Hover state for primary buttons & links |
| `--color-accent-active` | `#5b21b6` (Purple 800) | `#ddd6fe` (Purple 200) | Active / pressed state |
| `--color-accent-subtle` | `#f3e8ff` (Purple 100) | `rgba(167, 139, 250, 0.16)` | Primary container / chip background |
| `--color-accent-on-container`| `#581c87` (Purple 900) | `#ede9fe` | Text / icons on primary containers |
| `--color-accent-contrast` | `#ffffff` | `#130e24` | Text / icons on primary solid buttons |

### 3.2 Backgrounds & Surface Container Levels

| Token | Light Mode | Dark Mode | Usage / Description |
|---|---|---|---|
| `--color-bg-base` | `#fbfaff` | `#0c0914` | Global root page canvas |
| `--color-bg-surface` | `#ffffff` | `#141021` | Standard container / card surface |
| `--color-bg-surface-container-low` | `#f8f6fc` | `#100c1a` | Low-emphasis recessed container |
| `--color-bg-surface-container` | `#f2eefa` | `#191428` | Level 1 surface container |
| `--color-bg-surface-container-high` | `#e9e2f6` | `#221c36` | Level 2 surface container |
| `--color-bg-surface-container-highest` | `#dfd6f2` | `#2c2445` | Level 3 surface container / active items |
| `--color-bg-elevated` | `#f4f0fb` | `#1e1830` | Floating popovers, tooltips, dialogs |
| `--color-bg-sunken` | `#ede8f5` | `#08060d` | Inset wells and code backgrounds |

### 3.3 System Accent Palette

| Token | Hex (Light) | Hex (Dark) | Semantic Role in Portfolio |
|---|---|---|---|
| `--ios-purple` | `#af52de` | `#bf5af2` | Key Brand Accent, AI Security topics |
| `--ios-indigo` | `#5856d6` | `#5e5ce6` | Deep technical topics, Cryptography |
| `--ios-blue` | `#007aff` | `#0a84ff` | Networking, BGP, CCNA topics |
| `--ios-mint` | `#00c7be` | `#63e6e2` | Security audits, verified configurations |
| `--ios-green` | `#34c759` | `#30d158` | Passed exams, active nodes, success states |
| `--ios-orange` | `#ff9500` | `#ff9f0a` | Warnings, intermediate topics, packet drops |
| `--ios-pink` | `#ff2d55` | `#ff375f` | Critical vulnerabilities, CVEs, attack vectors |
| `--ios-red` | `#ff3b30` | `#ff453a` | High severity alerts, system failures |

### 3.4 Frosted Glass & Double-Bezel Specular Rims

| Token | Value (Light) | Value (Dark) | Usage |
|---|---|---|---|
| `--glass-bg` | `rgba(255, 255, 255, 0.80)` | `rgba(20, 16, 33, 0.80)` | Glass card backdrop fill |
| `--glass-bg-elevated` | `rgba(255, 255, 255, 0.92)` | `rgba(30, 24, 48, 0.90)` | Floating navigation & modals |
| `--glass-border` | `rgba(220, 212, 238, 0.75)` | `rgba(167, 139, 250, 0.18)` | Glass translucent outer border |
| `--glass-blur` | `blur(20px)` | `blur(22px)` | Backdrop blur filter |
| `--glass-rim` | `inset 0 1px 0 0 rgba(255, 255, 255, 0.95)` | `inset 0 1px 0 0 rgba(255, 255, 255, 0.12)` | Top specular rim reflection |
| `--glass-bezel-outer` | `rgba(124, 58, 237, 0.05)` | `rgba(167, 139, 250, 0.08)` | Concentric outer bezel tint |

### 3.5 Typography & Hierarchy

| Token | Value | Notes |
|---|---|---|
| `--font-display` | `system-ui, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Geist", "Plus Jakarta Sans", sans-serif` | Headings, hero banners, titles |
| `--font-body` | `system-ui, BlinkMacSystemFont, "SF Pro Text", "Geist", "Inter", sans-serif` | Body copy, technical descriptions |
| `--font-mono` | `"SF Mono", "JetBrains Mono", ui-monospace, Menlo, Monaco, Consolas, monospace` | Code snippets, terminal logs, CIDR masks |
| `--tracking-tighter` | `-0.04em` | Hero displays (`h1`, `h2`) |
| `--tracking-tight` | `-0.025em` | Subheadings (`h3`, `h4`) |
| `--tracking-wider` | `0.06em` | Badges, metadata tags, uppercase labels |

### 3.6 Spacing & Radii Scales

- **Spacing**: `--space-1` (4px), `--space-2` (8px), `--space-3` (12px), `--space-4` (16px), `--space-6` (24px), `--space-8` (32px), `--space-12` (48px), `--space-16` (64px).
- **Radii**: `--radius-sm` (8px), `--radius-md` (12px - buttons), `--radius-lg` (16px - cards), `--radius-xl` (22px - containers), `--radius-2xl` (28px - outer bezel), `--radius-full` (9999px - pills).

### 3.7 Motion & Spring Physics

- `--ease-spring`: `cubic-bezier(0.32, 0.72, 0, 1)` (fluid natural motion).
- `--transition-fast`: `180ms var(--ease-spring)`.
- `--transition-normal`: `280ms var(--ease-spring)`.
- Button Micro-Press: `transform: scale(0.975) translateY(1px)`.

---

## 4. Built-in Layout Primitives & Utility Classes

Do **not** write custom CSS for common layout patterns. Use these built-in classes:

```html
<!-- Max-width container with responsive side gutters -->
<div class="container">...</div>

<!-- Vertical stack layouts -->
<div class="stack">...</div>      <!-- gap: 1rem -->
<div class="stack-sm">...</div>   <!-- gap: 0.5rem -->
<div class="stack-lg">...</div>   <!-- gap: 2rem -->

<!-- Horizontal flow clusters with automatic wrapping -->
<div class="cluster">...</div>          <!-- gap: 0.75rem, center-aligned -->
<div class="cluster-between">...</div>  <!-- space-between layout -->

<!-- Responsive auto-fitting grid for cards -->
<div class="grid-responsive">...</div>  <!-- minmax(280px, 1fr) -->

<!-- Screen-reader accessible hidden text -->
<span class="sr-only">Descriptive label</span>
```

---

## 5. UI Component Guide & Full API Reference

### 5.1 `<Layout />`
Root HTML document wrapper providing global styles, SEO metadata, preconnected fonts, zero-flash theme initialization script, floating navigation header, and standard footer.

```astro
---
import { Layout } from '@cheahhaoyi/site-kit';

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'CISSP Notes', href: '/cissp' },
  { label: 'Security Architecture' },
];
---

<Layout
  title="BGP Security & RPKI"
  description="Deep dive into Cryptographic Route Origin Validation."
  breadcrumbs={breadcrumbs}
  siteTitle="Hao Yi Cheah"
  siteSubtitle="Network & AI Security"
  showNav={true}
  showFooter={true}
>
  <slot />
</Layout>
```

#### Props (`LayoutProps`)
| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | **Required** | Page title (auto-appends ` \| siteTitle` if omitted) |
| `description` | `string` | Portfolio default | Meta description for SEO & OpenGraph |
| `image` | `string` | `undefined` | OpenGraph image URL |
| `canonicalURL`| `string \| URL` | Auto-detected | Canonical link URL |
| `navLinks` | `NavLink[]` | Default nav list | Override navigation links |
| `siteTitle` | `string` | `'Hao Yi Cheah'` | Brand title |
| `siteSubtitle`| `string` | `'Network & AI Security'`| Brand subtitle |
| `breadcrumbs` | `BreadcrumbItem[]` | `undefined` | Optional breadcrumb list |
| `showNav` | `boolean` | `true` | Show or hide floating nav |
| `showFooter` | `boolean` | `true` | Show or hide footer |

---

### 5.2 `<Nav />`
Floating frosted glass navigation capsule with responsive mobile slide-down drawer and integrated theme toggle.

```astro
---
import { Nav } from '@cheahhaoyi/site-kit';
---
<Nav
  brandTitle="Hao Yi Cheah"
  brandSubtitle="Network & AI Security"
  currentPath="/cissp"
/>
```

---

### 5.3 `<Button />`
Spring-press button supporting both button and anchor modes, pill capsules, purple tonal state layers, and trailing button-in-button icon circles.

```astro
---
import { Button } from '@cheahhaoyi/site-kit';
---

<!-- Primary CTA with trailing kinetic arrow icon -->
<Button variant="primary" size="md" pill={true} href="/cissp/domain-4">
  <span>Explore Domain 4</span>
  <span class="btn-icon-wrapper">&rarr;</span>
</Button>

<!-- Secondary Tonal Action -->
<Button variant="secondary" size="md" pill={true}>
  Download Lab Topology
</Button>

<!-- Danger Action -->
<Button variant="danger" size="sm">
  Flush Routing Table
</Button>
```

#### Props (`ButtonProps`)
| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'outline' \| 'danger'` | `'primary'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button scale |
| `href` | `string` | `undefined` | If provided, renders semantic `<a>` tag |
| `pill` | `boolean` | `false` | Pill capsule border radius |
| `disabled` | `boolean` | `false` | Disabled state |
| `target` | `string` | `undefined` | Target attribute (auto-adds `rel="noopener noreferrer"` for `_blank`) |

---

### 5.4 `<Card />`
Versatile container supporting machined double-bezel enclosures, frosted glass vibrancy, dynamic tonal surfaces, header images, and metadata slots.

```astro
---
import { Card, Button } from '@cheahhaoyi/site-kit';
---

<!-- Double-Bezel Glass Card (Frosted Glass Vibrancy) -->
<Card
  variant="glass"
  doubleBezel={true}
  title="RPKI ROA Validation Engine"
  description="Performs cryptographic validation of BGP route origins against RPKI Trust Anchors."
  badge="CISSP DOMAIN 4"
  badgeVariant="cert"
  date="Updated Aug 2026"
  href="/cissp/rpki"
  tags={['BGP', 'RPKI', 'Crypto']}
>
  <div class="card-extra-content">
    <p>Validated 420,000 routes with 0 prefix hijack vulnerabilities.</p>
  </div>
</Card>

<!-- Dynamic Tonal Container Card (Material Design 3) -->
<Card
  variant="tonal"
  title="AI Security Guardrails"
  description="Input/output telemetry inspection with sub-millisecond overhead."
  badge="AI DEFENSE"
/>
```

#### Props (`CardProps`)
| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | `undefined` | Card heading |
| `description`| `string` | `undefined` | Body summary text |
| `href` | `string` | `undefined` | Makes entire card an interactive clickable link |
| `variant` | `'default' \| 'elevated' \| 'bordered' \| 'ghost' \| 'glass' \| 'tonal'` | `'default'` | Visual surface style |
| `doubleBezel` | `boolean` | `false` | Renders outer concentric machined squircle border |
| `pill` | `boolean` | `false` | Pill card geometry |
| `badge` | `string` | `undefined` | Top header badge text |
| `badgeVariant`| `BadgeVariant` | `'default'` | Badge color style |
| `date` | `string` | `undefined` | Header timestamp string |
| `image` | `string` | `undefined` | Media banner image URL |
| `tags` | `string[]` | `[]` | Bottom metadata tags |

---

### 5.5 `<CodeBlock />`
Dual-theme syntax highlighting powered by Shiki (`github-light` in light mode, `github-dark` in dark mode), complete with macOS window dots, file/language label, and interactive copy-to-clipboard button.

```astro
---
import { CodeBlock } from '@cheahhaoyi/site-kit';

const bgpConfig = `router bgp 65001
 neighbor 10.0.0.2 remote-as 65002
 address-family ipv4 unicast
  rpki validate`;
---

<CodeBlock
  code={bgpConfig}
  lang="bash"
  filename="router-bgp.cfg"
/>
```

#### Props (`CodeBlockProps`)
| Prop | Type | Default | Description |
|---|---|---|---|
| `code` | `string` | **Required** | Source code text |
| `lang` | `string` | `'bash'` | Shiki language identifier |
| `filename` | `string` | `undefined` | File name or custom header label |

---

### 5.6 `<Callout />`
Semantic notice banners for exam tips, critical gotchas, warnings, and architectural notes.

```astro
---
import { Callout } from '@cheahhaoyi/site-kit';
---

<Callout variant="tip" title="CISSP Exam Tip">
  Remember that BGP Route Origin Authorizations (ROAs) validate the origin AS, not the entire AS_PATH.
</Callout>

<Callout variant="danger" title="Critical Security Gotcha">
  Never deploy eBGP multi-hop peering without TTL security checks enabled.
</Callout>
```

#### Props (`CalloutProps`)
| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'info' \| 'tip' \| 'warning' \| 'danger'` | `'info'` | Semantic alert status |
| `title` | `string` | Auto by variant | Header title |
| `icon` | `boolean \| string` | `true` | Show or hide embedded SVG icon |

---

### 5.7 `<Badge />` & `<Tag />`
Status indicators and interactive topic chips with pulsing radar dots and system color token support.

```astro
---
import { Badge, Tag } from '@cheahhaoyi/site-kit';
---

<!-- Telemetry Pulse Badge -->
<Badge pill={true} iosColor="green" pulse={true}>
  Active Node
</Badge>

<!-- Certification Topic Tag -->
<Tag pill={true} variant="cert" href="/cissp">
  CISSP Domain 4
</Tag>

<!-- System Color Chip -->
<Tag pill={true} iosColor="purple" interactive={true}>
  AI Security
</Tag>
```

#### Props
- `<Badge />`: `variant`, `size` (`'sm' | 'md'`), `pulse` (`boolean`), `pill` (`boolean`), `iosColor` (`IOSColor`).
- `<Tag />`: `variant`, `size` (`'sm' | 'md'`), `href` (`string`), `interactive` (`boolean`), `pill` (`boolean`), `iosColor` (`IOSColor`).

---

### 5.8 `<Table />`
Inset technical data table with responsive horizontal scrolling on mobile and smooth row hover layers.

```astro
---
import { Table } from '@cheahhaoyi/site-kit';

const headers = ['CIDR / Prefix', 'Subnet Mask', 'Total IPs', 'Usable Hosts'];
const rows = [
  ['/30', '255.255.255.252', 4, 2],
  ['/28', '255.255.255.240', 16, 14],
  ['/24', '255.255.255.0', 256, 254],
];
---

<Table
  headers={headers}
  rows={rows}
  caption="IPv4 Subnetting Quick Reference"
  striped={true}
/>
```

---

### 5.9 `<Prose />`
Typographic container applying the standardized `@cheahhaoyi/site-kit` Markdown/MDX typography rules (headings, links, lists, blockquotes, inline code styling).

```astro
---
import { Prose } from '@cheahhaoyi/site-kit';
---

<Prose>
  <h2>Cryptographic Assurance in Routing</h2>
  <p>
    Autonomous Systems exchange routing reachability information using the Border Gateway Protocol...
  </p>
</Prose>
```

---

## 6. Page Patterns for Portfolio Sites

### 6.1 Certification Study Note Page Pattern

```astro
---
import { Layout, Prose, Card, CodeBlock, Callout, Badge, Tag, Button, Table, resolveUrl } from '@cheahhaoyi/site-kit';

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'CISSP Notes', href: '/cissp' },
  { label: 'BGP Route Origin Validation' },
];
---

<Layout
  title="BGP Route Origin Validation (RPKI)"
  description="Comprehensive guide to cryptographic route origin validation on enterprise routing platforms."
  breadcrumbs={breadcrumbs}
>
  <div class="container stack-lg">
    <!-- Header Hero -->
    <header class="stack-sm">
      <div class="cluster">
        <Badge pill={true} iosColor="purple" pulse={true}>CISSP 2026</Badge>
        <Tag pill={true} variant="cert">Domain 4: Network Security</Tag>
        <Tag pill={true} iosColor="blue">BGP / Routing</Tag>
      </div>
      <h1>BGP Route Origin Validation (RPKI)</h1>
      <p>Cryptographic validation ensures AS origin authenticity and protects against accidental or malicious prefix hijacking.</p>
    </header>

    <!-- Main Content Grid -->
    <div class="stack-lg">
      <Card variant="glass" doubleBezel={true} title="Key Architecture Summary">
        <p>RPKI utilizes X.509 PKI certificates to validate that an autonomous system is authorized to originate a given IP prefix.</p>
      </Card>

      <Prose>
        <h2>1. Protocol Overview</h2>
        <p>In standard BGP, routers accept advertised prefixes without cryptographic proof of ownership...</p>
      </Prose>

      <Callout variant="tip" title="Exam Takeaway">
        RPKI validates the origin AS (leftmost AS in AS_PATH), not the transit path. For transit path validation, BGPsec is required.
      </Callout>

      <CodeBlock
        code={`router bgp 65001\n neighbor 10.0.0.1 remote-as 65000\n address-family ipv4 unicast\n  rpki validate`}
        lang="bash"
        filename="edge-router.cfg"
      />
    </div>
  </div>
</Layout>
```

---

## 7. Mandatory Rules & Anti-Patterns for Coding Agents

### ✅ DO:
1. **Always use `@cheahhaoyi/site-kit` components**: Use `<Layout>`, `<Card>`, `<Button>`, `<Badge>`, `<Tag>`, `<Callout>`, `<CodeBlock>`, and `<Table>` instead of writing bespoke HTML/CSS.
2. **Wrap all internal links with `resolveUrl()`**: Ensure all URLs are base-path safe for subpath deployments.
3. **Use CSS Token Variables**: Always reference tokens from `tokens.css` (e.g. `var(--color-accent-primary)`, `var(--space-4)`, `var(--radius-lg)`).
4. **Follow Light Mode Default**: Design with Light Mode as the primary foundation and verify Dark Mode compatibility.
5. **Use built-in layout utilities**: Use `.container`, `.stack`, `.cluster`, `.grid-responsive`.

### ❌ DO NOT:
1. **Never install TailwindCSS or CSS-in-JS**: Site-kit uses pure CSS tokens and scoped Astro styles.
2. **Never hardcode arbitrary hex colors**: Do not write `#7c3aed`, `#ffffff`, `#120e24` directly in component CSS; always use `var(--color-...)`.
3. **Never build custom Dark Mode toggles**: The `<ThemeToggle />` component and `<Layout />` handle zero-flash theme persistence out of the box.
4. **Never hardcode root absolute URLs**: Avoid `<a href="/cissp">`; use `<a href={resolveUrl('/cissp')}>`.
5. **Never import external icon libraries unless necessary**: Use the SVG icons built into `<Callout>`, `<Button>`, `<Card>`, and `<CodeBlock>`.
