import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, CheckCircle, Send, Clock, Globe, ChevronDown } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
const TelegramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" x2="11" y1="2" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

function FaqItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="ios-glass rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left">
        <span className="text-[14px] font-semibold text-gray-900 dark:text-white pr-4">{item.q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} className="shrink-0">
          <ChevronDown size={18} className="text-gray-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
            <div className="px-5 pb-5">
              <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">{item.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const faqItems = t('contact.faq', { returnObjects: true });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await addDoc(collection(db, 'messages'), { ...formData, createdAt: serverTimestamp() });
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-h-screen py-12">

      {/* SECTION 1: Contact Hero */}
      <section className="py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="ios-frosted rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a84ff]/5 via-[#5e5ce6]/5 to-[#30d158]/5 dark:from-[#0a84ff]/3 dark:via-[#5e5ce6]/3 dark:to-[#30d158]/3" />
          <div className="relative z-10">
            <h1 className="ios-section-title mb-4">{t('contact.title')}</h1>
            <p className="text-base text-gray-400 dark:text-gray-500 max-w-lg mx-auto">{t('contact.subtitle')}</p>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: Firebase Firestore Form */}
      <section className="py-8">
        <div className="grid md:grid-cols-5 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="md:col-span-3">
            <form onSubmit={handleSubmit} className="ios-frosted rounded-3xl p-8 space-y-6">
              <div className="space-y-2">
                <label className="block text-[13px] font-semibold text-gray-700 dark:text-gray-300 tracking-tight">{t('contact.nameLabel')}</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder={t('contact.namePlaceholder')} className="ios-input w-full px-4 py-3.5 text-[15px] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600" />
              </div>
              <div className="space-y-2">
                <label className="block text-[13px] font-semibold text-gray-700 dark:text-gray-300 tracking-tight">{t('contact.emailLabel')}</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder={t('contact.emailPlaceholder')} className="ios-input w-full px-4 py-3.5 text-[15px] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600" />
              </div>
              <div className="space-y-2">
                <label className="block text-[13px] font-semibold text-gray-700 dark:text-gray-300 tracking-tight">{t('contact.messageLabel')}</label>
                <textarea name="message" value={formData.message} onChange={handleChange} required rows={6} placeholder={t('contact.messagePlaceholder')} className="ios-input w-full px-4 py-3.5 text-[15px] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 resize-none" />
              </div>
              {status === 'success' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 p-4 rounded-2xl bg-[#30d158]/10 border border-[#30d158]/20">
                  <CheckCircle size={18} className="text-[#30d158] shrink-0" /><span className="text-[13px] font-medium text-[#30d158]">{t('contact.success')}</span>
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 p-4 rounded-2xl bg-[#ff375f]/10 border border-[#ff375f]/20">
                  <span className="text-[13px] font-medium text-[#ff375f]">{t('contact.error')}</span>
                </motion.div>
              )}
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={status === 'sending'} className="ios-btn-primary w-full flex items-center justify-center gap-2.5 disabled:opacity-50">
                {status === 'sending' ? (<><svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>{t('contact.sending')}</>) : (<>{t('contact.send')} <Send size={16} /></>)}
              </motion.button>
            </form>
          </motion.div>

          {/* SECTION 3: Direct Contact Cards */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="md:col-span-2 space-y-5">
            <div className="ios-frosted rounded-3xl p-7 space-y-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">{t('contact.detailsTitle')}</h2>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0a84ff] to-[#5e5ce6] flex items-center justify-center shadow-lg shadow-[#0a84ff]/15 shrink-0"><Mail size={18} className="text-white" /></div>
                <div><p className="text-[11px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">{t('contact.emailLabel2')}</p><p className="text-[14px] font-semibold text-gray-900 dark:text-white mt-0.5">{t('contact.email')}</p></div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#ff375f] to-[#ff6b6b] flex items-center justify-center shadow-lg shadow-[#ff375f]/15 shrink-0"><MapPin size={18} className="text-white" /></div>
                <div><p className="text-[11px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">{t('contact.locationLabel2')}</p><p className="text-[14px] font-semibold text-gray-900 dark:text-white mt-0.5">{t('contact.location')}</p></div>
              </div>
              <a href="https://t.me/Mr_Abdurazakov_dev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-2xl hover:bg-[#0088cc]/10 dark:hover:bg-[#0088cc]/10 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-2xl bg-[#0088cc] flex items-center justify-center shadow-lg shadow-[#0088cc]/20 group-hover:scale-110 transition-transform"><TelegramIcon size={18} className="text-white" /></div>
                <div><p className="text-[13px] font-semibold text-gray-900 dark:text-white">{t('contact.telegram')}</p><p className="text-[11px] text-gray-400 dark:text-gray-500">@Mr_Abdurazakov_dev</p></div>
              </a>
              <a href="https://instagram.com/its_abdurazakov" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-2xl hover:bg-[#E1306C]/10 dark:hover:bg-[#E1306C]/10 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] flex items-center justify-center shadow-lg shadow-[#E1306C]/20 group-hover:scale-110 transition-transform"><InstagramIcon size={18} className="text-white" /></div>
                <div><p className="text-[13px] font-semibold text-gray-900 dark:text-white">{t('contact.instagram')}</p><p className="text-[11px] text-gray-400 dark:text-gray-500">@its_abdurazakov</p></div>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: Availability Status Widget */}
      <section className="py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="ios-glass rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-5 hover-lift">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#30d158] to-[#34c759] flex items-center justify-center shadow-lg shadow-[#30d158]/20 shrink-0">
            <CheckCircle size={24} className="text-white" />
          </div>
          <div className="text-center sm:text-left flex-1">
            <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#30d158] animate-pulse" />
              <span className="text-[14px] font-bold text-[#30d158]">{t('contact.availableStatus')}</span>
            </div>
            <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">{t('contact.availableDesc')}</p>
          </div>
          <div className="ios-frosted rounded-2xl px-4 py-2 flex items-center gap-2">
            <Clock size={14} className="text-gray-400" />
            <span className="text-[12px] font-semibold text-gray-600 dark:text-gray-400">{t('contact.quickResponse')}</span>
          </div>
        </motion.div>
      </section>

      {/* SECTION 5: Location & Timezone */}
      <section className="py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="ios-frosted rounded-3xl p-7">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0a84ff] to-[#5e5ce6] flex items-center justify-center shadow-lg"><Globe size={18} className="text-white" /></div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">{t('contact.locationTitle')}</h3>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="ios-glass rounded-2xl p-4 text-center">
              <p className="text-[11px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">{t('contact.cityLabel')}</p>
              <p className="text-[14px] font-semibold text-gray-900 dark:text-white">{t('contact.cityValue')}</p>
            </div>
            <div className="ios-glass rounded-2xl p-4 text-center">
              <p className="text-[11px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">{t('contact.countryLabel')}</p>
              <p className="text-[14px] font-semibold text-gray-900 dark:text-white">{t('contact.countryValue')}</p>
            </div>
            <div className="ios-glass rounded-2xl p-4 text-center">
              <p className="text-[11px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">{t('contact.timezoneLabel')}</p>
              <p className="text-[14px] font-semibold text-gray-900 dark:text-white">{t('contact.timezoneValue')}</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 6: FAQ Section */}
      <section className="py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 space-y-4">
          <h2 className="ios-section-title">{t('contact.faqTitle')}</h2>
          <p className="text-base text-gray-400 dark:text-gray-500 max-w-lg mx-auto">{t('contact.faqSubtitle')}</p>
        </motion.div>
        <div className="space-y-3">
          {Array.isArray(faqItems) && faqItems.map((item, i) => <FaqItem key={i} item={item} />)}
        </div>
      </section>
    </div>
  );
}
