import type { Num, Platform, Src } from './types.ts';
import { formatNum } from './format.ts';

export interface PageWallCard {
  name: string;
  platform: Platform;
  num: Num;
  label: string;
  campaign: string;
  bg: 'orange' | 'white' | 'ink';
}

function num(value: number, decimals: number, suffix: string, spoken: string, src: Src[]): Num {
  return { value, decimals, suffix, display: formatNum(value, decimals) + suffix, spoken, src };
}

// "Who's at the party" (home §3.1-5 / spec §2.4) — partner pages that carried our campaigns.
export const pagesWall: PageWallCard[] = [
  {
    name: 'Rvcj',
    platform: 'instagram',
    num: num(4.6, 1, 'M', '4.6 million', [{ cj: 'deck-raghav-juyal', metric: 'Rvcj' }]),
    label: 'views on one repost',
    campaign: 'raghav-juyal',
    bg: 'orange',
  },
  {
    name: 'AdultSociety',
    platform: 'instagram',
    num: num(1.3, 1, 'M', '1.3 million', [{ cj: 'deck-raghav-juyal', metric: 'AdultSociety' }]),
    label: 'views',
    campaign: 'raghav-juyal',
    bg: 'white',
  },
  {
    name: 'Ghantaa',
    platform: 'instagram',
    num: num(534, 0, 'K', '534 thousand', [{ cj: 'deck-raghav-juyal', metric: 'Ghantaa' }]),
    label: 'views',
    campaign: 'raghav-juyal',
    bg: 'ink',
  },
  {
    name: 'Log.kya.sochenge',
    platform: 'instagram',
    num: num(468, 0, 'K', '468 thousand', [{ cj: 'deck-raghav-juyal', metric: 'Log.kya.sochenge' }]),
    label: 'views',
    campaign: 'raghav-juyal',
    bg: 'white',
  },
  {
    name: 'Startup Decoding',
    platform: 'instagram',
    num: num(146046, 0, '', '146,046', [{ cj: 'chhedas', metric: 'Views' }]),
    label: 'views',
    campaign: 'chhedas',
    bg: 'orange',
  },
  {
    name: 'trollsculture',
    platform: 'instagram',
    num: num(61.4, 1, 'K', '61.4 thousand', [{ cj: 'deck-manu-singh-interrogation', metric: 'trollsculture' }]),
    label: 'views',
    campaign: 'manu-singh-interrogation',
    bg: 'ink',
  },
];
