import type { SlotId } from './assets.ts';

export type Filter = 'film' | 'brands' | 'celebs' | 'reddit';
export type Platform = 'instagram' | 'facebook' | 'x' | 'reddit';
export interface Src { cj: string; metric: string }            // campaigns.json record id + exact metric label
export interface Num { value: number; decimals: number; suffix: string; display: string; spoken: string; src: Src[] | { derived: string } }
//   display = exactly what the page prints ("6M+", "146,046", "1 hr"); value = count-up target in display units (6, 146046, 1); spoken = for aria-label ("6 million plus")
export interface Stat { num: Num; label: string }
export interface LeaderRow { name: string; platform: Platform; num: Num }
export interface WallItem { slot: SlotId; kind: 'phone' | 'print'; caption: string; alt: string; srcRef: string; width: number; height: number }
export interface Quote { text: string; attribution: string; platform: Platform; src: Src | string }
export interface MoveCard { title: string; text: string }
export interface PlatformCard { platform: Platform; headline: Stat; rows: Stat[] }
export interface Campaign {
  slug: string; order: number; sourceId: string; title: string; kicker: string; brand: string;
  filters: Filter[]; platforms: Platform[];
  figure: Stat | null; badge: string | null; secondary: string;
  look: { bg: 'orange' | 'white' | 'ink'; tilt: number };
  cover: { kind: 'art'; art: 'trophy' | 'reel'; panel: 'ink' | 'white' } | { kind: 'photo'; slot: SlotId; position: string; srcRef: string; width: number; height: number; alt: string };
  stats: Stat[]; leaderboard: LeaderRow[]; platformSplit: { cards: PlatformCard[]; audience: { label: string; pct: number }[] } | null;
  wall: WallItem[]; quotes: Quote[]; lead: string; body: string; move: MoveCard[];
  dates: { label: string; iso: string } | null; peek: boolean;
  seo: { title: string; description: string };
}
