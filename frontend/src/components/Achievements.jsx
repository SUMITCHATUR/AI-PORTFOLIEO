import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const q = query(collection(db, 'files'), where('category', '==', 'achievement'));
        const querySnapshot = await getDocs(q);
        const achData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAchievements(achData);
      } catch (err) {
        console.error('Failed to fetch achievements:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  if (loading) return null;

  if (achievements.length === 0) return null;

  return (
    <section id="achievements" className="py-20 relative z-10 container mx-auto px-6">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-black text-white mb-10 text-center border-b border-white/5 pb-4 inline-block uppercase tracking-[0.2em] cyber-text-glow">SYSTEM_MILESTONES</h2>
      </div>
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-l-2 border-cyberCyan/30 pl-6 ml-4 space-y-10 py-4"
        >
          {achievements.map((ach, i) => (
            <motion.a 
              key={ach.id}
              href={ach.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative block group"
            >
              <span className="absolute -left-[35px] top-1 h-6 w-6 rounded-sm bg-[#020617] border-2 border-cyberCyan group-hover:scale-125 transition-transform group-hover:bg-cyberCyan shadow-lg shadow-cyberCyan/20"></span>
              <h3 className="text-xl font-bold text-white group-hover:text-cyberCyan transition-colors uppercase tracking-tight">{(ach.originalName || "Achievement").split('.')[0]}</h3>
              <p className="text-slate-400 mt-2 text-sm leading-relaxed font-mono tracking-tighter">OFFICIAL_RECORD: Verification of system clearance and project milestone achieved.</p>
              <span className="text-[10px] text-cyberCyan font-black mt-3 inline-block opacity-60 group-hover:opacity-100 transition-opacity tracking-widest uppercase">View Documentation &rarr;</span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
