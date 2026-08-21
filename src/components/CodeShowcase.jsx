import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const snippets = {
  react: {
    label: 'React Component',
    language: 'jsx',
    code: `import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-6 glass-card">
      <h2 className="text-xl font-bold">
        Count: {count}
      </h2>
      <button
        onClick={() => setCount(c => c + 1)}
        className="mt-4 px-4 py-2
          bg-blue-500 text-white
          rounded-xl hover:scale-105
          transition-transform"
      >
        Increment
      </button>
    </div>
  );
}`,
  },
  tailwind: {
    label: 'Tailwind Glass Card',
    language: 'html',
    code: `<!-- iOS Glassmorphism Card -->
<div class="
  p-8 rounded-3xl
  bg-white/72 backdrop-blur-xl
  border border-white/40
  shadow-lg shadow-black/5
  hover:shadow-xl hover:-translate-y-1
  transition-all duration-300
">
  <div class="flex items-center gap-4">
    <div class="w-12 h-12 rounded-2xl
      bg-gradient-to-br
      from-blue-500 to-purple-500
      flex items-center justify-center
      shadow-lg">
      <span class="text-white text-xl">✦</span>
    </div>
    <div>
      <h3 class="font-bold text-gray-900">
        Glass Component
      </h3>
      <p class="text-sm text-gray-500">
        Frosted glass effect
      </p>
    </div>
  </div>
</div>`,
  },
  animation: {
    label: 'Framer Motion',
    language: 'jsx',
    code: `import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export function AnimatedCard({ children, index }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index}
      whileHover={{ scale: 1.03, y: -4 }}
      className="glass-card p-6 rounded-3xl"
    >
      {children}
    </motion.div>
  );
}`,
  },
};

function highlightCode(code, language) {
  if (!code) return '';
  let html = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Comments
  html = html.replace(/(\/\/.*$|\/\*[\s\S]*?\*\/|&lt;!--[\s\S]*?--&gt;)/gm, '<span class="comment">$1</span>');
  // Strings
  html = html.replace(/(&quot;[^&]*?&quot;|'[^']*?'|`[^`]*?`)/g, '<span class="string">$1</span>');
  // Keywords
  html = html.replace(/\b(import|export|from|default|function|const|let|var|return|if|else|new|class|extends|async|await)\b/g, '<span class="keyword">$1</span>');
  // JSX tags
  html = html.replace(/(&lt;\/?)([\w]+)/g, '$1<span class="tag">$2</span>');
  // Attributes
  html = html.replace(/\b(className|onClick|href|src|alt|type|value|target|rel|fill|stroke|viewBox|width|height|key|variants|initial|animate|whileHover|whileInView|viewport|custom|transition)\b/g, '<span class="attr">$1</span>');

  return html;
}

export default function CodeShowcase() {
  const [activeTab, setActiveTab] = useState('react');
  const keys = Object.keys(snippets);
  const lines = snippets[activeTab].code.split('\n');

  return (
    <div className="code-block overflow-hidden">
      {/* Tab bar */}
      <div className="flex items-center gap-0 px-2 pt-2 bg-[#181825]">
        {keys.map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`relative px-4 py-2 text-[12px] font-semibold tracking-tight rounded-t-xl transition-all duration-300 ${
              activeTab === key
                ? 'text-white bg-[#1e1e2e]'
                : 'text-[#6c7086] hover:text-[#a6adc8]'
            }`}
          >
            {snippets[key].label}
            {activeTab === key && (
              <motion.span
                layoutId="code-tab"
                className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#0a84ff] rounded-full"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Code area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="p-4 overflow-x-auto max-h-[400px] overflow-y-auto"
        >
          <table className="w-full border-collapse">
            <tbody>
              {lines.map((line, i) => (
                <tr key={i} className="leading-relaxed">
                  <td className="line-number select-none align-top text-right pr-4 text-[12px]">{i + 1}</td>
                  <td
                    className="text-[#cdd6f4] whitespace-pre"
                    dangerouslySetInnerHTML={{ __html: highlightCode(line, snippets[activeTab].language) }}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
