export type Project = {
  id: string;
  title: string;
  blurb: string;
  stack: readonly string[];
  category: 'Branding' | 'Digital' | 'Print';
  imageUrl: string;
  imageAlt: string;
  href: string;
};

export const PROJECTS: readonly Project[] = [
  {
    id: 'northwind-identity',
    title: 'Northwind Identity System',
    blurb:
      'A restrained brand identity for a logistics startup — wordmark, palette, and a guideline set that reads clearly across print and screen.',
    stack: ['Branding', 'Illustrator', 'Figma'],
    category: 'Branding',
    imageUrl: 'https://picsum.photos/seed/northwind-identity/1200/800',
    imageAlt: 'Northwind brand identity collateral laid out on a neutral surface',
    href: 'https://example.com/projects/northwind-identity',
  },
  {
    id: 'signal-poster-series',
    title: 'Signal Poster Series',
    blurb:
      'A six-piece typographic poster series exploring rhythm and negative space for a local music festival.',
    stack: ['Print', 'Typography', 'InDesign'],
    category: 'Print',
    imageUrl: 'https://picsum.photos/seed/signal-posters/1200/800',
    imageAlt: 'Grid of bold typographic festival posters',
    href: 'https://example.com/projects/signal-posters',
  },
  {
    id: 'orbit-design-system',
    title: 'Orbit Design System',
    blurb:
      'Component library and token architecture powering a multi-product SaaS suite, from Figma libraries to shipped code.',
    stack: ['UI Design', 'Figma', 'Tokens'],
    category: 'Digital',
    imageUrl: 'https://picsum.photos/seed/orbit-system/1200/800',
    imageAlt: 'Design system component sheet with buttons, inputs, and color tokens',
    href: 'https://example.com/projects/orbit-design-system',
  },
  {
    id: 'harvest-packaging',
    title: 'Harvest Coffee Packaging',
    blurb:
      'Single-origin packaging line built on a modular label system — one plate, many roasts, zero visual noise.',
    stack: ['Packaging', 'Print', 'Art Direction'],
    category: 'Print',
    imageUrl: 'https://picsum.photos/seed/harvest-packaging/1200/800',
    imageAlt: 'Row of minimalist coffee bags with distinct color-coded labels',
    href: 'https://example.com/projects/harvest-packaging',
  },
  {
    id: 'atlas-mark',
    title: 'Atlas Monogram',
    blurb:
      'A geometric monogram mark for a boutique mapping studio, tested down to 16px and up to billboard scale.',
    stack: ['Logo', 'Vector', 'Branding'],
    category: 'Branding',
    imageUrl: 'https://picsum.photos/seed/atlas-mark/1200/800',
    imageAlt: 'Geometric monogram construction grid with final mark',
    href: 'https://example.com/projects/atlas-mark',
  },
  {
    id: 'ledger-app',
    title: 'Ledger Finance App',
    blurb:
      'End-to-end interface for a personal finance tool — onboarding, dashboards, and a calm, low-contrast visual language.',
    stack: ['UI Design', 'Product', 'Figma'],
    category: 'Digital',
    imageUrl: 'https://picsum.photos/seed/ledger-app/1200/800',
    imageAlt: 'Mobile finance app screens arranged on a soft background',
    href: 'https://example.com/projects/ledger-app',
  },
];
