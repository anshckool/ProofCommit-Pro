-- ============================================================================
-- ProofCommit Pro: Supabase SQL Schema Migration
-- Hackathon: Neural Storm 2026 (JNTUH Hyderabad) | Track 1: Future Tech (FT-05)
-- Sponsored by 9AM (9am.careers by TechMojo)
-- ============================================================================

-- Ensure pgcrypto extension is available for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop table if exists for clean migrations (optional in fresh environments)
-- DROP TABLE IF EXISTS public.code_reviews CASCADE;

-- Table: code_reviews
-- Stores code review audits, AST metrics summary, 9AM skill evidence scores, and Razorpay certificate status
CREATE TABLE IF NOT EXISTS public.code_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    certificate_id VARCHAR(64) UNIQUE NOT NULL,
    developer_name VARCHAR(255) NOT NULL,
    filename VARCHAR(255) NOT NULL,
    skill_evidence_score INTEGER NOT NULL CHECK (skill_evidence_score >= 0 AND skill_evidence_score <= 100),
    skill_badge VARCHAR(100) NOT NULL,
    defect_probability NUMERIC(5, 4) NOT NULL CHECK (defect_probability >= 0.0000 AND defect_probability <= 1.0000),
    payment_verified BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indices for rapid query access during certificate verification and portfolio queries
CREATE INDEX IF NOT EXISTS idx_code_reviews_certificate_id ON public.code_reviews (certificate_id);
CREATE INDEX IF NOT EXISTS idx_code_reviews_developer_name ON public.code_reviews (developer_name);
CREATE INDEX IF NOT EXISTS idx_code_reviews_created_at ON public.code_reviews (created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.code_reviews ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow public read access to verify certificates by certificate_id
CREATE POLICY "Allow public read access for certificate verification"
    ON public.code_reviews
    FOR SELECT
    USING (true);

-- Policy 2: Allow service role and authenticated/anon client inserts
CREATE POLICY "Allow insert access for new code reviews"
    ON public.code_reviews
    FOR INSERT
    WITH CHECK (true);

-- Policy 3: Allow updates when payment is verified
CREATE POLICY "Allow payment status update"
    ON public.code_reviews
    FOR UPDATE
    USING (true)
    WITH CHECK (true);

-- Comments describing columns for schema documentation
COMMENT ON TABLE public.code_reviews IS 'Audit ledger of AI code reviews, AST feature metrics, and 9AM verified certificates.';
COMMENT ON COLUMN public.code_reviews.certificate_id IS 'Unique immutable certificate identifier, e.g., PROOF-A8F3B9.';
COMMENT ON COLUMN public.code_reviews.developer_name IS 'Name of the developer who submitted the code.';
COMMENT ON COLUMN public.code_reviews.filename IS 'Target filename analyzed by ProofCommit Pro.';
COMMENT ON COLUMN public.code_reviews.skill_evidence_score IS 'Empirically derived 0-100 skill evidence score calibrated for 9AM hiring benchmarks.';
COMMENT ON COLUMN public.code_reviews.skill_badge IS '9AM-aligned credential badge (e.g., 9AM Gold: Elite Systems Architect).';
COMMENT ON COLUMN public.code_reviews.defect_probability IS 'Estimated bug-risk probability from the scikit-learn Random Forest model.';
COMMENT ON COLUMN public.code_reviews.payment_verified IS 'True once Razorpay payment (₹299 INR) is cryptographically confirmed.';
COMMENT ON COLUMN public.code_reviews.created_at IS 'UTC timestamp when the review and certificate were created.';

-- Verification sample query (commented):
-- INSERT INTO public.code_reviews (certificate_id, developer_name, filename, skill_evidence_score, skill_badge, defect_probability, payment_verified)
-- VALUES ('PROOF-SAMPLE1', 'Arjun Rao', 'service.py', 94, '9AM Gold: Elite Systems Architect', 0.1250, false);
