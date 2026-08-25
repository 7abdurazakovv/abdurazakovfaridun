import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { key: 'home', path: '/' },
  { key: 'about', path: '/about' },
  { key: 'skills', path: '/skills' },
  { key: 'projects', path: '/projects' },
  { key: 'contact', path: '/contact' },
];

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'uz', label: 'UZ' },
  { code: 'ru', label: 'RU' },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { darkMode, toggleDarkMode } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  /* Close mobile menu on route change */
  useEffect(() => { setMenuOpen(false); }, []);

  const linkClass = ({ isActive }) =>
    `relative px-4 py-2 rounded-2xl text-[13px] font-semibold tracking-tight transition-all duration-300 ${
      isActive
        ? 'bg-black/10 dark:bg-white/10 text-gray-900 dark:text-white'
        : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `block px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300 ${
      isActive
        ? 'bg-black/10 dark:bg-white/10 text-gray-900 dark:text-white'
        : 'text-gray-500 dark:text-gray-400 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-3 sm:px-6 lg:px-8">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`mx-auto max-w-5xl transition-all duration-500 ease-out ${
          scrolled
            ? 'ios-glass rounded-3xl shadow-lg shadow-black/5 dark:shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between h-14 px-4 sm:px-6">
          {/* Logo */}
          <Link to="/" className="text-lg font-bold tracking-tight hover:scale-105 transition-transform duration-300">
            <span className="gradient-text">Faridun.</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path} end={link.path === '/'} className={linkClass}>
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-2xl bg-black/10 dark:bg-white/10"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{t(`nav.${link.key}`)}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center gap-2">
            <div className="ios-glass rounded-2xl px-1 py-1 flex items-center gap-0.5">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => i18n.changeLanguage(lang.code)}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-bold tracking-wider transition-all duration-300 ${
                    i18n.language.startsWith(lang.code)
                      ? 'bg-black/10 dark:bg-white/10 text-gray-900 dark:text-white'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
            <motion.button
              whileTap={{ scale: 0.9, rotate: 180 }}
              transition={{ duration: 0.3 }}
              onClick={toggleDarkMode}
              className="ios-glass p-2.5 rounded-2xl text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => {
                const codes = ['en', 'uz', 'ru'];
                const idx = codes.findIndex((c) => i18n.language.startsWith(c));
                i18n.changeLanguage(codes[(idx + 1) % codes.length]);
              }}
              className="ios-glass px-3 py-1.5 rounded-xl text-[11px] font-bold tracking-wider text-gray-500 dark:text-gray-400 active:scale-95 transition-all"
            >
              {languages.find((l) => i18n.language.startsWith(l.code))?.label || 'EN'}
            </button>
            <motion.button
              whileTap={{ scale: 0.9, rotate: 180 }}
              onClick={toggleDarkMode}
              className="ios-glass p-2 rounded-xl text-gray-500 dark:text-gray-400"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="ios-glass p-2 rounded-xl text-gray-500 dark:text-gray-400"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* ═══ Mobile Full-Screen Overlay ═══ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[64px] bottom-0 z-50 bg-white/95 dark:bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-start pt-8 space-y-6 overflow-y-auto px-6 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.06, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-xs"
              >
                <NavLink
                  to={link.path}
                  end={link.path === '/'}
                  onClick={() => setMenuOpen(false)}
                  className={mobileLinkClass}
                >
                  {t(`nav.${link.key}`)}
                </NavLink>
              </motion.div>
            ))}

            {/* Mobile language picker inside overlay */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: navLinks.length * 0.06, duration: 0.3 }}
              className="flex items-center gap-2 pt-4"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => i18n.changeLanguage(lang.code)}
                  className={`px-4 py-2 rounded-xl text-[13px] font-bold tracking-wider transition-all duration-300 ${
                    i18n.language.startsWith(lang.code)
                      ? 'bg-black/10 dark:bg-white/10 text-gray-900 dark:text-white'
                      : 'text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
