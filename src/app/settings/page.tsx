'use client';

import AppShell from '../../components/app/AppShell';
import { Settings2 } from 'lucide-react';

export default function SettingsPage() {
  return (
    <AppShell>
      <main className="main">
        <div className="header-row">
          <div>
            <p className="eyebrow">Account</p>
            <h1 className="page-title">Settings</h1>
            <p className="page-lead">
              Manage your profile, API preferences, and workspace defaults.
            </p>
          </div>
        </div>

        <div className="content-grid">
          <section className="panel">
            <div className="panel-head">
              <div>
                <h2 className="panel-title">Preferences</h2>
                <p className="panel-subtitle">How NeuroJob behaves for you</p>
              </div>
            </div>
            <div style={{ padding: 24, display: 'grid', gap: 18 }}>
              <label style={{ display: 'grid', gap: 6 }}>
                <span style={{ font: '700 12px Arial, sans-serif' }}>Default tone for cover letters</span>
                <select
                  style={{
                    border: '1px solid var(--line)',
                    borderRadius: 8,
                    padding: '10px 12px',
                    font: '13px Arial, sans-serif',
                  }}
                >
                  <option>Professional & warm</option>
                  <option>Direct & confident</option>
                  <option>Technical & precise</option>
                </select>
              </label>

              <label style={{ display: 'grid', gap: 6 }}>
                <span style={{ font: '700 12px Arial, sans-serif' }}>Interview question difficulty bias</span>
                <select
                  style={{
                    border: '1px solid var(--line)',
                    borderRadius: 8,
                    padding: '10px 12px',
                    font: '13px Arial, sans-serif',
                  }}
                >
                  <option>Balanced</option>
                  <option>More hard / system design</option>
                  <option>More behavioral</option>
                </select>
              </label>
            </div>
          </section>

          <section className="panel">
            <div className="panel-head">
              <div>
                <h2 className="panel-title">Plan</h2>
                <p className="panel-subtitle">Current access level</p>
              </div>
            </div>
            <div style={{ padding: 24 }}>
              <div className="upgrade-card" style={{ background: 'var(--deep)', border: 'none' }}>
                <strong style={{ color: 'white' }}>Hackathon / Early Access</strong>
                <p style={{ color: '#cbe6d9' }}>
                  Unlimited analyses during the event. Production plans coming soon.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </AppShell>
  );
}
