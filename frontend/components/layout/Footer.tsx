'use client';
import Link from 'next/link';
import { HiAcademicCap, HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import { FaTwitter, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';

const footerLinks = {
  company:   [{ href: '/about', label: 'About Us' }, { href: '/services', label: 'Services' }, { href: '/blog', label: 'Blog' }, { href: '/contact', label: 'Contact' }],
  legal:     [{ href: '/privacy', label: 'Privacy Policy' }, { href: '/terms', label: 'Terms & Conditions' }],
  olympiads: [{ href: '/services#math', label: 'Mathematics' }, { href: '/services#science', label: 'Science' }, { href: '/services#english', label: 'English' }, { href: '/services#gk', label: 'General Knowledge' }, { href: '/services#cyber', label: 'Cyber Olympiad' }],
};

const socials = [
  { icon: FaTwitter,   href: '#', label: 'Twitter' },
  { icon: FaLinkedin,  href: '#', label: 'LinkedIn' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaYoutube,   href: '#', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center">
                <HiAcademicCap className="text-white text-xl" />
              </div>
              <div>
                <div className="font-bold text-white text-base leading-none" style={{ fontFamily: 'var(--font-display)' }}>SNOT</div>
                <div className="text-xs text-gray-500 leading-none">StudyNLearn National Olympiad</div>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              India's premier Olympiad platform empowering students across all states with competitive excellence and academic growth.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2"><HiMail className="text-primary-500 flex-shrink-0" /><span>info@snotolympiad.in</span></div>
              <div className="flex items-center gap-2"><HiPhone className="text-primary-500 flex-shrink-0" /><span>+91 98765 43210</span></div>
              <div className="flex items-center gap-2"><HiLocationMarker className="text-primary-500 flex-shrink-0" /><span>New Delhi, India — 110001</span></div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map(l => (
                <li key={l.href}><Link href={l.href} className="text-sm hover:text-primary-400 transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Olympiads</h3>
            <ul className="space-y-2">
              {footerLinks.olympiads.map(l => (
                <li key={l.href}><Link href={l.href} className="text-sm hover:text-primary-400 transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Legal</h3>
            <ul className="space-y-2 mb-6">
              {footerLinks.legal.map(l => (
                <li key={l.href}><Link href={l.href} className="text-sm hover:text-primary-400 transition-colors">{l.label}</Link></li>
              ))}
            </ul>
            <h3 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">Follow Us</h3>
            <div className="flex gap-3">
              {socials.map(s => (
                <a key={s.label} href={s.href} aria-label={s.label}
                  className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-200">
                  <s.icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">© {new Date().getFullYear()} StudyNLearn National Olympiad (SNOT). All rights reserved.</p>
          <p className="text-xs">Made with love for students across India</p>
        </div>
      </div>
    </footer>
  );
}
