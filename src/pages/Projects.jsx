import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';

const Projects = () => {
  const projects = [
    {
      name: "AI Image Generator",
      description: "A web application that uses machine learning to generate images from text prompts. Built with React, Node.js, and TensorFlow.",
      techStack: ["React", "Node.js", "TensorFlow", "Express"],
      github: "https://github.com/brucew/ai-image-generator",
      demo: "https://ai-image-generator.example.com"
    },
    {
      name: "Smart Home Dashboard",
      description: "A dashboard for controlling smart home devices, with real-time data visualization and voice control integration.",
      techStack: ["React", "TypeScript", "Firebase", "Chart.js"],
      github: "https://github.com/brucew/smart-home-dashboard",
      demo: "https://smart-home.example.com"
    },
    {
      name: "Football Analytics Platform",
      description: "A platform for analyzing football match data and player performance using machine learning algorithms.",
      techStack: ["Python", "Django", "Pandas", "Scikit-learn"],
      github: "https://github.com/brucew/football-analytics",
      demo: "https://football-analytics.example.com"
    },
    {
      name: "Tesla Stock Analyzer",
      description: "A tool for analyzing Tesla stock performance and predicting future trends using technical analysis.",
      techStack: ["React", "Python", "Flask", "Plotly"],
      github: "https://github.com/brucew/tesla-stock-analyzer",
      demo: "https://tesla-analyzer.example.com"
    },
    {
      name: "Personal Portfolio Website",
      description: "This portfolio website built with React, TailwindCSS, and Framer Motion to showcase my work and skills.",
      techStack: ["React", "TailwindCSS", "Framer Motion", "React Router"],
      github: "https://github.com/brucew/portfolio",
      demo: "https://brucew.example.com"
    },
    {
      name: "Chatbot Assistant",
      description: "An AI-powered chatbot assistant that can answer questions and perform tasks using natural language processing.",
      techStack: ["Python", "Flask", "NLTK", "Dialogflow"],
      github: "https://github.com/brucew/chatbot-assistant",
      demo: "https://chatbot.example.com"
    }
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
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Projects</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A collection of my personal and professional projects
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Projects;
