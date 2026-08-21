import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, Code2, Smartphone, Heart, BookOpen, Compass, Star, Send, ArrowRight } from 'lucide-react';

const principleIcons = [Target, Code2, Smartphone];
const principleGradients = ['from-[#0a84ff] to-[#5e5ce6]', 'from-[#30d158] to-[#34c759]', 'from-[#ff375f] to-[#ff6b6b]'];
const interestIcons = [Heart, Compass, BookOpen];
const interestColors = ['text-[#ff375f]', 'text-[#0a84ff]', 'text-[#30d158]'];
const valueIcons = [Star, BookOpen, { type: 'Layers' }];
const valueColors = ['text-[#ff9500]', 'text-[#0a84ff]', 'text-[#bf5af2]'];
import { Layers } from 'lucide-react';
const valueIconComponents = [Star, BookOpen, Layers];

export default function About() {
  const { t } = useTranslation();
  const timeline = t('about.timeline', { returnObjects: true });
  const principles = t('about.principles', { returnObjects: true });
  const tools = t('about.tools', { returnObjects: true });
  const interests = t('about.interests', { returnObjects: true });
  const values = t('about.values', { returnObjects: true });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-h-screen py-12">

      {/* SECTION 1: Header Banner */}
      <section className="py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="ios-frosted rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a84ff]/5 via-[#5e5ce6]/5 to-[#bf5af2]/5 dark:from-[#0a84ff]/3 dark:via-[#5e5ce6]/3 dark:to-[#bf5af2]/3" />
          <div className="relative z-10">
            <h1 className="ios-section-title mb-4">{t('about.title')}</h1>
            <p className="text-base text-gray-400 dark:text-gray-500 max-w-lg mx-auto">{t('about.subtitle')}</p>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: My Story */}
      <section className="py-16">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="ios-frosted rounded-3xl p-8 sm:p-10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight mb-6">{t('about.bioTitle')}</h2>
          <div className="space-y-4">
            <p className="text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed">{t('about.bioText1')}</p>
            <p className="text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed">{t('about.bioText2')}</p>
            <p className="text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed">{t('about.bioText3')}</p>
          </div>
        </motion.div>
      </section>

      {/* SECTION 3: 1-Year Career Timeline */}
      <section className="py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 space-y-4">
          <h2 className="ios-section-title">{t('about.timelineTitle')}</h2>
          <p className="text-base text-gray-400 dark:text-gray-500 max-w-lg mx-auto">{t('about.timelineSubtitle')}</p>
        </motion.div>
        <div className="relative pl-12">
          <div className="timeline-line" />
          <div className="space-y-8">
            {Array.isArray(timeline) && timeline.map((exp, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="relative">
                <div className="timeline-dot" style={{ top: '24px' }} />
                <div className="ios-glass rounded-3xl p-6 hover-lift">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-[#0a84ff]">{exp.period}</span>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight mt-2">{exp.role}</h3>
                  <p className="text-[13px] font-medium text-[#5e5ce6] dark:text-[#bf5af2] mt-1">{exp.company}</p>
                  <p className="text-[14px] text-gray-500 dark:text-gray-400 leading-relaxed mt-3">{exp.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Development Principles */}
      <section className="py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 space-y-4">
          <h2 className="ios-section-title">{t('about.principlesTitle')}</h2>
          <p className="text-base text-gray-400 dark:text-gray-500 max-w-lg mx-auto">{t('about.principlesSubtitle')}</p>
        </motion.div>
        <div className="grid sm:grid-cols-3 gap-5">
          {Array.isArray(principles) && principles.map((p, i) => {
            const Icon = principleIcons[i] || Target;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="ios-glass rounded-3xl p-7 hover-lift group">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${principleGradients[i]} flex items-center justify-center shadow-lg mb-5 group-hover:scale-110 transition-transform duration-300`}><Icon size={22} className="text-white" /></div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight mb-2">{p.title}</h3>
                <p className="text-[14px] text-gray-500 dark:text-gray-400 leading-relaxed">{p.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* SECTION 5: Tools I Rely On */}
      <section className="py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 space-y-4">
          <h2 className="ios-section-title">{t('about.toolsTitle')}</h2>
          <p className="text-base text-gray-400 dark:text-gray-500 max-w-lg mx-auto">{t('about.toolsSubtitle')}</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.isArray(tools) && tools.map((tool, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="ios-glass rounded-2xl p-5 flex items-start gap-4 hover-lift group">
              <span className="text-2xl mt-0.5">{tool.icon}</span>
              <div>
                <h4 className="text-[14px] font-bold text-gray-900 dark:text-white group-hover:text-[#0a84ff] transition-colors">{tool.name}</h4>
                <p className="text-[12px] text-gray-400 dark:text-gray-500 leading-relaxed mt-1">{tool.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 6: Personal Interests */}
      <section className="py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 space-y-4">
          <h2 className="ios-section-title">{t('about.interestsTitle')}</h2>
          <p className="text-base text-gray-400 dark:text-gray-500 max-w-lg mx-auto">{t('about.interestsSubtitle')}</p>
        </motion.div>
        <div className="grid sm:grid-cols-3 gap-5">
          {Array.isArray(interests) && interests.map((item, i) => {
            const Icon = interestIcons[i] || Heart;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="ios-frosted rounded-3xl p-7 hover-lift">
                <div className="w-10 h-10 rounded-2xl ios-glass flex items-center justify-center mb-4"><Icon size={18} className={interestColors[i]} /></div>
                <h3 className="text-[15px] font-bold text-gray-900 dark:text-white tracking-tight mb-2">{item.title}</h3>
                <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* SECTION 7: Work Values */}
      <section className="py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 space-y-4">
          <h2 className="ios-section-title">{t('about.valuesTitle')}</h2>
          <p className="text-base text-gray-400 dark:text-gray-500 max-w-lg mx-auto">{t('about.valuesSubtitle')}</p>
        </motion.div>
        <div className="space-y-4">
          {Array.isArray(values) && values.map((v, i) => {
            const Icon = valueIconComponents[i] || Star;
            return (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="ios-glass rounded-3xl p-6 flex items-start gap-5 hover-lift">
                <div className="w-12 h-12 rounded-2xl ios-frosted flex items-center justify-center shrink-0"><Icon size={20} className={valueColors[i]} /></div>
                <div>
                  <h3 className="text-[15px] font-bold text-gray-900 dark:text-white tracking-tight mb-1">{v.title}</h3>
                  <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* SECTION 8: Get in Touch Banner */}
      <section className="py-16">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="ios-frosted rounded-3xl p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a84ff]/5 via-[#5e5ce6]/5 to-[#bf5af2]/5 dark:from-[#0a84ff]/3 dark:via-[#5e5ce6]/3 dark:to-[#bf5af2]/3" />
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-[#0a84ff] to-[#5e5ce6] flex items-center justify-center shadow-xl mx-auto mb-5"><Send size={24} className="text-white" /></div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight mb-3">{t('about.ctaTitle')}</h2>
            <p className="text-[14px] text-gray-500 dark:text-gray-400 leading-relaxed max-w-md mx-auto mb-6">{t('about.ctaText')}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/contact" className="ios-btn-primary inline-flex items-center gap-2 text-[14px]">{t('about.ctaButton')}<ArrowRight size={16} /></Link>
              <a href="https://t.me/Mr_Abdurazakov_dev" target="_blank" rel="noopener noreferrer" className="ios-btn-ghost inline-flex items-center gap-2 text-[14px]">Telegram</a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
