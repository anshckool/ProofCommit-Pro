# ProofCommit Pro — Frontend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a React 18 + Vite + Tailwind CSS single-page dashboard for ProofCommit Pro that connects to a FastAPI backend at `http://localhost:8000`, falls back to a client-side ML simulation when the backend is unreachable, and integrates Razorpay Standard Checkout for a ₹299 certificate purchase flow.

**Architecture:** A single-page React app with two panels (left: code editor + controls, right: results). All API calls include a client-side fallback engine (`generateFallbackReview`) that runs a deterministic pseudo-ML simulation so the Vercel demo works standalone. Razorpay is loaded via `<script>` in `index.html`; the checkout modal is opened via `new window.Razorpay(options).open()`.

**Tech Stack:** React 18, Vite 5, Tailwind CSS 3, lucide-react, Razorpay Standard Checkout JS

**Spec:** `docs/superpowers/specs/2026-11-05-proofcommit-pro-design.md`

## Global Constraints

- React 18 + Vite only — NO Next.js, NO React Router
- Tailwind CSS v3 — slate-950/slate-900 surfaces, indigo/blue/amber accents
- lucide-react for all icons
- Razorpay Standard Checkout via `https://checkout.razorpay.com/v1/checkout.js`
- Backend API at `http://localhost:8000` with 8-second timeout then client-side fallback
- Amount exactly ₹299 (29900 paise)
- Neural Storm 2026 · Track 1 · FT-05 · Sponsor: 9AM by TechMojo
- Vercel SPA deployment via `vercel.json` with `rewrites` for client-side routing
- Zero console errors in Chrome DevTools

## Review Focus

1. Fallback engine never throws — if `generateFallbackReview` itself errors (bad input), the UI must show an error message, not a blank screen
2. Razorpay `ondismiss` correctly clears the loading spinner even when user closes the modal without paying
3. Certificate modal is fully printable — `window.print()` only shows cert, all other DOM nodes are `display:none` via `@media print`
4. `npm run build` succeeds with zero Vite errors — no missing imports, no undefined component references
5. Mobile responsiveness — single-column layout on < 1024px viewport, no overflow/horizontal scroll

---

## Task 1: Project Scaffold (package.json, vite.config.js, tailwind.config.js, postcss.config.js, index.html, vercel.json)

**Files:**
- Create: `frontend/package.json`
- Create: `frontend/vite.config.js`
- Create: `frontend/tailwind.config.js`
- Create: `frontend/postcss.config.js`
- Create: `frontend/index.html`
- Create: `frontend/vercel.json`

**Interfaces:**
- Produces: npm scripts `dev` (port 5173), `build` (outDir `dist`), `preview`
- Produces: Tailwind content glob `./src/**/*.{js,ts,jsx,tsx}`
- Produces: Vercel SPA rewrite `/((?!api/.*).*) → /index.html`
- Produces: Razorpay `<script src="https://checkout.razorpay.com/v1/checkout.js">` in `<head>`

- [x] **Step 1:** Write `package.json` with react@18, react-dom@18, lucide-react, @vitejs/plugin-react, tailwindcss, autoprefixer, postcss
- [x] **Step 2:** Write `vite.config.js` with `@vitejs/plugin-react`, port 5173, proxy `/api → http://localhost:8000`
- [x] **Step 3:** Write `tailwind.config.js` with JetBrains Mono font, slate-950 color, custom animations
- [x] **Step 4:** Write `postcss.config.js`
- [x] **Step 5:** Write `index.html` with Razorpay script, Google Fonts (Inter + JetBrains Mono), `<div id="root">`
- [x] **Step 6:** Write `vercel.json` with SPA rewrite, asset cache headers, security headers

## Task 2: Global CSS (`src/index.css`)

**Files:**
- Create: `frontend/src/index.css`

**Interfaces:**
- Produces: Tailwind directives + custom component classes (`metric-card`, `btn-primary`, `btn-amber`, `severity-high`, etc.)
- Produces: `@media print` rules hiding non-certificate DOM

- [x] **Step 1:** Write `@tailwind base/components/utilities` with custom component classes and print styles

## Task 3: Entry Point + App Shell (`src/main.jsx`, `src/App.jsx`)

**Files:**
- Create: `frontend/src/main.jsx`
- Create: `frontend/src/App.jsx`

**Interfaces:**
- Consumes: `index.css` (Task 2)
- Produces: `<App>` mounted at `#root`
- Produces: All UI components inlined in `App.jsx`: `HeaderBanner`, `ModelBenchmarkCard`, `CircleGauge`, `SeverityBadge`, `PatchViewer`, `ASTMetricGrid`, `CertificateCard`, `RazorpayCard`, `FindingsPanel`, `SkillScorecard`
- Produces: `generateFallbackReview(code, filename, developerName) → ReviewResult`
- Produces: `apiReview(code, filename, developerName) → {data, source}`
- Produces: `apiCreateOrder(developerName, certificateId) → OrderData`

- [x] **Step 1:** Implement `generateFallbackReview` — deterministic pseudo-ML simulation producing the full API response shape
- [x] **Step 2:** Implement `apiReview` / `apiCreateOrder` with 8-second AbortController timeouts and fallback
- [x] **Step 3:** Build all sub-components (HeaderBanner, ModelBenchmarkCard, etc.)
- [x] **Step 4:** Build main `App` component with two-panel layout, code editor, loading state, results
- [x] **Step 5:** Run `npm run build` — verify zero errors

## Task 4: Verification

- [x] `npm run build` exits 0
- [ ] `npm run dev` starts at http://localhost:5173 without errors
- [ ] Chrome DevTools: zero console errors/warnings on initial load
- [ ] Load High-Risk sample → Run Review → verify all 8 AST metrics populated
- [ ] Load Clean sample → Run Review → verify certificate eligible
- [ ] "Simulate (Judge Demo)" button → opens CertificateCard modal
- [ ] "Print / Save PDF" calls `window.print()` without JS errors
- [ ] Mobile viewport (375px) — no horizontal overflow
