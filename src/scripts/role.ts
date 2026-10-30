// Role/service URL state + home-page click interception (spec F-08/F-13, BUILD.md §4).
// Imported once from Toggle.astro's script; the click listener installs itself idempotently
// via the module-level `installed` flag, so re-imports never double-bind.
import { motionOn } from './motion/core';

export type Role = 'brand' | 'creator' | 'meme';

function isRole(v: string | null): v is Role {
  return v === 'brand' || v === 'creator' || v === 'meme';
}

export function currentRole(): Role | null {
  const v = new URLSearchParams(location.search).get('role');
  return isRole(v) ? v : null;
}

export function onRole(cb: (role: Role) => void): void {
  document.addEventListener('ch:role', ((e: CustomEvent<Role>) => cb(e.detail)) as EventListener);
  const current = currentRole();
  if (current) cb(current);
}

export function setRole(role: Role): void {
  const params = new URLSearchParams(location.search);
  params.set('role', role);
  const qs = params.toString();
  history.replaceState(null, '', location.pathname + (qs ? `?${qs}` : '') + location.hash);
  document.dispatchEvent(new CustomEvent<Role>('ch:role', { detail: role }));
}

export function currentService(): string | null {
  return new URLSearchParams(location.search).get('service');
}

export function onService(cb: (id: string) => void): void {
  document.addEventListener('ch:service', ((e: CustomEvent<string>) => cb(e.detail)) as EventListener);
  const current = currentService();
  if (current) cb(current);
}

export function setService(id: string): void {
  const params = new URLSearchParams(location.search);
  params.set('service', id);
  const qs = params.toString();
  history.replaceState(null, '', location.pathname + (qs ? `?${qs}` : '') + location.hash);
  document.dispatchEvent(new CustomEvent<string>('ch:service', { detail: id }));
}

// Click interception (F-13): on the home page only, clicks on a[data-role]/a[data-service]
// whose href path is "/" set the URL state instead of navigating, then scroll to the href's
// hash target and move focus to that section's heading.
let installed = false;

function focusHeading(target: Element): void {
  const heading = target.querySelector<HTMLElement>('h2, h1') ?? (target as HTMLElement);
  if (!heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1');
  heading.focus({ preventScroll: true });
}

function handleClick(e: MouseEvent): void {
  if (location.pathname !== '/') return;
  const link = (e.target as Element).closest<HTMLAnchorElement>('a[data-role], a[data-service]');
  if (!link) return;
  const url = new URL(link.href, location.href);
  if (url.pathname !== '/') return;

  e.preventDefault();

  const role = link.dataset.role ?? null;
  if (isRole(role)) setRole(role);
  const service = link.dataset.service;
  if (service) setService(service);

  if (url.hash) {
    const target = document.querySelector(url.hash);
    if (target) {
      target.scrollIntoView({ behavior: motionOn() ? 'smooth' : 'auto' });
      focusHeading(target);
    }
  }
}

export function installRoleClicks(): void {
  if (installed) return;
  installed = true;
  document.addEventListener('click', handleClick);
}

installRoleClicks();
