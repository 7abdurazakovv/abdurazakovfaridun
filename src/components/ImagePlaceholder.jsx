import React from 'react';

/* ── Abstract tech-themed SVG icons for project cards ── */
const techIcons = [
  // Code brackets
  (color) => (
    <svg viewBox="0 0 64 64" className="w-14 h-14" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 18 8 32 20 46" />
      <polyline points="44 18 56 32 44 46" />
      <line x1="36" y1="12" x2="28" y2="52" />
    </svg>
  ),
  // Browser window
  (color) => (
    <svg viewBox="0 0 64 64" className="w-14 h-14" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="10" width="48" height="44" rx="4" />
      <line x1="8" y1="22" x2="56" y2="22" />
      <circle cx="16" cy="16" r="2" fill={color} />
      <circle cx="24" cy="16" r="2" fill={color} />
      <circle cx="32" cy="16" r="2" fill={color} />
      <line x1="18" y1="32" x2="46" y2="32" />
      <line x1="18" y1="40" x2="38" y2="40" />
    </svg>
  ),
  // Terminal / console
  (color) => (
    <svg viewBox="0 0 64 64" className="w-14 h-14" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="10" width="52" height="44" rx="6" />
      <polyline points="20 30 28 36 20 42" />
      <line x1="34" y1="42" x2="46" y2="42" />
    </svg>
  ),
  // Layout / responsive grid
  (color) => (
    <svg viewBox="0 0 64 64" className="w-14 h-14" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="6" width="24" height="52" rx="4" />
      <rect x="34" y="6" width="24" height="24" rx="4" />
      <rect x="34" y="34" width="24" height="24" rx="4" />
    </svg>
  ),
  // Phone / mobile
  (color) => (
    <svg viewBox="0 0 64 64" className="w-14 h-14" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="18" y="6" width="28" height="52" rx="6" />
      <line x1="18" y1="14" x2="46" y2="14" />
      <line x1="18" y1="50" x2="46" y2="50" />
      <circle cx="32" cy="54" r="1.5" fill={color} />
    </svg>
  ),
  // Layers / stack
  (color) => (
    <svg viewBox="0 0 64 64" className="w-14 h-14" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="32 8 56 20 32 32 8 20" />
      <polyline points="8 28 32 40 56 28" />
      <polyline points="8 36 32 48 56 36" />
    </svg>
  ),
];

/* Monochrome icon color pairs */
const projectGradientPairs = [
  ['#d1d1d6', '#8e8e93', 'from-white/8 to-white/4'],
  ['#c7c7cc', '#8e8e93', 'from-white/6 to-white/3'],
  ['#aeaeb2', '#636366', 'from-white/5 to-white/2'],
  ['#e5e5ea', '#8e8e93', 'from-white/7 to-white/3'],
  ['#c7c7cc', '#636366', 'from-white/6 to-white/2'],
  ['#d1d1d6', '#636366', 'from-white/8 to-white/3'],
];

function ProjectPlaceholder({ label }) {
  const hash = label ? label.charCodeAt(0) + (label.charCodeAt(1) || 0) : 0;
  const [color1, , gradientCls] = projectGradientPairs[hash % projectGradientPairs.length];
  const renderIcon = techIcons[hash % techIcons.length];

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br ${gradientCls} dark:from-white/[0.03] dark:to-white/[0.01]`}
    >
      <div className="transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
        {renderIcon(color1)}
      </div>
      {label && (
        <span className="text-[11px] font-bold tracking-widest uppercase text-gray-400 dark:text-gray-500 mt-1">
          {label}
        </span>
      )}
    </div>
  );
}

/* ── Main ImagePlaceholder component ── */
export default function ImagePlaceholder({
  width = 'w-full',
  height = 'h-full',
  aspectRatio = '',
  className = '',
  glow = true,
  icon = '',
  type = '',
  label = '',
}) {
  const isAvatar = icon === 'avatar' || type === 'profile';
  const isProject = icon === 'project' || type === 'project';

  if (isAvatar) {
    return (
      <div
        className={`${width} ${height} ${aspectRatio} ${className} relative flex flex-col items-center justify-center rounded-3xl overflow-hidden transition-all duration-500 ${
          glow
            ? 'bg-gradient-to-br from-white/10 via-white/5 to-white/10 border border-white/20 shadow-lg shadow-black/5'
            : 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#1c1c1e] dark:to-[#2c2c2e] border border-black/10 dark:border-white/5'
        }`}
      >
        {/* <!-- Insert Profile Image Here --> */}
        <img
          src="./hero.png"
          alt="Faridun Abdurazakov"
          loading="lazy"
          decoding="async"
          fetchpriority="high"
          className="w-full h-full object-cover rounded-3xl"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentElement.innerHTML = '<div class="flex items-center justify-center w-full h-full"><svg viewBox="0 0 80 80" class="w-16 h-16 opacity-30" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="40" cy="28" r="14"/><path d="M12 68c0-15.464 12.536-28 28-28s28 12.536 28 28"/></svg></div>';
          }}
        />
      </div>
    );
  }

  if (isProject) {
    return (
      <div
        className={`${width} ${height} ${aspectRatio} ${className} relative flex flex-col items-center justify-center rounded-3xl overflow-hidden transition-all duration-500 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#1c1c1e] dark:to-[#2c2c2e] border border-black/10 dark:border-white/5`}
      >
        <ProjectPlaceholder label={label} />
      </div>
    );
  }

  return (
    <div
      className={`${width} ${height} ${aspectRatio} ${className} relative flex flex-col items-center justify-center rounded-3xl overflow-hidden transition-all duration-500 ${
        glow
          ? 'bg-gradient-to-br from-white/10 via-white/5 to-white/10 border border-white/20 shadow-lg shadow-black/5'
          : 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#1c1c1e] dark:to-[#2c2c2e] border border-black/10 dark:border-white/5'
      }`}
    >
      {/* <!-- Insert Image Here --> */}
      <svg viewBox="0 0 80 80" className="w-16 h-16 opacity-20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="10" y="10" width="60" height="60" rx="8" />
        <circle cx="30" cy="30" r="8" />
        <path d="M10 55 L30 40 L50 50 L70 35 L70 62 C70 65.3 67.3 68 64 68 L16 68 C12.7 68 10 65.3 10 62 Z" />
      </svg>
    </div>
  );
}
