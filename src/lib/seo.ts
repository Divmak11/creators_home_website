// SEO / JSON-LD helpers (spec §9.4, BUILD.md U10). Every absolute URL is built from SITE_URL —
// never a literal domain anywhere else, so a domain swap (checks/e) only touches config.ts.
import { SITE_URL, SITE_NAME, INSTAGRAM_URL, LINKEDIN_URL } from '../config.ts';
import type { Campaign } from '../data/types.ts';
import type { FaqItem } from '../data/faq.ts';
import { services } from '../data/services.ts';

export function abs(path: string): string {
  return new URL(path, SITE_URL).toString();
}

export function organization(): object {
  const sameAs = [INSTAGRAM_URL, LINKEDIN_URL].filter((u): u is string => !!u);
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': abs('/#org'),
    name: SITE_NAME,
    url: SITE_URL,
    logo: abs('/icon-512.png'),
    sameAs,
    areaServed: 'IN',
    knowsAbout: services.map((s) => s.name),
  };
}

export function website(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
  };
}

export function itemList(campaigns: Campaign[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: campaigns.map((c) => ({
      '@type': 'ListItem',
      position: c.order,
      url: abs(`/work/${c.slug}/`),
      name: c.title,
    })),
  };
}

export function faqPage(faq: FaqItem[]): object | null {
  const items = faq.filter((f) => !f.hasPlaceholder);
  if (!items.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function creativeWork(c: Campaign): object {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: c.title,
    headline: c.seo.title,
    description: c.seo.description,
    url: abs(`/work/${c.slug}/`),
    image: abs(`/og/${c.slug}.png`),
    creator: { '@id': abs('/#org') },
    about: { '@type': 'Brand', name: c.brand },
  };
  if (c.dates) data.dateCreated = c.dates.iso;
  return data;
}

export function breadcrumb(c: Campaign): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: abs('/') },
      { '@type': 'ListItem', position: 2, name: 'Work', item: abs('/#work') },
      { '@type': 'ListItem', position: 3, name: c.title },
    ],
  };
}
