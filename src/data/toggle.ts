export interface TogglePanel {
  heading: string;
  pillWord: string;
  cards: { title: string; text: string }[];
  cta: { label: string; href: string; role: 'brand' | 'creator' };
}

// Brands / Creators toggle (home §3.1-7).
export const toggle: { brands: TogglePanel; creators: TogglePanel } = {
  brands: {
    heading: 'Move into the feed.',
    pillWord: 'feed',
    cards: [
      { title: 'Page network', text: 'Meme & entertainment pages on Instagram and Facebook.' },
      { title: 'Reddit that reads real', text: 'Threads people actually reply to.' },
      { title: 'Reports per post', text: 'Reach and views, tracked.' },
    ],
    cta: { label: 'Start a campaign →', href: '/#contact', role: 'brand' },
  },
  creators: {
    heading: 'Your home for brand deals.',
    pillWord: 'home',
    cards: [
      { title: 'Paid collabs', text: 'Brands that fit your vibe.' },
      { title: 'On-time payouts', text: 'No chasing invoices.' },
      { title: 'Grow with us', text: 'Shoots, meetups, a manager.' },
    ],
    cta: { label: 'Move in — apply →', href: '/#contact', role: 'creator' },
  },
};
