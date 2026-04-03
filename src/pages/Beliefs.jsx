import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Beliefs = () => {
  const beliefs = [
    {
      title: "Technology expands freedom",
      description: "I believe that technology, when used responsibly, has the power to expand human freedom and creativity. It enables us to solve complex problems and connect with people across the globe."
    },
    {
      title: "Curiosity drives progress",
      description: "Curiosity is the foundation of innovation. By asking questions and seeking answers, we push the boundaries of what's possible and drive progress in all fields."
    },
    {
      title: "Simplicity reveals truth",
      description: "In a world of increasing complexity, simplicity is a virtue. The most powerful ideas are often the simplest ones, and clarity of thought leads to better solutions."
    },
    {
      title: "Continuous learning is essential",
      description: "The world is constantly evolving, and to stay relevant, we must embrace lifelong learning. Every day is an opportunity to gain new knowledge and skills."
    },
    {
      title: "Collaboration amplifies impact",
      description: "Great things are rarely accomplished alone. By working together and sharing ideas, we can achieve more than any individual could on their own."
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
            <h1 className="text-5xl md:text-6xl font-bold text-[var(--text-color)] mb-4">Beliefs</h1>
            <p className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto">
              My personal philosophy and core beliefs that guide my approach to life and work
            </p>
          </motion.div>
          
          <div className="max-w-3xl mx-auto space-y-12">
            {beliefs.map((belief, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[var(--bg-secondary)] p-8 rounded-lg"
              >
                <h2 className="text-2xl font-bold text-[var(--text-color)] mb-4">{belief.title}</h2>
                <p className="text-[var(--text-muted)] leading-relaxed">{belief.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Beliefs;

