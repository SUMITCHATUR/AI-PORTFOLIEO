import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Projects from '../components/Projects';
import About from '../components/About';
import Certificates from '../components/Certificates';
import Achievements from '../components/Achievements';
import Notes from '../components/Notes';
import Contact from '../components/Contact';
import Feed from '../components/Feed';

import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

const TypewriterText = ({ text, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (!text) return;
    let i = 0;
    const intervalId = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(intervalId);
    }, 50);
    return () => clearInterval(intervalId);
  }, [text]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      className="text-3xl md:text-5xl font-bold text-white mb-4"
    >
      {displayedText}
      <span className="animate-pulse text-aiCyan">_</span>
    </motion.div>
  );
};

const Home = ({ onOpenContact }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const snap = await getDoc(doc(db, 'profile', 'main'));
        if (snap.exists()) {
          setProfile(snap.data());
        }
      } catch (err) {
        console.error('Error fetching hero data:', err);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="text-sm tracking-widest text-gray-400">THE PERSONA</div>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Precision in<br />Digital Form.
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              {profile?.bio ? `${profile.bio.substring(0, 180)}...` : "A software architect and creative developer specializing in clean code, high-performance systems, and poetic interfaces. My practice balances technical rigor with aesthetic sensibility."}
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              With over a decade of experience engineering complex digital ecosystems, I translate business visions into scalable architecture that doesn't just work—it inspires.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.5 }}
              className="pt-6 flex flex-col sm:flex-row gap-4"
            >
              <motion.a
                href="#projects"
                whileHover={{ y: -4 }}
                className="px-8 py-3 font-semibold text-white bg-gray-900 border border-gray-700 rounded-lg hover:border-gray-500 transition-all"
              >
                View Work
              </motion.a>

              <motion.button
                onClick={onOpenContact}
                whileHover={{ y: -4 }}
                className="px-8 py-3 font-semibold text-black bg-white rounded-lg hover:bg-gray-200 transition-all"
              >
                Get in Touch
              </motion.button>

              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                className="px-8 py-3 font-semibold text-white border border-gray-600 rounded-lg hover:border-gray-400 transition-all"
              >
                Resume
              </motion.a>
            </motion.div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.8, type: "spring" }}
              className="w-80 h-96 bg-gray-800 rounded-lg overflow-hidden"
            >
              <img 
                src="/profile.jpg" 
                alt="Portrait" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <Feed />
      <About />
      <Projects />
      <Certificates />
      <Achievements />
      <Notes />
      <Contact />
      
    </div>
  );
};

export default Home;
