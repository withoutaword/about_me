import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TagBadge from '../components/TagBadge';

const Home = () => {
  const tags = ['AI Engineer', 'Football Enthusiast', 'Tech Enthusiast', 'Tesla Investor'];
  const experiences = ['IBM', 'vivo AI Lab'];

  return (
    <div className="min-h-screen bg-[var(--bg-color)]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 背景渐变 */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-color)] to-[var(--bg-secondary)] z-0"></div>
        
        {/* 装饰元素 */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[var(--primary-color)]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[var(--secondary-color)]/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-8xl font-bold text-[var(--text-color)] mb-4">Bruce W</h1>
            <p className="text-2xl md:text-3xl text-[var(--text-muted)]">AI Engineer</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <p className="text-[var(--text-muted)] text-lg leading-relaxed">
              I'm an AI Engineer with experience in machine learning and software development. 
              I'm passionate about technology, football, and investing in innovative companies like Tesla.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-16"
          >
            <div className="flex flex-wrap justify-center">
              {tags.map((tag, index) => (
                <TagBadge key={index}>{tag}</TagBadge>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <h2 className="text-xl font-semibold text-[var(--text-color)] mb-4">Work Experience</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {experiences.map((exp, index) => (
                <div key={index} className="px-6 py-3 bg-[var(--bg-secondary)] rounded-lg text-[var(--text-muted)]">
                  {exp}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Home;

