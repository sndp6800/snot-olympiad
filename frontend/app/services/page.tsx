import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { HiCheckCircle } from 'react-icons/hi';

export const metadata: Metadata = { title: 'Services', description: 'Explore SNOT Olympiad services — Maths, Science, English, GK, Cyber and Reasoning olympiads for schools across India.' };

const olympiads = [
  { id: 'math',      title: 'Mathematics Olympiad',        color: 'indigo', level: 'Class 1–12', features: ['Arithmetic to Calculus', 'HOTS-based questions', 'State & National Ranks', 'Merit certificates'] },
  { id: 'science',   title: 'Science Olympiad',            color: 'green',  level: 'Class 3–12', features: ['Physics, Chemistry, Biology', 'Concept-based MCQs', 'Lab reasoning problems', 'All-India ranking'] },
  { id: 'english',   title: 'English Language Olympiad',   color: 'blue',   level: 'Class 1–10', features: ['Grammar & vocabulary', 'Reading comprehension', 'Creative writing aptitude', 'Language fluency scores'] },
  { id: 'gk',        title: 'General Knowledge Olympiad',  color: 'amber',  level: 'Class 3–10', features: ['Current affairs & history', 'Geography & civics', 'Science awareness', 'Dynamic question sets'] },
  { id: 'cyber',     title: 'Cyber Olympiad',              color: 'purple', level: 'Class 3–12', features: ['Coding fundamentals', 'Internet & digital safety', 'Computer hardware basics', 'Logical reasoning'] },
  { id: 'reasoning', title: 'Reasoning Olympiad',          color: 'red',    level: 'Class 1–12', features: ['Verbal & non-verbal reasoning', 'Pattern recognition', 'Puzzle solving', 'Critical thinking'] },
];

const colorBg: Record<string, string> = {
  indigo: 'bg-primary-600', green: 'bg-emerald-600', blue: 'bg-blue-600',
  amber: 'bg-amber-600', purple: 'bg-purple-600', red: 'bg-red-600',
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="bg-gradient-to-br from-primary-900 to-gray-950 py-24 text-center px-4">
          <h1 className="text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>Our Olympiad Programs</h1>
          <p className="text-primary-200 text-lg max-w-xl mx-auto">Six world-class Olympiad programs designed to challenge, inspire and reward students across India.</p>
        </section>

        <section className="py-20 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {olympiads.map(o => (
                <div key={o.id} id={o.id} className="card overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className={`${colorBg[o.color]} p-5`}>
                    <div className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-1">{o.level}</div>
                    <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>{o.title}</h3>
                  </div>
                  <div className="p-5">
                    <ul className="space-y-2">
                      {o.features.map(f => (
                        <li key={f} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <HiCheckCircle className="text-emerald-500 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link href="/contact" className="mt-5 block text-center btn-primary text-sm py-2.5">
                      Enquire Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="section-title mb-4">How It Works</h2>
            <p className="section-subtitle mb-12">Simple 5-step process from registration to results.</p>
            <div className="relative">
              <div className="hidden sm:block absolute top-8 left-0 right-0 h-0.5 bg-primary-200 dark:bg-primary-900 z-0" />
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 relative z-10">
                {['Register School', 'Enrol Students', 'Pay Fees', 'Receive Kit', 'Get Results'].map((step, i) => (
                  <div key={step} className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-primary-600 text-white flex items-center justify-center text-lg font-bold border-4 border-white dark:border-gray-900 shadow-md">
                      {i + 1}
                    </div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">{step}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
