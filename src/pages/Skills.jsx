import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Palette, Rocket } from 'lucide-react';

export default function Skills() {
  const { t } = useTranslation();
  const skillDetails = t('skills.skillDetails', { returnObjects: true });
  const devTools = t('skills.devTools', { returnObjects: true });
  const firebaseFeatures = t('skills.firebaseFeatures', { returnObjects: true });
  const uiux = t('skills.uiux', { returnObjects: true });
  const roadmap = t('skills.roadmap', { returnObjects: true });
  const skillGradients = ['from-[#0a84ff] to-[#5e5ce6]', 'from-[#06b6d4] to-[#0a84ff]', 'from-[#ffcc02] to-[#ff9500]', 'from-[#ff375f] to-[#ff6b6b]'];
  const uiuxGradients = ['from-[#bf5af2] to-[#5e5ce6]', 'from-[#0a84ff] to-[#5e5ce6]', 'from-[#30d158] to-[#34c759]', 'from-[#ff375f] to-[#ff6b6b]'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-h-screen py-12">

      {/* SECTION 1: Skills Overview */}
      <section className="py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="ios-frosted rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a84ff]/5 via-[#5e5ce6]/5 to-[#bf5af2]/5 dark:from-[#0a84ff]/3 dark:via-[#5e5ce6]/3 dark:to-[#bf5af2]/3" />
          <div className="relative z-10">
            <h1 className="ios-section-title mb-4">{t('skills.title')}</h1>
            <p className="text-base text-gray-400 dark:text-gray-500 max-w-lg mx-auto">{t('skills.subtitle')}</p>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2-5: Technology Deep-Dive Cards */}
      <section className="py-8">
        <div className="space-y-6">
          {Array.isArray(skillDetails) && skillDetails.map((skill, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }} className="ios-frosted rounded-3xl p-7 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">{skill.title}</h3>
                <div className="flex items-center gap-3">
                  <span className="text-[12px] font-bold text-gray-400 dark:text-gray-500">{skill.level}%</span>
                  <div className="w-32 ios-skill-bar">
                    <motion.div className={`ios-skill-fill bg-gradient-to-r ${skillGradients[idx]}`} initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }} transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }} />
                  </div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {Array.isArray(skill.topics) && skill.topics.map((topic, j) => (
                  <div key={j} className="ios-glass rounded-xl px-4 py-2.5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#30d158] shrink-0" />
                    <span className="text-[13px] text-gray-700 dark:text-gray-300">{topic}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 6: Developer Tools */}
      <section className="py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 space-y-4">
          <h2 className="ios-section-title">{t('skills.devToolsTitle')}</h2>
          <p className="text-base text-gray-400 dark:text-gray-500 max-w-lg mx-auto">{t('skills.devToolsSubtitle')}</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.isArray(devTools) && devTools.map((tool, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="ios-glass rounded-2xl p-5 hover-lift group">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xl">{tool.icon}</span>
                <div>
                  <h4 className="text-[14px] font-bold text-gray-900 dark:text-white group-hover:text-[#0a84ff] transition-colors">{tool.name}</h4>
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-[#30d158]">{tool.level}</span>
                </div>
              </div>
              <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed">{tool.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 7: Firebase Firestore */}
      <section className="py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 space-y-4">
          <h2 className="ios-section-title">{t('skills.firebaseTitle')}</h2>
          <p className="text-base text-gray-400 dark:text-gray-500 max-w-lg mx-auto">{t('skills.firebaseSubtitle')}</p>
        </motion.div>
        <div className="ios-frosted rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#ff9500] to-[#ffcc02] flex items-center justify-center shadow-lg"><span className="text-lg">{'\uD83D\uDD25'}</span></div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">{t('skills.firebaseSubheading')}</h3>
          </div>
          <div className="space-y-4">
            {Array.isArray(firebaseFeatures) && firebaseFeatures.map((f, i) => (
              <div key={i} className="ios-glass rounded-2xl p-5">
                <h4 className="text-[14px] font-bold text-gray-900 dark:text-white mb-1">{f.title}</h4>
                <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: UI/UX Design Practices */}
      <section className="py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 space-y-4">
          <h2 className="ios-section-title">{t('skills.uiuxTitle')}</h2>
          <p className="text-base text-gray-400 dark:text-gray-500 max-w-lg mx-auto">{t('skills.uiuxSubtitle')}</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 gap-5">
          {Array.isArray(uiux) && uiux.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="ios-glass rounded-3xl p-6 hover-lift group">
              <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${uiuxGradients[i]} flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
                <Palette size={16} className="text-white" />
              </div>
              <h3 className="text-[15px] font-bold text-gray-900 dark:text-white tracking-tight mb-2">{p.title}</h3>
              <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 9: Learning Roadmap */}
      <section className="py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 space-y-4">
          <h2 className="ios-section-title">{t('skills.roadmapTitle')}</h2>
          <p className="text-base text-gray-400 dark:text-gray-500 max-w-lg mx-auto">{t('skills.roadmapSubtitle')}</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 gap-4">
          {Array.isArray(roadmap) && roadmap.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="ios-glass rounded-2xl p-5 flex items-start gap-4 hover-lift">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#bf5af2]/15 to-[#5e5ce6]/15 border border-[#bf5af2]/20 flex items-center justify-center shrink-0">
                <Rocket size={16} className="text-[#bf5af2]" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-[14px] font-bold text-gray-900 dark:text-white">{r.tech}</h4>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-[#bf5af2]/10 text-[#bf5af2] border border-[#bf5af2]/20">{r.status}</span>
                </div>
                <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed">{r.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
