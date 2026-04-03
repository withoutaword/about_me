import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project }) => {
  return (
    <motion.div 
      className="bg-[var(--bg-secondary)] rounded-lg p-6 card-hover"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <h3 className="text-xl font-bold text-[var(--text-color)] mb-2">{project.name}</h3>
      <p className="text-[var(--text-muted)] mb-4">{project.description}</p>
      <div className="flex flex-wrap mb-4">
        {project.techStack.map((tech, index) => (
          <span key={index} className="px-2 py-1 bg-[var(--bg-color)] text-[var(--primary-color)] text-xs rounded mr-2 mb-2">
            {tech}
          </span>
        ))}
      </div>
      <div className="flex space-x-4">
        {project.github && (
          <a 
            href={project.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-[var(--primary-color)] hover:underline"
          >
            GitHub
          </a>
        )}
        {project.demo && (
          <a 
            href={project.demo} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-[var(--primary-color)] hover:underline"
          >
            Demo
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;

