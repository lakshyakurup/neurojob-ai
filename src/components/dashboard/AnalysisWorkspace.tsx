'use client';

import { useState } from 'react';
import { FileText, LoaderCircle, Sparkles, Target } from 'lucide-react';
import type { AnalysisResponse } from '../../types';

interface Props {
  onResult: (result: AnalysisResponse) => void;
  onStart?: () => void;
}

export default function AnalysisWorkspace({ onResult, onStart }: Props) {
  const [resume, setResume] = useState(
    `Product designer with 6+ years building B2B SaaS products. Led discovery, prototyping, and launch for a workflow platform used by 40k teams. Partnered with engineering and growth to improve activation by 31%. Designed end-to-end experiences across web and mobile. Mentored junior designers and ran design critiques.`
  );
  const [job, setJob] = useState(
    `We are looking for a Senior Product Designer to own the workflow experience, turn customer insight into product strategy, and partner closely with engineering and growth. Experience with experimentation, complex systems, and data-informed design is a strong plus. You will lead discovery, ship high-impact features, and help shape the product vision.`
  );
  const [jobTitle, setJobTitle] = useState('Senior Product Designer');
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function analyze() {
    if (!resume.trim() || !job.trim()) {
      setError('Both resume and job description are required.');
      return;
    }

    setLoading(true);
    setError(null);
    onStart?.();

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          resumeText: resume,
          jobDescription: job,
          jobTitle: jobTitle || undefined,
          company: company || undefined,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || 'Analysis failed');
      }

      if (payload.data) {
        onResult(payload.data);
      } else {
        throw new Error('No analysis data returned');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="workspace-grid">
      <div className="panel input-panel">
        <div className="panel-head">
          <div>
            <h2 className="panel-title">
              <FileText size={16} /> Your story
            </h2>
            <p className="panel-subtitle">Paste a resume or a profile draft</p>
          </div>
          <span className="stat-foot">{resume.length} chars</span>
        </div>
        <textarea
          value={resume}
          onChange={(e) => setResume(e.target.value)}
          placeholder="Paste your resume or LinkedIn about section here..."
        />
      </div>

      <div className="panel input-panel">
        <div className="panel-head">
          <div>
            <h2 className="panel-title">
              <Target size={16} /> Target role
            </h2>
            <p className="panel-subtitle">Give the intelligence engine a destination</p>
          </div>
          <span className="stat-foot">{job.length} chars</span>
        </div>
        <div style={{ padding: '0 23px 12px', display: 'grid', gap: 10 }}>
          <input
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Job title (optional)"
            style={{
              width: '100%',
              border: '1px solid var(--line)',
              borderRadius: 8,
              padding: '10px 12px',
              font: '13px Arial, sans-serif',
            }}
          />
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company (optional)"
            style={{
              width: '100%',
              border: '1px solid var(--line)',
              borderRadius: 8,
              padding: '10px 12px',
              font: '13px Arial, sans-serif',
            }}
          />
        </div>
        <textarea
          value={job}
          onChange={(e) => setJob(e.target.value)}
          placeholder="Paste the full job description here..."
        />
      </div>

      <div className="analyze-bar" style={{ gridColumn: '1 / -1' }}>
        {error && (
          <p style={{ color: 'var(--coral)', marginBottom: 12, fontSize: 13 }}>{error}</p>
        )}
        <button className="primary-button" onClick={analyze} disabled={loading}>
          {loading ? (
            <>
              <LoaderCircle size={16} className="spin" /> Reading your signal...
            </>
          ) : (
            <>
              <Sparkles size={16} /> Run strategic analysis
            </>
          )}
        </button>
      </div>
    </section>
  );
}
