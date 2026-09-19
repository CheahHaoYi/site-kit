import { defineConfig } from 'astro/config';
import type { AstroUserConfig } from 'astro';

export interface SubsiteConfigOptions extends AstroUserConfig {
  /** Root domain for the portfolio / site deployment (default: 'https://cheahhaoyi.github.io') */
  site?: string;
  /** Base path for the subsite repository (e.g., '/ccna', '/systemdesign') */
  base: string;
}

/**
 * Shared Astro configuration preset for @cheahhaoyi/site-kit subsites.
 * Enforces dual-theme Shiki syntax highlighting ('github-light' and 'github-dark')
 * while seamlessly merging subsite-specific integrations, markdown plugins, and settings.
 */
export function defineSubsiteConfig(options: SubsiteConfigOptions): any {
  const {
    site = 'https://cheahhaoyi.github.io',
    base,
    markdown = {},
    integrations = [],
    ...rest
  } = options;

  const defaultShikiConfig = {
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
    defaultColor: false,
    wrap: true,
  };

  const mergedMarkdown = {
    ...markdown,
    shikiConfig: {
      ...defaultShikiConfig,
      ...(markdown.shikiConfig || {}),
    },
  };

  return defineConfig({
    site,
    base,
    markdown: mergedMarkdown,
    integrations,
    ...rest,
  } as any);
}
