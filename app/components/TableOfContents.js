'use client';

import { motion } from 'framer-motion';

export default function TableOfContents({ headings }) {
  if (!headings || headings.length === 0) {
    return null;
  }

  return (
    <div className="bg-black border border-gray-800 rounded-xl p-6 mb-8">
      <h2 className="text-xl font-bold text-white mb-4">Table of Contents</h2>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <motion.li
            key={heading.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            style={{ marginLeft: `${(heading.level - 1) * 1}rem` }}
          >
            <a
              href={`#${heading.id}`}
              className="text-gray-400 hover:text-white hover:underline transition-colors duration-200"
            >
              {heading.text}
            </a>
          </motion.li>
        ))}
      </ul>
    </div>
  );
} 