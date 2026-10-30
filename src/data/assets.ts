import type { ImageMetadata } from 'astro';

export type CoverSlug =
  | 'chhedas'
  | 'district-batwara-awarapan'
  | 'fancode-ind-vs-zim'
  | 'samsung-galaxy-z-fold8'
  | 'district-odyssey-filter'
  | 'dhamaal-4-reddit';

export type SlotId =
  | `cover:${CoverSlug}`
  | 'wall:chhedas:1'
  | 'wall:chhedas:2'
  | 'wall:chhedas:3'
  | 'wall:chhedas:4'
  | 'wall:chhedas:5'
  | 'wall:district-batwara-awarapan:1'
  | 'wall:district-batwara-awarapan:2'
  | 'wall:district-batwara-awarapan:3'
  | 'wall:fancode-ind-vs-zim:1'
  | 'wall:fancode-ind-vs-zim:2'
  | 'wall:dhamaal-4-reddit:1'
  | 'sticker:A-01'
  | 'sticker:A-02'
  | 'sticker:A-03'
  | 'sticker:A-04'
  | 'sticker:A-05'
  | 'og-bg';

export const slots: Record<SlotId, ImageMetadata | null> = {
  'cover:chhedas': null,
  'cover:district-batwara-awarapan': null,
  'cover:fancode-ind-vs-zim': null,
  'cover:samsung-galaxy-z-fold8': null,
  'cover:district-odyssey-filter': null,
  'cover:dhamaal-4-reddit': null,
  'wall:chhedas:1': null,
  'wall:chhedas:2': null,
  'wall:chhedas:3': null,
  'wall:chhedas:4': null,
  'wall:chhedas:5': null,
  'wall:district-batwara-awarapan:1': null,
  'wall:district-batwara-awarapan:2': null,
  'wall:district-batwara-awarapan:3': null,
  'wall:fancode-ind-vs-zim:1': null,
  'wall:fancode-ind-vs-zim:2': null,
  'wall:dhamaal-4-reddit:1': null,
  'sticker:A-01': null,
  'sticker:A-02': null,
  'sticker:A-03': null,
  'sticker:A-04': null,
  'sticker:A-05': null,
  'og-bg': null,
};
