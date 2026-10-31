'use client';

import AppShell from '../../components/app/AppShell';
import { FileText, Upload } from 'lucide-react';

export default function LibraryPage() {
  return (
    <AppShell>
      <main className="main">
        <div className="header-row">
          <div>
            <p className="eyebrow">Resume lab</p>
            <h1 className="page-title">Your versions</h1>
            <p className="page-lead">
              Keep multiple resume variants and instantly test them against any role.
            </p>
          </div>
          <button className="primary-button">
            <Upload size={15} /> Upload PDF
          </button>
        </div>

        <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {['Primary · Product Design', 'Growth-focused', 'Design Systems'].map((name, i) => (
            <article key={name} className="stat-card" style={{ cursor: 'pointer' }}>
              <div className="stat-head">
                <span>Version {i + 1}</span>
                <span className="stat-icon">
                  <FileText size={14} />
                </span>
              </div>
              <div className="stat-value" style={{ fontSize: 18 }}>
                {name}
              </div>
              <div className="stat-foot">Last used 2 days ago</div>
            </article>
          ))}
        </div>

        <div className="panel" style={{ marginTop: 22 }}>
          <div className="empty-state">
            PDF parsing + multi-version management coming in the next sprint.
            <br />
            For now, paste text directly in the analysis workspace.
          </div>
        </div>
      </main>
    </AppShell>
  );
}
