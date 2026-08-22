/**
 * Type definitions for @cheahhaoyi/site-kit components and design system
 */

export type Theme = 'light' | 'dark';

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
  active?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  class?: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  download?: boolean | string;
}

export type CardVariant = 'default' | 'elevated' | 'bordered' | 'ghost' | 'glass' | 'tonal';
export type BadgeVariant = 'default' | 'accent' | 'success' | 'warning' | 'danger' | 'cert' | 'outline';

export interface CardProps {
  title?: string;
  description?: string;
  href?: string;
  tags?: string[];
  badge?: string;
  badgeVariant?: BadgeVariant;
  date?: string;
  image?: string;
  imageAlt?: string;
  variant?: CardVariant;
  class?: string;
}

export interface CodeBlockProps {
  code: string;
  lang?: string;
  filename?: string;
  showLineNumbers?: boolean;
  class?: string;
}

export interface TableProps {
  headers?: string[];
  rows?: Array<Array<string | number>>;
  caption?: string;
  striped?: boolean;
  compact?: boolean;
  class?: string;
}

export interface NavProps {
  brandTitle?: string;
  brandSubtitle?: string;
  links?: NavLink[];
  currentPath?: string;
  showThemeToggle?: boolean;
  class?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  class?: string;
}

export type CalloutVariant = 'info' | 'tip' | 'warning' | 'danger';

export interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  icon?: boolean | string;
  class?: string;
}

export type TagVariant = 'default' | 'accent' | 'success' | 'warning' | 'danger' | 'cert' | 'outline';
export type TagSize = 'sm' | 'md';

export interface TagProps {
  variant?: TagVariant;
  size?: TagSize;
  href?: string;
  interactive?: boolean;
  class?: string;
}

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: TagSize;
  pulse?: boolean;
  class?: string;
}

export interface LayoutProps {
  title: string;
  description?: string;
  image?: string;
  canonicalURL?: string | URL;
  navLinks?: NavLink[];
  siteTitle?: string;
  siteSubtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  showNav?: boolean;
  showFooter?: boolean;
  class?: string;
}

export interface ProseProps {
  as?: string;
  class?: string;
}
