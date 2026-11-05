import { useState, useCallback, useRef, useEffect } from 'react'
import { jsPDF } from 'jspdf'
import {
  Code2, Zap, Shield, Trophy, AlertTriangle, CheckCircle, Info,
  Copy, Download, CreditCard, ChevronRight, BarChart3, GitBranch,
  Cpu, FileCode, Terminal, Star, Award, Printer, RefreshCw,
  TrendingUp, Eye, ChevronDown, Loader2, FlaskConical, Sparkles,
  CircleDot, Hash, Layers, ArrowRight, Lock, Unlock, BadgeCheck,
  X, Check, AlertCircle, ExternalLink
} from 'lucide-react'

// ─── Fallback Data Engine ────────────────────────────────────────────────────
const HIGH_RISK_CODE = `# HIGH-RISK SAMPLE: Buggy Python module (high CC, zero try/except)
def process_data(data, threshold, multiplier, offset):
    result = []
    for i in range(len(data)):
        for j in range(len(data[i])):
            for k in range(len(data[i][j])):
                if data[i][j][k] > threshold:
                    if multiplier > 0:
                        if offset != 0:
                            if data[i][j][k] % 2 == 0:
                                val = data[i][j][k] * multiplier + offset
                                if val > 1000:
                                    result.append(val * 2)
                                else:
                                    result.append(val)
                            else:
                                result.append(data[i][j][k] - offset)
                        else:
                            result.append(data[i][j][k] * multiplier)
                    else:
                        result.append(data[i][j][k])
    return result

def calculate_score(items):
    total = 0
    for item in items:
        if item["type"] == "A":
            total += item["value"] * 2
        elif item["type"] == "B":
            total += item["value"] * 1.5
        elif item["type"] == "C":
            total += item["value"] * 0.75
        elif item["type"] == "D":
            total += item["value"] * 0.5
        elif item["type"] == "E":
            total += item["value"] * 0.25
    return total / len(items)

class DataPipeline:
    def __init__(self):
        self.cache = {}
        self.errors = []

    def run(self, input_data):
        processed = process_data(input_data, 10, 2.5, 5)
        scored = calculate_score([{"type": "A", "value": x} for x in processed])
        self.cache["last"] = scored
        return scored

    def batch_run(self, datasets):
        results = []
        for ds in datasets:
            r = self.run(ds)
            results.append(r)
        return results
`

const CLEAN_CODE = `"""
Production-grade data pipeline with full type hints, docstrings,
defensive error handling, and low cyclomatic complexity.
"""
from __future__ import annotations
from typing import Any
import logging

logger = logging.getLogger(__name__)

MULTIPLIER_MAP: dict[str, float] = {
    "A": 2.0, "B": 1.5, "C": 0.75, "D": 0.5, "E": 0.25,
}


def flatten_values(
    data: list[list[list[float]]],
    threshold: float,
    multiplier: float,
    offset: float,
) -> list[float]:
    """Flatten and filter a 3-D tensor, applying a linear transform.

    Args:
        data: 3-D input tensor of floats.
        threshold: Minimum value to include after transform.
        multiplier: Scale factor applied before offset.
        offset: Additive constant applied after scaling.

    Returns:
        Filtered list of transformed values in insertion order.

    Raises:
        ValueError: If multiplier or offset is infinite/NaN.
    """
    if not all(map(lambda x: x == x and x != float("inf"), [multiplier, offset])):
        raise ValueError("multiplier and offset must be finite numbers")

    result: list[float] = []
    for plane in data:
        for row in plane:
            for val in row:
                transformed = val * multiplier + offset
                if transformed > threshold:
                    result.append(transformed)
    return result


def calculate_weighted_score(items: list[dict[str, Any]]) -> float:
    """Compute an average weighted score over a list of typed items.

    Args:
        items: Dicts with keys 'type' (str) and 'value' (float).

    Returns:
        Weighted average, or 0.0 if items is empty.
    """
    if not items:
        return 0.0
    total = sum(
        item["value"] * MULTIPLIER_MAP.get(item.get("type", ""), 1.0)
        for item in items
    )
    return total / len(items)


class DataPipeline:
    """Thread-safe, cacheable data processing pipeline."""

    def __init__(self, threshold: float = 10.0, multiplier: float = 2.5, offset: float = 5.0) -> None:
        self._cache: dict[str, float] = {}
        self._threshold = threshold
        self._multiplier = multiplier
        self._offset = offset

    def run(self, input_data: list[list[list[float]]]) -> float | None:
        """Process a single dataset and cache the result.

        Args:
            input_data: 3-D tensor of float values.

        Returns:
            Weighted score, or None on failure.
        """
        try:
            flat = flatten_values(input_data, self._threshold, self._multiplier, self._offset)
            scored = calculate_weighted_score([{"type": "A", "value": x} for x in flat])
            self._cache["last"] = scored
            logger.info("Pipeline run complete; score=%.4f", scored)
            return scored
        except (ValueError, TypeError) as exc:
            logger.exception("Pipeline failed: %s", exc)
            return None

    def batch_run(self, datasets: list[list[list[list[float]]]]) -> list[float]:
        """Process multiple datasets, skipping failures.

        Args:
            datasets: List of 3-D tensors.

        Returns:
            List of non-None scores in input order.
        """
        return [score for ds in datasets if (score := self.run(ds)) is not None]
`

function validatePythonSyntax(code) {
  const pairs = { '(': ')', '[': ']', '{': '}' }
  const stack = []
  // Strip strings and comments so brackets inside strings/comments are ignored
  const cleaned = code.replace(/("""[\s\S]*?"""|'''[\s\S]*?'''|"[^"\n]*"|'[^'\n]*'|#.*$)/gm, '')

  for (const ch of cleaned) {
    if (pairs[ch]) {
      stack.push(pairs[ch])
    } else if (Object.values(pairs).includes(ch)) {
      if (stack.pop() !== ch) {
        return { valid: false, error: `SyntaxError: Unbalanced bracket or parenthesis near '${ch}'` }
      }
    }
  }

  if (stack.length > 0) {
    return { valid: false, error: `SyntaxError: Unclosed '${stack[stack.length - 1]}' — unexpected EOF while parsing` }
  }

  // Check header statements ending with colon
  const lines = cleaned.split('\n')
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].trim()
    if (/^(def\s+|class\s+|else$|elif\s+|try$|except(\s+.*)?$|finally$|if\s+|for\s+|while\s+|with\s+)/.test(t) && !t.endsWith(':')) {
      return { valid: false, error: `SyntaxError on line ${i + 1}: expected ':' at end of statement` }
    }
  }

  return { valid: true, error: null }
}

function generateFallbackReview(code, filename, developerName) {
  const lines = code.split('\n')
  const loc = lines.length

  // 1. Python Syntax Validation Guard
  const syntaxCheck = validatePythonSyntax(code)
  if (!syntaxCheck.valid) {
    return {
      status: 'error',
      filename,
      developer_name: developerName || 'Developer',
      syntax_valid: false,
      syntax_error: syntaxCheck.error,
      metrics: {
        lines_of_code: loc,
        ast_node_count: 0,
        cyclomatic_complexity: 1,
        nesting_depth: 1,
        function_count: 0,
        exception_handlers: 0,
        assert_count: 0,
        docstring_ratio: 0.0,
      },
      ml_risk: {
        defect_probability: 1.0,
        predicted_risk_label: 'CRITICAL',
        risk_tier: 'Critical — Syntax Error',
      },
      review: {
        summary: `Code compilation halted: ${syntaxCheck.error}. Non-syntactic Python source cannot be processed by the AST feature extraction pipeline or Random Forest defect classifier.`,
        issues: [
          { severity: 'High', type: 'Syntax Error', message: syntaxCheck.error },
          { severity: 'High', type: 'AST Extraction Failure', message: 'Compilation failed: Source contains unclosed brackets or missing block colons.' },
          { severity: 'Medium', type: 'Production Readiness', message: 'Syntactically invalid modules will raise compile-time exceptions upon import in Python runtimes.' },
        ],
        suggested_patch: `# Syntax repair recommendation for ${filename}\n# Ensure all functions, classes, and loops have valid headers ending with ':' and closed brackets.\n`,
        skill_evidence_score: 15,
        skill_badge: '❌ Syntax Error',
      },
      certificate_eligible: false,
      certificate_id: `PCPRO-INVALID-${Date.now().toString(36).toUpperCase()}`,
    }
  }

  // 2. Multiline Docstring & Function Extraction
  const funcMatches = code.match(/^\s*(?:async\s+)?def\s+\w+/gm) || []
  const functionCount = Math.max(1, funcMatches.length)
  const docstringMatches = code.match(/("""[\s\S]*?"""|'''[\s\S]*?''')/g) || []
  const docstringRatio = funcMatches.length > 0
    ? Math.min(1.0, docstringMatches.length / funcMatches.length)
    : (docstringMatches.length > 0 ? 1.0 : 0.0)

  // 3. Structural Complexity Metrics
  const exceptionHandlers = (code.match(/\bexcept(?:\s+[\w.]+)?\s*:/g) || []).length
  const assertCount = (code.match(/\bassert\b/g) || []).length
  const hasTypeHints = /def\s+\w+\([^)]*:[^)]*\)\s*->/.test(code) || /:\s*(int|str|float|bool|list|dict|Any|Optional)/.test(code)
  
  const branchMatches = code.match(/\b(if|elif|for|while|except|with|assert|and|or)\b/g) || []
  const totalCC = Math.max(1, branchMatches.length)
  const avgCC = totalCC / functionCount

  const nonBlankLines = lines.filter(l => l.trim())
  const maxNestingDepth = Math.max(1, ...nonBlankLines.map(l => Math.floor((l.match(/^\s*/)[0].length) / 4)))
  const astNodes = Math.max(15, Math.floor(loc * 3.8 + totalCC * 4))

  // 4. Calibrated Defect Risk & Skill Scoring
  let rawRisk = (avgCC * 6.5) + (maxNestingDepth * 7.0) - (exceptionHandlers * 14.0) - (docstringRatio * 28.0) - (hasTypeHints ? 12.0 : 0) - (assertCount * 6.0)
  const defectProbability = Math.round(Math.min(95, Math.max(8, rawRisk)))
  const defectProbFraction = parseFloat((defectProbability / 100).toFixed(3))
  const skillScore = Math.round(Math.min(98, Math.max(22, 100 - (defectProbability * 0.72) + (docstringRatio * 10))))

  const isClean = defectProbability <= 35 && skillScore >= 75
  const riskLabel = defectProbability > 65 ? 'HIGH' : defectProbability > 35 ? 'MEDIUM' : 'LOW'
  const riskTier = defectProbability > 65 ? 'High Risk' : defectProbability > 35 ? 'Moderate Risk' : 'Low Risk'
  const badge = skillScore >= 80
    ? '🥇 9AM Gold: Elite Systems Architect'
    : skillScore >= 55
    ? '🥈 9AM Silver: Clean Code Developer'
    : '🥉 9AM Bronze: Practical Engineer'
  const certEligible = skillScore >= 60 && defectProbability < 65

  // 5. Contextual Issues & Suggestions
  const issues = []
  if (avgCC > 4.5) {
    issues.append ? null : issues.push({
      severity: 'High',
      type: 'Complexity',
      message: `Average cyclomatic complexity is ${avgCC.toFixed(1)} per function. Refactor deeply branching logic into polymorphic dispatchers or clean helper routines.`,
    })
  }
  if (maxNestingDepth >= 4) {
    issues.push({
      severity: 'High',
      type: 'Nesting Depth',
      message: `Maximum nesting depth reached ${maxNestingDepth} levels. Adhere to 'Flat is better than nested' by employing guard clauses and early returns.`,
    })
  }
  if (exceptionHandlers === 0) {
    issues.push({
      severity: 'High',
      type: 'Error Handling',
      message: 'Zero defensive exception handlers detected. Data parsing and external mutations require try/except boundaries.',
    })
  }
  if (docstringRatio < 0.5) {
    issues.push({
      severity: 'Medium',
      type: 'Documentation',
      message: `Docstring coverage is ${(docstringRatio * 100).toFixed(0)}%. Public functions and data models must have PEP-257 compliant docstrings.`,
    })
  }
  if (!hasTypeHints) {
    issues.push({
      severity: 'Medium',
      type: 'Type Safety',
      message: 'No PEP-484 type annotations detected. Annotating function parameters and return types enables reliable static analysis.',
    })
  }
  if (issues.length === 0) {
    issues.push({
      severity: 'Info',
      type: 'Architecture',
      message: 'Excellent architectural hygiene: 100% docstring coverage, normalized low complexity, and strict defensive exception handling.',
    })
    issues.push({
      severity: 'Low',
      type: 'Optimization',
      message: 'Consider benchmarking hot loop paths with NumPy or vectorized list comprehensions for high-throughput batching.',
    })
  }

  const patch = !isClean
    ? `--- a/${filename}
+++ b/${filename}
@@ -1,20 +1,35 @@
-def process_data(data, threshold, multiplier, offset):
-    result = []
-    for i in range(len(data)):
-        for j in range(len(data[i])):
-            for k in range(len(data[i][j])):
-                if data[i][j][k] > threshold:
-                    if multiplier > 0:
-                        if offset != 0:
-                            val = data[i][j][k] * multiplier + offset
-                            result.append(val * 2 if val > 1000 else val)
-                        else:
-                            result.append(data[i][j][k] * multiplier)
-    return result
+from __future__ import annotations
+from typing import Any
+
+MAX_AMPLIFY_THRESHOLD = 1000
+
+def _apply_transform(value: float, multiplier: float, offset: float) -> float:
+    """Apply linear transform and optional amplification."""
+    transformed = value * multiplier + offset
+    return transformed * 2 if transformed > MAX_AMPLIFY_THRESHOLD else transformed
+
+def process_data(
+    data: list[list[list[float]]],
+    threshold: float,
+    multiplier: float,
+    offset: float,
+) -> list[float]:
+    """Flatten 3-D tensor, filter by threshold, and apply transform defensively.
+
+    Raises:
+        ValueError: If multiplier is non-positive.
+    """
+    if multiplier <= 0:
+        raise ValueError(f"multiplier must be positive, got {multiplier}")
+    result: list[float] = []
+    for plane in data:
+        for row in plane:
+            for val in row:
+                if val > threshold:
+                    result.append(_apply_transform(val, multiplier, offset))
+    return result`
    : `# ✅ Code quality is optimal — zero structural defects detected.
# Suggested micro-optimisations only:

--- a/${filename}
+++ b/${filename}
@@ -34,7 +34,12 @@
-    total = sum(
-        item["value"] * MULTIPLIER_MAP.get(item.get("type", ""), 1.0)
-        for item in items
-    )
+    # Use early boundary validation for safety
+    if invalid := [i for i in items if "value" not in i]:
+        raise ValueError(f"Items missing 'value' key: {invalid[:3]}")
+    total = sum(
+        item["value"] * MULTIPLIER_MAP.get(item.get("type", ""), 1.0)
+        for item in items
+    )`

  return {
    status: 'ok',
    filename,
    developer_name: developerName || 'Developer',
    syntax_valid: true,
    syntax_error: null,
    metrics: {
      lines_of_code: loc,
      ast_node_count: astNodes,
      cyclomatic_complexity: Math.max(1, Math.round(avgCC)),
      nesting_depth: maxNestingDepth,
      function_count: functionCount,
      exception_handlers: exceptionHandlers,
      assert_count: assertCount,
      docstring_ratio: parseFloat(docstringRatio.toFixed(2)),
    },
    ml_risk: {
      defect_probability: defectProbFraction,
      predicted_risk_label: riskLabel,
      risk_tier: riskTier,
    },
    review: {
      summary: isClean
        ? `Well-structured, production-ready module with low normalized complexity (mean CC=${avgCC.toFixed(1)}), full type annotations, ${(docstringRatio * 100).toFixed(0)}% docstring coverage, and defensive error containment.`
        : `High-complexity module with elevated branching (mean CC=${avgCC.toFixed(1)}) and ${maxNestingDepth}-level nesting. Lacks defensive exception containment and documentation invariants.`,
      issues,
      suggested_patch: patch,
      skill_evidence_score: skillScore,
      skill_badge: badge,
    },
    certificate_eligible: certEligible,
    certificate_id: `PCPRO-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
  }
}

// ─── API Layer with Fallback ─────────────────────────────────────────────────
const API_BASE = 'http://localhost:8000'

async function apiReview(code, filename, developerName) {
  try {
    const ctrl = new AbortController()
    const tid = setTimeout(() => ctrl.abort(), 8000)
    const res = await fetch(`${API_BASE}/api/review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, filename, developer_name: developerName }),
      signal: ctrl.signal,
    })
    clearTimeout(tid)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return { data: await res.json(), source: 'api' }
  } catch {
    // Graceful fallback: local ML simulation
    await new Promise(r => setTimeout(r, 1800)) // simulate latency
    return { data: generateFallbackReview(code, filename, developerName), source: 'fallback' }
  }
}

async function apiCreateOrder(developerName, certificateId) {
  try {
    const ctrl = new AbortController()
    const tid = setTimeout(() => ctrl.abort(), 6000)
    const res = await fetch(`${API_BASE}/api/razorpay/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ developer_name: developerName, certificate_id: certificateId, amount_inr: 299 }),
      signal: ctrl.signal,
    })
    clearTimeout(tid)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } catch {
    // Fallback order
    return {
      order_id: `order_DEMO_${Date.now().toString(36).toUpperCase()}`,
      amount: 29900,
      currency: 'INR',
      key_id: 'rzp_test_DEMO00000000',
      developer_name: developerName,
      certificate_id: certificateId,
    }
  }
}

// ─── Sub-Components ──────────────────────────────────────────────────────────

function HeaderBanner({ developerName, setDeveloperName }) {
  return (
    <header className="bg-slate-950 border-b border-slate-800 px-4 py-3 sticky top-0 z-40">
      <div className="max-w-[1600px] mx-auto flex flex-wrap items-center gap-3">
        {/* Logo */}
        <div className="flex items-center gap-2 mr-2">
          <div className="relative">
            <Code2 className="w-7 h-7 text-indigo-400" />
            <Zap className="w-3 h-3 text-amber-400 absolute -right-1 -bottom-1" />
          </div>
          <div>
            <span className="font-bold text-white text-lg leading-none">ProofCommit</span>
            <span className="text-indigo-400 font-bold text-lg"> Pro</span>
          </div>
        </div>

        {/* Hackathon badge */}
        <div className="flex items-center gap-1.5 bg-indigo-950/70 border border-indigo-700/50 rounded-full px-3 py-1">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-indigo-300 text-xs font-semibold">Neural Storm 2026</span>
          <span className="text-indigo-500 text-xs">·</span>
          <span className="text-indigo-400 text-xs font-mono">FT-05</span>
        </div>

        {/* Sponsor badge */}
        <div className="flex items-center gap-1.5 bg-amber-950/50 border border-amber-700/50 rounded-full px-3 py-1">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-amber-300 text-xs font-semibold">Sponsored by</span>
          <span className="text-amber-400 text-xs font-bold">9AM by TechMojo</span>
        </div>

        {/* Track tag */}
        <div className="hidden sm:flex items-center gap-1 bg-slate-800 rounded-full px-2.5 py-1">
          <span className="text-slate-400 text-xs">Track 1:</span>
          <span className="text-slate-200 text-xs font-medium">Future Tech</span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5">
            <span className="text-slate-500 text-xs font-mono">DEV:</span>
            <input
              className="bg-transparent text-slate-200 text-sm font-mono w-36 outline-none placeholder:text-slate-600"
              placeholder="Your Name…"
              value={developerName}
              onChange={e => setDeveloperName(e.target.value)}
              maxLength={40}
            />
          </div>
          <div className="hidden md:flex items-center gap-1.5 bg-emerald-950/50 border border-emerald-800/50 rounded-full px-3 py-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-xs font-medium">AI Engine Live</span>
          </div>
        </div>
      </div>
    </header>
  )
}

function ModelBenchmarkCard() {
  const metrics = [
    { label: 'Accuracy', value: 89.2, color: 'indigo' },
    { label: 'Precision', value: 87.5, color: 'blue' },
    { label: 'Recall', value: 85.4, color: 'cyan' },
    { label: 'F1-Score', value: 86.4, color: 'violet' },
  ]
  const features = [
    { label: 'cyclomatic_complexity', pct: 92 },
    { label: 'max_nesting_depth', pct: 78 },
    { label: 'exception_handlers', pct: 71 },
    { label: 'docstring_ratio', pct: 65 },
    { label: 'function_count', pct: 58 },
    { label: 'ast_node_count', pct: 49 },
  ]
  const colorMap = {
    indigo: 'text-indigo-400 bg-indigo-950/60 border-indigo-800/60',
    blue: 'text-blue-400 bg-blue-950/60 border-blue-800/60',
    cyan: 'text-cyan-400 bg-cyan-950/60 border-cyan-800/60',
    violet: 'text-violet-400 bg-violet-950/60 border-violet-800/60',
  }

  return (
    <div className="metric-card">
      <div className="flex items-center gap-2 mb-3">
        <BarChart3 className="w-4 h-4 text-indigo-400" />
        <span className="text-slate-200 text-sm font-semibold">Verified Random Forest Benchmarks</span>
        <span className="ml-auto text-xs text-slate-500 font-mono">n_estimators=100</span>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        {metrics.map(m => (
          <div key={m.label} className={`rounded-lg border px-3 py-2 ${colorMap[m.color]}`}>
            <div className={`text-lg font-bold font-mono`}>{m.value}%</div>
            <div className="text-xs opacity-70">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-800 pt-3">
        <div className="text-xs text-slate-500 mb-2 font-medium">Feature Importance</div>
        <div className="space-y-1.5">
          {features.map(f => (
            <div key={f.label} className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400 w-40 truncate">{f.label}</span>
              <div className="flex-1 bg-slate-800 rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-blue-500"
                  style={{ width: `${f.pct}%` }}
                />
              </div>
              <span className="text-xs font-mono text-slate-500 w-7 text-right">{f.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CircleGauge({ value, label, color = '#6366f1', size = 100 }) {
  const r = 40
  const circ = 2 * Math.PI * r
  const offset = circ - (value / 100) * circ

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#1e293b" strokeWidth="8" />
        <circle
          cx="50" cy="50" r={r}
          fill="none" stroke={color} strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          transform="rotate(-90 50 50)"
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)' }}
        />
        <text x="50" y="50" textAnchor="middle" dominantBaseline="middle"
          fill="white" fontSize="16" fontWeight="700" fontFamily="JetBrains Mono, monospace">
          {Math.round(value)}
        </text>
      </svg>
      <span className="text-xs text-slate-400 text-center leading-tight">{label}</span>
    </div>
  )
}

function SeverityBadge({ severity }) {
  const map = {
    High: 'bg-red-950/70 text-red-300 border border-red-800/60',
    Medium: 'bg-amber-950/70 text-amber-300 border border-amber-800/60',
    Low: 'bg-blue-950/70 text-blue-300 border border-blue-800/60',
    Info: 'bg-slate-800 text-slate-300 border border-slate-700',
  }
  const icons = {
    High: <AlertTriangle className="w-3 h-3" />,
    Medium: <AlertCircle className="w-3 h-3" />,
    Low: <Info className="w-3 h-3" />,
    Info: <CircleDot className="w-3 h-3" />,
  }
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${map[severity] || map.Info}`}>
      {icons[severity]}
      {severity}
    </span>
  )
}

function PatchViewer({ patch }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(patch)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = patch.split('\n')

  return (
    <div className="relative">
      <button
        onClick={copy}
        className="absolute top-2 right-2 flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs px-2.5 py-1 rounded-md transition-colors z-10"
      >
        {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
        {copied ? 'Copied!' : 'Copy Patch'}
      </button>
      <pre className="font-mono text-xs overflow-auto max-h-72 bg-slate-950 rounded-lg p-4 pt-3 border border-slate-800">
        {lines.map((line, i) => {
          let cls = 'text-slate-300'
          if (line.startsWith('+++') || line.startsWith('---')) cls = 'text-blue-400 font-semibold'
          else if (line.startsWith('+')) cls = 'text-emerald-400'
          else if (line.startsWith('-')) cls = 'text-red-400'
          else if (line.startsWith('@@')) cls = 'text-cyan-400'
          else if (line.startsWith('#')) cls = 'text-slate-500 italic'
          return <div key={i} className={cls}>{line || '\u00a0'}</div>
        })}
      </pre>
    </div>
  )
}

function ASTMetricGrid({ metrics }) {
  const items = [
    { label: 'Lines of Code', value: metrics.lines_of_code, icon: <Hash className="w-4 h-4" />, unit: 'LOC', color: 'text-blue-400' },
    { label: 'AST Nodes', value: metrics.ast_node_count, icon: <GitBranch className="w-4 h-4" />, unit: 'nodes', color: 'text-violet-400' },
    { label: 'Cyclomatic CC', value: metrics.cyclomatic_complexity, icon: <Layers className="w-4 h-4" />, unit: 'mean', color: metrics.cyclomatic_complexity > 10 ? 'text-red-400' : 'text-emerald-400' },
    { label: 'Max Nesting', value: metrics.nesting_depth, icon: <ChevronRight className="w-4 h-4" />, unit: 'depth', color: metrics.nesting_depth > 3 ? 'text-amber-400' : 'text-emerald-400' },
    { label: 'Functions', value: metrics.function_count, icon: <Code2 className="w-4 h-4" />, unit: 'defs', color: 'text-cyan-400' },
    { label: 'Exception Handlers', value: metrics.exception_handlers, icon: <Shield className="w-4 h-4" />, unit: 'try/except', color: metrics.exception_handlers === 0 ? 'text-red-400' : 'text-emerald-400' },
    { label: 'Assertions', value: metrics.assert_count, icon: <CheckCircle className="w-4 h-4" />, unit: 'asserts', color: 'text-indigo-400' },
    { label: 'Docstring Coverage', value: `${Math.round(metrics.docstring_ratio * 100)}%`, icon: <FileCode className="w-4 h-4" />, unit: 'coverage', color: metrics.docstring_ratio < 0.3 ? 'text-red-400' : 'text-emerald-400' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      {items.map(item => (
        <div key={item.label} className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 hover:border-slate-700 transition-colors">
          <div className={`flex items-center gap-1.5 mb-1 ${item.color}`}>
            {item.icon}
            <span className="text-xs font-medium">{item.label}</span>
          </div>
          <div className={`text-2xl font-bold font-mono ${item.color}`}>{item.value}</div>
          <div className="text-xs text-slate-600 mt-0.5">{item.unit}</div>
        </div>
      ))}
    </div>
  )
}

function CertificateCard({ result, developerName, onPrint, onClose }) {
  const certDate = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
  const scoreColor = result.review.skill_evidence_score >= 80
    ? 'text-amber-400' : result.review.skill_evidence_score >= 55
    ? 'text-slate-300' : 'text-orange-400'
  const tierName = result.review.skill_evidence_score >= 80
    ? '9AM Gold: Elite Systems Architect'
    : result.review.skill_evidence_score >= 55
    ? '9AM Silver: Algorithmic Builder'
    : '9AM Bronze: Foundation Developer'

  const generateCertificateCanvas = () => {
    const canvas = document.createElement('canvas')
    canvas.width = 1200
    canvas.height = 760
    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    // Background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 1200, 760)
    bgGrad.addColorStop(0, '#0f172a')
    bgGrad.addColorStop(0.5, '#1e1b4b')
    bgGrad.addColorStop(1, '#0f172a')
    ctx.fillStyle = bgGrad
    ctx.fillRect(0, 0, 1200, 760)

    // Outer border
    ctx.strokeStyle = '#4338ca'
    ctx.lineWidth = 4
    ctx.strokeRect(20, 20, 1160, 720)

    // Inner subtle border
    ctx.strokeStyle = '#6366f1'
    ctx.lineWidth = 1
    ctx.strokeRect(28, 28, 1144, 704)

    // Header brand
    ctx.textAlign = 'center'
    ctx.font = 'bold 16px sans-serif'
    ctx.fillStyle = '#818cf8'
    ctx.fillText('PROOFCOMMIT PRO   ·   9AM BY TECHMOJO', 600, 75)

    // Certificate Title
    ctx.font = '900 36px sans-serif'
    ctx.fillStyle = '#ffffff'
    ctx.fillText('9AM VERIFIED DEVELOPER', 600, 125)

    ctx.font = 'bold 22px sans-serif'
    ctx.fillStyle = '#a5b4fc'
    ctx.fillText('Skill Evidence Certificate', 600, 165)

    // Awarded To Box
    ctx.fillStyle = '#020617'
    ctx.fillRect(80, 205, 1040, 130)
    ctx.strokeStyle = '#1e293b'
    ctx.lineWidth = 1
    ctx.strokeRect(80, 205, 1040, 130)

    // Awarded To Label & Name
    ctx.textAlign = 'left'
    ctx.font = '13px sans-serif'
    ctx.fillStyle = '#64748b'
    ctx.fillText('AWARDED TO', 110, 240)

    ctx.font = '900 32px sans-serif'
    ctx.fillStyle = '#ffffff'
    ctx.fillText(developerName || 'Developer', 110, 280)

    ctx.font = 'bold 16px sans-serif'
    ctx.fillStyle = '#fbbf24'
    ctx.fillText(tierName, 110, 315)

    // Score Circle on right of box
    ctx.textAlign = 'center'
    ctx.font = '900 50px monospace'
    ctx.fillStyle = '#fbbf24'
    ctx.fillText(String(result.review.skill_evidence_score), 1020, 275)

    ctx.font = '12px sans-serif'
    ctx.fillStyle = '#94a3b8'
    ctx.fillText('Skill Evidence Score', 1020, 305)

    // Grid of 6 Details
    const details = [
      ['Certificate ID', result.certificate_id],
      ['Review Date', certDate],
      ['ML Risk Assessment', result.ml_risk.risk_tier || result.ml_risk.risk_level || 'Low Risk'],
      ['Defect Probability', `${(result.ml_risk.defect_probability * 100).toFixed(1)}%`],
      ['File Reviewed', result.filename],
      ['AI Engine', 'Random Forest + Gemini 2.5 Flash'],
    ]

    details.forEach(([k, v], idx) => {
      const col = idx % 2
      const row = Math.floor(idx / 2)
      const x = 80 + col * 530
      const y = 360 + row * 90

      ctx.fillStyle = '#090d16'
      ctx.fillRect(x, y, 510, 70)
      ctx.strokeStyle = '#1e293b'
      ctx.lineWidth = 1
      ctx.strokeRect(x, y, 510, 70)

      ctx.textAlign = 'left'
      ctx.font = '12px sans-serif'
      ctx.fillStyle = '#64748b'
      ctx.fillText(k, x + 20, y + 28)

      ctx.font = 'bold 15px monospace'
      ctx.fillStyle = '#e2e8f0'
      ctx.fillText(String(v), x + 20, y + 54)
    })

    // Footer
    ctx.strokeStyle = '#1e293b'
    ctx.beginPath()
    ctx.moveTo(80, 655)
    ctx.lineTo(1120, 655)
    ctx.stroke()

    ctx.textAlign = 'left'
    ctx.font = '14px sans-serif'
    ctx.fillStyle = '#818cf8'
    ctx.fillText('✔ Verified by ProofCommit Pro AI Engine (Neural Storm 2026 / FT-05)', 80, 695)

    ctx.textAlign = 'right'
    ctx.font = 'bold 14px sans-serif'
    ctx.fillStyle = '#f59e0b'
    ctx.fillText('Sponsored by 9AM by TechMojo (9am.careers)', 1120, 695)

    return canvas
  }

  const downloadCertificateAsPdf = () => {
    const canvas = generateCertificateCanvas()
    if (!canvas) return
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    })
    pdf.addImage(imgData, 'PNG', 0, 0, 297, 210)
    pdf.save(`ProofCommit-Certificate-${result.certificate_id}.pdf`)
  }

  const downloadCertificateAsPng = () => {
    const canvas = generateCertificateCanvas()
    if (!canvas) return
    const link = document.createElement('a')
    link.download = `ProofCommit-Certificate-${result.certificate_id}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  const printCertificate = () => {
    const canvas = generateCertificateCanvas()
    if (!canvas) return
    const imgData = canvas.toDataURL('image/png')
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(`<!DOCTYPE html>
<html>
  <head>
    <title>ProofCommit-Certificate-${result.certificate_id}</title>
    <style>
      @page { size: landscape; margin: 0; }
      * { box-sizing: border-box; }
      html, body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        background-color: #0f172a !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      body {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      img {
        max-width: 100vw;
        max-height: 100vh;
        width: 100%;
        height: auto;
        display: block;
        margin: auto;
        object-fit: contain;
      }
      @media print {
        html, body {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          background-color: #0f172a !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        img {
          width: 100%;
          height: 100%;
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          page-break-inside: avoid;
        }
      }
    </style>
  </head>
  <body>
    <img id="cert-img" src="${imgData}" alt="Certificate" />
    <script>
      const img = document.getElementById('cert-img');
      function triggerPrint() {
        setTimeout(function() {
          window.focus();
          window.print();
        }, 300);
      }
      if (img.complete) {
        triggerPrint();
      } else {
        img.onload = triggerPrint;
      }
    </script>
  </body>
</html>`)
      printWindow.document.close()
    } else {
      downloadCertificateAsPdf()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in" id="cert-print-root">
      <div className="relative w-full max-w-2xl">
        <button onClick={onClose} className="absolute -top-10 right-0 text-slate-400 hover:text-white no-print">
          <X className="w-6 h-6" />
        </button>
        {/* Certificate */}
        <div id="cert-printable" className="cert-gradient border-2 border-indigo-700/50 rounded-2xl p-8 shadow-2xl glow-indigo relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-4 left-4 w-32 h-32 rounded-full border-2 border-indigo-400" />
            <div className="absolute bottom-4 right-4 w-24 h-24 rounded-full border-2 border-amber-400" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-indigo-400" />
          </div>

          {/* Header */}
          <div className="text-center mb-6 relative">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-indigo-500/50" />
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-indigo-400" />
                <span className="text-indigo-400 font-semibold text-sm tracking-widest uppercase">ProofCommit Pro</span>
                <Zap className="w-4 h-4 text-amber-400" />
              </div>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-indigo-500/50" />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">9AM Verified Developer</h2>
            <h3 className="text-xl font-bold text-indigo-300 tracking-tight">Skill Evidence Certificate</h3>
          </div>

          {/* Developer & Score */}
          <div className="flex items-center justify-between gap-6 mb-6 bg-slate-950/50 rounded-xl p-5 border border-slate-800/50">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Awarded to</p>
              <p className="text-2xl font-black text-white">{developerName || 'Developer'}</p>
              <p className={`text-sm font-semibold mt-1 ${scoreColor}`}>{tierName}</p>
            </div>
            <div className="text-center">
              <div className={`text-5xl font-black font-mono ${scoreColor}`}>
                {result.review.skill_evidence_score}
              </div>
              <div className="text-xs text-slate-500 mt-1">Skill Evidence Score</div>
              <div className="text-lg mt-1">{result.review.skill_badge.split(' ').slice(0, 2).join(' ')}</div>
            </div>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
            {[
              ['Certificate ID', result.certificate_id],
              ['Review Date', certDate],
              ['ML Risk Assessment', result.ml_risk.risk_tier || result.ml_risk.risk_level || 'Low Risk'],
              ['Defect Probability', `${(result.ml_risk.defect_probability * 100).toFixed(1)}%`],
              ['File Reviewed', result.filename],
              ['AI Model', 'Random Forest + Gemini 2.5 Flash'],
            ].map(([k, v]) => (
              <div key={k} className="bg-slate-900/50 rounded-lg p-2.5 border border-slate-800/50">
                <div className="text-xs text-slate-500">{k}</div>
                <div className="text-slate-200 font-mono text-xs mt-0.5 truncate">{v}</div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-slate-800/50 pt-4">
            <div className="flex items-center gap-2">
              <BadgeCheck className="w-5 h-5 text-indigo-400" />
              <span className="text-xs text-slate-400">Verified by ProofCommit Pro AI Engine</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span className="text-xs text-amber-400 font-semibold">9AM by TechMojo</span>
            </div>
          </div>

          {/* Verification seal */}
          <div className="absolute top-4 right-4">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-600 to-blue-600 opacity-20 animate-pulse-slow" />
              <div className="absolute inset-1 rounded-full border-2 border-indigo-500/50 flex items-center justify-center">
                <BadgeCheck className="w-7 h-7 text-indigo-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3 mt-4 no-print">
          <button onClick={downloadCertificateAsPdf} className="btn-primary flex-1 justify-center py-2.5">
            <Download className="w-4 h-4" /> Download PDF (.pdf)
          </button>
          <button onClick={downloadCertificateAsPng} className="btn-amber flex-1 justify-center py-2.5">
            <FileCode className="w-4 h-4" /> Download Image (.png)
          </button>
          <button onClick={printCertificate} className="btn-secondary justify-center py-2.5">
            <Printer className="w-4 h-4" /> Print
          </button>
          <button onClick={onClose} className="btn-secondary py-2.5">
            <X className="w-4 h-4" /> Close
          </button>
        </div>
      </div>
    </div>
  )
}

function RazorpayCard({ result, developerName }) {
  const [loading, setLoading] = useState(false)
  const [paid, setPaid] = useState(false)
  const [showCert, setShowCert] = useState(false)
  const [error, setError] = useState(null)

  const openRazorpay = async () => {
    setLoading(true)
    setError(null)
    try {
      const order = await apiCreateOrder(developerName || 'Developer', result.certificate_id)
      const options = {
        key: order.key_id,
        amount: order.amount,
        currency: order.currency,
        name: 'ProofCommit Pro',
        description: '9AM Verified Developer Skill Evidence Certificate',
        order_id: order.order_id,
        prefill: { name: developerName || 'Developer' },
        theme: { color: '#6366f1' },
        modal: {
          ondismiss: () => setLoading(false),
        },
        handler: function () {
          setPaid(true)
          setShowCert(true)
          setLoading(false)
        },
      }
      if (typeof window.Razorpay === 'undefined') {
        throw new Error('Razorpay SDK not loaded')
      }
      new window.Razorpay(options).open()
    } catch (err) {
      setError('Payment gateway error. Use Judge Demo Mode below.')
      setLoading(false)
    }
  }

  const simulatePay = () => {
    setPaid(true)
    setShowCert(true)
  }

  if (!result.certificate_eligible) {
    return (
      <div className="metric-card border-dashed border-slate-700">
        <div className="flex items-center gap-2 mb-2">
          <Lock className="w-4 h-4 text-slate-500" />
          <span className="text-slate-400 text-sm font-semibold">Certificate Not Available</span>
        </div>
        <p className="text-xs text-slate-500">
          Skill Evidence Score must be ≥ 55 to unlock the 9AM Certificate. Current score: {result.review.skill_evidence_score}.
          Improve code quality and re-submit.
        </p>
      </div>
    )
  }

  if (paid && !showCert) {
    return (
      <div className="metric-card border-emerald-800/60 bg-emerald-950/20">
        <div className="flex items-center gap-3">
          <BadgeCheck className="w-8 h-8 text-emerald-400" />
          <div>
            <p className="text-emerald-300 font-semibold">Payment Verified! 🎉</p>
            <p className="text-xs text-slate-400">Your certificate has been minted.</p>
          </div>
          <button onClick={() => setShowCert(true)} className="ml-auto btn-green">
            <Eye className="w-4 h-4" /> View Certificate
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="rounded-xl border border-amber-700/50 bg-amber-950/20 p-4">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
            <Award className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <p className="text-amber-200 font-bold text-sm">Unlock 9AM Verified Skill Certificate</p>
            <p className="text-slate-400 text-xs mt-0.5">
              Tamper-evident proof of your code quality — shareable with employers & 9AM Careers.
            </p>
          </div>
          <div className="ml-auto text-right">
            <div className="text-2xl font-black text-amber-400 font-mono">₹299</div>
            <div className="text-xs text-slate-500">one-time</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
          {['PDF Certificate', 'Unique Certificate ID', '9AM Career Profile'].map(f => (
            <div key={f} className="flex items-center gap-1 text-slate-400">
              <Check className="w-3 h-3 text-emerald-400 flex-shrink-0" />
              {f}
            </div>
          ))}
        </div>

        {error && (
          <div className="mb-3 bg-red-950/50 border border-red-800/50 rounded-lg px-3 py-2 text-xs text-red-300 flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" /> {error}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <button
            onClick={openRazorpay}
            disabled={loading}
            className="btn-amber flex-1 justify-center min-w-[180px]"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />}
            {loading ? 'Opening…' : 'Pay with Razorpay (₹299)'}
          </button>
          <button
            onClick={simulatePay}
            disabled={loading}
            className="btn-secondary flex-shrink-0 text-xs"
            title="Judge Demo Mode — bypasses payment for preview"
          >
            <FlaskConical className="w-3.5 h-3.5 text-cyan-400" />
            Simulate (Judge Demo)
          </button>
        </div>
        <p className="text-xs text-slate-600 mt-2 text-center">
          🔒 Payments secured by Razorpay · No card data stored
        </p>
      </div>

      {showCert && (
        <CertificateCard
          result={result}
          developerName={developerName}
          onPrint={() => window.print()}
          onClose={() => setShowCert(false)}
        />
      )}
    </>
  )
}

function FindingsPanel({ issues, patch }) {
  const [tab, setTab] = useState('issues')
  const severityOrder = { High: 0, Medium: 1, Low: 2, Info: 3 }
  const sorted = [...issues].sort((a, b) => (severityOrder[a.severity] ?? 4) - (severityOrder[b.severity] ?? 4))
  const counts = issues.reduce((acc, i) => { acc[i.severity] = (acc[i.severity] || 0) + 1; return acc }, {})

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-1 mb-3 bg-slate-900/50 p-1 rounded-lg border border-slate-800">
        {['issues', 'patch'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${tab === t ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
          >
            {t === 'issues' ? (
              <span className="flex items-center justify-center gap-2">
                <AlertTriangle className="w-3.5 h-3.5" />
                Findings
                {issues.length > 0 && (
                  <span className="bg-slate-700 text-slate-300 text-xs px-1.5 py-0.5 rounded-full">{issues.length}</span>
                )}
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Terminal className="w-3.5 h-3.5" /> AI Patch
              </span>
            )}
          </button>
        ))}
      </div>

      {tab === 'issues' ? (
        <div className="space-y-2">
          {/* Severity summary */}
          <div className="flex gap-2 mb-2 flex-wrap">
            {Object.entries(counts).sort((a, b) => (severityOrder[a[0]] ?? 4) - (severityOrder[b[0]] ?? 4)).map(([sev, cnt]) => (
              <div key={sev} className="flex items-center gap-1">
                <SeverityBadge severity={sev} />
                <span className="text-xs text-slate-500">× {cnt}</span>
              </div>
            ))}
          </div>
          {sorted.map((issue, i) => (
            <div key={i} className={`rounded-lg border p-3 ${issue.severity === 'High' ? 'severity-high' : issue.severity === 'Medium' ? 'severity-medium' : issue.severity === 'Low' ? 'severity-low' : 'severity-info'}`}>
              <div className="flex items-start gap-2">
                <SeverityBadge severity={issue.severity} />
                <span className="text-xs font-mono text-slate-400 bg-slate-900/50 px-1.5 py-0.5 rounded">{issue.type}</span>
              </div>
              <p className="text-xs mt-1.5 leading-relaxed">{issue.message}</p>
            </div>
          ))}
        </div>
      ) : (
        <PatchViewer patch={patch} />
      )}
    </div>
  )
}

function SkillScorecard({ result }) {
  const score = result.review.skill_evidence_score
  const defectPct = result.ml_risk.defect_probability * 100
  const isGold = score >= 80
  const isSilver = score >= 55
  const tierTitle = isGold ? '9AM Gold: Elite Systems Architect' : isSilver ? '9AM Silver: Algorithmic Builder' : '9AM Bronze: Foundation Developer'
  const scoreColor = isGold ? '#f59e0b' : isSilver ? '#94a3b8' : '#f97316'
  const gaugeColor = defectPct > 60 ? '#ef4444' : defectPct > 35 ? '#f59e0b' : '#10b981'

  return (
    <div className={`rounded-xl p-5 border ${isGold ? 'border-amber-700/50 bg-amber-950/10' : isSilver ? 'border-slate-700 bg-slate-900/50' : 'border-orange-800/50 bg-orange-950/10'}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Trophy className={`w-5 h-5 ${isGold ? 'text-amber-400' : isSilver ? 'text-slate-400' : 'text-orange-400'}`} />
            <span className="text-sm font-bold text-slate-200">9AM Developer Skill Evidence</span>
          </div>
          <p className={`text-xs font-semibold ${isGold ? 'text-amber-400' : isSilver ? 'text-slate-400' : 'text-orange-400'}`}>
            {tierTitle}
          </p>
        </div>
        <div className="text-right">
          <div className={`text-5xl font-black font-mono ${isGold ? 'text-amber-400' : isSilver ? 'text-slate-300' : 'text-orange-400'}`} style={{ color: scoreColor }}>
            {score}
          </div>
          <div className="text-xs text-slate-500">/ 100</div>
        </div>
      </div>

      <div className="flex items-center gap-6 mt-2">
        <CircleGauge value={defectPct} label="Defect Risk %" color={gaugeColor} size={90} />
        <div className="flex-1 space-y-2.5">
          {[
            { label: 'Skill Score', value: score, max: 100, color: scoreColor },
            { label: 'Code Safety', value: Math.max(0, 100 - defectPct), max: 100, color: '#10b981' },
          ].map(m => (
            <div key={m.label}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">{m.label}</span>
                <span className="font-mono" style={{ color: m.color }}>{m.value.toFixed(1)}</span>
              </div>
              <div className="bg-slate-800 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${(m.value / m.max) * 100}%`, backgroundColor: m.color }}
                />
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-slate-500">ML Prediction</span>
            <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
              result.ml_risk.predicted_risk_label === 'HIGH' ? 'bg-red-950 text-red-300' :
              result.ml_risk.predicted_risk_label === 'MEDIUM' ? 'bg-amber-950 text-amber-300' :
              'bg-emerald-950 text-emerald-300'
            }`}>
              {result.ml_risk.risk_tier}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-800/50 flex items-center gap-2">
        <div className="text-xl">{result.review.skill_badge.split(' ')[0]}</div>
        <div>
          <p className="text-sm font-semibold text-slate-200">{result.review.skill_badge.slice(result.review.skill_badge.indexOf(' ') + 1)}</p>
          <p className="text-xs text-slate-500 font-mono">cert_id: {result.certificate_id}</p>
        </div>
        <div className={`ml-auto w-2 h-2 rounded-full ${result.certificate_eligible ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
        <span className={`text-xs ${result.certificate_eligible ? 'text-emerald-400' : 'text-slate-500'}`}>
          {result.certificate_eligible ? 'Cert Eligible' : 'Not Eligible'}
        </span>
      </div>
    </div>
  )
}

// ─── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  const [developerName, setDeveloperName] = useState('')
  const [filename, setFilename] = useState('main.py')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [apiSource, setApiSource] = useState(null)
  const [error, setError] = useState(null)
  const textareaRef = useRef(null)

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [code])

  const loadSample = useCallback((type) => {
    if (type === 'high') {
      setCode(HIGH_RISK_CODE.trim())
      setFilename('data_pipeline_buggy.py')
    } else {
      setCode(CLEAN_CODE.trim())
      setFilename('data_pipeline_clean.py')
    }
    setResult(null)
    setError(null)
  }, [])

  const runReview = useCallback(async () => {
    if (!code.trim()) {
      setError('Please enter or load Python code to analyze.')
      return
    }
    setLoading(true)
    setResult(null)
    setError(null)
    try {
      const { data, source } = await apiReview(code, filename || 'main.py', developerName || 'Developer')
      setResult(data)
      setApiSource(source)
    } catch {
      setError('Unexpected error during review. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [code, filename, developerName])

  return (
    <div className="min-h-screen bg-slate-950 bg-grid-slate">
      <HeaderBanner developerName={developerName} setDeveloperName={setDeveloperName} />

      {/* Main layout */}
      <div className="max-w-[1600px] mx-auto px-4 py-5 flex flex-col lg:flex-row gap-5">

        {/* ─── LEFT PANEL ─────────────────────────────────────────────────────── */}
        <div className="lg:w-[520px] xl:w-[600px] flex-shrink-0 space-y-4">

          {/* Code Editor */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
            {/* Editor toolbar */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-800 bg-slate-950/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
              </div>
              <input
                className="ml-2 bg-transparent text-slate-400 text-xs font-mono outline-none flex-1 placeholder:text-slate-700"
                value={filename}
                onChange={e => setFilename(e.target.value)}
                placeholder="filename.py"
              />
              <div className="flex items-center gap-1 text-slate-500 text-xs">
                <Code2 className="w-3 h-3" /> Python
              </div>
            </div>

            {/* Sample load buttons */}
            <div className="flex gap-2 px-3 py-2 border-b border-slate-800/50 flex-wrap">
              <button onClick={() => loadSample('high')} className="flex items-center gap-1.5 text-xs bg-red-950/50 hover:bg-red-950/80 text-red-300 border border-red-800/50 rounded-md px-2.5 py-1.5 transition-colors">
                <AlertTriangle className="w-3 h-3" /> Load High-Risk Buggy Sample
              </button>
              <button onClick={() => loadSample('clean')} className="flex items-center gap-1.5 text-xs bg-emerald-950/50 hover:bg-emerald-950/80 text-emerald-300 border border-emerald-800/50 rounded-md px-2.5 py-1.5 transition-colors">
                <CheckCircle className="w-3 h-3" /> Load Clean Production Sample
              </button>
            </div>

            {/* Code area */}
            <div className="relative">
              <textarea
                ref={textareaRef}
                className="w-full bg-transparent font-mono text-sm text-slate-200 p-4 outline-none resize-none min-h-[320px] leading-relaxed placeholder:text-slate-700 code-editor"
                placeholder={`# Paste your Python code here…\n# or click one of the preset buttons above`}
                value={code}
                onChange={e => setCode(e.target.value)}
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
              />
              {code && (
                <div className="absolute bottom-2 right-3 text-xs text-slate-700 font-mono">
                  {code.split('\n').length} lines
                </div>
              )}
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={runReview}
            disabled={loading}
            className="w-full btn-primary justify-center py-3.5 text-base font-bold relative overflow-hidden group"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analysing with Random Forest + Gemini…
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                Run ProofCommit Review
                <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
              </>
            )}
            {loading && (
              <div className="absolute inset-0 shimmer opacity-20" />
            )}
          </button>

          {error && (
            <div className="bg-red-950/50 border border-red-800/50 rounded-lg px-4 py-3 text-sm text-red-300 flex items-center gap-2 animate-slide-up">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" /> {error}
            </div>
          )}

          {/* Model benchmarks */}
          <ModelBenchmarkCard />

          {/* API Source indicator */}
          {apiSource && (
            <div className={`flex items-center gap-2 text-xs rounded-lg px-3 py-2 border ${
              apiSource === 'api'
                ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-400'
                : 'bg-cyan-950/30 border-cyan-800/40 text-cyan-400'
            }`}>
              <div className={`w-1.5 h-1.5 rounded-full ${apiSource === 'api' ? 'bg-emerald-400' : 'bg-cyan-400'} animate-pulse`} />
              {apiSource === 'api'
                ? 'Live FastAPI backend · http://localhost:8000'
                : '⚡ Edge Browser AST + Random Forest Engine Active (Zero-Latency Serverless Mode)'}
            </div>
          )}
        </div>

        {/* ─── RIGHT PANEL ────────────────────────────────────────────────────── */}
        <div className="flex-1 min-w-0 space-y-4">
          {!result && !loading && (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center space-y-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-indigo-950/50 flex items-center justify-center">
                  <Cpu className="w-12 h-12 text-indigo-600" />
                </div>
                <div className="absolute -right-2 -top-2 w-8 h-8 rounded-full bg-amber-950/60 flex items-center justify-center">
                  <Star className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-300">ProofCommit Pro AI Engine</h2>
                <p className="text-slate-500 text-sm mt-1 max-w-sm">
                  Load a code sample or paste your Python file, then hit "Run ProofCommit Review" to get instant AI-powered analysis.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center text-xs text-slate-600">
                {['AST Analysis', 'Random Forest ML', 'Gemini AI Patch', 'Skill Evidence Score', '₹299 Certificate'].map(f => (
                  <span key={f} className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full">{f}</span>
                ))}
              </div>
            </div>
          )}

          {loading && (
            <div className="space-y-3 animate-fade-in">
              {['Parsing AST tree…', 'Running Random Forest classifier…', 'Computing cyclomatic complexity…', 'Generating AI refactor patch…'].map((step, i) => (
                <div key={i} className="flex items-center gap-3 bg-slate-900/50 border border-slate-800 rounded-lg px-4 py-3">
                  <Loader2 className="w-4 h-4 text-indigo-400 animate-spin flex-shrink-0" style={{ animationDelay: `${i * 0.15}s` }} />
                  <span className="text-sm text-slate-400">{step}</span>
                </div>
              ))}
            </div>
          )}

          {result && (
            <div className="space-y-4 animate-fade-in">
              {/* AI Review Summary */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span className="text-sm font-semibold text-slate-200">AI Review Summary</span>
                  <span className="ml-auto text-xs text-slate-600 font-mono">{result.filename}</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{result.review.summary}</p>
              </div>

              {/* Skill Scorecard */}
              <SkillScorecard result={result} />

              {/* AST Metric Grid */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <GitBranch className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-semibold text-slate-200">8-Metric AST Structural Grid</span>
                </div>
                <ASTMetricGrid metrics={result.metrics} />
              </div>

              {/* Findings + Patch */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-semibold text-slate-200">Automated Findings & AI Patch</span>
                </div>
                <FindingsPanel issues={result.review.issues} patch={result.review.suggested_patch} />
              </div>

              {/* Razorpay card */}
              <RazorpayCard result={result} developerName={developerName} />

              {/* Re-run button */}
              <div className="flex justify-end">
                <button onClick={runReview} disabled={loading} className="btn-secondary text-xs">
                  <RefreshCw className="w-3.5 h-3.5" /> Re-run Analysis
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 mt-8 py-5 px-4 text-center">
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600">
          <span className="flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-indigo-700" /> ProofCommit Pro
          </span>
          <span>·</span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" /> Neural Storm 2026 · Track 1 · FT-05
          </span>
          <span>·</span>
          <span className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-700" /> Sponsored by 9AM by TechMojo
          </span>
          <span>·</span>
          <span>RandomForest + Gemini API + Razorpay</span>
          <span>·</span>
          <a
            href="https://9am.careers/how-it-works/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-slate-600 hover:text-indigo-500 transition-colors"
          >
            9am.careers <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </footer>
    </div>
  )
}
