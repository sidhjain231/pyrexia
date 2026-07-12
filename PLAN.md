# PYREXIA 2026 — Website Master Plan

> Annual fest of AIIMS Rishikesh · Target launch: **Aug/Sep 2026** (fest: October)
> Stack: **Next.js + Vercel + Supabase + Razorpay** · Traffic target: 50k+ visitors without breaking a sweat

---

## 1. The Concept — "Feel the Fever"

Pyrexia literally means *fever* — and it's a medical college's fest. That's a design gift.
The entire visual language of the site is built around **fever, pulse, and heat**:

- **ECG/heartbeat line** as the signature motif — it draws itself across section
  dividers as you scroll, spikes on hover, and flatlines-then-spikes as the preloader.
- **Dark, concert-first aesthetic** — the photos we have (pro-night stage shots with
  confetti, flames, green/amber lighting) become full-bleed cinematic backdrops.
- **Thermal accent palette** on near-black: fever amber/orange + electric green
  (pulled straight from the stage-lighting photos), with white-hot highlights.
- **Typography**: one loud condensed display face for headlines (big, uppercase,
  tightly tracked — festival poster energy) + a clean grotesk for body text.

### Motion & interaction language (the "modern site" checklist)
| Element | Treatment |
|---|---|
| Preloader | ECG flatline → heartbeat spike → "PYREXIA" reveal (1.5s max, once per session) |
| Hero | Full-viewport stage photo, slow Ken Burns zoom, animated countdown to fest, temperature ticker "98.6°F and rising…" |
| Scroll | Lenis smooth scrolling + GSAP ScrollTrigger scenes; CSS `animation-timeline` for lightweight bits |
| Section reveals | Clip-path wipes, staggered text-line reveals (SplitText style) |
| Events showcase | Horizontally-pinned scroll gallery of the 10 event clusters — each a full-bleed card |
| Cards/hover | Magnetic hover, image parallax inside cards, ECG spike underline on links |
| Star Nights (Auriga) | Teaser mode: silhouetted artist + "Diagnosis pending…" reveal countdown; flips to artist showcase when lineup drops |
| Page transitions | Framer Motion route transitions (fade-through with thermal flash) |
| Micro-delights | Cursor glow on dark sections, marquee strips ("8–12 OCT ✦ AIIMS RISHIKESH ✦"), confetti burst on successful registration |

### Mobile-first is the design, not an adaptation
Most participants will only ever see this site on a phone — so **every screen is
designed at ~390px first** and then scaled up to desktop, never the other way around.
What that means in practice:

- **Portrait art direction**: hero and section images get dedicated portrait crops
  (`<picture>`/art-directed `next/image`) — no awkward center-cropped landscape shots
- **Touch-first interactions**: nothing essential hides behind hover; magnetic/cursor
  effects are desktop garnish, tap states and swipe gestures are the real interface
- **Thumb-zone UX**: bottom-anchored nav/actions on mobile, a persistent
  "Get your Delegate Card" sticky CTA, bottom-sheets instead of modals
- **Horizontal event showcase** becomes a native swipe carousel with snap points on
  touch (scroll-pinning is a desktop-only enhancement)
- **Motion tuned for phone GPUs**: shorter distances, fewer simultaneous layers,
  no heavy blur/filters; 60fps on a mid-range Android is the benchmark, not an iPhone
- **Real-device reviews**: every phase review happens on actual phones over 4G,
  not in a desktop browser's device emulator

**Performance guardrails** (non-negotiable): motion must never cost usability —
`prefers-reduced-motion` respected, LCP < 2.5s on 4G, images via `next/image`
(AVIF/WebP, responsive sizes), animations GPU-composited only (transform/opacity).

---

## 2. Architecture — why 50k users won't break it

```
Visitors ──► Vercel Edge CDN (static/ISR pages — 99% of all traffic)
                 │
                 ├─► /api/* (serverless functions — only for auth'd actions)
                 │        ├─► Supabase Postgres (registrations, events, teams)
                 │        └─► Razorpay (order create / verify)
                 │
Razorpay ──webhook──► /api/razorpay/webhook (signature-verified, idempotent)
                 │
Emails (delegate card + QR) ──► Resend
```

**The scaling insight:** browsing traffic (hero, events, gallery, FAQs) never touches
a server — every public page is statically generated and served from Vercel's global
CDN, which shrugs at millions of requests. The *only* dynamic paths are login,
registration, and payment — and 50k visitors over a season translates to at most a
few thousand DB writes on peak days. Supabase's pooled Postgres handles that easily.

| Concern | Answer |
|---|---|
| Traffic spike (lineup reveal) | Static pages on CDN — effectively infinite read capacity |
| Registration burst | Serverless functions auto-scale; DB writes are tiny; rate-limit per-IP on API routes |
| Payment integrity | Razorpay webhook (HMAC-verified) is the source of truth, not the client redirect; idempotency keys prevent double-crediting |
| Abuse/bots | Cloudflare Turnstile on forms, rate limits, RLS on every table |
| Images | Optimized + CDN-cached via `next/image`; originals in Supabase Storage |
| Observability | Sentry (errors) + Vercel Analytics + Supabase logs |
| Cost | Free tiers cover build + early traffic; ~₹2–4k/month total during Sep–Oct peak if we upgrade Vercel/Supabase — sponsor-budget noise |

**Data model (core tables):**
`profiles` (auth) · `delegate_cards` (payment status, QR token) · `payments`
(Razorpay order/payment ids, webhook log) · `events` (cluster, rules, limits) ·
`event_registrations` (user ↔ event) · `teams` + `team_members` (captain + roster)
· `admins` (role-based access). All behind Supabase Row-Level Security.

**Registration flow:**
1. Sign in (Google or email OTP — zero password friction)
2. Buy delegate card → Razorpay Checkout → webhook confirms → QR delegate card
   issued + emailed
3. Delegate-card holders register free for any events; team events: captain creates
   team → shares invite code → members (who each hold delegate cards) join roster

---

## 3. Site Map

| Page | Contents |
|---|---|
| **Home** | Preloader, hero + countdown, about teaser, event-cluster showcase, star-night teaser, gallery strip, sponsors, footer |
| **Events** | 10 clusters — Fahrenheit (opening), Chorea (dance), Thespians (theatre), Sinfonia (music), Chronos (Mr & Ms Pyrexia), Velocity (sports), Littmania (literary), Kalakriti (fine arts), Alfresco (informals), Thunderbolt (e-gaming), Auriga (star nights) |
| **Event detail** | Description, rules, date/venue, coordinator contacts, team size, "Register" CTA |
| **Star Nights** | Auriga — teaser mode → artist reveal mode; past lineups (Sonu Nigam, Amit Mishra, Nikita Gandhi…) |
| **Register** | Delegate card purchase flow (Razorpay) |
| **My Pyrexia** | User dashboard: delegate card + QR, my events, my teams |
| **About** | Pyrexia story, AIIMS Rishikesh, visiting Rishikesh (travel FAQ content from brochure) |
| **Gallery** | Masonry grid of past editions, lightbox |
| **Team** | ARSWA office bearers + organizing teams |
| **FAQs** | From brochure + registration/payment questions |
| **Admin** (`/admin`) | Locked area — see Phase 4 |

---

## 4. Build Phases

### Phase 0 — Foundation (Days 1–3)
- `git init`, Next.js 15 (App Router, TypeScript, Tailwind), deploy pipeline to
  Vercel from day one (every push = preview URL the team can review on phones)
- Design tokens: palette, type scale, spacing; fonts self-hosted
- Motion primitives: Lenis provider, GSAP setup, reveal/stagger utilities, ECG SVG component
- Asset pipeline: optimize the 9 photos we have; **request more from the team** (see §6)
- ✅ *Exit: skeleton site live on a vercel.app preview URL*

### Phase 1 — The Public Site (Weeks 1–2) ← the "wow" phase
- Home page with full motion treatment (preloader, hero, countdown, pinned event showcase, marquees, gallery strip)
- Events cluster pages + event detail pages (content from 2025 brochure as placeholder, structured as data files so swapping in 2026 content is trivial)
- Star Nights teaser mode, About, Team, FAQs, Gallery
- Built at 390px first, then scaled up to tablet/desktop; reduced-motion support
- ✅ *Exit: complete, gorgeous, content-ready public site — reviewed on real phones and shareable with the ARSWA team for feedback iteration*

### Phase 2 — Registration & Payments (Weeks 3–4)
- Supabase auth (Google + email OTP), profile completion (name, college, phone)
- Delegate card: Razorpay order API → Checkout → **webhook verification** → card issued
- QR delegate card (signed token) rendered in My Pyrexia + emailed via Resend
- Event sign-ups (solo) + team flow (captain creates team, invite-code roster)
- Edge cases: payment pending/failed states, retry, duplicate prevention, refund flags
- **Test mode end-to-end first**; go-live needs the team's Razorpay KYC (see §6)
- ✅ *Exit: a stranger can pay in test mode and receive a QR delegate card by email*

### Phase 3 — Admin Dashboard (Week 5)
- Role-gated `/admin`: registrant table (search/filter by college, event, payment status)
- Live stats: registrations/day, revenue, per-event counts
- CSV/Excel export per event (what coordinators actually need)
- Payment reconciliation view (webhook log vs. Razorpay dashboard)
- QR check-in: camera-based scanner page for gate volunteers, marks attendance
- ✅ *Exit: registrations team runs the fest without ever asking us for data*

### Phase 4 — Hardening & Launch (Week 6)
- Load test the registration path (k6: simulate registration-opening burst)
- Security pass: webhook signature tests, RLS audit, rate limits, Turnstile
- Performance pass: Lighthouse ≥ 90 mobile, LCP/CLS tuning, font subsetting
- SEO/social: OG cards per page (shareable event cards!), sitemap, structured data
- Sentry + analytics wired, DB backup policy, launch runbook ("what to do if X breaks on fest day")
- Domain: point **pyrexiaaiims.in** (currently dead — must be renewed, see §6) at Vercel
- ✅ *Exit: public launch* 🚀

### Post-launch (fest-season iterations)
- Star lineup reveal (flip Auriga to reveal mode — the traffic-spike day)
- Live day-of schedule page, announcements/results
- Content updates as events/rules firm up

---

## 5. Tech Stack (locked)

| Layer | Choice |
|---|---|
| Framework | Next.js 15, TypeScript, App Router |
| Styling | Tailwind CSS v4 + design tokens |
| Motion | GSAP + ScrollTrigger, Lenis, Framer Motion (route/UI transitions) |
| DB/Auth/Storage | Supabase (Postgres + RLS, Google/OTP auth, image storage) |
| Payments | Razorpay Checkout + Orders API + Webhooks |
| Email | Resend (delegate card + confirmations) |
| Hosting | Vercel (CDN, serverless, preview deploys) |
| Monitoring | Sentry + Vercel Analytics |
| Bot protection | Cloudflare Turnstile |

---

## 6. What we need from the Pyrexia team (blockers to flag early)

1. **Domain** — `pyrexiaaiims.in` no longer resolves. Renew it (or register the 2026
   domain) ASAP; DNS access needed by Phase 4.
2. **Razorpay account** — live keys require business KYC (institute/society account).
   Start this in parallel; it can take weeks. We build in test mode meanwhile.
3. **Delegate card pricing** — amount(s), and whether AIIMS-internal students differ
   from external delegates.
4. **2026 content as it firms up** — dates, event list changes, coordinator contacts,
   star lineup (whenever it's announced).
5. **Assets** — logo as SVG/high-res PNG, ~30–50 more high-res photos from past
   editions (varied: crowd, sports, art, informals), sponsor logos.
6. **Email sending domain** — e.g. `noreply@pyrexiaaiims.in` once domain is live.

---

## 7. How we'll work

- **Plan → iterate → build phase → review → next phase.** Every phase ends with a
  live preview URL; you and the team review on real phones, we iterate, then advance.
- Content lives in structured data files (later: DB) so brochure→2026 swaps never
  require touching design code.
- Version control from day 0; `main` auto-deploys to the preview domain.
