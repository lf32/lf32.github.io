'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkSlug from 'remark-slug';

const components = {
  h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mb-4 text-gray-900" {...props} />,
  h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mb-3 text-gray-900" {...props} />,
  h3: ({ node, ...props }) => <h3 className="text-xl font-bold mb-2 text-gray-900" {...props} />,
  h4: ({ node, ...props }) => <h4 className="text-lg font-bold mb-2 text-gray-900" {...props} />,
  p: ({ node, ...props }) => <p className="mb-3 text-gray-700" {...props} />,
  a: ({ node, ...props }) => <a className="text-blue-600 hover:underline" {...props} />,
  ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-3 text-gray-700" {...props} />,
  ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-3 text-gray-700" {...props} />,
  li: ({ node, ...props }) => <li className="mb-0.5 text-gray-700" {...props} />,
  blockquote: ({ node, ...props }) => (
    <blockquote className="border-l-4 border-gray-300 pl-3 italic my-3 text-gray-600" {...props} />
  ),
  code: ({ node, inline, className, children, ...props }) => (
    <code
      className={`${inline ? 'bg-gray-100 text-blue-600 px-1 py-0.5 rounded' : 'block bg-gray-100 p-3 rounded-lg overflow-x-auto text-gray-800'} ${className || ''}`}
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ node, ...props }) => (
    <pre className="bg-gray-100 p-3 rounded-lg overflow-x-auto my-3 text-gray-800" {...props} />
  ),
};

export default function MarkdownContent({ content }) {
  return (
    <div className="blog-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkSlug]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
} 