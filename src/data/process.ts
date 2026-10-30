export interface ProcessStep {
  n: number;
  title: string;
  text: string;
}

// "How it works" (home §3.1-8).
export const process: ProcessStep[] = [
  { n: 1, title: 'Knock knock', text: 'Share your goal & budget.' },
  { n: 2, title: 'Match', text: 'Pages & creators, costed.' },
  { n: 3, title: 'Create', text: 'Scripts, shoots, posting.' },
  { n: 4, title: 'Blow up', text: 'Tracking & a report per post.' },
];
