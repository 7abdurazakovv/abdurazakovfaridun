import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const TelegramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" x2="11" y1="2" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const socialLinks = [
  { name: 'Instagram', url: 'https://instagram.com/its_abdurazakov', icon: <InstagramIcon /> },
  { name: 'Telegram', url: 'https://t.me/Mr_Abdurazakov_dev', icon: <TelegramIcon /> },
];

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative z-10 mt-24 pb-6">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dock-style footer */}
        <div className="ios-frosted rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col items-center gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="ios-glass p-3 rounded-2xl text-gray-500 dark:text-gray-400 hover:text-[#0a84ff] dark:hover:text-[#409cff] transition-colors duration-300"
                  aria-label={link.name}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-center space-y-1">
              <p className="text-[13px] font-medium text-gray-400 dark:text-gray-500">
                &copy; {new Date().getFullYear()} Faridun Abdurazakov. {t('footer.copyright')}
              </p>
              <p className="text-[11px] text-gray-300 dark:text-gray-600">
                {t('footer.builtWith')}
              </p>
            </div>

            {/* Back to Top */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="ios-glass p-2.5 rounded-2xl text-gray-400 dark:text-gray-500 hover:text-[#0a84ff] dark:hover:text-[#409cff] transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp size={18} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
