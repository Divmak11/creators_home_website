import manifest from './a1-manifest.json';

export type CoverSlug =
  | 'chhedas'
  | 'district-batwara-awarapan'
  | 'fancode-ind-vs-zim'
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
  | 'wall:samsung-galaxy-z-fold8:1'
  | 'sticker:A-01'
  | 'sticker:A-02'
  | 'sticker:A-03'
  | 'sticker:A-04'
  | 'sticker:A-05'
  | 'og-bg';

// Every SlotId maps to a key in `a1-manifest.json` (A1's manifest.slots). Wall keys are
// `wall/<slug>/<stem>`, stem = basename w/o extension of that campaign's wall[n-1].srcRef
// (src/data/campaigns.ts). wall:samsung-galaxy-z-fold8:1 is the one override: its creative is
// shown large as a print on the proof wall, not as a small card cover — parent ruling, A1 note.
const slotKey: Record<SlotId, string> = {
  'cover:chhedas': 'cover/chhedas',
  'cover:district-batwara-awarapan': 'cover/district-batwara-awarapan',
  'cover:fancode-ind-vs-zim': 'cover/fancode-ind-vs-zim',
  'cover:district-odyssey-filter': 'cover/district-odyssey-filter',
  'cover:dhamaal-4-reddit': 'cover/dhamaal-4-reddit',
  'wall:chhedas:1': 'wall/chhedas/p04_i8',
  'wall:chhedas:2': 'wall/chhedas/p04_i9',
  'wall:chhedas:3': 'wall/chhedas/p04_i10',
  'wall:chhedas:4': 'wall/chhedas/p03_i5',
  'wall:chhedas:5': 'wall/chhedas/p05_i11',
  'wall:district-batwara-awarapan:1': 'wall/district-batwara-awarapan/p01_i2',
  'wall:district-batwara-awarapan:2': 'wall/district-batwara-awarapan/p02_i5',
  'wall:district-batwara-awarapan:3': 'wall/district-batwara-awarapan/p07_i8',
  'wall:fancode-ind-vs-zim:1': 'wall/fancode-ind-vs-zim/s06_i5',
  'wall:fancode-ind-vs-zim:2': 'wall/fancode-ind-vs-zim/s06_i4',
  'wall:dhamaal-4-reddit:1': 'wall/dhamaal-4-reddit/s09_i3',
  'wall:samsung-galaxy-z-fold8:1': 'cover/samsung-galaxy-z-fold8',
  'sticker:A-01': 'A-01',
  'sticker:A-02': 'A-02',
  'sticker:A-03': 'A-03',
  'sticker:A-04': 'A-04',
  'sticker:A-05': 'A-05',
  'og-bg': 'A-06',
};

interface ManifestFile {
  path: string;
  format: string;
  width?: number;
  height?: number;
  bytes: number;
}
interface ManifestSlotEntry {
  alt?: string;
  objectPosition?: string;
  lqip?: string;
  files: ManifestFile[];
}
type ManifestSlots = Record<string, ManifestSlotEntry>;

const manifestSlots = (manifest as { slots: ManifestSlots }).slots;

function manifestEntry(key: string): ManifestSlotEntry {
  const entry = manifestSlots[key];
  if (!entry) throw new Error(`assets.ts: a1-manifest.json has no slot "${key}"`);
  return entry;
}

// Build-time validation (BUILD.md §5): every SlotId must resolve to a manifest entry — a
// missing slot is a build error now, not a placeholder.
(Object.keys(slotKey) as SlotId[]).forEach((id) => manifestEntry(slotKey[id]));

export interface SlotSrc {
  src: string;
  w: number;
}
export interface SlotImage {
  avif: SlotSrc[];
  webp: SlotSrc[];
  width: number;
  height: number;
  lqip?: string;
  position?: string;
  alt: string;
}

export function getSlot(id: SlotId): SlotImage {
  const entry = manifestEntry(slotKey[id]);
  const files = entry.files;
  const toSrc = (f: ManifestFile): SlotSrc => ({ src: '/' + f.path, w: f.width ?? 0 });
  const avif = files.filter((f) => f.format === 'avif').map(toSrc);
  const webp = files.filter((f) => f.format === 'webp').map(toSrc);
  const sized = files.filter((f): f is ManifestFile & { width: number; height: number } => f.width != null && f.height != null);
  const largest = sized.reduce((a, b) => (b.width > a.width ? b : a), sized[0]);
  return {
    avif,
    webp,
    width: largest?.width ?? 0,
    height: largest?.height ?? 0,
    lqip: entry.lqip,
    position: entry.objectPosition,
    alt: entry.alt ?? '',
  };
}
