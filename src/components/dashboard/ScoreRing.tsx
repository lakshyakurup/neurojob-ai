export default function ScoreRing({ score }: { score: number }) {
  return <div className="score-wrap"><div className="score-ring" style={{ background: `conic-gradient(var(--mint-strong) 0 ${score}%, #e8f0eb ${score}% 100%)` }}><div className="score-value">{score}<small>match score</small></div></div><span className="score-caption">Strong candidate signal</span></div>;
}