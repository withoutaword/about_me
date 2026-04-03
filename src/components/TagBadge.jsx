import React from 'react';
import { motion } from 'framer-motion';

const TagBadge = ({ children }) => {
  return (
    <motion.div 
      className="inline-block px-4 py-1 rounded-full bg-[var(--bg-secondary)] text-[var(--text-muted)] text-sm mr-2 mb-2"
      whileHover={{ 
        scale: 1.05, 
        backgroundColor: 'var(--primary-color)',
        color: 'var(--text-color)'
      }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default TagBadge;

