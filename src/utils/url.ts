/**
 * URL resolution helper for base-path awareness in multi-repo & subpath deployments.
 */
export function resolveUrl(href?: string, baseUrl: string = import.meta.env.BASE_URL ?? '/'): string {
  if (!href) return '';
  if (
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('//') ||
    href.startsWith('#') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:')
  ) {
    return href;
  }

  const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const cleanHref = href.startsWith('/') ? href.slice(1) : href;

  // Prevent double-prefixing if cleanHref already begins with the subpath
  const baseNoSlashes = base.replace(/^\/+|\/+$/g, '');
  if (baseNoSlashes && (cleanHref === baseNoSlashes || cleanHref.startsWith(`${baseNoSlashes}/`))) {
    return `/${cleanHref}`;
  }

  return `${base}${cleanHref}`;
}

/**
 * Checks if a link matches current path
 */
export function isPathActive(linkHref: string, currentPath: string = ''): boolean {
  if (!linkHref || !currentPath) return false;
  const cleanLink = linkHref.replace(/^\/+|\/+$/g, '');
  const cleanCurrent = currentPath.replace(/^\/+|\/+$/g, '');
  if (cleanLink === cleanCurrent) return true;
  if (cleanLink !== '' && cleanCurrent.startsWith(cleanLink)) return true;
  return false;
}
