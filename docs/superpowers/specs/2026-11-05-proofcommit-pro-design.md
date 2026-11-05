# ProofCommit Pro — Design Document

**Track:** Neural Storm 2026 · Track 1: Future Tech · FT-05 — AI-Powered Automated Code Review  
**Team:** (to be filled)  
**Date:** 2026-11-05

---

## Intent & Why

Developers struggle to prove code quality to employers and clients with objective, reproducible evidence. Traditional resumes list skills; nothing verifies them. ProofCommit Pro bridges this gap: given any public GitHub repository URL, it runs a real scikit-learn bug classifier on extracted code features, generates auto-fix patches via the Gemini API, and—after a ₹299 Razorpay checkout—mints a tamper-evident "Developer Skill Evidence Certificate." This mirrors [9AM Careers'](https://9am.careers/how-it-works/) proof-over-claims thesis directly, making it the natural technical companion for the event's sole sponsor.

The hackathon judge sees: live ML metrics in the UI, a downloadable patch diff, and a purchasable certificate—all in one Streamlit page, deployable to Streamlit Cloud.

---

## Goals

- Parse any public GitHub repo URL and extract Python-file code features.
- Run a scikit-learn RandomForestClassifier that predicts per-file bug probability and reports F1, precision, recall, accuracy on a held-out test split.
- Use Gemini API (gemini-2.0-flash) to generate a `.patch`-formatted auto-fix suggestion for the top-N riskiest files.
- Present a Razorpay Checkout modal (₹299) in the Streamlit UI; on payment confirmation (simulated webhook / order-id match), generate and serve a downloadable PDF/HTML certificate.
- Provide a comprehensive README.md meeting all Neural Storm submission requirements.
- Deploy to Streamlit Cloud (one live URL for judges).

## Non-Goals

- Private repository support (requires OAuth; out of scope for 48 h).
- Real-time CI/CD GitHub Action integration.
- Actual Razorpay webhook server (payment is verified client-side by order_id echo for the hackathon demo; production path is noted in README).
- Training a custom model from scratch on a large defect dataset; we use a reproducible synthetic + open-source labelled dataset (Promise/Defect4J features) bundled in-repo.

## Anti-Goals

- Do not break the user's GitHub account or push anything to repos.
- Do not store payment card data.
- Do not make the app depend on private API keys being hardcoded in source.

---

## Constraints

| Constraint | Value |
|---|---|
| Language (AI/ML) | Python ≥ 3.11 |
| UI framework | Streamlit |
| ML library | scikit-learn ≥ 1.4 |
| LLM | Google Gemini API (`google-generativeai` SDK), model `gemini-2.0-flash` |
| Payment | Razorpay JS Checkout (Streamlit HTML component via `st.components.v1.html`) |
| Feature extraction | `radon` (cyclomatic complexity, Halstead), `ast` (stdlib), `gitpython` |
| PDF generation | `reportlab` or `fpdf2` |
| Deployment | Streamlit Cloud (free tier); secrets via `.streamlit/secrets.toml` / Streamlit Cloud Secrets UI |
| Dataset | Bundled CSV (`data/defect_features.csv`) — synthetic + Promise NSA features, pre-labelled |

---

## Approach Selected

**Streamlit Monolith** — single `app.py` entry point, all logic in `src/` modules imported by it. One command: `streamlit run app.py`. No separate backend process. Certificate generation is in-process (no worker queue). Razorpay Checkout is embedded via `st.components.v1.html`; payment confirmation is echoed back via Streamlit session state through a hidden form submit (Streamlit re-run on button click reads the Razorpay `payment_id` returned in the JS callback written to a hidden input, which the user must paste or which is auto-filled via the JS→Streamlit bridge using `window.parent.postMessage` / Streamlit's custom component protocol—simplified for hackathon to a manual "Enter Payment ID" text field after the modal).

Alternatives considered and rejected:
- **FastAPI + React** — too much scaffolding for 48 h, doubles surface area.
- **Gradio on HF Spaces** — Razorpay modal UX is poor; certificate PDF download is awkward.

---

## Architecture

```
proofcommit-pro/
├── app.py                        # Streamlit entry point
├── src/
│   ├── github_parser.py          # Clone/fetch repo, list Python files
│   ├── feature_extractor.py      # AST + radon metrics per file → DataFrame row
│   ├── bug_classifier.py         # Train/load RandomForestClassifier, predict, metrics
│   ├── gemini_patch.py           # Call Gemini API → .patch text for top-N files
│   ├── razorpay_component.py     # Render Razorpay Checkout HTML component
│   └── certificate_generator.py  # Generate PDF certificate (fpdf2)
├── data/
│   └── defect_features.csv       # Bundled labelled dataset (Promise NSA + synthetic)
├── model/
│   └── .gitkeep                  # Trained model cached here at runtime (joblib)
├── tests/
│   ├── test_feature_extractor.py
│   ├── test_bug_classifier.py
│   ├── test_gemini_patch.py
│   └── test_certificate_generator.py
├── docs/
│   └── superpowers/
│       ├── specs/
│       └── plans/
├── .streamlit/
│   └── secrets.toml.example      # Template; real secrets never committed
├── requirements.txt
├── README.md
└── .gitignore
```

---

## Data & Model

**Dataset:** `data/defect_features.csv` — 500 rows × 12 feature columns + 1 binary label (`is_defective`). Features derived from real Promise NSA data combined with synthetic samples to reach balanced classes (250 each). This is committed to the repo so the classifier trains reproducibly without an internet call.

**Features (12):**
1. `loc` — lines of code
2. `lloc` — logical lines of code
3. `sloc` — source lines of code
4. `comments` — comment line count
5. `cyclomatic_complexity` — mean CC per function (radon)
6. `halstead_difficulty` — Halstead D (radon)
7. `halstead_effort` — Halstead E (radon)
8. `num_functions` — count of `def` statements (AST)
9. `num_classes` — count of `class` statements (AST)
10. `max_nesting_depth` — max block nesting depth (AST walk)
11. `avg_params` — average function parameter count (AST)
12. `import_count` — number of import statements (AST)

**Classifier:** `RandomForestClassifier(n_estimators=100, random_state=42)` trained on 80% split, evaluated on 20%. Metrics reported: accuracy, F1 (macro), precision (macro), recall (macro). Model serialised with `joblib` to `model/rf_model.joblib` after first run.

---

## Payment & Certificate Flow

1. User submits a GitHub repo URL and analysis completes.
2. Streamlit shows analysis results (metrics, risk table, patch preview).
3. "Get Certificate — ₹299" button renders the Razorpay Checkout HTML component.
4. User completes payment in modal; Razorpay JS `handler` writes `payment_id` to a visible text field.
5. User clicks "Verify & Generate Certificate" button in Streamlit; app reads the `payment_id` from session state.
6. App calls Razorpay Fetch Payment API (`GET /v1/payments/{id}`) to verify `status == "captured"` and `amount == 29900`.
7. On success, `certificate_generator.py` produces a PDF with: candidate name (asked before payment), repo URL, analysis date, F1/accuracy, risk score, and a UUID-based certificate ID.
8. `st.download_button` serves the PDF.

**Hackathon demo mode:** If `RAZORPAY_KEY_SECRET` is not set, app enters "demo mode" — any `payment_id` starting with `pay_DEMO` bypasses the API verification and generates the certificate immediately (clearly labelled "DEMO" watermark on cert).

---

## README Requirements Checklist (Neural Storm)

- [x] Project title + FT-05
- [x] Team name + members
- [x] Problem description + solution
- [x] Tech stack
- [x] Setup + installation instructions
- [x] Run locally instructions
- [x] Screenshots / demo GIF (added post-build)
- [x] Model accuracy + performance metrics (auto-generated section)
- [x] AI tools disclosure

---

## What's Left to the Builder

- Exact Streamlit layout (column widths, color theme — use `theme = "dark"` in `.streamlit/config.toml`).
- Exact wording of the certificate PDF (keep professional; include Neural Storm + 9AM logo placeholder).
- Choice of `fpdf2` vs `reportlab` for PDF (plan uses `fpdf2` for simplicity).
- Error messages for private repos, rate-limited GitHub API, invalid URLs.
