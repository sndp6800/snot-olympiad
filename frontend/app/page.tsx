import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import Stats from '@/components/sections/Stats';
import CTA from '@/components/sections/CTA';

export const metadata: Metadata = {
  title: 'SNOT — StudyNLearn National Olympiad | Home',
  description: 'India\'s premier Olympiad platform for students. Register your school and join 1,200+ schools across 22 states.',
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
