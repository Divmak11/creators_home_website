export interface WhyCard {
  icon: 'smiley' | 'house' | 'trend' | 'bolt';
  title: string;
  text: string;
}

// "Why the house wins" (home §3.1-9).
export const why: WhyCard[] = [
  { icon: 'smiley', title: 'Meme-native team', text: 'We speak internet.' },
  { icon: 'house', title: 'Own page network', text: 'Pages on IG and FB, not a rolodex.' },
  { icon: 'trend', title: 'Reach, not vanity', text: 'Every post tracked.' },
  { icon: 'bolt', title: 'Speed to trend', text: 'Brief to live in days.' },
];
