export interface IndustryItem {
  text: string;
  lang?: 'hi' | 'ta' | 'te' | 'bn';
}

// Industries & languages ribbon (home §3.1-11). First six are the campaigns' industries (FMCG added, F-28);
// languages confirmed per spec text but flagged [PLACEHOLDER: confirm languages served] in the spec itself.
export const industries: IndustryItem[] = [
  { text: 'Film & OTT' },
  { text: 'Sports' },
  { text: 'Consumer tech' },
  { text: 'Food & FMCG' },
  { text: 'Celebrities' },
  { text: 'Entertainment apps' },
  { text: 'Music' },
  { text: 'Gaming' },
  { text: 'हिंदी', lang: 'hi' },
  { text: 'English' },
  { text: 'தமிழ்', lang: 'ta' },
  { text: 'తెలుగు', lang: 'te' },
  { text: 'বাংলা', lang: 'bn' },
];
