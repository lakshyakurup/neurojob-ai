import { ArrowUpRight } from 'lucide-react';
import ScoreRing from './ScoreRing';
import InsightCard from './InsightCard';
import KeywordPill from './KeywordPill';
import type { AnalysisResponse } from '../../types';

export default function AnalysisPanel({ result }: { result?: AnalysisResponse }) {
  const score = result?.matchScore ?? 78;
  const missing = result?.missingKeywords ?? ['SQL optimization', 'A/B testing', 'Stakeholder mapping'];
  const strengths = result?.strengths ?? ['Product strategy', 'Cross-functional leadership', 'User research', 'Roadmapping'];
  return <section className="panel analysis-panel"><div className="panel-head"><div><h2 className="panel-title">Role intelligence</h2><p className="panel-subtitle">Your latest analysis · Senior Product Designer</p></div><button className="secondary-button">Open report <ArrowUpRight size={14} /></button></div><div className="analysis-body"><ScoreRing score={score} /><div className="insight-stack"><InsightCard title="Your narrative is clear" copy="Your experience maps cleanly to the role's core product ownership expectations." /><InsightCard warning title="Three high-impact gaps" copy="Add evidence for experimentation, SQL fluency, and stakeholder alignment." /></div></div><div className="keyword-section"><p className="section-label">Signal coverage</p><div className="keyword-list">{strengths.map((word) => <KeywordPill key={word}>{word}</KeywordPill>)}{missing.map((word) => <KeywordPill missing key={word}>{word}</KeywordPill>)}</div></div></section>;
}