import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'NJNC 2028 — Nepal Japan Neurological Conference',
    template: '%s | NJNC 2028',
  },
  description:
    'Join leading neurologists at the Nepal Japan Neurological Conference, September 18-19, 2028, at Hotel Radisson Blu, Kathmandu, Nepal. Register now for keynotes, workshops, and poster sessions.',
  keywords: [
    'NJNC 2028',
    'Nepal Japan Neurological Conference',
    'neurology conference',
    'epilepsy',
    'Kathmandu',
    'Nepal',
    'medical conference',
    'CME',
  ],
  authors: [{ name: 'NJNC Organizing Committee' }],
  openGraph: {
    title: 'NJNC 2028 — Nepal Japan Neurological Conference',
    description:
      'International neurology conference in Kathmandu, Nepal. September 18-19, 2028.',
    url: 'https://njnc2028.com',
    siteName: 'NJNC 2028',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NJNC 2028 — Nepal Japan Neurological Conference',
    description:
      'International neurology conference in Kathmandu, Nepal. September 18-19, 2028.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-snow font-body antialiased">
        {children}
      </body>
    </html>
  );
}
