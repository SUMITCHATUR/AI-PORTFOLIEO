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
    <section id="about" className="py-20 px-6 bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">
          About
          <div className="h-1 bg-white w-20 mx-auto mt-4"></div>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
              <h3 className="text-xl font-bold mb-6 text-white">Profile</h3>
              <div className="text-gray-300 leading-relaxed space-y-4">
                {bioText}
              </div>
            </div>
          </motion.div>

          {skillsList.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
                <h3 className="text-xl font-bold mb-6 text-white">Skills</h3>
                
                <div className="space-y-6">
                  {skillsList.map((skill, index) => (
                    <div key={index} className="w-full">
                      <div className="flex justify-between text-sm mb-2 text-gray-200 font-medium">
                        <span>{skill.name}</span>
                        <span className="text-white">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="bg-white h-full rounded-full"
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
