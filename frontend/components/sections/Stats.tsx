'use client';
import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 1200, suffix: '+', label: 'Schools Registered', desc: 'Across 22 Indian states' },
  { value: 80000, suffix: '+', label: 'Students Enrolled', desc: 'Classes 1 to 12' },
  { value: 98, suffix: '%', label: 'School Satisfaction', desc: 'Rated excellent or good' },
  { value: 6, suffix: '', label: 'Olympiad Subjects', desc: 'Multiple disciplines' },
];

function useCountUp(end: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
}

function StatItem({ value, suffix, label, desc, start }: typeof stats[0] & { start: boolean }) {
  const count = useCountUp(value, 1800, start);
  return (
    <div className="text-center">
      <div className="text-4xl lg:text-5xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>
        {count.toLocaleString('en-IN')}{suffix}
      </div>
      <div className="text-primary-200 font-semibold mb-1">{label}</div>
      <div className="text-primary-400 text-sm">{desc}</div>
    </div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 bg-gradient-to-r from-primary-700 to-primary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map(s => <StatItem key={s.label} {...s} start={started} />)}
        </div>
      </div>
    </section>
  );
}
