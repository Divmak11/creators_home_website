// Count-up numbers (spec §5.5, BUILD.md §4 markup contract):
// <span class="cu-wrap" aria-label="9 million plus reach"><span class="cu" data-to="9"
// data-dec="0" aria-hidden="true">9</span><span class="sfx" aria-hidden="true">M+</span></span>
// HTML always holds the FINAL value; this module only rewrites it to a start value when motion
// is on, and only for `.cu` elements that are off-screen at load (no CLS for ones already visible).
import { gsap, motionOn } from './core';
import { formatNum } from '../../data/format';

export function prepCountUps(root: ParentNode = document): void {
  if (!motionOn()) return;
  const els = root.querySelectorAll<HTMLElement>('.cu');
  for (const el of els) {
    const rect = el.getBoundingClientRect();
    if (rect.top > window.innerHeight) {
      const dec = Number(el.dataset.dec ?? '0');
      const final = (el.textContent ?? '').trim();
      el.dataset.final = final;
      el.style.display = 'inline-block';
      el.style.textAlign = 'right';
      el.style.minWidth = `${rect.width}px`;
      el.textContent = formatNum(0, dec);
    }
  }
}

export function countUp(
  el: HTMLElement,
  { duration = 1.2, delay = 0 }: { duration?: number; delay?: number } = {}
): gsap.core.Tween | undefined {
  const dec = Number(el.dataset.dec ?? '0');
  const to = Number(el.dataset.to ?? '0');
  const final = el.dataset.final ?? el.textContent ?? formatNum(to, dec);

  if (!motionOn() || el.dataset.counted) {
    el.textContent = final;
    return undefined;
  }

  el.dataset.counted = 'true';
  const state = { v: 0 };
  return gsap.to(state, {
    v: to,
    duration,
    delay,
    ease: 'power3.out',
    onUpdate: () => {
      el.textContent = formatNum(state.v, dec);
    },
    onComplete: () => {
      el.textContent = final;
    },
  });
}

prepCountUps();
