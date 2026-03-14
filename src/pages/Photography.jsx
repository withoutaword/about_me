import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ImageGallery from '../components/ImageGallery';

const Photography = () => {
  // 示例图片 URL
  const images = [
    'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=minimalist%20landscape%20photography%20mountain%20view&image_size=landscape_16_9',
    'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=urban%20photography%20city%20skyline%20modern%20architecture&image_size=landscape_16_9',
    'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=close%20up%20photography%20abstract%20pattern%20natural%20light&image_size=square',
    'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sunset%20photography%20ocean%20view%20vibrant%20colors&image_size=landscape_16_9',
    'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=portrait%20photography%20minimalist%20style%20natural%20light&image_size=portrait_4_3',
    'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=street%20photography%20urban%20life%20black%20and%20white&image_size=landscape_16_9',
    'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=macro%20photography%20flower%20detailed%20close%20up&image_size=square',
    'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=architecture%20photography%20modern%20building%20geometric%20shapes&image_size=landscape_16_9',
    'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=travel%20photography%20mountain%20lake%20reflection%20serene&image_size=landscape_16_9'
  ];

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Photography</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
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
