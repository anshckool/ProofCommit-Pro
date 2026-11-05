# ProofCommit Pro — Whole-Project ZIP Upload Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove all hardcoded test data and implement a whole-project `.zip` upload feature in ProofCommit Pro, enabling multi-file AST & Random Forest analysis, file breakdown explorer, project-wide scoring, and repository 9AM Certificate minting.

**Architecture:** Client-side ZIP extraction with `jszip`, batch AST extraction and Random Forest scoring across all discovered Python files, aggregated project metrics, and multi-file review UI in `App.jsx`.

**Tech Stack:** React 18, `jszip`, `jspdf`, Tailwind CSS, Lucide React, Google Material Symbols.

**Spec:** [`docs/superpowers/specs/2026-11-05-zip-project-review-design.md`](file:///c:/Users/Ansh/Desktop/NEURAL%20STORM/docs/superpowers/specs/2026-11-05-zip-project-review-design.md)

## Global Constraints
- Remove all dummy sample presets (`HIGH_RISK_CODE`, `CLEAN_CODE`, and sample buttons).
- Support dual modes: "📦 Upload Project (.zip)" and "📝 Paste / Single File (.py)".
- Filter out non-Python files and junk folders (`__pycache__`, `.git`, `venv`, `node_modules`).
- Preserve calibrated scoring, syntax error checking, and direct PDF download via `jsPDF`.

---

### Task 1: Install `jszip` & Setup In-Memory Project Parser
**Files:**
- Modify: [`proofcommit-pro/frontend/package.json`](file:///c:/Users/Ansh/Desktop/NEURAL%20STORM/proofcommit-pro/frontend/package.json)

- [ ] **Step 1:** Run `npm install jszip` in `proofcommit-pro/frontend`.
- [ ] **Step 2:** Verify package installation.

---

### Task 2: Implement Whole-Project Review Engine & Remove Test Data in `App.jsx`
**Files:**
- Modify: [`proofcommit-pro/frontend/src/App.jsx`](file:///c:/Users/Ansh/Desktop/NEURAL%20STORM/proofcommit-pro/frontend/src/App.jsx)

- [ ] **Step 1:** Remove `HIGH_RISK_CODE` and `CLEAN_CODE` string constants and sample loader buttons.
- [ ] **Step 2:** Implement `analyzeProjectZip(file)` using `JSZip`:
  - Read files recursively.
  - Filter for `.py` files not in ignored directories (`__pycache__`, `.git`, `venv`, `.venv`, `node_modules`, `build`, `dist`, `.pytest_cache`).
  - For each Python file, run AST extraction, syntax checks, complexity analysis, and defect risk scoring.
  - Calculate project-wide aggregates: `totalLOC`, `totalFiles`, `meanCC`, `overallDefectProb`, `projectSkillScore`, `projectBadge`, `certEligible`.
- [ ] **Step 3:** Implement UI mode toggle between `📦 Upload Project (.zip)` and `📝 Paste / Single File (.py)`.
- [ ] **Step 4:** Implement Drag-and-Drop file dropzone for `.zip` and `.py` files.
- [ ] **Step 5:** Implement Multi-File Explorer & Table (shows list of files with LOC, CC, Risk, Issues; clicking a file selects it as active file to inspect its findings, metrics, and AI patch).
- [ ] **Step 6:** Update `CertificateModal` to display Project Name, Total Files Reviewed, and Total LOC when in project mode.

---

### Task 3: Build Verification, Git Commit & Server Verification
**Files:**
- Verify: `proofcommit-pro/frontend` build output

- [ ] **Step 1:** Run `npm run build` in `proofcommit-pro/frontend` to ensure 0 errors.
- [ ] **Step 2:** Commit changes to branch `new-ui-upgrade` and push to GitHub.
- [ ] **Step 3:** Confirm local dev server is serving the updated app with ZIP upload support.
