# ProofCommit Pro — Whole-Project ZIP Upload & Review Specification

**Track:** Neural Storm 2026 · Track 1: Future Tech · FT-05 (AI-Powered Automated Code Review)  
**Branch:** `new-ui-upgrade`  
**Date:** 2026-11-05  

---

## 1. Intent & Why
Hackathon judges and real developers want to evaluate entire repositories, not just single snippet files or hardcoded test mockups. Removing all hardcoded test data (`HIGH_RISK_CODE`, `CLEAN_CODE`, sample buttons) and introducing a `.zip` archive uploader allows users to drag-and-drop their actual multi-file Python projects. ProofCommit Pro unpacks the archive, runs AST feature extraction and Random Forest defect scoring across all Python files, aggregates project-level health metrics, and mints an end-to-end repository 9AM Skill Certificate.

---

## 2. Goals
- **Remove all test/dummy data:**
  - Remove `HIGH_RISK_CODE` and `CLEAN_CODE` string constants.
  - Remove "Load High-Risk Buggy Sample" and "Load Clean Production Sample" buttons.
  - Editor starts clean and empty with placeholder guidance.
- **Whole-Project ZIP Upload:**
  - Install and use `jszip` client-side.
  - Support drag-and-drop or file picker for `.zip` files (plus single `.py` file drop/paste).
  - Recursively extract all `.py` files while filtering out directories like `.git`, `__pycache__`, `venv`, `.venv`, `node_modules`, `build`, `dist`.
- **Project-Level Review & Aggregation:**
  - Execute AST analysis and defect risk calculation for each extracted Python file.
  - Calculate project-wide aggregates:
    - Total files analyzed, total LOC, total AST nodes.
    - Mean cyclomatic complexity across all project functions.
    - Overall defect risk percentage & risk tier (Low, Medium, High).
    - Aggregate 9AM Skill Evidence Score (0–100) and certification eligibility.
- **Multi-File Explorer & File Breakdown Table:**
  - Interactive file list showing each module's name, LOC, CC, risk label, and issues count.
  - Clicking any file opens its individual 8-metric AST grid, specific findings, and refactored AI patch.
- **Project-Level 9AM Certificate:**
  - Certificate displays the project name (e.g., `my-repo.zip`), total files evaluated, total LOC, and aggregate skill score.
  - Supports direct `.pdf` download via `jsPDF`, `.png`, and Print.
- **Dual Mode (ZIP Upload & Single File):**
  - Smooth tab switcher between "📦 Upload Project (.zip)" and "📝 Paste / Single File (.py)" so users can review either full repos or quick scripts.

---

## 3. Non-Goals
- Server-side disk extraction of untrusted zip files (keeping all unpacking in-memory in the browser avoids disk injection and sandbox vulnerabilities).
- Parsing non-Python languages in this phase (ignores `.md`, `.json`, `.yml`, etc., focusing on Python AST and ML defect classifier).

---

## 4. Anti-Goals
- Do not lose syntax error validation or normalized complexity logic.
- Do not block large projects: asynchronous file-by-file progress reporting.

---

## 5. Approaches
- **Approach 1 (Selected): In-Browser Multi-File Engine with `JSZip`:** Unpack the zip in memory using `JSZip`, iterate over Python files, run AST & Random Forest scoring in a loop with progress feedback, and store results in project-level state.
- **Approach 2 (Rejected): Backend Multipart Upload:** Post raw zip to FastAPI `/api/upload-zip`, write to disk, analyze and return JSON. (Rejected: Requires server storage, introduces upload timeouts, and fails if backend is offline).

---

## 6. Verification Plan
1. Install `jszip` in `proofcommit-pro/frontend`.
2. Build with `npm run build` to verify 0 errors.
3. Test uploading a zip file with multiple Python files; verify all files are discovered and analyzed.
4. Verify project-level metrics and individual file selection work seamlessly.
5. Verify certificate displays repository name and total files verified.
