'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkSlug from 'remark-slug';

const components = {
  h1: ({ node, ...props }) => (
    <h1
      className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4 mt-10 first:mt-0 text-[var(--ramp-ink)]"
      {...props}
    />
  ),
  h2: ({ node, ...props }) => (
    <h2
      className="text-xl sm:text-2xl font-semibold tracking-tight mb-3 mt-9 text-[var(--ramp-ink)]"
      {...props}
    />
  ),
  h3: ({ node, ...props }) => (
    <h3
      className="text-lg sm:text-xl font-semibold tracking-tight mb-2.5 mt-7 text-[var(--ramp-ink)]"
      {...props}
    />
  ),
  h4: ({ node, ...props }) => (
    <h4
      className="text-base sm:text-lg font-semibold tracking-tight mb-2 mt-6 text-[var(--ramp-ink)]"
      {...props}
    />
  ),
  p: ({ node, ...props }) => {
    const hasOnlyImage =
      node?.children?.length === 1 && node.children[0]?.tagName === 'img';
    return (
      <p
        className={`mb-5 text-[var(--ramp-ink-soft)] leading-[1.8] text-[1.05rem] ${
          hasOnlyImage ? 'text-center' : ''
        }`}
        {...props}
      />
    );
  },
  a: ({ node, ...props }) => (
    <a
      className="text-[var(--ramp-ink)] font-medium underline underline-offset-4 decoration-[var(--ramp-lime)] hover:opacity-70 transition-opacity"
      {...props}
    />
  ),
  ul: ({ node, ...props }) => (
    <ul
      className="list-disc pl-5 mb-5 space-y-1.5 text-[var(--ramp-ink-soft)] marker:text-[var(--ramp-lime-deep)]"
      {...props}
    />
  ),
  ol: ({ node, ...props }) => (
    <ol
      className="list-decimal pl-5 mb-5 space-y-1.5 text-[var(--ramp-ink-soft)] marker:font-semibold marker:text-[var(--ramp-ink)]"
      {...props}
    />
  ),
  li: ({ node, ...props }) => (
    <li className="leading-[1.75] text-[1.05rem]" {...props} />
  ),
  blockquote: ({ node, ...props }) => (
    <blockquote
      className="border-l-[3px] border-[var(--ramp-lime)] pl-4 my-6 italic text-[var(--ramp-muted)]"
      {...props}
    />
  ),
  code: ({ node, inline, className, children, ...props }) => {
    const isInline = inline ?? !className;
    if (isInline) {
      return (
        <code
          className="bg-black/[0.05] text-[var(--ramp-ink)] px-1.5 py-0.5 rounded-md text-[0.9em] font-mono border border-black/[0.04]"
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
      className="bg-[var(--ramp-ink)] text-white/90 p-4 sm:p-5 rounded-2xl overflow-x-auto my-6 text-sm leading-relaxed border border-black/10 shadow-lg shadow-black/10"
      {...props}
    />
  ),
  img: ({ node, ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="inline-block my-6 rounded-2xl shadow-sm max-w-full border border-black/[0.05]"
      alt={props.alt || ''}
      {...props}
    />
  ),
  hr: ({ node, ...props }) => (
    <hr className="border-0 border-t border-black/[0.08] my-10" {...props} />
  ),
  table: ({ node, ...props }) => (
    <div className="overflow-x-auto my-6 rounded-xl border border-black/[0.06]">
      <table className="w-full text-sm text-left" {...props} />
    </div>
  ),
  th: ({ node, ...props }) => (
    <th
      className="bg-black/[0.03] px-4 py-2.5 font-semibold text-[var(--ramp-ink)] border-b border-black/[0.06]"
      {...props}
    />
  ),
  td: ({ node, ...props }) => (
    <td
      className="px-4 py-2.5 text-[var(--ramp-ink-soft)] border-b border-black/[0.04]"
      {...props}
    />
  ),
  strong: ({ node, ...props }) => (
    <strong className="font-semibold text-[var(--ramp-ink)]" {...props} />
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
