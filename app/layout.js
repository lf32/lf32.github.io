import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const siteUrl = 'https://lf32.vercel.app';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'LF32 | Lali Akhil Raj',
    template: '%s'
  },
  description: 'Software developer and security researcher specializing in web development, cybersecurity, and open source contributions. Read my blog for insights on software development, security research, and tech tutorials.',
  keywords: ['software developer', 'security researcher', 'web development', 'cybersecurity', 'open source', 'tech blog', 'software engineering', 'bug bounty', 'penetration testing'],
  authors: [{ name: 'LF32' }],
  creator: 'LF32',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'LF32 | Lali Akhil Raj',
    description: 'Software developer and security researcher specializing in web development, cybersecurity, and open source contributions.',
    siteName: 'LF32',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'LF32 - Software Developer & Security Researcher'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LF32 | Software Developer & Security Researcher',
    description: 'Software developer and security researcher specializing in web development, cybersecurity, and open source contributions.',
    images: [`${siteUrl}/og-image.jpg`],
    creator: '@lf32'
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
  verification: {
    google: 'your-google-site-verification',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#f4f1ea" />
      </head>
      <body className={`antialiased ${inter.variable} font-sans`}>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
