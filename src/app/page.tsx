import Link from 'next/link';
import { ArrowRight, CheckCircle2, Sparkles, Target, Zap } from 'lucide-react';
import Navbar from '../components/ui/Navbar';

export default function Home() {
  return (
    <div className="home-page">
      <Navbar />

      <section className="home-hero">
        <div className="home-copy">
          <p className="eyebrow">NeuroJob AI · Career intelligence</p>
          <h1>
            Stop applying
            <br />
            blindly.
          </h1>
          <p>
            Match your experience to any role with surgical precision. Get a calibrated
            fit score, ATS keyword gaps, a tailored cover letter, and interview questions
            that actually matter — powered by Gemini.
          </p>

          <div className="hero-actions">
            <Link href="/dashboard" className="primary-button">
              Open command center <ArrowRight size={15} />
            </Link>
            <Link href="/dashboard" className="secondary-button">
              Try a sample analysis
            </Link>
          </div>

          <div className="trust-row">
            <span>
              <CheckCircle2 size={14} /> Structured Gemini output
            </span>
            <span>
              <Target size={14} /> ATS + narrative scoring
            </span>
            <span>
              <Zap size={14} /> Interview-ready in seconds
            </span>
          </div>
        </div>

        <div className="hero-art">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="signal-card">
            <div className="signal-top">
              <span className="signal-dot" /> LIVE SIGNAL
            </div>
            <div className="signal-score">
              87<span>%</span>
            </div>
            <p>Match confidence · Senior Product Designer</p>
            <div className="signal-lines">
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="hero-sticker">
            <Sparkles size={12} /> High signal
          </div>
          <div className="hero-compass">N</div>
        </div>
      </section>

      <div className="home-strip">
        <span>Built for international hackathons & ambitious candidates</span>
        <Link href="/dashboard">
          Enter workspace <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}
