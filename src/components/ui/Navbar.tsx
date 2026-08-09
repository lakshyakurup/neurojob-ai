import React from 'react';
import Link from 'next/link';
import { Sparkles, FileText, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="w-full border-b border-slate-800 bg-slate-950/50 backdrop-blur-md px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2 font-bold text-xl text-indigo-400">
        <Sparkles className="w-6 h-6 text-indigo-500" />
        <span>NeuroJob AI</span>
      </div>
      <div className="flex items-center gap-6 text-sm text-slate-300">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
        <Link href="https://github.com/lakshyakurup/neurojob-ai" target="_blank" className="hover:text-white transition-colors">GitHub</Link>
      </div>
    </nav>
  );
}
