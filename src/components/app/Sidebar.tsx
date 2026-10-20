import Link from 'next/link';
import { BarChart3, BriefcaseBusiness, FileText, LayoutDashboard, Settings2, Sparkles } from 'lucide-react';

const items = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Applications', href: '/applications', icon: BriefcaseBusiness },
  { label: 'Resume lab', href: '/library', icon: FileText },
  { label: 'Insights', href: '/analytics', icon: BarChart3 },
  { label: 'Settings', href: '/settings', icon: Settings2 },
];

export default function Sidebar() {
  return <aside className="sidebar">
    <Link href="/" className="brand"><span className="brand-mark"><Sparkles size={16} /></span> NeuroJob AI</Link>
    <p className="nav-label">Command center</p>
    <nav className="nav-list">{items.map(({ label, href, icon: Icon }) => <Link className={`nav-item ${href === '/dashboard' ? 'active' : ''}`} href={href} key={href}><Icon />{label}</Link>)}</nav>
    <div className="sidebar-spacer" />
    <div className="upgrade-card"><strong>Unlock your edge</strong><p>Get unlimited role simulations and portfolio intelligence.</p><a href="/settings">View plan -&gt;</a></div>
  </aside>;
}