import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Career = () => {
  const careers = [
    {
      company: 'vivo AI Lab',
      role: 'AI Engineer',
      dates: '2021 - Present',
      description: 'Working on AI research and development.'
    },
    {
      company: 'IBM',
      role: 'Software Engineer',
      dates: '2015 - 2018',
      description: 'Developed enterprise software solutions.'
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-color)]">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-[var(--text-color)] mb-4">Career</h1>
            <p className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto">
              My professional journey
            </p>
          </motion.div>
          
          <div className="max-w-3xl mx-auto">
            <div className="relative border-l border-gray-700 ml-4 md:ml-6">
              {careers.map((career, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="mb-12 pl-8 relative"
                >
                  <div className="absolute -left-2 top-2 w-4 h-4 bg-[var(--primary-color)] rounded-full border-2 border-[var(--bg-color)]"></div>
                  <h3 className="text-2xl font-semibold text-[var(--text-color)]">{career.company}</h3>
                  <p className="text-lg text-[var(--text-muted)] mt-1">{career.role}</p>
                  <p className="text-sm text-gray-500 mt-1">{career.dates}</p>
                  <p className="text-[var(--text-muted)] mt-3">{career.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Career;
