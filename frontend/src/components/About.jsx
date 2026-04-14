import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '../firebase/config';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';

const About = () => {
  const [data, setData] = useState({ profile: null, skills: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileSnap = await getDoc(doc(db, 'profile', 'main'));
        const profile = profileSnap.exists() ? profileSnap.data() : null;

        const skillsSnap = await getDocs(collection(db, 'skills'));
        const skillsList = skillsSnap.docs.map(doc => doc.data());

        setData({ profile, skills: skillsList });
      } catch (err) {
        console.error('Error fetching about data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const defaultBio = "As a Cybersecurity Architect and Full-Stack Defender, I specialize in architecting secure digital ecosystems. My focus lies in building resilient web infrastructures, implementing robust security protocols, and creating high-performance interactive experiences that bridge the gap between functionality and uncompromised security.";
  
  const bioText = data.profile?.bio || defaultBio;
  const skillsList = data.skills || [];

  if (loading) return null;

  return (
    <section id="about" className="py-16 md:py-20 relative z-10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`flex-1 ${skillsList.length === 0 ? 'max-w-3xl mx-auto text-center' : ''}`}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyberCyan to-cyberBlue blur-2xl opacity-10 rounded-2xl"></div>
              <div className="cyber-glass relative p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-black text-white mb-5 md:mb-6 uppercase tracking-[0.08em] md:tracking-[0.2em] break-words leading-tight cyber-text-glow">IDENTITY_BOOT_RECORDS</h2>
                <div className="text-slate-300 leading-relaxed font-medium space-y-4 whitespace-pre-line text-sm">
                  {bioText}
                </div>
              </div>
            </div>
          </motion.div>

          {skillsList.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 w-full relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyberCyan to-cyberBlue blur-2xl opacity-10 rounded-2xl pointer-events-none"></div>
              <div className="cyber-glass relative p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-black text-white mb-6 border-b border-white/5 pb-2 uppercase tracking-tight break-words">CORE_SYSTEM_RESOURCES</h3>
                
                <div className="space-y-6">
                  {skillsList.map((skill, index) => (
                    <div key={index} className="w-full">
                      <div className="flex justify-between text-xs mb-2 text-slate-200 font-bold tracking-widest uppercase">
                        <span className="drop-shadow-md">{skill.name}</span>
                        <span className="text-cyberCyan drop-shadow-md">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-[#020617]/80 backdrop-blur-sm rounded-sm h-1.5 overflow-hidden border border-white/5">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="bg-gradient-to-r from-cyberCyan to-cyberBlue h-full rounded-sm shadow-[0_0_10px_rgba(0,243,255,0.8)]"
                        ></motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
};

export default About;
