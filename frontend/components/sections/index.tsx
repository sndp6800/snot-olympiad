'use client';
import Link from 'next/link';
import { HiAcademicCap, HiArrowRight, HiCheckCircle, HiStar } from 'react-icons/hi';
import { FaTrophy, FaSchool, FaUsers, FaMapMarkedAlt } from 'react-icons/fa';
import { Card } from '@/components/ui';

/* ─── Hero Section ─────────────────────────────────────────── */
export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white dark:bg-gray-950">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 dark:opacity-20" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary-100 dark:bg-primary-950 rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-amber-50 dark:bg-amber-950 rounded-full blur-3xl opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="animate-stagger">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-950 border border-primary-100 dark:border-primary-900 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
              <HiStar className="text-amber-400" />
              India's #1 National Olympiad Platform
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight mb-6 text-balance" style={{ fontFamily: 'var(--font-display)' }}>
              Empower Every
              <span className="block bg-gradient-to-r from-primary-600 via-primary-500 to-amber-500 bg-clip-text text-transparent">
                Young Mind
              </span>
              Across India
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-xl">
              StudyNLearn National Olympiad connects 1,200+ schools and 80,000+ students across all 28 states, delivering world-class academic competitions at their doorstep.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary text-base px-7 py-3.5">
                Register Your School
                <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/about" className="btn-secondary text-base px-7 py-3.5">
                Learn More
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-gray-100 dark:border-gray-800">
              {[
                { label: '1,200+ Schools', icon: <FaSchool className="text-primary-500" /> },
                { label: '80,000+ Students', icon: <FaUsers className="text-emerald-500" /> },
                { label: '22 States Covered', icon: <FaMapMarkedAlt className="text-amber-500" /> },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — floating cards */}
          <div className="hidden lg:block relative h-[520px]">
            <div className="absolute top-0 right-0 w-72 animate-float">
              <Card className="p-5 shadow-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center"><FaTrophy className="text-amber-500" /></div>
                  <div><div className="font-semibold text-gray-900 dark:text-white text-sm">2025–26 Results</div><div className="text-xs text-gray-400">Just announced!</div></div>
                </div>
                <div className="space-y-2">
                  {['Aarav Sharma — Rank #1 (Math)', 'Priya Nair — Rank #2 (Science)', 'Rohan Gupta — Rank #3 (English)'].map((s, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                      <HiCheckCircle className="text-emerald-500 flex-shrink-0" /> {s}
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="absolute top-40 left-0 w-64" style={{ animationDelay: '1s' }}>
              <Card className="p-5 shadow-xl">
                <div className="text-2xl font-bold text-primary-600 mb-1">84,320</div>
                <div className="text-xs text-gray-500 mb-3">Students Registered 2025–26</div>
                <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                  <div className="bg-gradient-to-r from-primary-500 to-primary-700 h-2 rounded-full" style={{ width: '78%' }} />
                </div>
                <div className="text-xs text-gray-400 mt-1">78% of target reached</div>
              </Card>
            </div>

            <div className="absolute bottom-10 right-10 w-60 animate-float" style={{ animationDelay: '0.5s' }}>
              <Card className="p-4 shadow-xl">
                <div className="text-xs text-gray-500 mb-2">Upcoming Exam</div>
                <div className="font-semibold text-gray-900 dark:text-white text-sm">National Science Olympiad</div>
                <div className="flex items-center gap-1 mt-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-slow" />
                  <span className="text-xs text-emerald-600 dark:text-emerald-400">Registration Open</span>
                </div>
                <div className="text-xs text-gray-400 mt-1">Closes: June 30, 2026</div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Stats Section ────────────────────────────────────────── */
const stats = [
  { value: '1,200+', label: 'Schools Registered',    icon: FaSchool,       color: 'text-primary-600' },
  { value: '80,000+', label: 'Students Participated', icon: FaUsers,        color: 'text-emerald-600' },
  { value: '22',      label: 'States Covered',         icon: FaMapMarkedAlt, color: 'text-amber-600' },
  { value: '6+',      label: 'Subject Olympiads',      icon: HiAcademicCap, color: 'text-purple-600' },
];

export function Stats() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className={`text-4xl md:text-5xl font-bold ${stat.color} mb-2`} style={{ fontFamily: 'var(--font-display)' }}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Features Section ─────────────────────────────────────── */
const features = [
  { title: 'Pan-India Reach',         desc: 'Conduct Olympiads simultaneously across all 28 states with our proven logistics network.',         icon: '🗺️' },
  { title: 'Subject Diversity',        desc: 'Math, Science, English, GK, Cyber, and Reasoning — compete in your strongest subjects.',             icon: '📚' },
  { title: 'Instant Results',          desc: 'OMR-based evaluation with digital results published within 48 hours of the exam.',                   icon: '⚡' },
  { title: 'Merit Certificates',       desc: 'Recognized certificates for all participants. Gold, Silver, Bronze for top performers.',              icon: '🏅' },
  { title: 'School Dashboard',         desc: 'Real-time tracking of registrations, payments, kit dispatch, and results for coordinators.',          icon: '📊' },
  { title: 'Secure & Transparent',     desc: 'End-to-end encrypted question papers. Tamper-proof OMR handling at every stage.',                   icon: '🔒' },
];

export function Features() {
  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
            Why Choose SNOT
          </div>
          <h2 className="section-title mb-4">Built for Scale.<br />Designed for Excellence.</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Every feature is purpose-built for the complexities of running a national-level Olympiad at scale.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-stagger">
          {features.map((f, i) => (
            <Card key={i} hover className="p-6">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                {f.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{f.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Section ──────────────────────────────────────────── */
export function CTA() {
  return (
    <section className="py-24 bg-primary-600 dark:bg-primary-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>
          Ready to join India's biggest Olympiad?
        </h2>
        <p className="text-primary-100 text-lg mb-10 max-w-2xl mx-auto">
          Register your school today and give your students the competitive edge they deserve. Free registration for the first 100 schools.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 font-semibold rounded-xl hover:bg-primary-50 active:scale-95 transition-all shadow-lg">
            Register Your School <HiArrowRight />
          </Link>
          <Link href="/about" className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 active:scale-95 transition-all">
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials Section ─────────────────────────────────── */
const testimonials = [
  { name: 'Ritu Sharma', role: 'Principal, DPS New Delhi', text: 'SNOT has transformed how our students engage with academics. The process from registration to results is seamlessly managed.', rating: 5 },
  { name: 'Anand Joshi',  role: 'Coordinator, KV Mumbai',  text: 'The logistics are impeccable. Question papers arrive on time, results are published quickly, and the admin dashboard is a blessing.', rating: 5 },
  { name: 'Priya Verma',  role: 'Teacher, CMS Lucknow',    text: 'Our students have won national recognition thanks to SNOT. The certificates are respected by colleges and parents love it.', rating: 5 },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">Trusted by Educators Across India</h2>
          <p className="section-subtitle">Hear from the schools and teachers who run SNOT every year.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 animate-stagger">
          {testimonials.map((t, i) => (
            <Card key={i} className="p-6">
              <div className="flex gap-0.5 mb-4">
                {Array(t.rating).fill(null).map((_, j) => (
                  <HiStar key={j} className="text-amber-400 text-sm" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white text-sm">{t.name}</div>
                <div className="text-xs text-gray-400">{t.role}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
