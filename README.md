# 🚀 NeuroJob AI

> **Stop applying blindly. Start applying with intelligence.**  
> An AI-powered career command center that scores resume fit, generates tailored cover letters, predicts interview questions, and surfaces the exact gaps that matter — powered by Google Gemini.

![Status](https://img.shields.io/badge/status-hackathon%20ready-39c985)
![Stack](https://img.shields.io/badge/Next.js%2015-black?logo=next.js)
![AI](https://img.shields.io/badge/Gemini%202.5-flash-4285F4?logo=google)
![Auth](https://img.shields.io/badge/Clerk-auth-6C47FF)

---

## 🔥 Why this exists

Most job seekers spray and pray. NeuroJob turns every application into a strategic decision:

- Calibrated **match score** (not a random 0-100)
- Precise **ATS keyword gaps**
- Ready-to-send **cover letter**
- High-signal **interview questions** with answering tips
- Actionable **resume improvements**

Built to win international hackathons and real careers.

---

## ✨ Core Features

| Feature | Description |
|--------|-------------|
| **Strategic Analysis** | Deep Gemini-powered comparison of resume ↔ job description |
| **Match Score + Insights** | Realistic scoring + strengths / weaknesses breakdown |
| **ATS Keyword Radar** | Missing high-impact keywords that kill applications |
| **One-click Cover Letter** | Personalized, professional, copy-ready |
| **Interview Predictor** | Technical + behavioral + role-specific questions with tips |
| **Application Pipeline** | Track roles and link them to analyses |
| **Resume Lab** | Version management foundation (PDF upload coming) |
| **Auth-ready** | Clerk authentication wired end-to-end |

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router) + TypeScript + custom design system
- **AI Layer**: Google Gemini 2.5 Flash (structured JSON output)
- **Auth**: Clerk
- **Styling**: Hand-crafted CSS design system (mint / deep green aesthetic)
- **Icons**: Lucide React
- **Deploy target**: Vercel

---

## 🏗️ Architecture

```
neurojob-ai/
├── src/
│   ├── app/                    # App Router pages + API routes
│   │   ├── api/analyze/        # Structured Gemini analysis endpoint
│   │   ├── dashboard/          # Main command center
│   │   ├── applications/       # Pipeline tracker
│   │   └── library/            # Resume versions
│   ├── components/
│   │   ├── app/                # Shell, Sidebar, MobileNav
│   │   ├── dashboard/          # ScoreRing, AnalysisPanel, Workspace...
│   │   └── ui/                 # Navbar etc.
│   ├── lib/gemini.ts           # AI client + robust prompt + JSON parsing
│   └── types/                  # Shared TypeScript contracts
├── .github/workflows/          # CI + package publishing
└── package.json
```

**Data flow**
1. User pastes resume + JD in AnalysisWorkspace
2. Client → `POST /api/analyze`
3. Server validates → Gemini (structured JSON mode)
4. Normalized `AnalysisResponse` returned
5. Dashboard updates score, keywords, cover letter, interview prep in real time

---

## ⚡ Quick Start

```bash
# 1. Clone
git clone https://github.com/lakshyakurup/neurojob-ai.git
cd neurojob-ai

# 2. Install
npm install

# 3. Environment
cp .env.example .env.local
# Add:
# GEMINI_API_KEY=your_key
# NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
# CLERK_SECRET_KEY=...

# 4. Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🧠 AI Design Decisions

- Forced **JSON response** via `responseMimeType: 'application/json'`
- Temperature 0.4 for consistent, calibrated scores
- Strict field normalization + length caps to prevent hallucinated bloat
- Prompt engineered for "elite career coach" persona used by FAANG candidates

---

## 🗺️ Roadmap (Hackathon → Production)

- [x] Structured Gemini analysis pipeline
- [x] Full dashboard with live results
- [x] Cover letter + interview tabs
- [x] Applications & Library pages
- [ ] Supabase persistence (history + multi-user)
- [ ] PDF resume upload + parsing
- [ ] Real-time collaboration / shared reports
- [ ] Job board connectors (LinkedIn / Wellfound)
- [ ] Agent mode: multi-step critique + rewrite

---

## 🏆 Built for Hackathons

This repo is intentionally high-signal:

- Clean architecture
- Beautiful, cohesive design system
- Real AI (not mocked)
- Type-safe end-to-end
- Auth already integrated
- Easy to demo in < 3 minutes

Perfect for international hackathons focused on AI, productivity, or career tech.

---

## 📄 License

MIT — use it, fork it, ship it.

---

**Made with intensity by [Lakshya Kurup](https://github.com/lakshyakurup)**  
*Career intelligence, amplified.*
