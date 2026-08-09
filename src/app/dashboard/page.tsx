'use client';

import React, { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import { Upload, FileCheck, BrainCircuit } from 'lucide-react';

export default function Dashboard() {
  const [resume, setResume] = useState('');
  const [jd, setJd] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    // API trigger call
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />
      <div className="max-w-6xl w-full mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Upload className="w-5 h-5 text-indigo-400" /> Resume Content
          </h2>
          <textarea
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            placeholder="Paste raw resume text here..."
            className="w-full h-80 p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-indigo-400" /> Target Job Description
          </h2>
          <textarea
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder="Paste target job description here..."
            className="w-full h-80 p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="pb-12 text-center">
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold transition-all shadow-lg shadow-indigo-500/20 inline-flex items-center gap-2"
        >
          <BrainCircuit className="w-5 h-5" />
          {loading ? 'Analyzing with Gemini AI...' : 'Run ATS Match Analysis'}
        </button>
      </div>
    </div>
  );
}
