// Per-campaign OG image endpoint (spec §9.3, BUILD.md U10). Prerendered at build time, one
// PNG per campaign slug. Template lives in src/lib/og.ts.
import type { APIRoute } from 'astro';
import { campaigns } from '../../data/campaigns.ts';
import { renderOgPng } from '../../lib/og.ts';
import type { Campaign } from '../../data/types.ts';

export const prerender = true;

export function getStaticPaths() {
  return campaigns.map((c) => ({ params: { slug: c.slug }, props: { campaign: c } }));
}

export const GET: APIRoute = async ({ props }) => {
  const { campaign } = props as { campaign: Campaign };
  const png = await renderOgPng(campaign);
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
