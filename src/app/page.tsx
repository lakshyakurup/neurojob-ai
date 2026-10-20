import Link from 'next/link';
import Navbar from '../components/ui/Navbar';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <section className="mx-auto flex max-w-5xl flex-col items-start gap-6 px-6 py-24">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">NeuroJob AI</p>
        <h1 className="max-w-3xl text-5xl font-bold tracking-tight">Make every application count.</h1>
        <p className="max-w-2xl text-lg leading-8 text-slate-400">
          Match your resume to a target role and find the gaps that matter before you apply.
        </p>
        <Link href="/dashboard" className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-indigo-500">
          Open dashboard
        </Link>
      </section>
    </main>
  );
}