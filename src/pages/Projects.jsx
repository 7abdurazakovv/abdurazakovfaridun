import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Folder, GitBranch, Star } from 'lucide-react';
import ImagePlaceholder from '../components/ImagePlaceholder';
import DemoModal from '../components/DemoModal';

const projectKeys = ['project1', 'project2', 'project3', 'project4', 'project5', 'project6'];
const filterKeys = ['all', 'filter1', 'filter2', 'filter3'];
const filterCategories = { all: 'all', filter1: 'web', filter2: 'mobile', filter3: 'opensource' };

const cardGradients = ['from-[#0a84ff]/10 to-[#5e5ce6]/5', 'from-[#30d158]/10 to-[#34c759]/5', 'from-[#ff375f]/10 to-[#ff6b6b]/5', 'from-[#bf5af2]/10 to-[#5e5ce6]/5', 'from-[#ff9500]/10 to-[#ffcc02]/5', 'from-[#64d2ff]/10 to-[#0a84ff]/5'];
const tagColors = ['bg-[#0a84ff]/10 text-[#0a84ff] border-[#0a84ff]/15', 'bg-[#30d158]/10 text-[#30d158] border-[#30d158]/15', 'bg-[#ff375f]/10 text-[#ff375f] border-[#ff375f]/15', 'bg-[#bf5af2]/10 text-[#bf5af2] border-[#bf5af2]/15'];

const GithubIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
);

export default function Projects() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [demoModal, setDemoModal] = useState({ open: false, title: '', url: '' });

  const caseStudy = t('projects.caseStudy', { returnObjects: true });
  const openSourceItems = t('projects.openSource', { returnObjects: true });

  const filteredProjects = useMemo(() => {
    const category = filterCategories[activeFilter];
    if (category === 'all') return projectKeys;
    return projectKeys.filter((key) => t(`projects.${key}.category`) === category);
  }, [activeFilter, t]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-h-screen py-12">
      <DemoModal isOpen={demoModal.open} onClose={() => setDemoModal({ open: false, title: '', url: '' })} title={demoModal.title} url={demoModal.url} />

      {/* SECTION 1: Projects Showcase Header */}
      <section className="py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="ios-frosted rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a84ff]/5 via-[#5e5ce6]/5 to-[#bf5af2]/5 dark:from-[#0a84ff]/3 dark:via-[#5e5ce6]/3 dark:to-[#bf5af2]/3" />
          <div className="relative z-10">
            <h1 className="ios-section-title mb-4">{t('projects.title')}</h1>
            <p className="text-base text-gray-400 dark:text-gray-500 max-w-lg mx-auto">{t('projects.subtitle')}</p>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: Filterable Project Grid */}
      <section className="py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex justify-center mb-10">
          <div className="ios-glass rounded-2xl px-1.5 py-1.5 flex items-center gap-1 flex-wrap justify-center">
            {filterKeys.map((f) => (
              <button key={f} onClick={() => setActiveFilter(f)} className={`px-4 py-2 rounded-xl text-[12px] font-semibold tracking-tight transition-all duration-300 ${activeFilter === f ? 'bg-gradient-to-r from-[#0a84ff] to-[#5e5ce6] text-white shadow-md' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>
                {t(`projects.${f}`)}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((key) => {
              const name = t(`projects.${key}.name`);
              const desc = t(`projects.${key}.description`);
              const tags = t(`projects.${key}.tags`, { returnObjects: true });
              const globalIdx = projectKeys.indexOf(key);
              return (
                <motion.div key={key} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="group ios-glass rounded-3xl overflow-hidden hover-lift">
                  <div className="relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${cardGradients[globalIdx]} opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />
                    <ImagePlaceholder width="w-full" aspectRatio="aspect-[16/10]" icon="project" className="rounded-none border-0 bg-transparent" label={name} />
                    <div className="absolute top-3 left-3 ios-glass rounded-xl px-3 py-1"><span className="text-[10px] font-bold tracking-widest uppercase text-[#0a84ff]">{t('projects.featured')}</span></div>
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">{name}</h3>
                    <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3">{desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {Array.isArray(tags) && tags.map((tag, i) => (
                        <span key={i} className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold border ${tagColors[i % tagColors.length]} backdrop-blur-sm transition-all duration-300 hover:scale-105`}>{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 pt-1">
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setDemoModal({ open: true, title: name, url: '' })} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12px] font-semibold bg-gradient-to-r from-[#0a84ff] to-[#5e5ce6] text-white shadow-md shadow-[#0a84ff]/15 transition-all duration-300">
                        <ExternalLink size={14} />{t('projects.viewDemo')}
                      </motion.button>
                      <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12px] font-semibold ios-glass text-gray-500 dark:text-gray-400 transition-all duration-300">
                        <GithubIcon size={14} />{t('projects.viewRepo')}
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* SECTION 4: Project Case Study */}
      <section className="py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 space-y-4">
          <h2 className="ios-section-title">{t('projects.caseStudyTitle')}</h2>
          <p className="text-base text-gray-400 dark:text-gray-500 max-w-lg mx-auto">{t('projects.caseStudySubtitle')} {caseStudy.name}</p>
        </motion.div>
        <div className="ios-frosted rounded-3xl p-8 sm:p-10">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight mb-6">{caseStudy.name}</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {Array.isArray(caseStudy.stack) && caseStudy.stack.map((s, i) => (
              <span key={i} className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#0a84ff]/10 text-[#0a84ff] border border-[#0a84ff]/15">{s}</span>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {Array.isArray(caseStudy.features) && caseStudy.features.map((f, i) => (
              <div key={i} className="ios-glass rounded-xl px-4 py-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#30d158] shrink-0" />
                <span className="text-[13px] text-gray-700 dark:text-gray-300">{f}</span>
              </div>
            ))}
          </div>
          <p className="text-[14px] text-gray-600 dark:text-gray-400 leading-relaxed">{caseStudy.architecture}</p>
        </div>
      </section>

      {/* SECTION 5: Open Source & GitHub Feed */}
      <section className="py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 space-y-4">
          <h2 className="ios-section-title">{t('projects.openSourceTitle')}</h2>
          <p className="text-base text-gray-400 dark:text-gray-500 max-w-lg mx-auto">{t('projects.openSourceSubtitle')}</p>
        </motion.div>
        <div className="grid sm:grid-cols-3 gap-5">
          {Array.isArray(openSourceItems) && openSourceItems.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="ios-glass rounded-3xl p-6 hover-lift group">
              <div className="flex items-center gap-2 mb-3">
                <Folder size={18} className="text-[#0a84ff]" />
                <h4 className="text-[14px] font-bold text-gray-900 dark:text-white group-hover:text-[#0a84ff] transition-colors">{item.name}</h4>
              </div>
              <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed mb-4">{item.desc}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5"><Star size={13} className="text-[#ff9500]" /><span className="text-[12px] font-semibold text-gray-500 dark:text-gray-400">{item.stars}</span></div>
                <div className="flex items-center gap-1.5"><GitBranch size={13} className="text-[#30d158]" /><span className="text-[12px] font-semibold text-gray-500 dark:text-gray-400">{item.lang}</span></div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
