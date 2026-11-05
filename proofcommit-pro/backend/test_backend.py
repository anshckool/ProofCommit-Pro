"""
Unit test script for ProofCommit Pro backend, AST extraction, Random Forest ML engine,
and Razorpay & Review endpoints.
"""
import sys
import os

# Add backend directory to path
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from app import app, CodeFeatureExtractor, BugRiskModel, generate_ai_review
from fastapi.testclient import TestClient

def test_ast_feature_extractor():
    print("[1] Testing CodeFeatureExtractor...")
    sample_code = (
        "def calculate_total(prices: list) -> float:\n"
        "    '''Computes sum of prices with tax.'''\n"
        "    assert len(prices) >= 0, 'Negative prices'\n"
        "    total = 0.0\n"
        "    for p in prices:\n"
        "        if p > 0:\n"
        "            try:\n"
        "                total += float(p)\n"
        "            except (ValueError, TypeError):\n"
        "                continue\n"
        "    return total * 1.18\n"
    )
    result = CodeFeatureExtractor.extract_features(sample_code)
    features = result["features"]
    print("    Extracted metrics:", features)
    assert features["lines_of_code"] >= 10
    assert features["function_count"] == 1
    assert features["exception_handlers"] == 1
    assert features["assert_count"] == 1
    assert features["docstring_ratio"] == 1.0
    print("    AST Feature extraction passed!")

def test_syntax_error_handling():
    print("[2] Testing CodeFeatureExtractor syntax error resilience...")
    broken_code = "def broken(:\n    return"
    result = CodeFeatureExtractor.extract_features(broken_code)
    assert result["syntax_valid"] is False
    assert result["syntax_error"] is not None
    assert "lines_of_code" in result["features"]
    print("    Syntax error resilience passed without crashing!")

def test_ml_risk_model():
    print("[3] Testing BugRiskModel...")
    model = BugRiskModel()
    metrics = model.metrics
    print(f"    Holdout Test Accuracy: {metrics.get('accuracy') * 100:.2f}%")
    print(f"    Holdout Test Precision: {metrics.get('precision') * 100:.2f}%")
    print(f"    Holdout Test Recall:    {metrics.get('recall') * 100:.2f}%")
    print(f"    Holdout Test F1-Score:  {metrics.get('f1_score') * 100:.2f}%")
    assert metrics.get("accuracy") >= 0.85
    assert metrics.get("f1_score") >= 0.85

    # Test prediction on low risk vector
    clean_vector = [30, 120, 3, 2, 2, 2, 2, 0.9]
    clean_pred = model.predict_risk(clean_vector)
    print("    Clean code prediction:", clean_pred)
    assert clean_pred["risk_level"] in ("Low", "Medium")

    # Test prediction on high risk vector
    risky_vector = [350, 1800, 28, 7, 12, 0, 0, 0.0]
    risky_pred = model.predict_risk(risky_vector)
    print("    Risky code prediction:", risky_pred)
    assert risky_pred["risk_level"] in ("Medium", "High")
    print("    ML Risk Model passed!")

def test_fastapi_endpoints():
    print("[4] Testing FastAPI Endpoints via TestClient...")
    client = TestClient(app)

    # 1. GET /
    res_root = client.get("/")
    assert res_root.status_code == 200
    assert res_root.json()["project"] == "ProofCommit Pro"
    print("    GET / passed!")

    # 2. GET /api/metrics
    res_metrics = client.get("/api/metrics")
    assert res_metrics.status_code == 200
    assert "accuracy" in res_metrics.json()["metrics"]
    print("    GET /api/metrics passed!")

    # 3. POST /api/review
    code_payload = {
        "code": "def divide(a, b):\n    return a / b\n",
        "filename": "calc.py",
        "developer_name": "Arjun Rao"
    }
    res_review = client.post("/api/review", json=code_payload)
    assert res_review.status_code == 200
    rev_data = res_review.json()
    assert rev_data["status"] == "success"
    assert "certificate_id" in rev_data
    assert rev_data["certificate_id"].startswith("PROOF-")
    assert "skill_evidence_score" in rev_data["review"]
    assert "skill_badge" in rev_data["review"]
    cert_id = rev_data["certificate_id"]
    print(f"    POST /api/review passed! Issued {cert_id} with badge '{rev_data['review']['skill_badge']}'")

    # 4. POST /api/razorpay/create-order
    order_payload = {
        "developer_name": "Arjun Rao",
        "certificate_id": cert_id,
        "amount_inr": 299
    }
    res_order = client.post("/api/razorpay/create-order", json=order_payload)
    assert res_order.status_code == 200
    order_data = res_order.json()
    assert order_data["amount"] == 29900
    assert "order_id" in order_data
    print(f"    POST /api/razorpay/create-order passed! Order ID: {order_data['order_id']}")

    # 5. POST /api/razorpay/verify-payment
    verify_payload = {
        "razorpay_order_id": order_data["order_id"],
        "razorpay_payment_id": "pay_test_123456",
        "razorpay_signature": "sig_mock_signature",
        "certificate_id": cert_id
    }
    res_verify = client.post("/api/razorpay/verify-payment", json=verify_payload)
    assert res_verify.status_code == 200
    verify_data = res_verify.json()
    assert verify_data["status"] == "verified"
    print("    POST /api/razorpay/verify-payment passed!")

if __name__ == "__main__":
    test_ast_feature_extractor()
    test_syntax_error_handling()
    test_ml_risk_model()
    test_fastapi_endpoints()
    print("\n=======================================================")
    print("ALL TESTS PASSED WITH ZERO ERRORS!")
    print("=======================================================")
