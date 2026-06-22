import type { Metadata, Viewport } from 'next';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Analytics } from '@vercel/analytics/next';
import '@/styles/globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://snotolympiad.in';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'SNOT — StudyNLearn National Olympiad',
    template: '%s | SNOT Olympiad',
  },
  description: 'India\'s premier national Olympiad platform for students across all states. Register your school today and give your students a competitive edge.',
  keywords: ['olympiad', 'national olympiad', 'student competition', 'SNOT', 'StudyNLearn', 'school olympiad India', 'math olympiad', 'science olympiad'],
  authors: [{ name: 'SNOT Team', url: siteUrl }],
  creator: 'StudyNLearn National Olympiad',
  publisher: 'SNOT',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: 'SNOT Olympiad',
    title: 'SNOT — StudyNLearn National Olympiad',
    description: 'India\'s premier national Olympiad platform for students across all states.',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'SNOT Olympiad' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SNOT — StudyNLearn National Olympiad',
    description: 'India\'s premier national Olympiad platform.',
    images: ['/images/og-image.jpg'],
  },
  alternates: { canonical: siteUrl },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#4f46e5' },
    { media: '(prefers-color-scheme: dark)',  color: '#312e81' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <AuthProvider>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'var(--toast-bg, #fff)',
                  color: 'var(--toast-color, #1f2937)',
                  border: '1px solid var(--toast-border, #e5e7eb)',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  fontSize: '14px',
                  fontFamily: 'DM Sans, sans-serif',
                },
                success: { iconTheme: { primary: '#059669', secondary: '#fff' } },
                error:   { iconTheme: { primary: '#dc2626', secondary: '#fff' } },
              }}
            />
          </AuthProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
