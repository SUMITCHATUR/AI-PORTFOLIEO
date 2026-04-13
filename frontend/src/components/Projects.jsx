import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, X, Loader2 } from 'lucide-react';
import { db } from '../firebase/config';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const projectsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProjects(projectsData);
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-aiCyan to-aiBlue">
            Featured Projects
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Showcasing innovative solutions and real-world applications built with modern technologies.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-aiCyan" size={40} />
          </div>
        ) : projects.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card text-center py-16"
          >
            <p className="text-slate-300 text-lg">No projects available yet.</p>
            <p className="text-slate-500 text-sm mt-2">Check back soon for upcoming projects.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative cursor-pointer h-full"
                onClick={() => setSelectedProject(project)}
              >
                {/* Subtle Gradient Border on Hover */}
                <div className="absolute -inset-[1px] bg-gradient-to-r from-aiCyan/40 to-aiBlue/40 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur-sm -z-10"></div>
                
                <div className="relative glass-card h-full flex flex-col bg-slate-950/40 border-slate-700/30 group-hover:border-aiCyan/50 overflow-hidden">
                  {/* Project Image */}
                  <div className="h-48 overflow-hidden relative flex-shrink-0">
                    <img 
                      src={project.imageUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop'} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-3 gap-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-aiCyan transition-colors">
                        {project.title}
                      </h3>
                      <div className="w-2 h-2 rounded-full bg-aiCyan animate-pulse flex-shrink-0 mt-1"></div>
                    </div>
                    
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2 flex-grow">
                      {project.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags?.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-1 bg-aiCyan/10 text-aiCyan text-[11px] font-semibold rounded border border-aiCyan/30 hover:border-aiCyan/60 transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Action Indicator */}
                  <div className="px-6 pb-4 text-xs text-aiCyan/60 group-hover:text-aiCyan font-medium transition-colors">
                    Click to view details →
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal View for Project Details */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card max-w-3xl w-full max-h-[90vh] overflow-y-auto p-0 cursor-auto shadow-2xl"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-20 p-2 bg-slate-900/80 hover:bg-slate-700 rounded-full text-white transition-all border border-white/20 hover:border-aiCyan/50 flex items-center gap-2 backdrop-blur-md"
              >
                <X size={20} />
              </button>
              
              {/* Project Header Image */}
              <div className="h-72 w-full relative overflow-hidden">
                <img 
                  src={selectedProject.imageUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1000&h=600&fit=crop'} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/30 to-slate-950"></div>
              </div>

              {/* Project Details */}
              <div className="p-8 -mt-20 relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{selectedProject.title}</h3>
                
                {/* Action Buttons */}
                <div className="flex gap-4 mb-8 flex-wrap">
                  {selectedProject.githubLink && (
                    <motion.a 
                      href={selectedProject.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/60 text-slate-200 rounded-lg border border-slate-700 hover:border-white/50 transition-all backdrop-blur-sm"
                    >
                      <Github size={18} /> GitHub
                    </motion.a>
                  )}
                  {selectedProject.liveLink && (
                    <motion.a 
                      href={selectedProject.liveLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-aiCyan/20 to-aiBlue/20 text-aiCyan rounded-lg border border-aiCyan/50 hover:border-aiCyan font-semibold transition-all backdrop-blur-sm"
                    >
                      <ExternalLink size={18} /> Live Demo
                    </motion.a>
                  )}
                </div>

                {/* Description */}
                <p className="text-slate-300 leading-relaxed mb-8 whitespace-pre-wrap">
                  {selectedProject.description}
                </p>

                {/* Technologies */}
                {selectedProject.tags && selectedProject.tags.length > 0 && (
                  <div>
                    <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-aiCyan"></span>
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.tags.map(tag => (
                        <span key={tag} className="px-4 py-2 bg-aiCyan/10 text-slate-200 text-sm rounded-lg border border-aiCyan/30 hover:border-aiCyan/60 hover:text-aiCyan transition-all">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
