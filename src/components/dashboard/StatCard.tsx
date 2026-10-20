import type { LucideIcon } from 'lucide-react';

export default function StatCard({ label, value, note, trend, icon: Icon }: { label: string; value: string; note: string; trend?: string; icon: LucideIcon }) {
  return <article className="stat-card"><div className="stat-head"><span>{label}</span><span className="stat-icon"><Icon size={14} /></span></div><div className="stat-value">{value}</div><div className="stat-foot"><span className={trend ? 'trend-up' : ''}>{trend}</span>{trend ? ' ' : ''}{note}</div></article>;
}