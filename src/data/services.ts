export interface Service {
  id: string;
  name: string;
  text: string;
  seenIn: string[];
}

// "Pick your room" (home §3.1-10 / spec §2.7) — 9 chips.
export const services: Service[] = [
  {
    id: 'influencer-marketing',
    name: 'Influencer marketing',
    text: 'Creator casting & scripted activations across macro, mid and nano tiers.',
    seenIn: ['samsung-galaxy-z-fold8', 'raghav-juyal'],
  },
  {
    id: 'reddit-marketing',
    name: 'Reddit marketing',
    text: 'Authentic, community-native posts that spark real discussion threads.',
    seenIn: ['dhamaal-4-reddit', 'district-batwara-awarapan'],
  },
  {
    id: 'instagram-page-network',
    name: 'Instagram page network',
    text: 'Curated meme & entertainment pages that push content to millions.',
    seenIn: ['raghav-juyal', 'chhedas'],
  },
  {
    id: 'facebook-page-network',
    name: 'Facebook page network',
    text: 'A parallel FB page network for reach beyond Instagram.',
    seenIn: ['manu-singh-interrogation'],
  },
  {
    id: 'meme-marketing',
    name: 'Meme marketing',
    text: 'Native-feeling memes and reels placed where the scroll already is.',
    seenIn: ['manu-singh-interrogation', 'fancode-ind-vs-zim'],
  },
  {
    id: 'trend-jacking',
    name: 'Trend-jacking',
    text: 'We catch the moment the internet is already talking about — and put your brand in it.',
    seenIn: ['district-odyssey-filter', 'fancode-ind-vs-zim'],
  },
  {
    id: 'reputation-management',
    name: 'Reputation management',
    text: 'When the news turns, we put the reassurance where people are reading.',
    seenIn: ['chhedas'],
  },
  {
    id: 'content-scripts',
    name: 'Content & scripts',
    text: 'Carousels, reels, captions and influencer scripts built to convert.',
    seenIn: ['fancode-ind-vs-zim', 'chhedas'],
  },
  {
    id: 'reporting-analytics',
    name: 'Reporting & analytics',
    text: 'Reach and views tracked per post, with regional breakdowns.',
    seenIn: ['district-batwara-awarapan', 'chhedas'],
  },
];
