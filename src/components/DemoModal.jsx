import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RefreshCw, ExternalLink } from 'lucide-react';

/**
 * DemoModal — Full-screen iOS-style glassmorphism modal overlay.
 *
 * Renders an iframe or placeholder demo inside a frosted glass container
 * with a top toolbar featuring Close (X), Reload, and External Link buttons.
 */
export default function DemoModal({ isOpen, onClose, title = 'Demo', url = '' }) {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className="modal-container"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Toolbar */}
            <div className="modal-toolbar">
              {/* Traffic light dots */}
              <div className="flex items-center gap-2 mr-3">
                <button
                  onClick={onClose}
                  className="dot bg-[#ff5f57] hover:bg-[#ff4040] transition-colors"
                  aria-label="Close"
                />
                <div className="dot bg-[#febc2e]" />
                <div className="dot bg-[#28c840]" />
              </div>

              {/* Title */}
              <div className="flex-1 text-center">
                <span className="text-[13px] font-semibold text-gray-600 dark:text-gray-300">
                  {title}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1.5">
                {url && (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl text-gray-400 hover:text-[#0a84ff] hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                    aria-label="Open in new tab"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
                <button
                  onClick={() => {
                    const iframe = document.getElementById('demo-iframe');
                    if (iframe && url) iframe.src = url;
                  }}
                  className="p-2 rounded-xl text-gray-400 hover:text-[#0a84ff] hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                  aria-label="Reload"
                >
                  <RefreshCw size={16} />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl text-gray-400 hover:text-[#ff375f] hover:bg-[#ff375f]/10 transition-all"
                  aria-label="Close modal"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 relative" style={{ height: 'calc(100% - 48px)' }}>
              {url ? (
                <iframe
                  id="demo-iframe"
                  src={url}
                  title={title}
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#1c1c1e] dark:to-[#2c2c2e]">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#0a84ff]/20 to-[#5e5ce6]/20 flex items-center justify-center mb-6">
                    <svg className="w-10 h-10 text-[#0a84ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91M3.75 21h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v13.5A1.5 1.5 0 003.75 21z" />
                    </svg>
                  </div>
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">{title}</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500">Live demo preview</p>
                  {/* <!-- Insert Image Here for project screenshot --> */}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
