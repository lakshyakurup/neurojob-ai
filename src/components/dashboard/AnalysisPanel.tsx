import { ArrowUpRight } from 'lucide-react';
import ScoreRing from './ScoreRing';
import InsightCard from './InsightCard';
import KeywordPill from './KeywordPill';
import type { AnalysisResponse } from '../../types';

export default function AnalysisPanel({ result }: { result?: AnalysisResponse }) {
  const score = result?.matchScore ?? 0;
  const missing = result?.missingKeywords ?? [];
  const strengths = result?.strengths ?? [];
  const summary = result?.summary;

  return (
    <section className="panel analysis-panel">
      <div className="panel-head">
        <div>
          <h2 className="panel-title">Role intelligence</h2>
          <p className="panel-subtitle">
            {result
              ? `${result.jobTitle || 'Target role'}${result.company ? ` @ ${result.company}` : ''}`
              : 'Run an analysis to unlock insights'}
          </p>
        </div>
        {result && (
          <button className="secondary-button">
            Open report <ArrowUpRight size={14} />
          </button>
        )}
      </div>

      {result ? (
        <>
          <div className="analysis-body">
            <ScoreRing score={score} />
            <div className="insight-stack">
              {summary && (
                <InsightCard title="Strategic read" copy={summary} />
              )}
              {strengths[0] && (
                <InsightCard
                  title="Strongest signal"
                  copy={strengths[0]}
                />
              )}
              {missing.length > 0 && (
                <InsightCard
                  warning
                  title={`${missing.length} high-impact gaps`}
                  copy={missing.slice(0, 3).join(' · ')}
                />
              )}
            </div>
          </div>

          <div className="keyword-section">
            <p className="section-label">Signal coverage</p>
            <div className="keyword-list">
              {strengths.map((word) => (
                <KeywordPill key={word}>{word}</KeywordPill>
              ))}
              {missing.map((word) => (
                <KeywordPill missing key={word}>
                  {word}
                </KeywordPill>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="empty-state">
          Paste a resume + job description and hit
          <br />
          <strong>Run strategic analysis</strong> to see your score.
        </div>
      )}
    </section>
  );
}
