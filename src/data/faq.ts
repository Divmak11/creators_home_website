export interface FaqItem {
  q: string;
  a: string;
  placeholder?: string;
  hasPlaceholder: boolean;
}

// House rules / FAQ (home §3.1-13). Items 4 and 5 carry the placeholder text separately — the `a` string
// holds a "{ph}" token where the UI should render <Ph text={placeholder} />.
export const faq: FaqItem[] = [
  {
    q: 'What is CreatorsHome?',
    a: 'An influencer, meme-page and Reddit marketing agency. We plan, seed and track campaigns across Instagram, Facebook, X and Reddit — and give creators a home for brand deals.',
    hasPlaceholder: false,
  },
  {
    q: 'How do you pick pages and creators for a brand?',
    a: 'Niche, audience, language, city and past results. You see the costed list and approve it before anything goes live.',
    hasPlaceholder: false,
  },
  {
    q: 'Do you do Reddit?',
    a: 'Yes. We start genuine discussion threads in the right communities instead of posting ads — see our Dhamaal 4 and District campaigns.',
    hasPlaceholder: false,
  },
  {
    q: 'How do creators join?',
    a: "Pick 'Creator' or 'Meme page' in the form below and add your handle. Our team replies within {ph} working days.",
    placeholder: 'X',
    hasPlaceholder: true,
  },
  {
    q: 'What budget do brands need?',
    a: '{ph}',
    placeholder: 'starting budget / pricing model',
    hasPlaceholder: true,
  },
  {
    q: 'Are the numbers on this site real?',
    a: "Yes. Every number comes from our campaign reports — views, reach and engagement as the platforms reported them.",
    hasPlaceholder: false,
  },
];
