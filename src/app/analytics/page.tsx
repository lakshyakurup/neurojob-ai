'use client';

import AppShell from '../../components/app/AppShell';
import { BarChart3, TrendingUp } from 'lucide-react';
import StatCard from '../../components/dashboard/StatCard';

export default function AnalyticsPage() {
  return (
    <AppShell>
      <main className="main">
        <div className="header-row">
          <div>
            <p className="eyebrow">Intelligence</p>
            <h1 className="page-title">Insights</h1>
            <p className="page-lead">
              Patterns across your applications — which skills keep showing up as gaps, and where you win.
            </p>
          </div>
        </div>

        <div className="stats-grid">
          <StatCard
            label="Avg match score"
            value="81%"
            note="Last 12 analyses"
            trend="+4%"
            icon={TrendingUp}
          />
          <StatCard
            label="Most common gap"
            value="SQL"
            note="Appeared in 7 roles"
            icon={BarChart3}
          />
          <StatCard
            label="Cover letters"
            value="14"
            note="Generated this month"
            icon={BarChart3}
          />
          <StatCard
            label="Interview prep"
            value="9"
            note="Sessions completed"
            icon={BarChart3}
          />
        </div>

        <div className="panel">
          <div className="empty-state">
            Full historical analytics + skill gap heatmaps will light up once
            <br />
            Supabase persistence is connected.
          </div>
        </div>
      </main>
    </AppShell>
  );
}
