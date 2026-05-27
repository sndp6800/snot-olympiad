import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = { title: 'Terms & Conditions', description: 'SNOT Olympiad Terms and Conditions — rules and guidelines for using our platform.' };

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 bg-white dark:bg-gray-950">
        <div className="bg-gradient-to-br from-primary-900 to-gray-950 py-16 text-center px-4">
          <h1 className="text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>Terms & Conditions</h1>
          <p className="text-primary-200 mt-2">Last updated: 1 January 2026</p>
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <div className="space-y-8 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            {[
              { title: '1. Acceptance of Terms', body: 'By accessing or using the SNOT platform, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.' },
              { title: '2. Registration', body: 'Schools must provide accurate and complete information during registration. Providing false information may result in immediate termination of the account and disqualification from the Olympiad.' },
              { title: '3. Fees and Payments', body: 'Registration fees are non-refundable once the exam date is announced. Schools are responsible for collecting and remitting student fees. All payments must be made through the designated payment channels.' },
              { title: '4. Exam Integrity', body: 'Any form of cheating, plagiarism or malpractice will result in immediate disqualification and may be reported to relevant authorities. Schools are responsible for maintaining exam integrity at their premises.' },
              { title: '5. Intellectual Property', body: 'All question papers, certificates, branding and content on this platform are the intellectual property of SNOT and protected under Indian copyright law. Reproduction without written consent is strictly prohibited.' },
              { title: '6. Limitation of Liability', body: 'SNOT shall not be liable for any indirect, incidental or consequential damages arising from use of our services. Our maximum liability shall not exceed the registration fee paid by the school.' },
              { title: '7. Governing Law', body: 'These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of New Delhi, India.' },
              { title: '8. Termination', body: 'We reserve the right to terminate or suspend accounts that violate these Terms, engage in fraudulent activity or harm the integrity of the Olympiad.' },
            ].map(s => (
              <div key={s.title}>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>{s.title}</h2>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
