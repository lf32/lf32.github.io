import { getAllBlogs } from '../lib/markdown';
import BlogList from '../components/BlogList';
import { Search } from 'lucide-react';

export const metadata = {
  title: 'Search Results',
  description: 'Search through blog posts about software development, cybersecurity, and technology.',
  robots: {
    index: false,
    follow: true,
  },
};

export default async function SearchPage({ searchParams }) {
  const query = searchParams?.q || '';
  const blogs = await getAllBlogs();
  
  // Filter blogs based on search query
  const filteredBlogs = blogs.filter(blog => {
    const searchContent = `${blog.title} ${blog.excerpt} ${blog.category}`.toLowerCase();
    return searchContent.includes(query.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Search className="w-6 h-6 text-gray-400 mr-2" />
            <h1 className="text-4xl font-bold gradient-text">Search Results</h1>
          </div>
          
          {query ? (
            <p className="text-lg text-gray-600">
              {filteredBlogs.length === 0 ? (
                `No results found for "${query}"`
              ) : (
                `Found ${filteredBlogs.length} result${filteredBlogs.length === 1 ? '' : 's'} for "${query}"`
              )}
            </p>
          ) : (
            <p className="text-lg text-gray-600">
              Enter a search term to find blog posts
            </p>
          )}
        </div>

        {filteredBlogs.length > 0 && (
          <BlogList blogs={filteredBlogs} />
        )}

        {filteredBlogs.length === 0 && query && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Try searching for something else or browse our categories:</p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">Web Development</span>
              <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">Security Research</span>
              <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">Software Engineering</span>
              <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">Open Source</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 