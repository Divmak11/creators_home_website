// Seamless marquee (spec §5.6).
//
// Markup contract (server-rendered):
// <div class="mq" data-speed="60" data-dir="left|right" data-coupling aria-hidden="true">
//   <div class="mq-track loop">
//     <div class="mq-set">…items incl. trailing separator…</div> × 4
//   </div>
// </div>
// No-JS fallback: 4 copies, CSS `--shift: -25%` (= exactly one set of four).
import { gsap, ScrollTrigger, motionOn, isPaused } from './core';

function debounce(fn: () => void, ms: number): () => void {
  let timer: ReturnType<typeof setTimeout>;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, ms);
  };
}

export function buildMarquee(mq: HTMLElement): void {
  const track = mq.querySelector<HTMLElement>('.mq-track');
  if (!track) return;
  const firstSet = track.querySelector<HTMLElement>('.mq-set');
  if (!firstSet) return;
  // computed width keeps the fractional layout px (offsetWidth rounds, which shows at the seam)
  const setW = parseFloat(getComputedStyle(firstSet).width);
  if (!setW) return;

  const speed = Number(mq.dataset.speed ?? '60');
  const n = Math.ceil((window.innerWidth + 240) / setW) + 1;
  const sets = Array.from(track.querySelectorAll<HTMLElement>('.mq-set'));

  while (sets.length < n) {
    const clone = sets[0].cloneNode(true) as HTMLElement;
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
    sets.push(clone);
  }
  while (sets.length > n) {
    sets.pop()?.remove();
  }

  track.style.setProperty('--shift', `-${setW}px`);
  track.style.setProperty('--dur', `${setW / speed}s`);
}

function bindCoupling(mq: HTMLElement): void {
  const track = mq.querySelector<HTMLElement>('.mq-track');
  if (!track || mq.dataset.coupling === undefined || !motionOn()) return;

  const state = { rate: 1 };
  const anim = track.getAnimations()[0];
  const apply = () => {
    if (isPaused()) return;
    anim?.updatePlaybackRate(state.rate);
  };

  ScrollTrigger.create({
    onUpdate(self) {
      const t = 1 + Math.min(Math.abs(self.getVelocity()) / 1500, 1.5);
      state.rate = Math.max(state.rate, t);
      apply();
      gsap.to(state, { rate: 1, duration: 0.6, ease: 'power1.out', overwrite: true, onUpdate: apply });
    },
  });

  document.addEventListener('ch:motion', ((e: CustomEvent<{ paused: boolean }>) => {
    if (e.detail.paused) {
      gsap.killTweensOf(state);
      state.rate = 1;
    }
  }) as EventListener);
}

export function initMarquees(root: ParentNode = document): void {
  const mqs = Array.from(root.querySelectorAll<HTMLElement>('.mq'));
  if (!mqs.length) return;

  mqs.forEach((mq) => {
    buildMarquee(mq);
    bindCoupling(mq);
  });

  let lastWidth = window.innerWidth;
  window.addEventListener(
    'resize',
    debounce(() => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      mqs.forEach((mq) => buildMarquee(mq));
    }, 150)
  );
}
