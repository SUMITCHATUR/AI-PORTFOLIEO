import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { db } from '../firebase/config';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import ImageUpload from '../components/ImageUpload';
import { Trash2, ExternalLink, Github } from 'lucide-react';

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '', description: '', tags: '', githubLink: '', liveLink: '', imageUrl: ''
  });

  const fetchProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'projects'));
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

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tagsArray = formData.tags.split(',').map(t => t.trim());
      
      await addDoc(collection(db, 'projects'), {
        ...formData,
        tags: tagsArray,
        createdAt: new Date()
      });
      
      setFormData({ title: '', description: '', tags: '', githubLink: '', liveLink: '', imageUrl: '' });
      fetchProjects();
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await deleteDoc(doc(db, 'projects', id));
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div className="min-h-screen pt-32 px-6 container mx-auto text-slate-100 pb-12">
      <Link to="/dashboard" className="text-cyberCyan hover:text-white mb-6 inline-block transition-colors font-mono font-bold text-xs uppercase tracking-widest">&larr; DB_RETURN</Link>
      <h1 className="text-3xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyberCyan to-cyberBlue uppercase tracking-[0.2em] cyber-text-glow">
        SYSTEM_MODULES: PROJECTS
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="cyber-glass p-6 rounded-2xl lg:col-span-1 h-fit"
        >
          <h2 className="text-xl font-black mb-6 text-white uppercase tracking-tighter border-b border-white/5 pb-2">ADD_NEW_RECORD</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="TITLE" required className="w-full bg-[#020617] border border-white/10 rounded-sm p-4 text-xs font-mono focus:border-cyberCyan outline-none uppercase tracking-widest" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            <textarea placeholder="SYSTEM_DESCRIPTION" required rows="3" className="w-full bg-[#020617] border border-white/10 rounded-sm p-4 text-xs font-mono focus:border-cyberCyan outline-none uppercase tracking-widest" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
            <input type="text" placeholder="TAGS (HEX, SYS, CORE)" className="w-full bg-[#020617] border border-white/10 rounded-sm p-4 text-xs font-mono focus:border-cyberCyan outline-none uppercase tracking-widest" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} />
            
            <div className="space-y-2">
              <label className="text-[10px] text-slate-400 ml-1 uppercase tracking-[0.3em] font-black">DATA_UPLINK: IMAGE</label>
              <ImageUpload onUpload={url => setFormData({...formData, imageUrl: url})} />
            </div>

            <input type="url" placeholder="REPO_UPLINK (GITHUB)" className="w-full bg-[#020617] border border-white/10 rounded-sm p-4 text-xs font-mono focus:border-cyberCyan outline-none" value={formData.githubLink} onChange={e => setFormData({...formData, githubLink: e.target.value})} />
            <input type="url" placeholder="LIVE_UPLINK (PREVIEW)" className="w-full bg-[#020617] border border-white/10 rounded-sm p-4 text-xs font-mono focus:border-cyberCyan outline-none" value={formData.liveLink} onChange={e => setFormData({...formData, liveLink: e.target.value})} />
            
            <button type="submit" className="w-full bg-cyberCyan text-black font-black py-4 rounded-sm shadow-[0_0_20px_rgba(0,243,255,0.4)] hover:shadow-[0_0_35px_rgba(0,243,255,0.8)] transition-all text-xs tracking-[0.2em] uppercase">
              EXECUTE_SAVE
            </button>
          </form>
        </motion.div>

        {/* List Section */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 space-y-4"
        >
          {loading ? <p>Loading projects...</p> : projects.length === 0 ? (
            <div className="glass-card text-center p-8 text-slate-400">No projects added yet.</div>
          ) : (
            projects.map(proj => (
              <div key={proj.id} className="glass-card bg-slate-950/60 p-5 rounded-2xl border border-slate-700/50 flex flex-col md:flex-row gap-4 items-center">
                {proj.imageUrl && (
                  <img src={proj.imageUrl} alt={proj.title} className="w-full md:w-32 h-20 object-cover rounded-lg border border-slate-700" />
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white">{proj.title}</h3>
                  <p className="text-slate-400 text-sm line-clamp-2 mt-1">{proj.description}</p>
                  <div className="flex gap-2 mt-2">
                    {proj.tags && proj.tags.map(t => (
                      <span key={t} className="text-[10px] bg-slate-800 px-2 py-1 rounded text-cyberCyan font-bold uppercase tracking-widest">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <button 
                    onClick={() => handleDelete(proj.id)} 
                    className="p-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all border border-red-500/20"
                    title="Delete Project"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ManageProjects;
