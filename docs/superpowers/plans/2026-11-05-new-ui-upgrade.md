# ProofCommit Pro — New UI Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the "Engineered Precision" design system from `Z:\stitch_proofcommit_pro_landing_page` into ProofCommit Pro on branch `new-ui-upgrade`, uniting the marketing landing page and the live interactive evaluation engine into a single-page app, and run it.

**Architecture:** Single-page React 18 application with Tailwind CSS, combining the landing page structure (Hero, How It Works, Features, Team, Footer) with the live in-browser AST & Random Forest engine in the `#demo` section.

**Tech Stack:** React 18, Vite, Tailwind CSS, Lucide React, Google Material Symbols, jsPDF, Razorpay Checkout SDK.

**Spec:** [`docs/superpowers/specs/2026-11-05-proofcommit-pro-new-ui-design.md`](file:///c:/Users/Ansh/Desktop/NEURAL%20STORM/docs/superpowers/specs/2026-11-05-proofcommit-pro-new-ui-design.md)

## Global Constraints

- Preserve all 5 QA fixes (normalized function complexity, PEP 257 multiline docstring coverage, syntax error guard, empty editor alert banner, and edge engine branding).
- Preserve working certificate export (direct `.pdf` download via `jsPDF`, `.png`, and Print preview).
- Keep Razorpay checkout and Judge Demo simulation operational.
- Do not introduce breaking dependencies.

## Review Focus

1. **Preset Scoring Accuracy**: "Load Clean Production Sample" must score 92–96 / 100 with Low Risk; "Load High-Risk Buggy Sample" must score ~28 / 100 with High Risk.
2. **Broken Syntax Handling**: `def broken(` must be rejected by `validatePythonSyntax` and award 100% Defect Risk with 15/100 score.
3. **Empty Input**: Clicking Run Review with an empty editor must display the red alert banner without crashing.
4. **Anchor Navigation**: Clicking `#demo`, `#features`, `#how-it-works`, `#team` must scroll smoothly to respective sections.
5. **Certificate Actions**: "Download PDF (.pdf)", "Download Image (.png)", and "Print" must render the complete certificate graphics.

---

### Task 1: Typography, Icons & Tailwind Theme Setup
**Files:**
- Modify: [`proofcommit-pro/frontend/index.html`](file:///c:/Users/Ansh/Desktop/NEURAL%20STORM/proofcommit-pro/frontend/index.html)
- Modify: [`proofcommit-pro/frontend/tailwind.config.js`](file:///c:/Users/Ansh/Desktop/NEURAL%20STORM/proofcommit-pro/frontend/tailwind.config.js)
- Modify: [`proofcommit-pro/frontend/src/index.css`](file:///c:/Users/Ansh/Desktop/NEURAL%20STORM/proofcommit-pro/frontend/src/index.css)

- [ ] **Step 1:** Add Google Fonts (`Geist`, `Inter`, `JetBrains Mono`) and Material Symbols Outlined stylesheet links to `index.html`.
- [ ] **Step 2:** Configure `tailwind.config.js` with the "Engineered Precision" design tokens (`surface: '#131318'`, `surface-container-lowest: '#0e0e13'`, `primary: '#c0c1ff'`, `secondary: '#4edea3'`, `tertiary: '#4cd7f6'`, `error: '#ffb4ab'`, custom font families, and border radii).
- [ ] **Step 3:** Update `index.css` with dark base styles, custom scrollbar, sub-pixel grid background, and print styles.

---

### Task 2: Implement Complete Landing Page & Interactive Engine in `App.jsx`
**Files:**
- Modify: [`proofcommit-pro/frontend/src/App.jsx`](file:///c:/Users/Ansh/Desktop/NEURAL%20STORM/proofcommit-pro/frontend/src/App.jsx)

- [ ] **Step 1:** Implement Navbar with brand logo, `#features`, `#how-it-works`, `#demo`, `#team` links, GitHub button, and DEV name input.
- [ ] **Step 2:** Implement Hero section with active GitHub webhook badge, main headline, CTA buttons, and code diff preview with floating AI review score annotation.
- [ ] **Step 3:** Implement Pipeline Workflow (3-step "How It Works" with connecting lines).
- [ ] **Step 4:** Implement Capabilities Grid (4 feature cards: AI Review, 9AM Skill Certificate, GitHub Integration, Developer Leaderboard).
- [ ] **Step 5:** Embed the Live Evaluation Runtime into the `#demo` section (preset buttons, code editor with editable filename, 8-metric AST Structural Grid, Random Forest Benchmarks, AI Review Summary, Findings & Patch viewer, and Razorpay card).
- [ ] **Step 6:** Implement Team section and Footer with Neural Storm 2026 FT-05 & 9AM attribution.
- [ ] **Step 7:** Connect the 9AM Skill Evidence Certificate Modal with direct PDF download, PNG download, and print.

---

### Task 3: Build Verification, Git Commit & Server Startup
**Files:**
- Output: `proofcommit-pro/frontend/dist`

- [ ] **Step 1:** Run `npm run build` in `proofcommit-pro/frontend` to verify 0 errors.
- [ ] **Step 2:** Commit all changes to branch `new-ui-upgrade`.
- [ ] **Step 3:** Start Vite dev server and report local URL to the user.
