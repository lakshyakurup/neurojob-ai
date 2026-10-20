import Link from 'next/link';
import { BarChart3, FileText, LayoutDashboard, Settings2 } from 'lucide-react';

export default function MobileNav() {
  return <nav className="mobile-bar">
    <Link href="/dashboard"><LayoutDashboard /><span>Home</span></Link>
    <Link href="/library"><FileText /><span>Resume</span></Link>
    <Link href="/analytics"><BarChart3 /><span>Insights</span></Link>
    <Link href="/settings"><Settings2 /><span>Settings</span></Link>
  </nav>;
}