// GSAP core setup (spec §5.1, BUILD.md §4). Registers plugins + named CustomEase easings and
// exposes the entry contract every section script builds on.
//
// Entry contract: an element awaiting entry carries `data-m="<id>"`. Its hidden CSS state is
// written ONLY as `html.js-motion [data-m="<id>"]:not(.is-in) { … }` (never bare opacity:0).
// `onEnter(el, fn)` fires `fn` once the element crosses the trigger, then adds `.is-in` to the
// SAME element right after `fn` returns — so the CSS hidden state and the GSAP from-state swap
// in the same frame. Build every `fn`'s tweens with `gsap.fromTo` / timelines (immediateRender
// sets the from-state synchronously, matching the CSS hidden state exactly), and every tween
// must end with `clearProps` for whatever it set.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(ScrollTrigger, Flip, SplitText, CustomEase);

CustomEase.create('ch-smooth', '.2,.7,.2,1');
CustomEase.create('ch-spring', '.34,1.56,.64,1');
CustomEase.create('ch-out', '.16,1,.3,1');
CustomEase.create('ch-rot', '.7,0,.3,1');

export { gsap, ScrollTrigger, Flip, SplitText };
export const EASE_SMOOTH = 'ch-smooth';
export const EASE_SPRING = 'ch-spring';
export const EASE_OUT = 'ch-out';
export const EASE_ROT = 'ch-rot';

export const motionOn = (): boolean => document.documentElement.classList.contains('js-motion');
export const isPaused = (): boolean => document.documentElement.dataset.motion === 'paused';

export function onEnter(el: Element, fn: () => void, start = 'top 85%'): void {
  if (!motionOn()) return;
  ScrollTrigger.create({
    trigger: el,
    start,
    once: true,
    onEnter: () => {
      if (motionOn()) fn();
      el.classList.add('is-in');
    },
  });
}

export function ready(): void {
  (window as unknown as { __chReady: boolean }).__chReady = true;
}

// Loop watcher: pauses every `.loop` element when it scrolls off-screen or the tab is hidden
// (CSS does the actual pausing via `.is-off` / `html.tab-hidden`, see global.css).
export function watchLoops(root: ParentNode = document): void {
  const loops = root.querySelectorAll<Element>('.loop');
  if (!loops.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        entry.target.classList.toggle('is-off', !entry.isIntersecting);
      }
    },
    { rootMargin: '100px' }
  );
  loops.forEach((el) => io.observe(el));
}

document.addEventListener('visibilitychange', () => {
  document.documentElement.classList.toggle('tab-hidden', document.hidden);
});

document.fonts.ready.then(() => ScrollTrigger.refresh());

// If the safety timer (Base.astro head script) already stripped `js-motion` before this module
// ran, `motionOn()` correctly reports false and nothing animates. Never re-add the class here.
ready();
