// robots.txt (spec §9.6, BUILD.md U10). Generated from SITE_URL — the domain never appears literally.
import type { APIRoute } from 'astro';
import { SITE_URL } from '../config.ts';

export const prerender = true;

export const GET: APIRoute = () => {
  const body = `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap-index.xml\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
};
