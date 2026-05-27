import { HiAcademicCap, HiGlobe, HiCreditCard, HiTruck, HiChartBar, HiShieldCheck } from 'react-icons/hi';

const features = [
  { icon: HiAcademicCap, title: 'Multi-Subject Olympiads',    desc: 'Maths, Science, English, GK, Cyber & Reasoning — compete across 6 subjects from Class 1 to 12.',        color: 'indigo' },
  { icon: HiGlobe,       title: 'Pan-India Network',           desc: '1,200+ registered schools across 22 states, making SNOT the most expansive olympiad network in India.',  color: 'green' },
  { icon: HiCreditCard,  title: 'Seamless Fee Management',     desc: 'Online payments, bulk school invoices, auto-generated receipts and real-time payment tracking.',          color: 'amber' },
  { icon: HiTruck,       title: 'End-to-End Logistics',        desc: 'Question paper kits packed and dispatched with full tracking from our Delhi hub to every school.',        color: 'red' },
  { icon: HiChartBar,    title: 'Live Dashboard & Reports',    desc: 'Real-time analytics, state-wise registration progress, school-level reports and result insights.',         color: 'purple' },
  { icon: HiShieldCheck, title: 'Secure & Transparent',        desc: 'End-to-end encrypted data, verifiable roll numbers, tamper-proof results and SSL-secured platform.',      color: 'teal' },
];

const colorMap: Record<string, string> = {
  indigo: 'bg-primary-50 dark:bg-primary-950 text-primary-600 dark:text-primary-400',
  green:  'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400',
  amber:  'bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400',
  red:    'bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400',
  purple: 'bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400',
  teal:   'bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400',
};

export default function Features() {
  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-primary-600 dark:text-primary-400 font-semibold text-sm uppercase tracking-wider mb-3">Why Choose SNOT</p>
          <h2 className="section-title mb-4">Everything You Need,<br />All in One Platform</h2>
          <p className="section-subtitle max-w-2xl mx-auto">From school onboarding to result declaration — we manage the full olympiad lifecycle so schools can focus on students.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-stagger">
          {features.map(f => (
            <div key={f.title} className="card p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colorMap[f.color]} group-hover:scale-110 transition-transform duration-300`}>
                <f.icon className="text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>{f.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
