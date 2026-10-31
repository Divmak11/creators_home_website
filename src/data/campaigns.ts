import type { Campaign, Stat, Num, LeaderRow, Src, Filter } from './types.ts';
import { formatNum } from './format.ts';

function num(value: number, decimals: number, suffix: string, spoken: string, src: Src[] | { derived: string }): Num {
  return { value, decimals, suffix, display: formatNum(value, decimals) + suffix, spoken, src };
}
function stat(label: string, value: number, decimals: number, suffix: string, spoken: string, src: Src[] | { derived: string }): Stat {
  return { num: num(value, decimals, suffix, spoken, src), label };
}
function leader(name: string, platform: LeaderRow['platform'], value: number, decimals: number, suffix: string, spoken: string, src: Src[]): LeaderRow {
  return { name, platform, num: num(value, decimals, suffix, spoken, src) };
}

export const campaigns: Campaign[] = [
  // 1 — Raghav Juyal
  {
    slug: 'raghav-juyal',
    order: 1,
    sourceId: 'deck-raghav-juyal',
    title: 'Raghav Juyal',
    kicker: 'Celebrity · Instagram',
    brand: 'Raghav Juyal',
    filters: ['celebs'],
    platforms: ['instagram'],
    figure: stat('reach', 6, 0, 'M+', '6 million plus', [{ cj: 'deck-raghav-juyal', metric: 'Total Instagram Reach' }]),
    badge: null,
    secondary: 'Rvcj repost: 4.6M views',
    look: { bg: 'orange', tilt: -3 },
    cover: { kind: 'art', art: 'trophy', panel: 'ink' },
    stats: [
      stat('Instagram reach', 6, 0, 'M+', '6 million plus', [{ cj: 'deck-raghav-juyal', metric: 'Total Instagram Reach' }]),
      stat('average reach per post', 100, 0, 'K+', '100 thousand plus', [{ cj: 'deck-raghav-juyal', metric: 'Avg. Reach / Post' }]),
      stat('top pages', 4, 0, '', '4', { derived: 'count of leaderboard pages (Rvcj, AdultSociety, Ghantaa, Log.kya.sochenge)' }),
    ],
    leaderboard: [
      leader('Rvcj', 'instagram', 4.6, 1, 'M', '4.6 million', [{ cj: 'deck-raghav-juyal', metric: 'Rvcj' }]),
      leader('AdultSociety', 'instagram', 1.3, 1, 'M', '1.3 million', [{ cj: 'deck-raghav-juyal', metric: 'AdultSociety' }]),
      leader('Ghantaa', 'instagram', 534, 0, 'K', '534 thousand', [{ cj: 'deck-raghav-juyal', metric: 'Ghantaa' }]),
      leader('Log.kya.sochenge', 'instagram', 468, 0, 'K', '468 thousand', [{ cj: 'deck-raghav-juyal', metric: 'Log.kya.sochenge' }]),
    ],
    platformSplit: null,
    wall: [],
    quotes: [],
    lead: "A focused, Instagram-only push through our highest-traffic viral pages — one of our biggest single-campaign results to date.",
    body: "We placed Raghav Juyal's content on the pages where the scroll is busiest — Rvcj, AdultSociety, Ghantaa and Log.kya.sochenge. Mumbai, Delhi and Bangalore were the top engagement hubs, mirroring our network's core audience.",
    move: [],
    dates: null,
    peek: false,
    seo: {
      title: 'Raghav Juyal: 6M+ Instagram Reach · CreatorsHome',
      description: 'How an Instagram-only push through Rvcj, AdultSociety, Ghantaa and more reached 6M+ people for Raghav Juyal.',
    },
  },
  // 2 — Chheda's
  {
    slug: 'chhedas',
    order: 2,
    sourceId: 'chhedas',
    title: "Chheda's",
    kicker: 'FMCG · Reputation rebuild',
    brand: "Chheda's",
    filters: ['brands'],
    platforms: ['instagram'],
    figure: stat('views', 2, 0, 'M+', '2 million plus', [{ cj: 'chhedas', metric: 'Views' }]),
    badge: null,
    secondary: '50K+ engagements on Instagram',
    look: { bg: 'white', tilt: 2 },
    cover: {
      kind: 'photo',
      slot: 'cover:chhedas',
      position: '50% 70%',
      srcRef: 'chhedas/img/p01_i2.jpg',
      width: 1200,
      height: 1500,
      alt: "Chheda's factory-floor photo with a 'BREAKING: licence reinstated in just 48 hours' news overlay",
    },
    stats: [
      stat('Instagram views', 2, 0, 'M+', '2 million plus', [{ cj: 'chhedas', metric: 'Views' }]),
      stat('engagements', 50, 0, 'K+', '50 thousand plus', [{ cj: 'chhedas', metric: 'Engagement' }]),
      stat('partner pages', 6, 0, '', '6', { derived: 'count of partner pages in talent[] (indianminds, certifiedindian, theindianstuf, Startup Decoding, @MARKETINGMATLAB, Marketing Community)' }),
      stat('views on the top post', 146046, 0, '', '146,046', [{ cj: 'chhedas', metric: 'Views' }]),
    ],
    leaderboard: [
      leader('Startup Decoding', 'instagram', 146046, 0, '', '146,046', [{ cj: 'chhedas', metric: 'Views' }]),
      leader('@MARKETINGMATLAB', 'instagram', 41464, 0, '', '41,464', [{ cj: 'chhedas', metric: 'Views' }]),
      leader('Marketing Community', 'instagram', 20094, 0, '', '20,094', [{ cj: 'chhedas', metric: 'Views' }]),
    ],
    platformSplit: null,
    wall: [
      { slot: 'wall:chhedas:1', kind: 'phone', caption: 'Post insights — Startup Decoding: 146,046 views', alt: 'Instagram post-insights screen showing 146,046 views for the Startup Decoding post.', srcRef: 'chhedas/img/p04_i8.jpg', width: 498, height: 1600 },
      { slot: 'wall:chhedas:2', kind: 'phone', caption: 'Reel insights — @MARKETINGMATLAB: 41,464 views', alt: 'Instagram reel-insights screen showing 41,464 views for the @MARKETINGMATLAB reel.', srcRef: 'chhedas/img/p04_i9.jpg', width: 744, height: 1280 },
      { slot: 'wall:chhedas:3', kind: 'phone', caption: 'Reel insights — Marketing Community: 20,094 views', alt: 'Instagram reel-insights screen showing 20,094 views for the Marketing Community reel.', srcRef: 'chhedas/img/p04_i10.jpg', width: 855, height: 1600 },
      { slot: 'wall:chhedas:4', kind: 'phone', caption: 'On indianminds', alt: "Indianminds Instagram reel announcing Chheda's food licence was reinstated within 48 hours.", srcRef: 'chhedas/img/p03_i5.jpg', width: 883, height: 1600 },
      { slot: 'wall:chhedas:5', kind: 'phone', caption: 'Comments on a partner reel', alt: "Partner reel about Chheda's banana processing, with real audience comments underneath.", srcRef: 'chhedas/img/p05_i11.jpg', width: 914, height: 1600 },
    ],
    quotes: [
      { text: 'This is real commitment to quality', attribution: "Instagram comment · Chheda's campaign", platform: 'instagram', src: 'cj:chhedas.quotes[1]' },
      { text: "Chheda's comeback looks solid", attribution: "Instagram comment · Chheda's campaign", platform: 'instagram', src: 'cj:chhedas.quotes[2]' },
    ],
    lead: "After an FSSAI licence issue, Chheda's needed people to hear the good news as loudly as they'd heard the bad.",
    body: "We seeded reassurance content across six Instagram pages — indianminds, certifiedindian, theindianstuf, Startup Decoding, @MARKETINGMATLAB and Marketing Community — announcing the licence was reinstated within 48 hours, and showing the scale behind the brand. Comment threads turned supportive.",
    move: [],
    dates: null,
    peek: true,
    seo: {
      title: "Chheda's: 2M+ Views After the Licence Scare · CreatorsHome",
      description: "Six Instagram pages, 2M+ views and 50K+ engagements to rebuild trust in Chheda's after its FSSAI licence was reinstated.",
    },
  },
  // 3 — District × Batwara 1947 & Awarapan 2
  {
    slug: 'district-batwara-awarapan',
    order: 3,
    sourceId: 'district-batwara-awarapan',
    title: 'District × Batwara 1947 & Awarapan 2',
    kicker: 'Movie promo · IG · X · Reddit',
    brand: 'District',
    filters: ['film', 'reddit'],
    platforms: ['instagram', 'x', 'reddit'],
    figure: stat('reach on X', 1.4, 1, 'M', '1.4 million', [{ cj: 'district-batwara-awarapan', metric: 'Twitter/X Reach' }]),
    badge: null,
    secondary: 'Trended for 1 hour · 1M+ IG views',
    look: { bg: 'white', tilt: -2 },
    cover: {
      kind: 'photo',
      slot: 'cover:district-batwara-awarapan',
      position: '50% 30%',
      srcRef: 'district-batwara-awarapan/img/p02_i5.jpg',
      width: 590,
      height: 1280,
      alt: 'Awarapan 2 movie poster promo creative carrying the AWARAPAN20 District discount code',
    },
    stats: [
      stat('reach on X', 1.4, 1, 'M', '1.4 million', [{ cj: 'district-batwara-awarapan', metric: 'Twitter/X Reach' }]),
      stat('trending (#BATWARA1947ONDISTRICT)', 1, 0, ' hr', '1 hour', { derived: "Twitter/X Trending duration — text value only (campaigns.json value is null, value_text '1 Hour')" }),
      stat('Instagram views', 1, 0, 'M+', '1 million plus', [{ cj: 'district-batwara-awarapan', metric: 'Instagram Views' }]),
      stat('Reddit views', 100, 0, 'K+', '100 thousand plus', [{ cj: 'district-batwara-awarapan', metric: 'Reddit Views' }]),
    ],
    leaderboard: [],
    platformSplit: {
      cards: [
        {
          platform: 'instagram',
          headline: stat('Instagram views', 1, 0, 'M+', '1 million plus', [{ cj: 'district-batwara-awarapan', metric: 'Instagram Views' }]),
          rows: [
            stat('likes', 10, 0, 'K+', '10 thousand plus', [{ cj: 'district-batwara-awarapan', metric: 'Instagram Likes' }]),
            stat('comments', 2, 0, 'K+', '2 thousand plus', [{ cj: 'district-batwara-awarapan', metric: 'Instagram Comments' }]),
          ],
        },
        {
          platform: 'x',
          headline: stat('reach', 1.4, 1, 'M', '1.4 million', [{ cj: 'district-batwara-awarapan', metric: 'Twitter/X Reach' }]),
          rows: [
            stat('tweets', 1900, 0, '', '1,900', [{ cj: 'district-batwara-awarapan', metric: 'Twitter/X Tweets' }]),
            stat('unique authors', 192, 0, '', '192', [{ cj: 'district-batwara-awarapan', metric: 'Unique Authors' }]),
            stat('engagements', 3.5, 1, 'K', '3.5 thousand', [{ cj: 'district-batwara-awarapan', metric: 'Engagement' }]),
          ],
        },
        {
          platform: 'reddit',
          headline: stat('views across 5 posts', 100, 0, 'K+', '100 thousand plus', [{ cj: 'district-batwara-awarapan', metric: 'Reddit Views' }]),
          rows: [],
        },
      ],
      audience: [
        { label: 'India', pct: 60.8 },
        { label: 'United States', pct: 15.5 },
        { label: 'United Kingdom', pct: 4.0 },
        { label: 'Other', pct: 19.8 },
      ],
    },
    wall: [
      { slot: 'wall:district-batwara-awarapan:1', kind: 'phone', caption: 'Promo-code tweet — 2.4K views', alt: "Tweet promoting District's BATWARA20 code alongside Batwara 1947 and Gadar movie posters.", srcRef: 'district-batwara-awarapan/img/p01_i2.jpg', width: 590, height: 1280 },
      { slot: 'wall:district-batwara-awarapan:2', kind: 'phone', caption: 'Awarapan 2 — 11.8K views', alt: "Tweet promoting District's AWARAPAN20 code with the Awarapan 2 movie poster.", srcRef: 'district-batwara-awarapan/img/p02_i5.jpg', width: 590, height: 1280 },
      { slot: 'wall:district-batwara-awarapan:3', kind: 'phone', caption: '@Shujeel on Batwara 1947 — 2.5K views', alt: 'Tweet about Batwara 1947 referencing Sunny Deol and Preity Zinta, with a reply underneath.', srcRef: 'district-batwara-awarapan/img/p07_i8.jpg', width: 590, height: 1280 },
    ],
    quotes: [
      { text: 'Sunny Deol and Preity Zinta together again feels like a proper throwback moment', attribution: 'Reply on X · District × Batwara 1947', platform: 'x', src: 'cj:district-batwara-awarapan.quotes[1]' },
    ],
    lead: 'We put District inside conversations people were already having about two Hindi releases — Batwara 1947 and Awarapan 2.',
    body: 'Instagram reels and posts drove scale. Seeded tweets carried District promo codes (BATWARA20, AWARAPAN20) and ran under #BATWARA1947ONDISTRICT, which trended for an hour. Reddit posts brought discovery in the right film communities.',
    move: [],
    dates: { label: '13–17 Aug 2026', iso: '2026-08-17' },
    peek: true,
    seo: {
      title: 'District × Batwara 1947 & Awarapan 2 · CreatorsHome',
      description: "1.4M reach on X, an hour trending and 1M+ Instagram views: putting District inside the conversation about two Hindi releases.",
    },
  },
  // 4 — Manu Singh × Interrogation
  {
    slug: 'manu-singh-interrogation',
    order: 4,
    sourceId: 'deck-manu-singh-interrogation',
    title: 'Manu Singh × Interrogation',
    kicker: 'Film launch · Instagram + Facebook',
    brand: 'Manu Singh',
    filters: ['film', 'celebs'],
    platforms: ['instagram', 'facebook'],
    figure: stat('reach', 1.6, 1, 'M', '1.6 million', [{ cj: 'deck-manu-singh-interrogation', metric: 'Total Reach' }]),
    badge: null,
    secondary: '8 pages · 9 days',
    look: { bg: 'ink', tilt: 3 },
    cover: { kind: 'art', art: 'reel', panel: 'white' },
    stats: [
      stat('combined reach (IG + FB)', 1.6, 1, 'M', '1.6 million', [{ cj: 'deck-manu-singh-interrogation', metric: 'Total Reach' }]),
      stat('pages', 8, 0, '', '8', [{ cj: 'deck-manu-singh-interrogation', metric: 'pages' }]),
      stat('days (27 May – 4 Jun 2025)', 9, 0, '', '9', { derived: 'date range 27 May – 4 Jun 2025 (9 days inclusive)' }),
      stat('top cities', 3, 0, '', '3', [{ cj: 'deck-manu-singh-interrogation', metric: 'Cities' }]),
    ],
    leaderboard: [
      leader('Ghantaa', 'instagram', 114, 0, 'K', '114 thousand', [{ cj: 'deck-manu-singh-interrogation', metric: 'Ghantaa' }]),
      leader('trollsculture', 'instagram', 61.4, 1, 'K', '61.4 thousand', [{ cj: 'deck-manu-singh-interrogation', metric: 'trollsculture' }]),
      leader('Cuterelationship', 'instagram', 59, 0, 'K', '59 thousand', [{ cj: 'deck-manu-singh-interrogation', metric: 'Cuterelationship' }]),
      leader('Sarcasmicgag', 'instagram', 55, 0, 'K', '55 thousand', [{ cj: 'deck-manu-singh-interrogation', metric: 'Sarcasmicgag' }]),
      leader('Meme Central (FB)', 'facebook', 28, 0, 'K', '28 thousand', [{ cj: 'deck-manu-singh-interrogation', metric: 'Meme Central (FB)' }]),
      leader('Video Nation (FB)', 'facebook', 27.3, 1, 'K', '27.3 thousand', [{ cj: 'deck-manu-singh-interrogation', metric: 'Video Nation (FB)' }]),
      leader('Confused Aatma (FB)', 'facebook', 24, 0, 'K', '24 thousand', [{ cj: 'deck-manu-singh-interrogation', metric: 'Confused Aatma (FB)' }]),
      leader('The Dear Crush (FB)', 'facebook', 23, 0, 'K', '23 thousand', [{ cj: 'deck-manu-singh-interrogation', metric: 'The Dear Crush (FB)' }]),
    ],
    platformSplit: null,
    wall: [],
    quotes: [],
    lead: 'To introduce new actor Manu Singh alongside the release of Interrogation, we placed native-feeling content across our top Instagram and Facebook viral pages.',
    body: 'Eight pages — four on Instagram, four on Facebook — over nine days, from 27 May to 4 Jun 2025. National reach inside a week, led by Mumbai, Delhi and Bangalore.',
    move: [],
    dates: { label: '27 May – 4 Jun 2025', iso: '2025-06-04' },
    peek: false,
    seo: {
      title: 'Manu Singh × Interrogation: 1.6M Reach · CreatorsHome',
      description: 'Eight Instagram and Facebook pages, nine days, 1.6M combined reach to introduce actor Manu Singh with Interrogation.',
    },
  },
  // 5 — FanCode × IND vs ZIM
  {
    slug: 'fancode-ind-vs-zim',
    order: 5,
    sourceId: 'deck-fancode-ind-zim',
    title: 'FanCode × IND vs ZIM',
    kicker: 'Sports OTT · Instagram',
    brand: 'FanCode',
    filters: ['brands'],
    platforms: ['instagram'],
    figure: null,
    badge: 'Same-day',
    secondary: 'Live match-moment creatives',
    look: { bg: 'ink', tilt: 2 },
    cover: {
      kind: 'photo',
      slot: 'cover:fancode-ind-vs-zim',
      position: '50% 60%',
      srcRef: 'creatorshome-deck/media/s06_i5.jpg',
      width: 1080,
      height: 1230,
      alt: "FanCode creative congratulating Shreyas Iyer on India's first win as captain, with the live score",
    },
    stats: [],
    leaderboard: [],
    platformSplit: null,
    wall: [
      { slot: 'wall:fancode-ind-vs-zim:1', kind: 'print', caption: "Match-day post: India's win, the morning after", alt: "FanCode creative congratulating Shreyas Iyer on India's first win as captain, with the live score.", srcRef: 'creatorshome-deck/media/s06_i5.jpg', width: 1080, height: 1230 },
      { slot: 'wall:fancode-ind-vs-zim:2', kind: 'print', caption: "The pass offer: 'Ye deal toh mujhe pasand hai'", alt: 'FanCode ad creative offering a ₹35 three-match IND vs ZIM pass.', srcRef: 'creatorshome-deck/media/s06_i4.jpg', width: 1080, height: 1338 },
    ],
    quotes: [],
    lead: "Celebrity-style endorsement creative plus real-time match posts, to drive FanCode pass sign-ups during India's tour of Zimbabwe.",
    body: "We paired celebrity-style endorsement creative — 'Ye deal toh mujhe pasand hai' — with real-time match posts, including Shreyas Iyer's first win as captain, and distributed them through our Instagram viral-page network for same-day visibility.",
    move: [
      { title: 'Same-day', text: 'Coordinated, same-day publishing across our Instagram page network.' },
      { title: 'Live moments', text: "Shreyas Iyer's first win as captain, posted the morning after." },
      { title: 'One clear offer', text: "The ₹35 pass, front and centre: 'Ye deal toh mujhe pasand hai'." },
    ],
    dates: null,
    peek: true,
    seo: {
      title: 'FanCode × IND vs ZIM: Same-Day Match Posts · CreatorsHome',
      description: "Endorsement creative and live match-moment posts to drive FanCode pass sign-ups during India's tour of Zimbabwe.",
    },
  },
  // 6 — Samsung Galaxy Z Fold8
  {
    slug: 'samsung-galaxy-z-fold8',
    order: 6,
    sourceId: 'deck-samsung-z-fold8',
    title: 'Samsung Galaxy Z Fold8',
    kicker: 'Consumer tech · Creator seeding',
    brand: 'Samsung',
    filters: ['brands'],
    platforms: ['instagram'],
    figure: null,
    badge: 'Pre-order hype',
    secondary: 'Launch creative through Instagram creators',
    look: { bg: 'white', tilt: -2 },
    cover: { kind: 'art', art: 'phone', panel: 'orange' },
    stats: [],
    leaderboard: [],
    platformSplit: null,
    wall: [
      { slot: 'wall:samsung-galaxy-z-fold8:1', kind: 'print', caption: 'The pre-order creative', alt: 'Samsung Galaxy Z Fold8 pre-order creative', srcRef: 'creatorshome-deck/media/s08_i4.jpg', width: 1080, height: 705 },
    ],
    quotes: [],
    lead: 'Beyond entertainment, we run creator-led launches for consumer tech.',
    body: 'We seeded pre-order and EMI-offer creative for the Galaxy Z Fold8 through curated Instagram creators, adapting the launch creative for Instagram-native storytelling with pricing and EMI details positioned clearly ahead of launch day.',
    move: [
      { title: 'Creator seeding', text: 'Pre-order creative through curated Instagram creators.' },
      { title: 'Native storytelling', text: 'Launch creative adapted for how Instagram actually reads.' },
      { title: 'Clear offer', text: 'Pricing and EMI details up front, to drive pre-order intent before launch day.' },
    ],
    dates: null,
    peek: false,
    seo: {
      title: 'Samsung Galaxy Z Fold8 Pre-Order Hype · CreatorsHome',
      description: 'Creator-seeded pre-order and EMI creative for the Galaxy Z Fold8 on Instagram.',
    },
  },
  // 7 — District × The Odyssey
  {
    slug: 'district-odyssey-filter',
    order: 7,
    sourceId: 'deck-district-odyssey-filter',
    title: 'District × The Odyssey',
    kicker: 'Trend-jack · Instagram',
    brand: 'District',
    filters: ['film'],
    platforms: ['instagram'],
    figure: null,
    badge: 'Trend-jack',
    secondary: 'An AI filter riding a global film moment',
    look: { bg: 'orange', tilt: 3 },
    cover: {
      kind: 'photo',
      slot: 'cover:district-odyssey-filter',
      position: '65% 40%',
      srcRef: 'creatorshome-deck/media/s07_i1.jpg',
      width: 1080,
      height: 1065,
      alt: "AI 'cracked marble bust' filter creative for District, styled after The Odyssey",
    },
    stats: [],
    leaderboard: [],
    platformSplit: null,
    wall: [],
    quotes: [],
    lead: "When Christopher Nolan's The Odyssey became a global talking point, we trend-jacked the moment for District Movies.",
    body: 'We built AI-filter creative around Shah Rukh Khan fan excitement, timed to the global buzz around The Odyssey, and positioned District Movies as the source of a shareable filter trend across our Instagram viral-page network.',
    move: [
      { title: 'Right moment', text: 'Timed to a live global film moment.' },
      { title: 'Fan fuel', text: 'AI-filter creative built around Shah Rukh Khan fan excitement.' },
      { title: 'Shareable', text: 'District Movies as the source of the filter trend, spread through our page network.' },
    ],
    dates: null,
    peek: false,
    seo: {
      title: 'District × The Odyssey: AI Filter Trend-Jack · CreatorsHome',
      description: "How District Movies rode the global buzz around Christopher Nolan's The Odyssey with an AI-filter moment.",
    },
  },
  // 8 — Dhamaal 4
  {
    slug: 'dhamaal-4-reddit',
    order: 8,
    sourceId: 'deck-dhamaal4-reddit',
    title: 'Dhamaal 4',
    kicker: 'Movie promo · Reddit',
    brand: 'Dhamaal 4',
    filters: ['film', 'reddit'],
    platforms: ['reddit'],
    figure: null,
    badge: 'Real threads',
    secondary: 'Fan discussion on r/Bollywood_Cave',
    look: { bg: 'white', tilt: -1 },
    cover: {
      kind: 'photo',
      slot: 'cover:dhamaal-4-reddit',
      position: '50% 40%',
      srcRef: 'creatorshome-deck/media/s09_i3.jpg',
      width: 949,
      height: 1600,
      alt: 'Dhamaal 4 poster crop from the r/Bollywood_Cave Reddit thread',
    },
    stats: [],
    leaderboard: [],
    platformSplit: null,
    wall: [
      { slot: 'wall:dhamaal-4-reddit:1', kind: 'phone', caption: 'The thread on r/Bollywood_Cave', alt: "Screenshot of the r/Bollywood_Cave Reddit post 'Has anyone watched Dhamaal 4 yet?' with a reply.", srcRef: 'creatorshome-deck/media/s09_i3.jpg', width: 949, height: 1600 },
    ],
    quotes: [
      { text: 'The reviews seem pretty mixed, but I still enjoy these kinds of brain-off comedy movies with friends.', attribution: 'Reddit reply · Dhamaal 4 thread', platform: 'reddit', src: 'cj:deck-dhamaal4-reddit.quotes[0]' },
    ],
    lead: "For Dhamaal 4's release we started real discussion threads, not an obvious ad.",
    body: "We started a genuine-feeling discussion thread on r/Bollywood_Cave — 'Has anyone watched Dhamaal 4 yet?' — reading like a real fan question, to spark organic debate and word of mouth ahead of release.",
    move: [
      { title: 'Reads like a fan', text: "'Has anyone watched Dhamaal 4 yet?' on r/Bollywood_Cave." },
      { title: 'Real replies', text: 'Opinions, debate and recommendations from the community.' },
      { title: 'Word of mouth', text: 'Buzz built organically around release.' },
    ],
    dates: null,
    peek: false,
    seo: {
      title: 'Dhamaal 4: Organic Reddit Buzz · CreatorsHome',
      description: 'Real discussion threads on r/Bollywood_Cave instead of an ad, to build word of mouth for Dhamaal 4.',
    },
  },
];

export function getCampaign(slug: string): Campaign | undefined {
  return campaigns.find((c) => c.slug === slug);
}

export function nextCampaign(slug: string): Campaign {
  const i = campaigns.findIndex((c) => c.slug === slug);
  const next = campaigns[(i + 1) % campaigns.length];
  if (!next) throw new Error(`nextCampaign: no campaigns loaded (slug "${slug}")`);
  return next;
}

export const FILTERS: { id: 'all' | Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'film', label: 'Film & OTT' },
  { id: 'brands', label: 'Brands' },
  { id: 'celebs', label: 'Celebs' },
  { id: 'reddit', label: 'Reddit' },
];

export function filterCount(id: 'all' | Filter): number {
  if (id === 'all') return campaigns.length;
  return campaigns.filter((c) => c.filters.includes(id)).length;
}
