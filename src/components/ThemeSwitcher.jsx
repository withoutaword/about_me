import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const THEME_INFO = {
  default: { name: 'Default', icon: '🌙' },
  cyber: { name: 'Cyber', icon: '⚡' }
};

const ThemeSwitcher = () => {
  const { theme, cycleTheme } = useTheme();

  const current = useMemo(() => THEME_INFO[theme] || THEME_INFO.default, [theme]);

  return (
    <motion.button
      onClick={cycleTheme}
      aria-label={`Switch theme. Current: ${current.name}`}
      className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        color: 'var(--primary-color)',
        border: '1px solid var(--primary-color)',
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <span>{current.icon}</span>
      <span>{current.name}</span>
    </motion.button>
  );
};

export default ThemeSwitcher;
