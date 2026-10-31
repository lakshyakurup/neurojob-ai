# 🚀 NeuroJob AI

> **Stop applying blindly. Start applying with intelligence.**  
> An AI-powered career command center that scores resume fit, generates tailored cover letters, predicts interview questions, parses PDF resumes, rewrites your story for the target role, and persists your history — powered by Google Gemini + Supabase.

![Status](https://img.shields.io/badge/status-hackathon%20ready-39c985)
![Stack](https://img.shields.io/badge/Next.js%2015-black?logo=next.js)
![AI](https://img.shields.io/badge/Gemini%202.5-flash-4285F4?logo=google)
![Auth](https://img.shields.io/badge/Clerk-auth-6C47FF)
![DB](https://img.shields.io/badge/Supabase-persistence-3ECF8E?logo=supabase)

---

## ✨ Features

| Feature | Description |
|--------|-------------|
| **Strategic Analysis** | Deep Gemini comparison of resume ↔ job description |
| **Match Score + Insights** | Realistic scoring + strengths / weaknesses |
| **ATS Keyword Radar** | Missing high-impact keywords |
| **One-click Cover Letter** | Personalized, professional, copy-ready |
| **Interview Predictor** | Technical + behavioral + role-specific questions with tips |
| **PDF Resume Upload** | Drop a PDF → automatic text extraction via `pdf-parse` |
| **Resume Rewrite Agent** | Gemini rewrites your resume using gaps + improvements (truthful, no invention) |
| **Supabase Persistence** | Save analyses per Clerk user; history API ready |
| **Application Pipeline** | Track roles linked to analyses |
| **Resume Lab** | Version management foundation |
| **Auth-ready** | Clerk authentication wired end-to-end |

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router) + TypeScript + custom design system
- **AI Layer**: Google Gemini 2.5 Flash (structured JSON)
- **Auth**: Clerk
- **Database**: Supabase (Postgres)
- **PDF**: `pdf-parse` (server-side)
- **Deploy target**: Vercel

---

## 🏗️ Architecture

```
neurojob-ai/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── analyze/          # Gemini analysis + optional Supabase save
│   │   │   ├── parse-resume/     # PDF → text
│   │   │   ├── rewrite-resume/   # Resume rewrite agent
│   │   │   └── history/          # User analysis history
│   │   ├── dashboard/            # Command center
│   │   ├── applications/
│   │   ├── library/
│   │   ├── analytics/
│   │   └── settings/
│   ├── components/
│   ├── lib/
│   │   ├── gemini.ts             # Analyze + Rewrite agents
│   │   └── supabase/             # clients + analyses helpers
│   └── types/
├── supabase/schema.sql           # Run in Supabase SQL editor
└── package.json
```

**Data flow**
1. Upload PDF or paste resume → `/api/parse-resume` (optional)
2. Run analysis → `/api/analyze` → Gemini → structured result
3. If signed in + Supabase configured → row saved to `analyses`
4. Rewrite agent → `/api/rewrite-resume` → improved resume + change log

---

## ⚡ Quick Start

```bash
git clone https://github.com/lakshyakurup/neurojob-ai.git
cd neurojob-ai
npm install

cp .env.example .env.local
# Fill in:
# GEMINI_API_KEY=
# NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
# CLERK_SECRET_KEY=
# NEXT_PUBLIC_SUPABASE_URL=
# NEXT_PUBLIC_SUPABASE_ANON_KEY=
# SUPABASE_SERVICE_ROLE_KEY=

npm run dev
```

### Supabase setup (5 minutes)

1. Create a project at [supabase.com](https://supabase.com)
2. Open **SQL Editor** → paste and run `supabase/schema.sql`
3. Copy Project URL + anon key + service_role key into `.env.local`
4. Restart `npm run dev`

Without Supabase the app still works — analyses just won’t be persisted.

---

## 🧠 AI Agents

### Analysis Agent
- Structured JSON only
- Calibrated match score, keywords, cover letter, 6 interview questions, ATS tips, improvements

### Rewrite Agent
- Takes original resume + JD + missing keywords + recommended improvements
- Produces a truthful rewrite (no invented experience)
- Returns change summary + keywords successfully woven in

---

## 🗺️ Roadmap

- [x] Structured Gemini analysis
- [x] Full dashboard with live results
- [x] Cover letter + interview tabs
- [x] PDF resume parsing
- [x] Resume rewrite agent
- [x] Supabase schema + save path
- [ ] Live history feed from `/api/history`
- [ ] Full applications CRUD
- [ ] Multi-version resume library with PDF storage
- [ ] Job board connectors

---

## 📄 License

MIT

---

**Made with intensity by [Lakshya Kurup](https://github.com/lakshyakurup)**  
*Career intelligence, amplified.*
