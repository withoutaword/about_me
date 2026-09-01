import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const formatDate = (date) => date
  ? new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long' }).format(new Date(date))
  : 'Project record';

const ProjectCard = ({ project }) => {
  return (
    <motion.div 
      className="bg-[var(--bg-secondary)] rounded-lg p-6 card-hover"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <p className="text-xs text-[var(--text-muted)] mb-2">{formatDate(project.date)}</p>
      <h3 className="text-xl font-bold text-[var(--text-color)] mb-2">
        <Link className="hover:text-[var(--primary-color)]" to={`/projects/${encodeURIComponent(project.slug)}`}>
          {project.title}
        </Link>
      </h3>
      <p className="text-[var(--text-muted)] mb-4 leading-relaxed">{project.summary}</p>
      {project.techStack.length > 0 && <div className="flex flex-wrap mb-4">
        {project.techStack.map((tech, index) => (
          <span key={index} className="px-2 py-1 bg-[var(--bg-color)] text-[var(--primary-color)] text-xs rounded mr-2 mb-2">
            {tech}
          </span>
        ))}
      </div>}
      <div className="flex space-x-4">
        <Link
          to={`/projects/${encodeURIComponent(project.slug)}`}
          className="text-sm text-[var(--primary-color)] hover:underline"
        >
          View Project
        </Link>
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
