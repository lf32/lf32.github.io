'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkSlug from 'remark-slug';

const components = {
  h1: ({ node, ...props }) => (
    <h1
      className="mb-4 mt-10 text-[34px] font-normal leading-none tracking-[-0.02em] text-[var(--pt-ink)] first:mt-0 sm:text-[40px]"
      {...props}
    />
  ),
  h2: ({ node, ...props }) => (
    <h2
      className="mb-3 mt-9 text-[28px] font-normal leading-none tracking-[-0.02em] text-[var(--pt-ink)] sm:text-[34px]"
      {...props}
    />
  ),
  h3: ({ node, ...props }) => (
    <h3
      className="mb-2.5 mt-7 text-[22px] font-normal leading-tight tracking-[-0.02em] text-[var(--pt-ink)] sm:text-[26px]"
      {...props}
    />
  ),
  h4: ({ node, ...props }) => (
    <h4
      className="mb-2 mt-6 text-[18px] font-normal leading-tight tracking-[-0.02em] text-[var(--pt-ink)] sm:text-[22px]"
      {...props}
    />
  ),
  p: ({ node, ...props }) => {
    const hasOnlyImage =
      node?.children?.length === 1 && node.children[0]?.tagName === 'img';
    return (
      <p
        className={`mb-5 text-[var(--pt-ink-soft)] leading-[1.8] text-[1.05rem] ${
          hasOnlyImage ? 'text-center' : ''
        }`}
        {...props}
      />
    );
  },
  a: ({ node, ...props }) => (
    <a
      className="text-[var(--pt-ink)] font-medium underline underline-offset-4 decoration-[var(--pt-gold)] hover:opacity-70 transition-opacity"
      {...props}
    />
  ),
  ul: ({ node, ...props }) => (
    <ul
      className="list-disc pl-5 mb-5 space-y-1.5 text-[var(--pt-ink-soft)] marker:text-[var(--pt-gold-deep)]"
      {...props}
    />
  ),
  ol: ({ node, ...props }) => (
    <ol
      className="list-decimal pl-5 mb-5 space-y-1.5 text-[var(--pt-ink-soft)] marker:font-semibold marker:text-[var(--pt-ink)]"
      {...props}
    />
  ),
  li: ({ node, ...props }) => (
    <li className="leading-[1.75] text-[1.05rem]" {...props} />
  ),
  blockquote: ({ node, ...props }) => (
    <blockquote
      className="border-l-[3px] border-[var(--pt-gold)] pl-4 my-6 italic text-[var(--pt-muted)]"
      {...props}
    />
  ),
  code: ({ node, inline, className, children, ...props }) => {
    const isInline = inline ?? !className;
    if (isInline) {
      return (
        <code
          className="bg-black/[0.04] text-[var(--pt-ink)] px-1.5 py-0.5 rounded-md text-[0.9em] font-mono border border-black/[0.08]"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code className={`${className || ''} font-mono text-sm`} {...props}>
        {children}
      </code>
    );
  },
  pre: ({ node, ...props }) => (
    <pre
      className="bg-[#1e2124] text-[#efefef] p-4 sm:p-5 overflow-x-auto my-6 text-sm leading-relaxed"
      {...props}
    />
  ),
  img: ({ node, ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="inline-block my-6 max-w-full border border-black/[0.08]"
      alt={props.alt || ''}
      {...props}
    />
  ),
  hr: ({ node, ...props }) => (
    <hr className="border-0 border-t border-black/[0.10] my-10" {...props} />
  ),
  table: ({ node, ...props }) => (
    <div className="overflow-x-auto my-6 border border-black/[0.08]">
      <table className="w-full text-sm text-left" {...props} />
    </div>
  ),
  th: ({ node, ...props }) => (
    <th
      className="bg-black/[0.03] px-4 py-2.5 font-semibold text-[var(--pt-ink)] border-b border-black/[0.08]"
      {...props}
    />
  ),
  td: ({ node, ...props }) => (
    <td
      className="px-4 py-2.5 text-[var(--pt-ink-soft)] border-b border-black/[0.08]"
      {...props}
    />
  ),
  strong: ({ node, ...props }) => (
    <strong className="font-semibold text-[var(--pt-ink)]" {...props} />
  ),
};

export default function MarkdownContent({ content }) {
  return (
    <div className="blog-content">
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkSlug]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
