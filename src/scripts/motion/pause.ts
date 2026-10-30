// "Pause the party" toggle (spec §5.7, BUILD.md §4). Binds every `[data-pause-toggle]` button:
// sets/removes `html[data-motion="paused"]` + `localStorage['ch-motion']` (try/catch), keeps
// every toggle's `aria-pressed` in sync, swaps visible text on toggles carrying
// `data-label-on`/`data-label-off`, swaps `aria-label` on icon toggles (`data-icon-toggle`),
// and dispatches `ch:motion` so loop-driving modules (marquee) can react. Pausing stops loops
// only — entries already played once are untouched.
export function bindPauseToggles(root: ParentNode = document): void {
  const toggles = Array.from(root.querySelectorAll<HTMLElement>('[data-pause-toggle]'));
  if (!toggles.length) return;

  const isPaused = (): boolean => document.documentElement.dataset.motion === 'paused';

  function syncToggle(el: HTMLElement, paused: boolean): void {
    el.setAttribute('aria-pressed', String(paused));
    const labelOn = el.dataset.labelOn;
    const labelOff = el.dataset.labelOff;
    if (labelOn && labelOff) {
      el.textContent = paused ? labelOff : labelOn;
    }
    if (el.dataset.iconToggle !== undefined) {
      el.setAttribute('aria-label', paused ? 'Resume animations' : 'Pause animations');
    }
  }

  toggles.forEach((el) => syncToggle(el, isPaused()));

  toggles.forEach((el) => {
    el.addEventListener('click', () => {
      const paused = !isPaused();
      if (paused) {
        document.documentElement.dataset.motion = 'paused';
      } else {
        delete document.documentElement.dataset.motion;
      }
      try {
        if (paused) localStorage.setItem('ch-motion', 'paused');
        else localStorage.removeItem('ch-motion');
      } catch (_) {
        // localStorage unavailable (private mode, blocked storage) — in-memory state still works.
      }
      toggles.forEach((t) => syncToggle(t, paused));
      document.dispatchEvent(new CustomEvent('ch:motion', { detail: { paused } }));
    });
  });
}
