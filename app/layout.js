import './globals.css';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-playfair'
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
    // Add other verification tokens as needed
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="canonical" href={siteUrl} />
        <meta name="theme-color" content="#ffffff" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className={`antialiased ${playfair.variable}`}>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
