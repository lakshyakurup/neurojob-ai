import { AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function InsightCard({ title, copy, warning = false }: { title: string; copy: string; warning?: boolean }) {
  const Icon = warning ? AlertTriangle : CheckCircle2;
  return <div className={`insight ${warning ? 'warn' : ''}`}><Icon size={17} /><div><strong>{title}</strong><p>{copy}</p></div></div>;
}