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
    <section id="projects" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Projects
          <div className="h-1 bg-white w-20 mx-auto mt-4"></div>
        </h2>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-white" size={40} />
          </div>
        ) : projects.length === 0 ? (
          <div className="bg-gray-900 rounded-lg p-8 text-center text-gray-400 border border-gray-800">
            <p className="text-lg">No projects available yet.</p>
            <p className="text-sm mt-2">Check back soon for upcoming projects.</p>
          </div>
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
                className="group cursor-pointer h-full"
                onClick={() => setSelectedProject(project)}
              >
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-gray-600 transition-colors h-full flex flex-col">
                  {/* Project Image */}
                  <div className="h-48 overflow-hidden rounded-lg mb-4">
                    <img 
                      src={project.imageUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop'} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-grow flex flex-col">
                    <h3 className="text-lg font-bold text-white mb-3">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm mb-4 flex-grow">
                      {project.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags?.slice(0, 3).map(tag => (
                        <span key={tag} className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-lg border border-gray-800 cursor-auto"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-20 p-2 bg-gray-800 hover:bg-gray-700 rounded-full text-white transition-colors"
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
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black"></div>
              </div>

              {/* Project Details */}
              <div className="p-8">
                <h3 className="text-3xl font-bold text-white mb-6">{selectedProject.title}</h3>
                
                {/* Action Buttons */}
                <div className="flex gap-4 mb-8 flex-wrap">
                  {selectedProject.githubLink && (
                    <a 
                      href={selectedProject.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <Github size={18} /> GitHub
                    </a>
                  )}
                  {selectedProject.liveLink && (
                    <a 
                      href={selectedProject.liveLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <ExternalLink size={18} /> Live Demo
                    </a>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed mb-8 whitespace-pre-wrap">
                  {selectedProject.description}
                </p>

                {/* Technologies */}
                {selectedProject.tags && selectedProject.tags.length > 0 && (
                  <div>
                    <h4 className="text-white font-semibold mb-4">Technologies Used</h4>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.tags.map(tag => (
                        <span key={tag} className="px-4 py-2 bg-gray-800 text-gray-300 text-sm rounded-lg">
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
