'use client';

import AppShell from '../../components/app/AppShell';
import { BriefcaseBusiness, Plus } from 'lucide-react';

const mockApps = [
  { company: 'Linear', role: 'Product Designer', status: 'interview', score: 89 },
  { company: 'Vercel', role: 'Senior Designer', status: 'applied', score: 82 },
  { company: 'Notion', role: 'Design Systems', status: 'draft', score: 76 },
];

export default function ApplicationsPage() {
  return (
    <AppShell>
      <main className="main">
        <div className="header-row">
          <div>
            <p className="eyebrow">Pipeline</p>
            <h1 className="page-title">Applications</h1>
            <p className="page-lead">
              Track every role with linked NeuroJob analysis so you never lose context.
            </p>
          </div>
          <button className="primary-button">
            <Plus size={15} /> Add application
          </button>
        </div>

        <div className="panel">
          <div className="panel-head">
            <div>
              <h2 className="panel-title">Active pipeline</h2>
              <p className="panel-subtitle">{mockApps.length} roles tracked</p>
            </div>
          </div>

          <div style={{ padding: '8px 0' }}>
            {mockApps.map((app) => (
              <div
                key={app.company + app.role}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '18px 23px',
                  borderBottom: '1px solid var(--line)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: '#e8f9ef',
                      display: 'grid',
                      placeItems: 'center',
                      color: 'var(--deep)',
                    }}
                  >
                    <BriefcaseBusiness size={18} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: 14 }}>{app.role}</strong>
                    <span style={{ color: 'var(--ink-soft)', fontSize: 12 }}>{app.company}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                  <span
                    style={{
                      font: '700 12px Arial, sans-serif',
                      padding: '5px 10px',
                      borderRadius: 6,
                      background:
                        app.status === 'interview'
                          ? '#e8f9ef'
                          : app.status === 'applied'
                            ? '#f0f4ff'
                            : '#f6f6f6',
                      color:
                        app.status === 'interview'
                          ? '#17764e'
                          : app.status === 'applied'
                            ? '#3b5bdb'
                            : 'var(--ink-soft)',
                    }}
                  >
                    {app.status}
                  </span>
                  <span style={{ fontWeight: 700, fontSize: 15 }}>{app.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </AppShell>
  );
}
