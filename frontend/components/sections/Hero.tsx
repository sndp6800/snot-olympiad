'use client';
import Link from 'next/link';
import { HiArrowRight, HiAcademicCap, HiStar } from 'react-icons/hi';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-gray-950">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl animate-float" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-300 text-sm font-medium mb-8 animate-fade-in">
          <HiStar className="text-accent-400" />
          India's Largest School Olympiad Network
        </div>

        {/* Heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 animate-slide-up text-balance" style={{ fontFamily: 'var(--font-display)' }}>
          Ignite Every
          <br />
          <span className="bg-gradient-to-r from-primary-400 via-accent-400 to-primary-300 bg-clip-text text-transparent">
            Student's Potential
          </span>
        </h1>

        <p className="text-xl text-primary-200 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '0.15s' }}>
          StudyNLearn National Olympiad connects 1,200+ schools and 80,000+ students across India in a journey of academic excellence and competitive growth.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.25s' }}>
          <Link href="/auth/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-900 font-semibold rounded-xl hover:bg-primary-50 active:scale-95 transition-all duration-200 shadow-glow text-base">
            Register Your School
            <HiArrowRight />
          </Link>
          <Link href="/about"
            className="inline-flex items-center gap-2 px-8 py-4 border border-primary-500/40 text-primary-200 font-medium rounded-xl hover:bg-primary-500/10 active:scale-95 transition-all duration-200 text-base">
            Learn More
          </Link>
        </div>

        {/* Stats row */}
        <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 animate-slide-up" style={{ animationDelay: '0.35s' }}>
          {[
            { value: '1,200+', label: 'Schools' },
            { value: '80,000+', label: 'Students' },
            { value: '22', label: 'States Covered' },
            { value: '6+', label: 'Olympiad Subjects' },
          ].map(s => (
            <div key={s.label} className="p-4 rounded-2xl border border-primary-800/50 bg-primary-900/30 backdrop-blur-sm">
              <div className="text-3xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-display)' }}>{s.value}</div>
              <div className="text-sm text-primary-300">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0,80L1440,80L1440,40C1200,80 960,0 720,20C480,40 240,80 0,40Z" fill="white" className="dark:fill-gray-950" />
        </svg>
      </div>
    </section>
  );
}
