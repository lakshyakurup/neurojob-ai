export default function ScoreRing({ score }: { score: number }) {
  const safeScore = Math.min(100, Math.max(0, score || 0));

  return (
    <div className="score-wrap">
      <div
        className="score-ring"
        style={{
          background: `conic-gradient(var(--mint-strong) 0 ${safeScore}%, #e8f0eb ${safeScore}% 100%)`,
        }}
      >
        <div className="score-value">
          {safeScore}
          <small>match score</small>
        </div>
      </div>
      <span className="score-caption">
        {safeScore >= 80
          ? 'Strong candidate signal'
          : safeScore >= 60
            ? 'Promising — close the gaps'
            : safeScore > 0
              ? 'Needs significant work'
              : 'Awaiting analysis'}
      </span>
    </div>
  );
}
