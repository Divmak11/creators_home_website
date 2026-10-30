import type { Quote } from './types.ts';

// "Overheard at the party" (home §3.1-12 / spec §2.6) — real audience comments, handles dropped.
export const quotes: Quote[] = [
  {
    text: "Chheda's comeback looks solid",
    attribution: "Instagram comment · Chheda's campaign",
    platform: 'instagram',
    src: 'cj:chhedas.quotes[2]',
  },
  {
    text: 'Sunny Deol and Preity Zinta together again feels like a proper throwback moment',
    attribution: 'Reply on X · District × Batwara 1947',
    platform: 'x',
    src: 'cj:district-batwara-awarapan.quotes[1]',
  },
  {
    text: 'The reviews seem pretty mixed, but I still enjoy these kinds of brain-off comedy movies with friends.',
    attribution: 'Reddit reply · Dhamaal 4 thread',
    platform: 'reddit',
    src: 'cj:deck-dhamaal4-reddit.quotes[0]',
  },
];
