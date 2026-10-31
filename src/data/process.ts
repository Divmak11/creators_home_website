export interface ProcessStep {
  n: number;
  title: string;
  text: string;
}

// "How it works" (home §3.1-8).
export const process: ProcessStep[] = [
  { n: 1, title: 'Knock knock', text: 'Share your goal & budget.' },
  { n: 2, title: 'Match', text: 'The right pages & creators, each one priced.' },
  { n: 3, title: 'Create', text: 'We write it, shoot it and post it.' },
  { n: 4, title: 'Blow up', text: 'Tracking & a report per post.' },
];
