import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ImageGallery from '../components/ImageGallery';
import images from 'virtual:photography';

const Photography = () => {
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
            <h1 className="text-5xl md:text-6xl font-bold text-[var(--text-color)] mb-4">Photography</h1>
            <p className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto">
              A collection of moments captured through my lens
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <ImageGallery images={images} />
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Photography;
