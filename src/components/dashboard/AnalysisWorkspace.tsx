'use client';

import { useRef, useState } from 'react';
import { FileText, LoaderCircle, Sparkles, Target, Upload } from 'lucide-react';
import type { AnalysisResponse } from '../../types';

interface Props {
  onResult: (result: AnalysisResponse) => void;
  onStart?: () => void;
  onResumeTextChange?: (text: string) => void;
}

export default function AnalysisWorkspace({ onResult, onStart, onResumeTextChange }: Props) {
  const [resume, setResume] = useState(
    `Product designer with 6+ years building B2B SaaS products. Led discovery, prototyping, and launch for a workflow platform used by 40k teams. Partnered with engineering and growth to improve activation by 31%. Designed end-to-end experiences across web and mobile. Mentored junior designers and ran design critiques.`
  );
  const [job, setJob] = useState(
    `We are looking for a Senior Product Designer to own the workflow experience, turn customer insight into product strategy, and partner closely with engineering and growth. Experience with experimentation, complex systems, and data-informed design is a strong plus. You will lead discovery, ship high-impact features, and help shape the product vision.`
  );
  const [jobTitle, setJobTitle] = useState('Senior Product Designer');
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [parseInfo, setParseInfo] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function updateResume(text: string) {
    setResume(text);
    onResumeTextChange?.(text);
  }

  async function handlePdfUpload(file: File) {
    setParsing(true);
    setError(null);
    setParseInfo(null);

    try {
      const form = new FormData();
      form.append('file', file);

      const res = await fetch('/api/parse-resume', {
        method: 'POST',
        body: form,
      });

      const payload = await res.json();

      if (!res.ok) {
        throw new Error(payload.error || 'Failed to parse PDF');
      }

      updateResume(payload.data.text);
      setParseInfo(
        `Extracted ${payload.data.charCount.toLocaleString()} characters from ${payload.data.pages} page(s)`
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'PDF parse failed');
    } finally {
      setParsing(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }

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
            <p className="panel-subtitle">Paste text or upload a PDF resume</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="stat-foot">{resume.length} chars</span>
            <button
              type="button"
              className="secondary-button"
              style={{ padding: '7px 11px', fontSize: 11 }}
              onClick={() => fileRef.current?.click()}
              disabled={parsing}
            >
              {parsing ? (
                <>
                  <LoaderCircle size={13} className="spin" /> Parsing…
                </>
              ) : (
                <>
                  <Upload size={13} /> PDF
                </>
              )}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="application/pdf,.pdf"
              style={{ display: 'none' }}
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handlePdfUpload(f);
              }}
            />
          </div>
        </div>
        {parseInfo && (
          <p
            style={{
              margin: 0,
              padding: '0 23px 8px',
              color: 'var(--mint-strong)',
              font: '11px Arial, sans-serif',
            }}
          >
            {parseInfo}
          </p>
        )}
        <textarea
          value={resume}
          onChange={(e) => updateResume(e.target.value)}
          placeholder="Paste your resume or LinkedIn about section here…"
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
          placeholder="Paste the full job description here…"
        />
      </div>

      <div className="analyze-bar" style={{ gridColumn: '1 / -1' }}>
        {error && (
          <p style={{ color: 'var(--coral)', marginBottom: 12, fontSize: 13 }}>{error}</p>
        )}
        <button className="primary-button" onClick={analyze} disabled={loading || parsing}>
          {loading ? (
            <>
              <LoaderCircle size={16} className="spin" /> Reading your signal…
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
