import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = { title: 'Privacy Policy', description: 'SNOT Olympiad Privacy Policy — how we collect, use and protect your data.' };

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 bg-white dark:bg-gray-950">
        <div className="bg-gradient-to-br from-primary-900 to-gray-950 py-16 text-center px-4">
          <h1 className="text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>Privacy Policy</h1>
          <p className="text-primary-200 mt-2">Last updated: 1 January 2026</p>
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <div className="prose prose-gray dark:prose-invert max-w-none space-y-8 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            {[
              { title: '1. Information We Collect', body: 'We collect information you provide directly when registering, including name, email, phone number, school name and location. We also collect usage data such as pages visited, device type and browser.' },
              { title: '2. How We Use Information', body: 'Your information is used to manage Olympiad registrations, process payments, send results and communicate important updates. We do not sell your data to third parties.' },
              { title: '3. Data Security', body: 'We use industry-standard encryption (SSL/TLS), secure JWT authentication and MongoDB Atlas security features to protect your data. Passwords are hashed with bcrypt and never stored in plain text.' },
              { title: '4. Cookies', body: 'We use cookies for session management and to improve your experience. You can control cookie settings in your browser. Essential cookies are required for the platform to function.' },
              { title: '5. Data Retention', body: 'We retain your data as long as your account is active. Student data related to completed olympiads is retained for 5 years for certificate verification purposes.' },
              { title: '6. Your Rights', body: 'You have the right to access, correct or delete your personal data. To exercise these rights, contact us at privacy@snotolympiad.in. We will respond within 30 business days.' },
              { title: '7. Children\'s Privacy', body: 'Our platform handles student data on behalf of schools. Schools are responsible for obtaining appropriate parental consent for students under 18. We do not knowingly collect data from minors without school authorisation.' },
              { title: '8. Changes to This Policy', body: 'We may update this policy periodically. We will notify registered users of significant changes via email. Continued use of the platform after changes constitutes acceptance of the updated policy.' },
              { title: '9. Contact Us', body: 'For privacy-related queries, contact our Privacy Officer at privacy@snotolympiad.in or write to: SNOT Privacy Officer, Connaught Place, New Delhi — 110001.' },
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
