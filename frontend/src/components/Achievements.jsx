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
    <section id="achievements" className="py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">
          Achievements
          <div className="h-1 bg-white w-16 sm:w-20 mx-auto mt-4"></div>
        </h2>

        <div className="space-y-6 sm:space-y-8">
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
              className="block bg-gray-900 rounded-lg p-4 sm:p-6 border border-gray-800 hover:border-gray-600 transition-colors"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-sm bg-gray-800 flex items-center justify-center text-white flex-shrink-0">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 01-4.438 0 3.42 3.42 0 001.946-.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2">{(ach.originalName || "Achievement").split('.')[0]}</h3>
                  <p className="text-gray-400 text-xs sm:text-sm">Official record of system clearance and milestone achieved.</p>
                  <span className="text-xs text-white mt-2 sm:mt-3 uppercase">View Documentation →</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
