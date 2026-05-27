import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { HiAcademicCap, HiHeart, HiLightBulb, HiGlobe } from 'react-icons/hi';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about SNOT — StudyNLearn National Olympiad, our mission, vision and the team behind India\'s largest school olympiad.',
};

const values = [
  { icon: HiAcademicCap, title: 'Academic Excellence', desc: 'We believe every student has untapped potential waiting to be unlocked through the right challenges.' },
  { icon: HiHeart,       title: 'Student First',       desc: 'Every decision we make is guided by what\'s best for the students and schools we serve.' },
  { icon: HiLightBulb,  title: 'Innovation',           desc: 'We continuously improve our platform with the latest technology to deliver the best experience.' },
  { icon: HiGlobe,      title: 'Inclusive Growth',     desc: 'We partner with schools across urban and rural India to ensure every student gets a fair shot.' },
];

const team = [
  { name: 'Aakash Verma',  role: 'Founder & CEO',      location: 'New Delhi' },
  { name: 'Priya Sharma',  role: 'Head of Operations',  location: 'Mumbai' },
  { name: 'Rahul Singh',   role: 'Technology Lead',     location: 'Bengaluru' },
  { name: 'Neha Gupta',    role: 'Academic Director',   location: 'New Delhi' },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-900 to-gray-950 py-24 text-center px-4">
          <p className="text-primary-400 font-semibold text-sm uppercase tracking-wider mb-3">Our Story</p>
          <h1 className="text-5xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Built for India's<br />Future Leaders
          </h1>
          <p className="text-primary-200 text-lg max-w-2xl mx-auto">
            SNOT was founded with one mission: to create a fair, large-scale academic platform that gives every Indian student a chance to shine on the national stage.
          </p>
        </section>

        {/* Mission */}
        <section className="py-20 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="section-title mb-6">Our Mission</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  To democratize academic competition by building India's most accessible, transparent, and impactful Olympiad network — connecting every school, in every state, under one platform.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Since our founding, we have partnered with over 1,200 schools across 22 states, facilitated 80,000+ student registrations, and delivered results with 99.8% accuracy and on-time logistics.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Founded', value: '2019' },
                  { label: 'States', value: '22' },
                  { label: 'Schools', value: '1,200+' },
                  { label: 'Students', value: '80,000+' },
                ].map(s => (
                  <div key={s.label} className="card p-6 text-center">
                    <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1" style={{ fontFamily: 'var(--font-display)' }}>{s.value}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="section-title mb-4">Our Core Values</h2>
            <p className="section-subtitle mb-12 max-w-xl mx-auto">The principles that guide everything we do.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map(v => (
                <div key={v.title} className="card p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-950 flex items-center justify-center mx-auto mb-4">
                    <v.icon className="text-2xl text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{v.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="section-title mb-4">Meet the Team</h2>
            <p className="section-subtitle mb-12 max-w-xl mx-auto">Passionate educators and technologists working to transform academic competitions in India.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map(m => (
                <div key={m.name} className="card p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                    {m.name.charAt(0)}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{m.name}</h3>
                  <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mt-1">{m.role}</p>
                  <p className="text-xs text-gray-400 mt-1">{m.location}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
