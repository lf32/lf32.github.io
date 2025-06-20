import { getAllBlogs } from '../lib/markdown';
import BlogPageClient from './BlogPageClient';

const siteUrl = 'https://lf32.vercel.app';

export const metadata = {
  title: 'Blog | Software Development & Security Insights',
  description: 'Explore in-depth articles on software development, cybersecurity, and technology. Learn about web development, security research, and software engineering best practices.',
  openGraph: {
    title: 'Blog | Software Development & Security Insights',
    description: 'Explore in-depth articles on software development, cybersecurity, and technology. Learn about web development, security research, and software engineering best practices.',
    type: 'article',
    url: `${siteUrl}/blog`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Software Development & Security Insights',
    description: 'Explore in-depth articles on software development, cybersecurity, and technology.',
  },
  alternates: {
    canonical: `${siteUrl}/blog`,
  }
};

export default async function BlogPage() {
  // Get all blogs and sort them by date
  const blogs = await getAllBlogs();
  
  // Sort blogs by date in descending order (newest first)
  const sortedBlogs = blogs.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="min-h-screen bg-black">
      <BlogPageClient initialBlogs={sortedBlogs} />
    </div>
  );
} 