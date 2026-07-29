/**
 * layout.js — Root layout with full metadata, Google Fonts, and providers.
 */
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ToastProvider } from '@/components/Toast';

// ── Google Font: Inter ─────────────────────────────────────────────────────

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// ── SEO Metadata ───────────────────────────────────────────────────────────

export const metadata = {
  title: 'Bcrypt Generator Online | Generate & Verify Password Hashes',
  description:
    'Free online bcrypt hash generator and password verifier. Generate bcrypt hashes with customizable cost factor and verify passwords instantly.',
  keywords: [
    'bcrypt',
    'bcrypt generator',
    'bcrypt hash',
    'password hash',
    'online bcrypt',
    'bcrypt checker',
    'verify bcrypt',
    'hash generator',
  ],
  authors: [{ name: 'BcryptGenerator' }],
  openGraph: {
    title: 'Bcrypt Generator Online | Generate & Verify Password Hashes',
    description:
      'Free online bcrypt hash generator and password verifier. Generate bcrypt hashes with customizable cost factor and verify passwords instantly.',
    url: 'https://bcrypt-generator.example.com',
    siteName: 'BcryptGenerator',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bcrypt Generator Online | Generate & Verify Password Hashes',
    description:
      'Free online bcrypt hash generator and password verifier. Generate bcrypt hashes with customizable cost factor and verify passwords instantly.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://bcrypt-generator.example.com',
  },
};

// ── Root Layout ────────────────────────────────────────────────────────────

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-white antialiased">
        <ToastProvider>
          <Header />
          {children}
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
