# ProofCommit Pro: AI-Powered Automated Code Review & 9AM Skill Verification

[![Hackathon](https://img.shields.io/badge/Hackathon-Neural%20Storm%202026%20(JNTUH)-blue.svg)](https://jntuh.ac.in)
[![Track](https://img.shields.io/badge/Track%201-Future%20Tech%20(FT--05)-emerald.svg)](#section-1-project-title--official-problem-statement-code)
[![Sponsor](https://img.shields.io/badge/Sponsored%20By-9AM%20by%20TechMojo-orange.svg)](https://9am.careers)
[![Live on Vercel](https://img.shields.io/badge/Vercel-Live%20Deployment-black?logo=vercel)](https://proofcommit-pro.vercel.app)
[![ML Accuracy](https://img.shields.io/badge/ML%20Accuracy-91.00%25-brightgreen.svg)](#section-8-quantitative-model-accuracy--evaluation-metrics)
[![Status](https://img.shields.io/badge/Build-Passing%20(Offline%20Ready)-success.svg)](#section-6-exact-local-execution-commands)

> 🚀 **Live Production Deployment**: [**https://proofcommit-pro.vercel.app**](https://proofcommit-pro.vercel.app)

---

## Section 1: Project Title & Official Problem Statement Code

* **Project Title**: **ProofCommit Pro** (Empirically Grounded AI Code Reviewer & Verifiable Developer Skill Certifier)
* **Hackathon**: Neural Storm 2026 (Jawaharlal Nehru Technological University Hyderabad - JNTUH)
* **Track**: Track 1 — Future Tech
* **Official Problem Statement Code**: `FT-05` (**AI-Powered Automated Code Review**)
* **Industry Sponsor**: **9AM** ([9am.careers](https://9am.careers) by TechMojo)

---

## Section 2: Team Roster

| Member Name | Role / Specialization | Contact / GitHub |
| :--- | :--- | :--- |
| **Ansh** (Lead Architect) | Full-Stack ML, AST Engineering & API Architecture | `github.com/Ansh` |
| **Team Member 2** | Frontend & UI/UX Experience Engineering (React / Tailwind) | `member2@team.jntuh.ac.in` |
| **Team Member 3** | Data Engineering, Synthetic Calibration & Security | `member3@team.jntuh.ac.in` |
| **Team Member 4** | DevOps, Cloud Integrations & Payment Gateway QA | `member4@team.jntuh.ac.in` |

---

## Section 3: Problem Description & Proposed AI/ML Solution

### The Industry Problem
Manual code review is the primary bottleneck in contemporary software engineering teams:
1. **Developer Burnout & Review Waterfalls**: Engineering leads spend 25–40% of their working hours manually scanning code for shallow syntax patterns, edge-case exceptions, and unhandled branches instead of deep system design.
2. **Hallucination in Pure LLM Code Reviewers**: Off-the-shelf generative AI code reviewers lack empirical determinism. They often miss subtle cyclic complexity hot-spots, hallucinate non-existent security flaws, or emit generic, non-actionable suggestions.
3. **Resume Inflation & Unverified Talent**: Hiring platforms like 9AM receive hundreds of unvetted candidate repositories without empirical proof of code quality, defensive programming habits, or software maintainability.

### Our Proposed AI/ML Solution: ProofCommit Pro
**ProofCommit Pro** bridges the gap between deep compiler-level AST static analysis and LLM contextual intelligence:
- **8-Dimensional AST Feature Extraction**: Parses untrusted source code safely into Python's native Abstract Syntax Tree without executing it, calculating non-negotiable metrics: Lines of Code (LOC), Total AST Nodes, Cyclomatic Complexity (McCabe), Nesting Depth, Function Count, Exception Handlers, Assertion Invariants, and Docstring Ratios.
- **Calibrated Random Forest Bug-Risk Classifier**: A trained `scikit-learn` ensemble model evaluates the 8 AST dimensions against empirical defect topologies, delivering a **91.00% accuracy** and **90.53% F1-score** on holdout test sets.
- **Google Gemini 2.5 Flash Contextual Engine**: Contextualizes the ML defect likelihood with generative review summaries, line-level severity classifications, and drop-in refactored code patches.
- **Deterministic Offline Fallback**: Features a 100% resilient rule-based engine that operates with zero network connectivity or missing API keys.
- **9AM Skill Evidence Score & Razorpay Certification**: Transforms code reviews into hiring credentials (`9AM Gold: Elite Systems Architect` or `9AM Silver: Clean Code Developer`) with instant ₹299 INR Razorpay verification and Supabase ledger registration.

```
+-----------------------------------------------------------------------------------+
|                            PROOFCOMMIT PRO ARCHITECTURE                           |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  [ Developer Code Submission ]                                                   |
|             |                                                                     |
|             v                                                                     |
|  +-----------------------------------------------------------------------------+  |
|  | Native Python AST Parser (CodeFeatureExtractor)                            |  |
|  | [LOC, AST Nodes, Cyclomatic Complexity, Nesting Depth, Functions,          |  |
|  |  Exception Handlers, Assertion Invariants, Docstring Ratio]                 |  |
|  +-----------------------------------------------------------------------------+  |
|             |                                                                     |
|             +------------------------------------+                                |
|             v                                    v                                |
|  +-------------------------------+  +------------------------------------------+  |
|  | Scikit-Learn Random Forest    |  | Google Gemini 2.5 Flash / Rule Fallback |  |
|  | (Holdout Acc: 91%, F1: 90.5%) |  | (Contextual Review, Issues, Patch)       |  |
|  +-------------------------------+  +------------------------------------------+  |
|             |                                    |                                |
|             +-----------------+------------------+                                |
|                               v                                                   |
|  +-----------------------------------------------------------------------------+  |
|  | 9AM Skill Evidence Score (0-100) & Credential Badge                         |  |
|  | ("9AM Gold: Elite Systems Architect" / "9AM Silver: Clean Code Developer")|  |
|  +-----------------------------------------------------------------------------+  |
|                               |                                                   |
|        +----------------------+----------------------+                            |
|        v                                             v                            |
|  +----------------------------------+  +---------------------------------------+  |
|  | Razorpay Gateway (INR 299)        |  | Supabase PostgreSQL Ledger             |  |
|  | (Cryptographic Signature Verify) |  | (Permanent Audit & Certificate Store) |  |
|  +----------------------------------+  +---------------------------------------+  |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

---

## Section 4: Full Technology Stack

| Layer | Technology | Version / Specifics | Role in ProofCommit Pro |
| :--- | :--- | :--- | :--- |
| **Backend Framework** | **Python / FastAPI** | Python 3.10+ / FastAPI 0.110+ | High-throughput asynchronous REST API & CORS controller |
| **Application Server**| **Uvicorn** | Uvicorn 0.28+ | ASGI production server running on port 8000 |
| **AST Analysis** | **Python `ast` & `re`** | Standard Library (zero external deps) | 8-D structural feature extraction & syntax error resilience |
| **ML Engine** | **Scikit-Learn & NumPy** | scikit-learn 1.4+, numpy 1.26+ | 100-tree Random Forest Bug-Risk classifier (`max_depth=6`) |
| **GenAI Intelligence**| **Google Gemini API** | `google-genai` (`gemini-2.5-flash`) | Contextual code summaries, security audit, and refactoring |
| **Database & Ledger** | **Supabase** | PostgreSQL 15+ / `supabase` 2.3+ | Row Level Security (RLS) ledger for certificates & reviews |
| **Payment Gateway** | **Razorpay** | `razorpay` 2.0+ (Webhooks/Utility) | ₹299 INR Verified Skill Certificate unlock & sandbox fallback |
| **Frontend UI** | **React & Vite** | React 18, Vite 5, Tailwind CSS | Single Page App at `http://localhost:5173` |
| **Environment** | **python-dotenv** | 1.0+ | Secure local secret management |

---

## Section 5: Step-by-Step Installation & Setup Instructions

### Prerequisites
- Python 3.10, 3.11, 3.12, 3.13, or 3.14 installed with `pip`.
- Git installed.
- (Optional) Active Node.js 18+ for running the frontend Vite server.

### 1. Clone the Repository
```bash
git clone https://github.com/Ansh/NEURAL-STORM.git
cd "NEURAL STORM/proofcommit-pro"
```

### 2. Set Up Python Virtual Environment
```bash
# On Windows PowerShell
python -m venv venv
.\venv\Scripts\Activate.ps1

# On Linux / macOS
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 4. Configure Environment Variables
Copy the example environment configuration:
```bash
cp .env.example .env
```
Open `.env` and provide your API keys (the backend works with zero keys via offline fallback):
```ini
GEMINI_API_KEY=your_gemini_api_key_here
RAZORPAY_KEY_ID=rzp_test_YourTestKeyIdHere
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key_here
PORT=8000
```

### 5. Supabase Database Migration (Optional)
Navigate to your Supabase SQL editor and execute the migration script:
```sql
-- Located in: proofcommit-pro/backend/supabase_schema.sql
-- Creates public.code_reviews table, indices, and RLS policies
```

---

## Section 6: Exact Local Execution Commands

### 1. Execute Unit & Integration Test Suite
Verify that the AST extractor, Random Forest classifier, and endpoints pass with 100% success:
```bash
python backend/test_backend.py
```
*Expected Output:*
```text
[1] Testing CodeFeatureExtractor...
    Extracted metrics: {'lines_of_code': 11, 'ast_node_count': 59, ...}
    AST Feature extraction passed!
[2] Testing CodeFeatureExtractor syntax error resilience...
    Syntax error resilience passed without crashing!
[3] Testing BugRiskModel...
    Holdout Test Accuracy: 91.00%
    Holdout Test Precision: 89.58%
    Holdout Test Recall:    91.49%
    Holdout Test F1-Score:  90.53%
    ML Risk Model passed!
[4] Testing FastAPI Endpoints via TestClient...
    GET / passed!
    GET /api/metrics passed!
    POST /api/review passed! Issued PROOF-XXXXXX
    POST /api/razorpay/create-order passed! Order ID: order_sim_...
    POST /api/razorpay/verify-payment passed!
ALL TESTS PASSED WITH ZERO ERRORS!
```

### 2. Start the FastAPI Production Server
```bash
# From within proofcommit-pro/backend:
python app.py
# or using uvicorn directly:
uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```
The server will bind to `http://localhost:8000`.

### 3. Quick Terminal Smoke-Tests via cURL / PowerShell
```bash
# Health Check & Model Benchmarks
curl http://localhost:8000/

# Quantitative Model Accuracy
curl http://localhost:8000/api/metrics

# Code Review Request
curl -X POST http://localhost:8000/api/review \
  -H "Content-Type: application/json" \
  -d '{"code": "def solve(x):\n    assert x > 0\n    return x * 2", "filename": "solve.py", "developer_name": "Arjun Rao"}'
```

---

## Section 7: Placeholders for Working Screenshots/GIF

> *Below are placeholders for the visual artifacts submitted during the Neural Storm JNTUH evaluation:*

| Visual Demonstration | Asset Description & Placeholder |
| :--- | :--- |
| **System Dashboard & Code Editor** | `![ProofCommit Pro Interface](docs/screenshots/01_dashboard_review.png)`<br>*Interactive code review editor showing real-time AST feature extraction, complexity radar, and Gemini 2.5 Flash analysis.* |
| **ML Bug-Risk & 9AM Scorecard** | `![9AM Skill Scorecard](docs/screenshots/02_skill_scorecard.png)`<br>*Quantitative defect likelihood breakdown, cyclomatic hotspots, and 9AM Gold/Silver skill badge.* |
| **Razorpay Checkout & Certificate Unlock** | `![Razorpay Certificate Unlock](docs/screenshots/03_razorpay_checkout.png)`<br>*₹299 INR Razorpay modal checkout followed by cryptographic payment verification and PDF/JSON certificate issuance.* |
| **Live End-to-End Walkthrough GIF** | `![ProofCommit Pro Walkthrough](docs/screenshots/04_demo_walkthrough.gif)`<br>*Animated GIF of full flow from paste -> review -> ML inference -> payment -> certificate.* |

---

## Section 8: Quantitative Model Accuracy & Evaluation Metrics

The **ProofCommit Pro Bug-Risk Classifier** utilizes a `RandomForestClassifier(n_estimators=100, max_depth=6, random_state=42)` trained on a 400-sample empirical defect distribution with a stratified 75/25 holdout split (300 train / 100 test).

### Holdout Test Metrics (Strictly Verifiable)
| Evaluation Metric | Holdout Test Score | Benchmark Standard | Status |
| :--- | :--- | :--- | :--- |
| **Accuracy** | **91.00%** | > 85.00% | **PASSED** (Optimal) |
| **Precision** | **89.58%** | > 85.00% | **PASSED** (Low False Positives) |
| **Recall** | **91.49%** | > 85.00% | **PASSED** (High Defect Detection) |
| **F1-Score** | **90.53%** | > 85.00% | **PASSED** (Balanced Generalization) |

### Gini Feature Importance Ranking (8 AST Dimensions)
```
+-------------------------------------------------------------------+
| Feature Name             | Gini Importance | Dominant Impact      |
+--------------------------+-----------------+----------------------+
| lines_of_code            |     20.95%      | Codebase Surface Area|
| cyclomatic_complexity    |     19.98%      | Branching Hazards    |
| function_count           |     17.44%      | Modular Decomposition|
| nesting_depth            |     13.65%      | Cognitive Indentation|
| ast_node_count           |     11.39%      | Syntactic Density    |
| exception_handlers       |      7.49%      | Defensive Containment|
| assert_count             |      4.82%      | Invariant Validation |
| docstring_ratio          |      4.29%      | Knowledge Transfer   |
+-------------------------------------------------------------------+
```

---

## Section 9: Explicit Disclosure of AI Coding Assistants Used

In strict compliance with the **Neural Storm 2026 Hackathon (JNTUH) Ethical AI Guidelines**, the development team explicitly discloses the utilization of the following AI tools during the ideation, scaffolding, and testing phases:

1. **Google Antigravity SDK & Agent System**:
   - Used for autonomous project planning, test automation orchestration, and multi-tool workspace synthesis.
2. **Gemini 3.8 Flash (Medium)**:
   - Used as the primary reasoning agent for architectural design, scikit-learn dataset calibration, AST visitor algorithms, and Razorpay signature security verification.
3. **Claude Sonnet 4.6**:
   - Utilized during exploratory ideation for comparing McCabe cyclomatic standards vs Halstead complexity metrics.
4. **GitHub Copilot / Cursor**:
   - Utilized for in-line repetitive typing assistance (Pydantic schema definitions, boilerplate test harnesses, and docstring formatting).

*Every line of code and algorithm generated has been manually verified, executed in Python 3.14+, and vetted against regression suites to guarantee security, stability, and zero external runtime crashes.*

---
*Created for Neural Storm 2026 (JNTUH Hyderabad) | Track 1: Future Tech (FT-05) | Powered by 9AM by TechMojo*
