// Web app manifest (spec §9.6, BUILD.md U10). Icon files themselves land in U11 (A1 copy) —
// this only emits the JSON referencing their final paths.
import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = () => {
  const manifest = {
    name: 'CreatorsHome',
    short_name: 'CreatorsHome',
    theme_color: '#6B3BFF',
    background_color: '#6B3BFF',
    display: 'standalone',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
  return new Response(JSON.stringify(manifest), { headers: { 'Content-Type': 'application/manifest+json' } });
};
