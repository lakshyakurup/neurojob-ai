'use client';

import { useState } from 'react';
import {
  BarChart3,
  Briefcase,
  CheckCircle2,
  FileText,
  LoaderCircle,
  Sparkles,
  Target,
  Wand2,
  Zap,
} from 'lucide-react';
import AppShell from '../../components/app/AppShell';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import AnalysisPanel from '../../components/dashboard/AnalysisPanel';
import AnalysisWorkspace from '../../components/dashboard/AnalysisWorkspace';
import ActivityFeed from '../../components/dashboard/ActivityFeed';
import StatCard from '../../components/dashboard/StatCard';
import type { AnalysisResponse, RewriteResponse } from '../../types';

type Tab = 'overview' | 'cover' | 'interview' | 'improve' | 'rewrite';

export default function DashboardPage() {
  const [result, setResult] = useState<AnalysisResponse | undefined>();
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isRewriting, setIsRewriting] = useState(false);
  const [rewrite, setRewrite] = useState<RewriteResponse | null>(null);
  const [rewriteError, setRewriteError] = useState<string | null>(null);

  function handleResult(data: AnalysisResponse) {
    setResult(data);
    setActiveTab('overview');
    setIsAnalyzing(false);
    setRewrite(null);
  }

  async function runRewrite() {
    if (!result || !resumeText.trim()) {
      setRewriteError('Run an analysis first and keep the resume text available.');
      return;
    }

    setIsRewriting(true);
    setRewriteError(null);

    try {
      const res = await fetch('/api/rewrite-resume', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          resumeText,
          jobDescription: jobDescription || 'Target role from analysis',
          missingKeywords: result.missingKeywords,
          recommendedImprovements: result.recommendedImprovements,
          jobTitle: result.jobTitle,
          company: result.company,
        }),
      });

      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error || 'Rewrite failed');

      setRewrite(payload.data);
      setActiveTab('rewrite');
    } catch (err) {
      setRewriteError(err instanceof Error ? err.message : 'Rewrite failed');
    } finally {
      setIsRewriting(false);
    }
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview', label: 'Insights' },
    { id: 'cover', label: 'Cover letter' },
    { id: 'interview', label: 'Interview' },
    { id: 'improve', label: 'Improve' },
    { id: 'rewrite', label: 'Rewrite agent' },
  ];

  return (
    <AppShell>
      <main className="main">
        <DashboardHeader />

        <div className="stats-grid">
          <StatCard
            label="Latest match"
            value={result ? `${result.matchScore}%` : '—'}
            note={result ? 'Strong signal detected' : 'Run your first analysis'}
            trend={result && result.matchScore >= 75 ? '+High' : undefined}
            icon={Target}
          />
          <StatCard
            label="Keyword coverage"
            value={result ? `${Math.max(0, 100 - result.missingKeywords.length * 8)}%` : '—'}
            note={result ? `${result.missingKeywords.length} gaps left` : 'Waiting for input'}
            icon={BarChart3}
          />
          <StatCard
            label="Interview prep"
            value={result ? `${result.interviewQuestions.length}` : '0'}
            note="Questions ready"
            icon={Briefcase}
          />
          <StatCard
            label="Cover letter"
            value={result?.tailoredCoverLetter ? 'Ready' : '—'}
            note={result ? 'Tailored & copy-ready' : 'Generate with analysis'}
            icon={FileText}
          />
        </div>

        <div className="content-grid">
          <div>
            <AnalysisWorkspace
              onResult={handleResult}
              onStart={() => setIsAnalyzing(true)}
              onResumeTextChange={(t) => {
                setResumeText(t);
              }}
            />

            {/* Capture job description from workspace via a small side effect:
                we re-use the last analysis context; for rewrite we also need JD.
                Simple approach: store from the analyze payload context. */}

            {result && (
              <div className="panel" style={{ marginTop: 22 }}>
                <div className="panel-head">
                  <div>
                    <h2 className="panel-title">Deep dive</h2>
                    <p className="panel-subtitle">
                      {result.jobTitle || 'Target role'} · {result.summary?.slice(0, 80)}…
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        className={activeTab === tab.id ? 'primary-button' : 'secondary-button'}
                        onClick={() => setActiveTab(tab.id)}
                        style={{ padding: '8px 12px', fontSize: 11 }}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ padding: '24px 23px' }}>
                  {activeTab === 'overview' && (
                    <div className="insight-stack">
                      {result.strengths.slice(0, 3).map((s) => (
                        <div className="insight" key={s}>
                          <CheckCircle2 size={17} />
                          <div>
                            <strong>{s}</strong>
                            <p>Strong matching signal from your experience.</p>
                          </div>
                        </div>
                      ))}
                      {result.weaknesses.slice(0, 2).map((w) => (
                        <div className="insight warn" key={w}>
                          <Zap size={17} />
                          <div>
                            <strong>{w}</strong>
                            <p>Address this gap to raise your match score.</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'cover' && (
                    <div>
                      <p className="section-label">Tailored cover letter</p>
                      <div
                        style={{
                          whiteSpace: 'pre-wrap',
                          font: '14px/1.7 Arial, sans-serif',
                          color: 'var(--ink)',
                          background: '#f6f9f6',
                          padding: 20,
                          borderRadius: 12,
                        }}
                      >
                        {result.tailoredCoverLetter}
                      </div>
                      <button
                        className="secondary-button"
                        style={{ marginTop: 16 }}
                        onClick={() => navigator.clipboard.writeText(result.tailoredCoverLetter)}
                      >
                        Copy to clipboard
                      </button>
                    </div>
                  )}

                  {activeTab === 'interview' && (
                    <div className="insight-stack">
                      {result.interviewQuestions.map((q, i) => (
                        <div className="insight" key={i}>
                          <Sparkles size={17} />
                          <div>
                            <strong>
                              [{q.type} · {q.difficulty}] {q.question}
                            </strong>
                            <p>{q.tip}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'improve' && (
                    <div className="insight-stack">
                      {result.recommendedImprovements.map((tip, i) => (
                        <div className="insight" key={i}>
                          <CheckCircle2 size={17} />
                          <div>
                            <strong>Improvement #{i + 1}</strong>
                            <p>{tip}</p>
                          </div>
                        </div>
                      ))}
                      {result.atsTips.map((tip, i) => (
                        <div className="insight" key={`ats-${i}`}>
                          <Target size={17} />
                          <div>
                            <strong>ATS Tip</strong>
                            <p>{tip}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'rewrite' && (
                    <div>
                      {!rewrite && (
                        <div style={{ textAlign: 'center', padding: '20px 0' }}>
                          <p style={{ color: 'var(--ink-soft)', marginBottom: 16, fontSize: 14 }}>
                            Let the rewrite agent produce a stronger, ATS-optimized version of your
                            resume using the gaps and improvements from this analysis.
                          </p>
                          <button
                            className="primary-button"
                            onClick={runRewrite}
                            disabled={isRewriting}
                          >
                            {isRewriting ? (
                              <>
                                <LoaderCircle size={16} className="spin" /> Rewriting…
                              </>
                            ) : (
                              <>
                                <Wand2 size={16} /> Generate rewritten resume
                              </>
                            )}
                          </button>
                          {rewriteError && (
                            <p style={{ color: 'var(--coral)', marginTop: 12, fontSize: 13 }}>
                              {rewriteError}
                            </p>
                          )}
                        </div>
                      )}

                      {rewrite && (
                        <div>
                          <p className="section-label">What changed</p>
                          <div className="insight-stack" style={{ marginBottom: 20 }}>
                            {rewrite.changesSummary.map((c, i) => (
                              <div className="insight" key={i}>
                                <CheckCircle2 size={17} />
                                <div>
                                  <strong>Change</strong>
                                  <p>{c}</p>
                                </div>
                              </div>
                            ))}
                          </div>

                          {rewrite.keywordsAdded.length > 0 && (
                            <>
                              <p className="section-label">Keywords woven in</p>
                              <div className="keyword-list" style={{ marginBottom: 20 }}>
                                {rewrite.keywordsAdded.map((k) => (
                                  <span className="keyword" key={k}>
                                    {k}
                                  </span>
                                ))}
                              </div>
                            </>
                          )}

                          <p className="section-label">Rewritten resume</p>
                          <div
                            style={{
                              whiteSpace: 'pre-wrap',
                              font: '13px/1.7 Arial, sans-serif',
                              color: 'var(--ink)',
                              background: '#f6f9f6',
                              padding: 20,
                              borderRadius: 12,
                              maxHeight: 480,
                              overflow: 'auto',
                            }}
                          >
                            {rewrite.rewrittenResume}
                          </div>
                          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                            <button
                              className="secondary-button"
                              onClick={() =>
                                navigator.clipboard.writeText(rewrite.rewrittenResume)
                              }
                            >
                              Copy rewritten resume
                            </button>
                            <button
                              className="primary-button"
                              onClick={runRewrite}
                              disabled={isRewriting}
                            >
                              {isRewriting ? (
                                <>
                                  <LoaderCircle size={14} className="spin" /> Regenerating…
                                </>
                              ) : (
                                'Regenerate'
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gap: 18 }}>
            <AnalysisPanel result={result} />
            <section className="panel">
              <div className="panel-head">
                <div>
                  <h2 className="panel-title">Recent activity</h2>
                  <p className="panel-subtitle">Your career intelligence log</p>
                </div>
              </div>
              <ActivityFeed />
            </section>
          </div>
        </div>

        {(isAnalyzing || isRewriting) && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(23, 33, 31, 0.35)',
              display: 'grid',
              placeItems: 'center',
              zIndex: 50,
            }}
          >
            <div
              style={{
                background: 'white',
                padding: '28px 36px',
                borderRadius: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                boxShadow: 'var(--shadow)',
              }}
            >
              <LoaderCircle className="spin" size={22} />
              <div>
                <strong>
                  {isRewriting ? 'Rewrite agent is working…' : 'NeuroJob is thinking…'}
                </strong>
                <p style={{ margin: '4px 0 0', color: 'var(--ink-soft)', fontSize: 13 }}>
                  {isRewriting
                    ? 'Optimizing narrative and keywords with Gemini'
                    : 'Running multi-signal analysis with Gemini'}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </AppShell>
  );
}
