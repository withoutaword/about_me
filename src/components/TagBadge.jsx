import React from 'react';
import { motion } from 'framer-motion';

const TagBadge = ({ children }) => {
  return (
    <motion.div 
      className="inline-block px-4 py-1 rounded-full bg-darkGray text-gray-300 text-sm mr-2 mb-2"
      whileHover={{ 
        scale: 1.05, 
        backgroundColor: '#0070f3',
        color: 'white'
      }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default TagBadge;
