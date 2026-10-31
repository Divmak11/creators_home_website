export interface WhyCard {
  icon: 'smiley' | 'house' | 'trend' | 'bolt';
  title: string;
  text: string;
}

// "Why the house wins" (home §3.1-9).
export const why: WhyCard[] = [
  { icon: 'smiley', title: 'Raised on memes', text: 'The house speaks fluent internet.' },
  { icon: 'house', title: 'Own page network', text: 'Pages on IG and FB, not a rolodex.' },
  { icon: 'trend', title: 'Reach you can see', text: 'We track every post we put up.' },
  { icon: 'bolt', title: 'First to the party', text: 'Your brief is live within days.' },
];
