export const SITE_NAME = 'Arsh Dhiman';

export interface NavItem {
  readonly label: string;
  readonly to: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Contact', to: '/contact' },
] as const;

export interface SocialLink {
  readonly label: string;
  readonly href: string;
}

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { label: 'Behance', href: 'https://www.behance.net/' },
  { label: 'Instagram', href: 'https://www.instagram.com/' },
] as const;

export const SITE_TAGLINE = 'Graphic Designer';

export const SITE_DESCRIPTION =
  'Crafting visual stories that resonate. I turn ideas into impactful designs.';
