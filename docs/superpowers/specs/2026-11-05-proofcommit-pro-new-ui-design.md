# ProofCommit Pro — "Engineered Precision" UI Upgrade Design Document

**Track:** Neural Storm 2026 · Track 1: Future Tech · FT-05 (AI-Powered Automated Code Review)  
**Branch:** `new-ui-upgrade`  
**Date:** 2026-11-05  

---

## 1. Intent & Why

ProofCommit Pro needs a developer-first, production-grade landing page and interface that commands technical authority before hackathon judges, employers, and 9AM Careers. The previous interface was a functional two-column workbench. The new UI upgrade ("Engineered Precision"), specified in `z:\stitch_proofcommit_pro_landing_page`, transforms ProofCommit Pro into a cohesive product experience: an industrial-grade narrative landing page with an integrated live AST and Random Forest review runtime in the `#demo` section.

Judges experience a high-conviction product journey:
1. **Hero & Narrative:** High-impact value proposition ("Push Code. Prove Your Skills."), active GitHub webhook status, and interactive diff preview with floating AI review score annotation.
2. **Pipeline Workflow:** Visual 3-step explanation ("From Git Push to Cryptographic Proof in Seconds").
3. **Capabilities Grid:** 4-card matrix detailing AI Code Review, 9AM Skill Certificate, GitHub Integration, and Developer Leaderboard.
4. **Interactive Audit & Verification Runtime (`#demo`):** The complete working review workbench embedded directly into the page: code editor, preset samples, live AST metrics, Random Forest defect probability, unified diff AI patch, and the ₹299 Razorpay / Judge Demo 9AM Certificate flow.
5. **Core Team & Footer:** Hackathon credentials, Neural Storm 2026 FT-05 badges, 9AM by TechMojo sponsorship, and repository links.

---

## 2. Goals

- **Integrate "Engineered Precision" Design System:**
  - Base dark surfaces (`#131318`, `#0e0e13`, `#1f1f25`, `#2a292f`).
  - Strict 1px borders (`#464554`/30, `#232334`), electric indigo primary (`#c0c1ff`, `#8083ff`), and mint secondary (`#4edea3`).
  - Typographic hierarchy: Geist for headlines, Inter for body, JetBrains Mono for code, metrics, SHAs, and labels.
  - Material Symbols Outlined + Lucide icons.
- **Embedded Single-Page Architecture:**
  - Fixed navbar with smooth anchor navigation (`#features`, `#how-it-works`, `#demo`, `#team`), "View on GitHub" repo link, and "Get Certificate" CTA.
  - Full landing page sections from `code.html` mapped into clean React components.
  - The `#demo` section becomes the active interactive analysis engine: users can load buggy or clean presets, write custom code, inspect the 8-metric AST structural grid and Random Forest benchmarks, copy AI patches, and mint certificates.
- **Preserve All 5 Calibrated QA Fixes:**
  - Normalized Cyclomatic Complexity per function (`avgCC = totalCC / functionCount`).
  - Multiline PEP 257 docstring regex coverage (`/("""[\s\S]*?"""|'''[\s\S]*?''')/g`).
  - Python syntax validation guard (`validatePythonSyntax`).
  - Empty editor error banner (`"Please enter or load Python code to analyze"`).
  - Serverless Edge Engine branding (`⚡ Edge Browser AST + Random Forest Engine Active (Zero-Latency Serverless Mode)`).
- **Rock-Solid Certificate Generation:**
  - Direct PDF download via `jsPDF`.
  - Image download via `.png`.
  - Crisp Print export with `-webkit-print-color-adjust: exact` and proper page formatting.
  - Razorpay checkout with Judge Demo simulation.

---

## 3. Non-Goals

- Modifying the FastAPI backend or changing the trained Random Forest weights.
- Multi-page routing (e.g. Next.js / React Router) — a unified single-page layout provides the highest judge conversion without navigation friction.
- Cloud database migrations — Supabase schema remains ready as defined.

---

## 4. Anti-Goals

- Do not compromise the live interactive code review functionality for a static landing page.
- Do not drop hackathon and sponsor attribution (Neural Storm 2026, Track 1 FT-05, 9AM by TechMojo).
- Do not leave broken print/PDF rendering.

---

## 5. Approaches Considered

### Approach 1 (Selected): Embedded Single-Page Experience
The landing page from `code.html` serves as the primary layout. The `#demo` section is augmented from a static mockup into the fully functional ProofCommit Pro analysis workbench, connecting the editor, preset buttons, AST engine, ML model, AI patch viewer, and certificate modal.
- **Pros:** Zero-friction experience for hackathon evaluation; judges can read the product story and immediately run live code analyses without leaving the page.
- **Cons:** Requires cleanly modularizing the workbench into components to maintain readable code.

### Approach 2 (Rejected): Multi-Route Split (`/` Landing Page + `/app` Workbench)
Host the marketing landing page on `/` and move the review engine to a separate `/app` route.
- **Pros:** Isolates landing page code from application code.
- **Cons:** Forces judges to click through to a separate page, breaks the seamless narrative flow, and requires client-side routing dependencies.

---

## 6. Implementation Plan & Component Structure

```
proofcommit-pro/frontend/
├── index.html                   # Added Geist, Inter, JetBrains Mono & Material Symbols
├── tailwind.config.js           # Extended with "Engineered Precision" color tokens & typography
├── src/
│   ├── index.css                # Base surface styling, scrollbars, print styles
│   ├── main.jsx                 # Entry point
│   ├── App.jsx                  # Main single-page application composing:
│   │   ├── Navbar               # Fixed header with anchors & actions
│   │   ├── HeroSection          # Headline, diff preview, floating score annotation
│   │   ├── HowItWorksSection    # 3-step pipeline workflow
│   │   ├── FeaturesGrid         # 4 capabilities cards
│   │   ├── LiveEvaluationDemo   # Interactive code workbench (#demo)
│   │   │   ├── EditorToolbar    # Preset buttons, editable filename, language tag
│   │   │   ├── CodeEditor       # Python input & line count
│   │   │   ├── ASTMetricGrid    # 8-metric structural cards
│   │   │   ├── RFBenchmarkCard  # Accuracy, Precision, Recall, F1, Feature Importance
│   │   │   ├── FindingsPanel    # Automated issues & unified diff AI patch
│   │   │   └── RazorpayCard     # ₹299 order creation & Judge Demo trigger
│   │   ├── CertificateModal     # 9AM Certificate with PDF, PNG, Print exports
│   │   ├── TeamSection          # Core Engineering Team
│   │   └── Footer               # Neural Storm & 9AM attribution
```

---

## 7. Verification Checklist

1. `npm run build` succeeds with 0 errors.
2. All anchor links (`#features`, `#how-it-works`, `#demo`, `#team`) scroll smoothly.
3. Both preset buttons ("Load High-Risk Buggy Sample" & "Load Clean Production Sample") correctly populate the editor and score appropriately (Buggy ~28/100 High Risk; Clean ~94/100 9AM Gold).
4. Broken syntax (`def broken(`) halts analysis with `SyntaxError` and critical risk.
5. Empty editor shows red alert banner.
6. Certificate modal opens on "Simulate (Judge Demo)", and `.pdf` direct download + `.png` + Print preview work cleanly.
7. Committed to `new-ui-upgrade` branch and pushed to GitHub.
