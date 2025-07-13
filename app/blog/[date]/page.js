import { getBlogByDate, getAllBlogDates } from '../../lib/markdown';
import BlogPost from '../../components/BlogPost';
import { notFound } from 'next/navigation';

const siteUrl = 'https://lf32-dev.vercel.app';

// Generate static params for all blog posts
export async function generateStaticParams() {
  const dates = await getAllBlogDates();
  return dates.map((date) => ({
    date: date,
  }));
}

// Function to get all blogs for related posts
async function getAllBlogs() {
  const dates = await getAllBlogDates();
  const blogs = await Promise.all(
    dates.map(async (date) => {
      const blog = await getBlogByDate(date);
      return blog;
    })
  );
  return blogs.filter(blog => blog !== null);
}

export async function generateMetadata({ params }) {
  if (!params?.date) {
    return {
      title: 'Blog Post Not Found',
    };
  }
  const blog = await getBlogByDate(params.date);
  if (!blog) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  const publishedDate = new Date(params.date).toISOString();
  const modifiedDate = new Date().toISOString(); // You might want to add a lastModified field to your blog posts

  return {
    title: blog.title,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: 'article',
      publishedTime: publishedDate,
      modifiedTime: modifiedDate,
      authors: ['LF32'],
      tags: [blog.category, 'software development', 'security', 'technology'],
      url: `${siteUrl}/blog/${params.date}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.excerpt,
    },
    alternates: {
      canonical: `${siteUrl}/blog/${params.date}`,
    },
    other: {
      'article:published_time': publishedDate,
      'article:modified_time': modifiedDate,
      'article:section': blog.category,
      'article:tag': [blog.category, 'software development', 'security', 'technology'].join(', '),
    }
  };
}

// Add proper typing for the page props
export default async function BlogPage({ params }) {
  if (!params?.date) {
    notFound();
  }
  
  const blog = await getBlogByDate(params.date);
  if (!blog) {
    notFound();
  }

  // Fetch all blogs for related posts
  const allBlogs = await getAllBlogs();
  
  // Filter out the current blog and get related posts
  const relatedPosts = allBlogs
    .filter(b => b.date !== blog.date)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white pb-20">
      <BlogPost blog={blog} relatedPosts={relatedPosts} />
    </div>
  );
} 