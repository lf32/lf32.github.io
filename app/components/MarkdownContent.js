'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const components = {
  h1: ({ node, ...props }) => <h1 className="text-3xl font-bold text-gray-800 mb-4" {...props} />,
  h2: ({ node, ...props }) => <h2 className="text-2xl font-bold text-gray-800 mb-3" {...props} />,
  h3: ({ node, ...props }) => <h3 className="text-xl font-bold text-gray-800 mb-2" {...props} />,
  h4: ({ node, ...props }) => <h4 className="text-lg font-bold text-gray-800 mb-2" {...props} />,
  p: ({ node, ...props }) => <p className="text-gray-600 mb-3" {...props} />,
  a: ({ node, ...props }) => <a className="text-blue-600 hover:underline" {...props} />,
  ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-3" {...props} />,
  ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-3" {...props} />,
  li: ({ node, ...props }) => <li className="text-gray-600 mb-0.5" {...props} />,
  blockquote: ({ node, ...props }) => (
    <blockquote className="border-l-4 border-gray-300 pl-3 italic my-3" {...props} />
  ),
  code: ({ node, inline, className, children, ...props }) => (
    <code
      className={`${inline ? 'bg-gray-50 text-blue-600 px-1 py-0.5 rounded' : 'block bg-gray-50 p-3 rounded-lg overflow-x-auto'} ${className || ''}`}
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ node, ...props }) => (
    <pre className="bg-gray-50 p-3 rounded-lg overflow-x-auto my-3" {...props} />
  ),
};

export default function MarkdownContent({ content }) {
  return (
    <div className="prose prose-lg max-w-none blog-content prose-headings:mt-6 prose-headings:mb-3 prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-blockquote:my-3 prose-pre:my-3">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
} 