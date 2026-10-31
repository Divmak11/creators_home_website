# Placeholders (B2 CreatorsHome)

Nothing renders a placeholder: each missing fact hides its element until it is filled in. FX1
(Q1 CH-02).

| ID | Fact | Fill in (file:const or file:line) | Hidden until filled (what disappears) |
|---|---|---|---|
| P-01 | Contact email | `src/config.ts:CONTACT.email` | Footer "Say hi" email `<li>`; the ", or email us at …" clause in the contact form's failure banner |
| P-02 | Contact phone/WhatsApp | `src/config.ts:CONTACT.phone` | Footer "Say hi" phone `<li>` |
| P-03 | City | `src/config.ts:CONTACT.city` | Second line of the footer tagline (`<br />City, India`) |
| P-04 | Legal text (privacy & terms) | `src/pages/privacy.astro`, `src/pages/terms.astro` | Every section beyond the fixed factual paragraphs; only those paragraphs plus the "This page is being finalised." line show until the real copy is added |
| P-06 | FAQ 4 — creator reply time (working days) | `src/data/faq.ts:28` (remove the `{ph}` token) | The sentence "Our team replies within X working days." inside the "How do creators join?" answer |
| P-07 | FAQ 5 — starting budget / pricing model | `src/data/faq.ts:34` (remove the `{ph}` token) | The whole "What budget do brands need?" item |
| P-08 | Contact panel reply time | `src/config.ts:REPLY_TIME` | The "Brands & creators — we reply within …" line in the contact panel |
| P-09 | Languages served | `src/config.ts:LANGUAGES_NOTE` | The note under the industries ribbon |
| P-13 | Web3Forms access key | `src/config.ts:WEB3FORMS_ACCESS_KEY` | The form's hidden `access_key` field; without it, submit skips the network request and goes straight to the failure banner |

## Notes
- FAQ answers are split into sentences and any sentence containing the `{ph}` token is dropped
  before rendering; if nothing is left, the whole item is skipped (`src/components/home/Faq.astro`).
  This is why P-06 only hides one sentence but P-07 hides its entire item — in `src/data/faq.ts`,
  item 4's `{ph}` sits inside its own trailing sentence, item 5's answer is only `{ph}`.
- P-05 (Instagram/LinkedIn `sameAs`) has no hidden state: Q3 resolved `IG_FOLLOWERS_CONFIRMED = true`
  and `INSTAGRAM_URL` is set, so it renders for real; `LINKEDIN_URL` is `null` and is simply
  omitted (Footer, `organization()` in `src/lib/seo.ts`) rather than treated as a missing fact.
- `WEB3FORMS_ACCESS_KEY`, `REPLY_TIME` and `LANGUAGES_NOTE` are typed `string | null` in
  `src/config.ts`; every render site guards on the constant (or `CONTACT.*` field) being truthy,
  so a `null` value hides the element instead of printing placeholder text.
