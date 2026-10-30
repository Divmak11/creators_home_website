import type { Num, Src } from './types.ts';
import { formatNum } from './format.ts';
import { campaigns } from './campaigns.ts';
import { IG_FOLLOWERS_CONFIRMED } from '../config.ts';

export interface SiteStatCard {
  num: Num;
  label: string;
  maths: string;
}

function num(value: number, decimals: number, suffix: string, spoken: string, src: Src[] | { derived: string }): Num {
  return { value, decimals, suffix, display: formatNum(value, decimals) + suffix, spoken, src };
}

const card4: SiteStatCard = IG_FOLLOWERS_CONFIRMED
  ? {
      num: num(60.4, 1, 'K', '60.4 thousand', { derived: '@thecreatorhome Instagram followers, deck slide 2 (s02_i1.jpg) — not a campaigns.json metric' }),
      label: 'followers on our Instagram',
      maths: '@thecreatorhome, deck slide 2',
    }
  : {
      num: num(18, 0, '', '18', { derived: 'distinct names: Chheda\'s 6 + Raghav 4 + Manu 7 new + District @Shujeel 1' }),
      label: 'pages & creators in our case studies',
      maths: "Chheda's 6 + Raghav Juyal 4 + Manu Singh 7 new + District @Shujeel 1",
    };

// "The house numbers" (home §3.1-4 / spec §2.3) — six cards, exact sums from the 8 campaigns on this site.
export const siteStats: SiteStatCard[] = [
  {
    num: num(9, 0, 'M+', '9 million plus', [
      { cj: 'deck-raghav-juyal', metric: 'Total Instagram Reach' },
      { cj: 'deck-manu-singh-interrogation', metric: 'Total Reach' },
      { cj: 'district-batwara-awarapan', metric: 'Twitter/X Reach' },
    ]),
    label: 'reach across our campaigns',
    maths: '6M Raghav Juyal + 1.6M Manu Singh + 1.4M District on X',
  },
  {
    num: num(3.1, 1, 'M+', '3.1 million plus', [
      { cj: 'chhedas', metric: 'Views' },
      { cj: 'district-batwara-awarapan', metric: 'Instagram Views' },
      { cj: 'district-batwara-awarapan', metric: 'Reddit Views' },
    ]),
    label: 'views on campaign posts',
    maths: '2M Chheda\'s + 1M District Instagram + 100K District Reddit',
  },
  {
    num: num(65, 0, 'K+', '65 thousand plus', [
      { cj: 'chhedas', metric: 'Engagement' },
      { cj: 'district-batwara-awarapan', metric: 'Instagram Likes' },
      { cj: 'district-batwara-awarapan', metric: 'Instagram Comments' },
      { cj: 'district-batwara-awarapan', metric: 'Engagement' },
    ]),
    label: 'engagements',
    maths: "Chheda's 50K + District IG 12K + District X 3.5K",
  },
  card4,
  {
    num: num(campaigns.length, 0, '', String(campaigns.length), { derived: 'campaigns.length' }),
    label: 'campaigns on show',
    maths: 'this site',
  },
  {
    num: num(4, 0, '', '4', { derived: 'union of platforms across the 8 campaign records' }),
    label: 'platforms — Instagram · Facebook · X · Reddit',
    maths: 'union of platforms in the 8 records',
  },
];
