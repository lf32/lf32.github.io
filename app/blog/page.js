import { getAllBlogs } from '../lib/markdown';
import BlogPageClient from './BlogPageClient';

export const metadata = {
  title: 'Blog | Software Development & Security Insights',
  description: 'Explore in-depth articles on software development, cybersecurity, and technology. Learn about web development, security research, and software engineering best practices.',
};

export default async function BlogPage() {
  // Get all blogs and sort them by date
  const blogs = await getAllBlogs();
  const sortedBlogs = blogs.sort((a, b) => new Date(b.date) - new Date(a.date));

  return <BlogPageClient blogs={sortedBlogs} />;
} 