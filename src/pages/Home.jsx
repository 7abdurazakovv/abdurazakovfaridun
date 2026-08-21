import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Send, Layout, Smartphone, Sparkles, Monitor, FolderOpen, Code2, Zap, Mail } from 'lucide-react';
import ImagePlaceholder from '../components/ImagePlaceholder';

const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }) };
const cardGradients = ['from-[#0a84ff] to-[#5e5ce6]', 'from-[#30d158] to-[#34c759]', 'from-[#ff375f] to-[#ff6b6b]'];
const capGradients = ['from-[#0a84ff] to-[#5e5ce6]', 'from-[#ff375f] to-[#ff6b6b]', 'from-[#30d158] to-[#34c759]'];
const capIcons = [Layout, Smartphone, Sparkles];

export default function Home() {
  const { t } = useTranslation();
  const roles = t('home.roles', { returnObjects: true });
  const philosophy = t('home.philosophy', { returnObjects: true });
  const metrics = t('home.metrics', { returnObjects: true });
  const featuredProjects = t('home.featuredProjects', { returnObjects: true });
  const capabilities = t('home.capabilities', { returnObjects: true });
  const workflow = t('home.workflow', { returnObjects: true });

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const metricIcons = [FolderOpen, Monitor, Code2, Zap];
  const metricGradients = ['from-[#0a84ff] to-[#5e5ce6]', 'from-[#30d158] to-[#34c759]', 'from-[#ff375f] to-[#ff6b6b]', 'from-[#bf5af2] to-[#5e5ce6]'];

  useEffect(() => {
    if (!Array.isArray(roles) || roles.length === 0) return;
    const current = roles[roleIndex];
    const speed = isDeleting ? 40 : 80;
    if (!isDeleting && displayText === current) { setTimeout(() => setIsDeleting(true), 2000); return; }
    if (isDeleting && displayText === '') { setIsDeleting(false); setRoleIndex((p) => (p + 1) % roles.length); return; }
    const timer = setTimeout(() => { setDisplayText(isDeleting ? current.substring(0, displayText.length - 1) : current.substring(0, displayText.length + 1)); }, speed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, roles]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

      {/* SECTION 1: Hero */}
      <section className="flex items-center min-h-[calc(100vh-5rem)] py-12">
        <div className="w-full grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-3 space-y-8">
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="inline-flex items-center gap-2 ios-glass rounded-full px-4 py-2 text-[13px] font-medium text-gray-500 dark:text-gray-400">
              <span className="w-2 h-2 rounded-full bg-[#30d158] animate-pulse" />{t('home.greeting')}
            </motion.div>
            <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1} className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-[-0.04em] leading-[1.05] text-gray-900 dark:text-white">{t('home.name')}</motion.h1>
            <motion.h2 variants={fadeUp} initial="hidden" animate="visible" custom={2} className="text-xl sm:text-2xl font-semibold tracking-tight">
              <span className="gradient-text">{displayText}</span><span className="typing-cursor" />
            </motion.h2>
            <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={3} className="text-base sm:text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-lg">{t('home.description')}</motion.p>
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3.5} className="flex items-center gap-3">
              <a href="https://instagram.com/its_abdurazakov" target="_blank" rel="noopener noreferrer" className="ios-glass p-3 rounded-2xl text-gray-500 dark:text-gray-400 hover:text-[#E1306C] hover:scale-110 active:scale-95 transition-all duration-300"><InstagramIcon size={20} /></a>
              <a href="https://t.me/Mr_Abdurazakov_dev" target="_blank" rel="noopener noreferrer" className="ios-glass p-3 rounded-2xl text-gray-500 dark:text-gray-400 hover:text-[#0088cc] hover:scale-110 active:scale-95 transition-all duration-300"><Send size={20} /></a>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4} className="flex flex-wrap gap-3 pt-2">
              <Link to="/contact" className="ios-btn-primary inline-flex items-center gap-2.5">{t('home.hireMe')}<ArrowRight size={18} /></Link>
              <Link to="/projects" className="ios-btn-ghost inline-flex items-center gap-2.5">{t('home.exploreWork')}</Link>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={5} className="grid grid-cols-3 gap-4 pt-6 max-w-md">
              {[1, 2, 3].map((i) => (
                <div key={i} className="ios-glass rounded-2xl p-4 text-center hover-lift">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{t(`home.stat${i}Value`)}</div>
                  <div className="text-[11px] font-medium text-gray-400 dark:text-gray-500 mt-1 tracking-wide">{t(`home.stat${i}Label`)}</div>
                </div>
              ))}
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }} className="md:col-span-2 flex justify-center md:justify-end">
            <div className="relative">
              <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-[#0a84ff]/20 via-[#5e5ce6]/15 to-[#bf5af2]/20 blur-2xl pulse-ring" />
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden border-2 border-white/30 dark:border-white/10 shadow-2xl">
                <ImagePlaceholder width="w-full" height="h-full" icon="avatar" glow className="rounded-none border-0" />
              </div>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: 'spring', stiffness: 300, damping: 20 }} className="absolute -bottom-2 -right-2 ios-frosted rounded-2xl px-4 py-2 shadow-lg">
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#30d158] animate-pulse" /><span className="text-[11px] font-semibold text-gray-700 dark:text-gray-300">{t('home.profileAlt')}</span></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: Quick Bio & Philosophy */}
      <section className="py-20">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="ios-frosted rounded-3xl p-8 sm:p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0a84ff] to-[#5e5ce6] flex items-center justify-center shadow-lg"><Code2 size={18} className="text-white" /></div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">{t('home.bioTitle')}</h2>
          </div>
          <p className="text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">{t('home.bioText')}</p>
          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            {Array.isArray(philosophy) && philosophy.map((item, i) => (
              <div key={i} className="ios-glass rounded-2xl p-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#30d158] shrink-0" />
                <span className="text-[13px] font-medium text-gray-700 dark:text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SECTION 3: Interactive Metrics Grid */}
      <section className="py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 space-y-4">
          <h2 className="ios-section-title">{t('home.numbersTitle')}</h2>
          <p className="text-base text-gray-400 dark:text-gray-500 max-w-lg mx-auto">{t('home.numbersSubtitle')}</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.isArray(metrics) && metrics.map((m, i) => {
            const Icon = metricIcons[i] || Monitor;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="ios-glass rounded-3xl p-6 hover-lift group">
                <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${metricGradients[i]} flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}><Icon size={20} className="text-white" /></div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-1">{m.value}</div>
                <div className="text-[13px] font-semibold text-gray-700 dark:text-gray-300 mb-1">{m.label}</div>
                <div className="text-[12px] text-gray-400 dark:text-gray-500 leading-relaxed">{m.desc}</div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* SECTION 4: Featured Work Highlight */}
      <section className="py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 space-y-4">
          <h2 className="ios-section-title">{t('home.featuredTitle')}</h2>
          <p className="text-base text-gray-400 dark:text-gray-500 max-w-lg mx-auto">{t('home.featuredSubtitle')}</p>
        </motion.div>
        <div className="grid sm:grid-cols-3 gap-5">
          {Array.isArray(featuredProjects) && featuredProjects.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="ios-glass rounded-3xl overflow-hidden hover-lift group">
              <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${cardGradients[i]}/10 to-transparent opacity-60 group-hover:opacity-100 transition-opacity`} />
                <ImagePlaceholder width="w-full" aspectRatio="aspect-[16/10]" icon="project" className="rounded-none border-0 bg-transparent" label={p.name} />
              </div>
              <div className="p-5 space-y-3">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">{p.name}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {Array.isArray(p.tags) && p.tags.map((tag, j) => (
                    <span key={j} className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#0a84ff]/10 text-[#0a84ff] border border-[#0a84ff]/15">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-8">
          <Link to="/projects" className="ios-btn-ghost inline-flex items-center gap-2 text-[14px]">{t('home.viewAll')}<ArrowRight size={16} /></Link>
        </motion.div>
      </section>

      {/* SECTION 5: Core Capabilities */}
      <section className="py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 space-y-4">
          <h2 className="ios-section-title">{t('home.capabilitiesTitle')}</h2>
          <p className="text-base text-gray-400 dark:text-gray-500 max-w-lg mx-auto">{t('home.capabilitiesSubtitle')}</p>
        </motion.div>
        <div className="grid sm:grid-cols-3 gap-5">
          {Array.isArray(capabilities) && capabilities.map((c, i) => {
            const Icon = capIcons[i] || Layout;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="ios-glass rounded-3xl p-7 hover-lift group">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${capGradients[i]} flex items-center justify-center shadow-lg mb-5 group-hover:scale-110 transition-transform duration-300`}><Icon size={22} className="text-white" /></div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight mb-2">{c.title}</h3>
                <p className="text-[14px] text-gray-500 dark:text-gray-400 leading-relaxed">{c.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* SECTION 6: VS Code & Workflow */}
      <section className="py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 space-y-4">
          <h2 className="ios-section-title">{t('home.workflowTitle')}</h2>
          <p className="text-base text-gray-400 dark:text-gray-500 max-w-lg mx-auto">{t('home.workflowSubtitle')}</p>
        </motion.div>
        <div className="ios-frosted rounded-3xl p-8">
          <div className="grid sm:grid-cols-5 gap-4">
            {Array.isArray(workflow) && workflow.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="text-center relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0a84ff]/15 to-[#5e5ce6]/15 dark:from-[#0a84ff]/10 dark:to-[#5e5ce6]/10 border border-[#0a84ff]/20 flex items-center justify-center mx-auto mb-3">
                  <span className="text-[14px] font-bold text-[#0a84ff]">{s.step}</span>
                </div>
                <h4 className="text-[14px] font-bold text-gray-900 dark:text-white mb-1">{s.title}</h4>
                <p className="text-[12px] text-gray-400 dark:text-gray-500">{s.desc}</p>
                {i < (workflow.length - 1) && <div className="hidden sm:block absolute top-7 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[#0a84ff]/20 to-transparent" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: Call to Action Banner */}
      <section className="py-20">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="ios-frosted rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a84ff]/5 via-[#5e5ce6]/5 to-[#bf5af2]/5 dark:from-[#0a84ff]/3 dark:via-[#5e5ce6]/3 dark:to-[#bf5af2]/3" />
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#0a84ff] to-[#5e5ce6] flex items-center justify-center shadow-xl mx-auto mb-6"><Mail size={28} className="text-white" /></div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">{t('home.ctaTitle')}</h2>
            <p className="text-[15px] text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl mx-auto mb-8">
              {t('home.ctaText')}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/contact" className="ios-btn-primary inline-flex items-center gap-2.5">{t('home.ctaPrimary')}<ArrowRight size={18} /></Link>
              <a href="https://t.me/Mr_Abdurazakov_dev" target="_blank" rel="noopener noreferrer" className="ios-btn-ghost inline-flex items-center gap-2.5">{t('home.ctaSecondary')}</a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
