# 🚀 NeuroJob AI

> **Stop applying blindly. Start applying smart.**  
> An intelligent resume matching, cover letter generation, and interview preparation platform powered by Google Gemini AI.

---

## 📌 Overview

**NeuroJob AI** parses job descriptions alongside your resume to deliver deep match analytics, pinpoint ATS keyword gaps, generate tailored cover letters, and predict targeted interview questions—helping job seekers optimize their application process with precision.

---

## ✨ Key Features

- 🎯 **Resume Fit Score & Breakdown:** Deep structural analysis comparing resume skill sets directly against candidate job descriptions.
- 📝 **One-Click Tailored Cover Letters:** Instantly produce personalized cover letters aligned with company tone and requirements.
- 🔍 **ATS Keyword Gap Analyzer:** Detect missing hard skills, certifications, and industry keywords necessary to pass applicant tracking systems.
- 💡 **Interview Question Predictor:** Get AI-generated technical, behavioral, and role-specific interview questions with recommended answering strategies.
- ⚡ **Clean & Responsive UI:** Built with Next.js 14, Tailwind CSS, and shadcn/ui for a seamless user experience.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **AI Integration:** [Google Gemini API](https://ai.google.dev/)
- **Authentication:** [Clerk](https://clerk.com/)
- **Database & Backend:** [Supabase](https://supabase.com/)
- **Deployment:** [Vercel](https://vercel.com/)

---

## 🏗️ Architecture & Project Structure

```text
neurojob-ai/
├── .github/              # Workflows & CI/CD automation
├── src/
│   ├── app/              # Next.js App Router routes & pages
│   ├── components/       # UI components & shadcn design elements
│   ├── lib/              # API clients, Supabase config, & Gemini helpers
│   └── types/            # TypeScript interfaces and definitions
├── public/               # Static assets & graphics
├── package.json
└── README.md
