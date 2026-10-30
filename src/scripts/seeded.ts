// Deterministic PRNG (M-13 chip tumble, BUILD.md §4 "no two sections share a motion" doesn't
// forbid determinism within one). `mulberry32` is a tiny, fast, seeded generator; `makeRand`
// wraps it into a `rand(min, max)` helper so the same seed always produces the same sequence
// across reloads and resizes.
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function (): number {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function makeRand(seed: number): (min: number, max: number) => number {
  const next = mulberry32(seed);
  return (min: number, max: number): number => min + next() * (max - min);
}
