# Placeholders (B2 CreatorsHome)

Rebuilt from `grep -rn "<Ph " src/` and `grep -rn "PLACEHOLDER" src/`. IDs per spec §11.1. JSON-LD
and meta tags omit placeholder fields entirely (no `<Ph>`/`[PLACEHOLDER]` ever lands there — see
U10 check b).

| ID | Where | File:line | Text |
|---|---|---|---|
| P-01 | Footer — email | `src/components/Footer.astro:38` | `email` |
| P-01 | Contact form — error banner email | `src/components/home/Contact.astro:150` | `email` |
| P-02 | Footer — phone | `src/components/Footer.astro:39` | `WhatsApp/phone` |
| P-03 | Footer — city | `src/components/Footer.astro:13` | `city` |
| P-04 | Privacy — Who we are | `src/pages/privacy.astro:15` | `legal text — founder/lawyer` |
| P-04 | Privacy — What we collect | `src/pages/privacy.astro:22` | `legal text — founder/lawyer` |
| P-04 | Privacy — Why | `src/pages/privacy.astro:25` | `legal text — founder/lawyer` |
| P-04 | Privacy — Where it goes | `src/pages/privacy.astro:32` | `legal text — founder/lawyer` |
| P-04 | Privacy — How long we keep it | `src/pages/privacy.astro:35` | `legal text — founder/lawyer` |
| P-04 | Privacy — Your rights (DPDP Act 2023) | `src/pages/privacy.astro:38` | `legal text — founder/lawyer` |
| P-04 | Privacy — Grievance officer | `src/pages/privacy.astro:41` | `legal text — founder/lawyer` |
| P-04 | Privacy — Updates | `src/pages/privacy.astro:44` | `legal text — founder/lawyer` |
| P-04 | Terms — Use of the site | `src/pages/terms.astro:15` | `legal text — founder/lawyer` |
| P-04 | Terms — Campaign results shown | `src/pages/terms.astro:19` | `legal text — founder/lawyer` |
| P-04 | Terms — Third-party content and trademarks | `src/pages/terms.astro:23` | `legal text — founder/lawyer` |
| P-04 | Terms — Contact | `src/pages/terms.astro:26` | `legal text — founder/lawyer` |
| P-06 | FAQ 4 — creator reply time | `src/components/home/Faq.astro:26` | `X` (working days, from `src/data/faq.ts:29`) |
| P-07 | FAQ 5 — starting budget / pricing | `src/components/home/Faq.astro:26` | `starting budget / pricing model` (from `src/data/faq.ts:35`) |
| P-08 | Contact — reply-time line | `src/components/home/Contact.astro:21` | `one working day — confirm` |
| P-09 | Industries ribbon — languages served | `src/components/home/Industries.astro:36` | `confirm languages served` |
| P-13 | Web3Forms access key | `src/config.ts:4` | `[PLACEHOLDER: Web3Forms access key]` |

## Notes
- FAQ items 4 and 5 share one render site (`Faq.astro:26`) because the component loops over
  `faq[]` and renders `<Ph text={item.placeholder} />` per item; the two placeholder strings
  themselves live in `src/data/faq.ts` (lines 29 and 35).
- P-05 (Instagram/LinkedIn `sameAs`) has no `<Ph>`: Q3 resolved `IG_FOLLOWERS_CONFIRMED = true`
  and `INSTAGRAM_URL` is set, so it renders for real; `LINKEDIN_URL` is `null` and is simply
  omitted (Footer, `organization()` in `src/lib/seo.ts`) rather than shown as a placeholder.
- `WEB3FORMS_ACCESS_KEY` is a literal `[PLACEHOLDER: …]` string (BUILD.md §7 ruling), not a
  `<Ph>` component — it is a hidden form field value, never rendered as visible text.
