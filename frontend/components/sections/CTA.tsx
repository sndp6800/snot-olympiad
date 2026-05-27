import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';

export default function CTA() {
  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-12 shadow-glow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="relative">
            <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Ready to Join India's Biggest Olympiad?
            </h2>
            <p className="text-primary-200 text-lg mb-8 max-w-xl mx-auto">
              Register your school today and give your students the competitive edge they deserve.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-900 font-semibold rounded-xl hover:bg-primary-50 active:scale-95 transition-all shadow-lg">
                Register Your School <HiArrowRight />
              </Link>
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white font-medium rounded-xl hover:bg-white/10 active:scale-95 transition-all">
                Talk to Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
