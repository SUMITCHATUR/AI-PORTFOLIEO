import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Code, Save, Plus, Trash2, CheckCircle } from 'lucide-react';
import { db } from '../firebase/config';
import { doc, getDoc, setDoc, collection, getDocs, addDoc, deleteDoc } from 'firebase/firestore';

const defaultProfilePhoto = new URL('../../profile.jpg', import.meta.url).href;

const ManageProfile = () => {
  const [bio, setBio] = useState('');
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [heroText, setHeroText] = useState('');
  const [photo, setPhoto] = useState(defaultProfilePhoto);
  const [email, setEmail] = useState('sumitchatur9@gmail.com');
  const [whatsapp, setWhatsapp] = useState('9822461130');
  const [linkedin, setLinkedin] = useState('https://linkedin.com/in/sumit-jain-1786a3326');
  const [github, setGithub] = useState('https://github.com/SUMITCHATUR');
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ name: '', level: 80 });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      // Fetch Profile document
      const docRef = doc(db, 'profile', 'main');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        setBio(data.bio || '');
        setTitle(data.title || '');
        setSubTitle(data.subTitle || '');
        setHeroText(data.heroText || '');
        setPhoto(!data.photo || data.photo === '/profile.jpg' ? defaultProfilePhoto : data.photo);
        setEmail(data.email || 'sumitchatur9@gmail.com');
        setWhatsapp(data.whatsapp || '9822461130');
        setLinkedin(data.linkedin || 'https://linkedin.com/in/sumit-jain-1786a3326');
        setGithub(data.github || 'https://github.com/SUMITCHATUR');
      }

      // Fetch Skills collection
      const skillsRef = collection(db, 'skills');
      const skillsSnap = await getDocs(skillsRef);
      const skillsList = skillsSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSkills(skillsList);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBio = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, 'profile', 'main'), {
        bio, title, subTitle, heroText, photo, email, whatsapp, linkedin, github
      });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error('Error saving profile:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!newSkill.name) {
      alert("Please enter a skill name");
      return;
    }
    
    try {
      const skillData = { 
        ...newSkill, 
        level: Number(newSkill.level) 
      };
      
      const docRef = await addDoc(collection(db, 'skills'), skillData);
      setSkills([...skills, { ...skillData, id: docRef.id }]);
      setNewSkill({ name: '', level: 80 });
    } catch (err) {
      console.error("Error adding skill:", err);
    }
  };

  const handleDeleteSkill = async (id) => {
    try {
      await deleteDoc(doc(db, 'skills', id));
      setSkills(skills.filter(s => s.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-cyberCyan border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen pt-32 px-6 container mx-auto text-slate-100 pb-20">
      <Link to="/dashboard" className="text-cyberCyan hover:text-white mb-6 inline-block transition-colors font-mono font-bold text-xs uppercase tracking-widest">&larr; DB_RETURN</Link>
      
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyberCyan to-cyberBlue uppercase tracking-[0.2em] cyber-text-glow">
          SYSTEM_IDENTITY: CONFIG
        </h1>
        {showToast && (
          <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} className="bg-matrixGreen text-black px-4 py-2 rounded-sm font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
            <CheckCircle size={14} /> CHANGES_SAVED
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left: About Me Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="cyber-glass p-8 rounded-3xl"
        >
          <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-2">
            <User className="text-cyberCyan" size={20} />
            <h2 className="text-2xl font-black uppercase tracking-tighter">BOOT_RECORDS: ABOUT</h2>
          </div>
          
          <form onSubmit={handleUpdateBio} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] text-slate-400 mb-2 ml-1 uppercase tracking-widest font-black">HERO_TITLE</label>
                <input 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="E.G. CYBER_ARCHITECT"
                  className="w-full bg-[#020617] border border-white/10 rounded-sm p-4 text-xs font-mono focus:border-cyberCyan outline-none text-white uppercase tracking-widest"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-2 ml-1 uppercase tracking-widest font-black">SUB_COMMAND</label>
                <input 
                  value={subTitle}
                  onChange={(e) => setSubTitle(e.target.value)}
                  placeholder="E.G. BUILDING_SECURE_FUTURES"
                  className="w-full bg-[#020617] border border-white/10 rounded-sm p-4 text-xs font-mono focus:border-cyberCyan outline-none text-white uppercase tracking-widest"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-slate-400 mb-2 ml-1 uppercase tracking-widest font-black">MAIN_OVERRIDE_TEXT</label>
              <input 
                value={heroText}
                onChange={(e) => setHeroText(e.target.value)}
                placeholder="E.G. SECURE THE DIGITAL FRONTIER"
                className="w-full bg-[#020617] border border-white/10 rounded-sm p-4 text-xs font-mono focus:border-cyberCyan outline-none text-white uppercase tracking-widest"
              />
            </div>

            <div>
              <label className="block text-[10px] text-slate-400 mb-2 ml-1 uppercase tracking-widest font-black">PROFILE_IMAGE_URL</label>
              <input 
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                placeholder="E.G. https://.../profile.jpg"
                className="w-full bg-[#020617] border border-white/10 rounded-sm p-4 text-xs font-mono focus:border-cyberCyan outline-none text-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] text-slate-400 mb-2 ml-1 uppercase tracking-widest font-black">UPLINK_COMMS: TEL</label>
                <input 
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full bg-[#020617] border border-white/10 rounded-sm p-3 text-xs font-mono focus:border-cyberCyan outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-2 ml-1 uppercase tracking-widest font-black">UPLINK_COMMS: MAIL</label>
                <input 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#020617] border border-white/10 rounded-sm p-3 text-xs font-mono focus:border-cyberCyan outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] text-slate-400 mb-2 ml-1 uppercase tracking-widest font-black">DATA_UPLINK: LINKEDIN</label>
                <input 
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="w-full bg-[#020617] border border-white/10 rounded-sm p-3 text-xs font-mono focus:border-cyberCyan outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-2 ml-1 uppercase tracking-widest font-black">DATA_UPLINK: GITHUB</label>
                <input 
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  className="w-full bg-[#020617] border border-white/10 rounded-sm p-3 text-xs font-mono focus:border-cyberCyan outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-slate-400 mb-2 ml-1 uppercase tracking-widest font-black">IDENTITY_DESCRIPTION</label>
              <textarea 
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={6}
                className="w-full bg-[#020617] border border-white/10 rounded-sm p-4 text-xs font-mono focus:border-cyberCyan outline-none resize-none leading-relaxed text-slate-300"
              />
            </div>
            <button 
              type="submit" 
              disabled={saving}
              className="w-full py-4 bg-cyberCyan text-black font-black rounded-sm flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(0,243,255,0.4)] hover:shadow-[0_0_35px_rgba(0,243,255,0.8)] transition-all disabled:opacity-50 uppercase text-[10px] tracking-widest"
            >
              {saving ? 'EXECUTING_SYNC...' : <><Save size={16} /> EXECUTE_IDENTITY_SYNC</>}
            </button>
          </form>
        </motion.div>

        {/* Right: Skills Section */}
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="cyber-glass p-8 rounded-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Code className="text-cyberBlue" size={20} />
              <h2 className="text-2xl font-black uppercase tracking-tighter">DATA_SYNC: NEW_SKILL</h2>
            </div>
            
            <form onSubmit={handleAddSkill} className="flex flex-col sm:flex-row gap-4">
              <input 
                value={newSkill.name}
                onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
                placeholder="SKILL_ID (E.G. REACT)"
                className="flex-1 bg-[#020617] border border-white/10 rounded-sm p-4 text-xs font-mono focus:border-cyberCyan outline-none text-white uppercase tracking-widest"
              />
              <input 
                type="number"
                value={newSkill.level}
                onChange={(e) => setNewSkill({...newSkill, level: e.target.value})}
                placeholder="%"
                className="w-24 bg-[#020617] border border-white/10 rounded-sm p-4 text-xs font-mono focus:border-cyberCyan outline-none text-white"
              />
              <button 
                type="submit"
                className="bg-cyberBlue p-4 rounded-sm hover:bg-white hover:text-black transition-all text-black"
              >
                <Plus size={20} strokeWidth={3} />
              </button>
            </form>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="cyber-glass p-8 rounded-3xl"
          >
            <h3 className="text-sm font-black mb-6 text-slate-400 uppercase tracking-[0.2em] border-b border-white/5 pb-2">CORE_SKILLSET_MATRIX</h3>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {skills.map(skill => (
                <div key={skill.id} className="flex items-center justify-between p-4 bg-[#020617]/50 rounded-sm border border-white/5 group transition-all hover:border-cyberCyan/30">
                  <div className="flex-1">
                    <div className="flex justify-between mb-2 pr-4">
                      <span className="font-black text-xs uppercase tracking-widest text-white">{skill.name}</span>
                      <span className="text-cyberCyan text-[10px] font-mono font-black">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-[#020617] h-1 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-cyberCyan to-cyberBlue h-full rounded-full" style={{ width: `${skill.level}%` }} />
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDeleteSkill(skill.id)}
                    className="p-2 text-slate-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all ml-4"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              {skills.length === 0 && <p className="text-slate-600 text-center py-4 text-xs font-mono">NO_DATA_AVAILABLE</p>}
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default ManageProfile;
