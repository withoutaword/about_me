import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-w-6xl mx-auto items-start">
        {images.map((image, index) => (
          <Motion.div
            key={image.src}
            className="relative overflow-hidden rounded-lg cursor-pointer bg-[var(--bg-secondary)]"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedImage(image)}
          >
            <img 
              src={image.thumbnail || image.src}
              alt={image.alt || `Photography ${index + 1}`}
              loading={index === 0 ? 'eager' : 'lazy'}
              className="block w-full h-auto transition-transform duration-500 hover:scale-[1.02]"
            />
          </Motion.div>
        ))}
      </div>

      {/* 图片预览模态框 */}
      <AnimatePresence>
        {selectedImage && (
          <Motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <Motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.src}
                alt={selectedImage.alt || 'Selected photograph'}
                className="w-full h-auto max-h-[90vh] object-contain"
              />
              <button 
                className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/80 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageGallery;
