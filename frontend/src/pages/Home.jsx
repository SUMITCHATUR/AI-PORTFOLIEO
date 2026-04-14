import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Projects from '../components/Projects';
import About from '../components/About';
import Certificates from '../components/Certificates';
import Achievements from '../components/Achievements';
import AIImage from '../components/AIImage';
import Notes from '../components/Notes';
import Contact from '../components/Contact';
import Feed from '../components/Feed';

import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

const defaultProfilePhoto = new URL('../../profile.jpg', import.meta.url).href;

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
  const profilePhoto =
    !profile?.photo || profile.photo === '/profile.jpg' ? defaultProfilePhoto : profile.photo;

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
      <div className="relative min-h-screen flex items-center pt-24">
        <div className="container mx-auto px-6 relative z-10">
          <div className="hero-panel grid grid-cols-1 lg:grid-cols-2 items-center gap-14">
            {/* Left Side: Tech Text */}
            <div className="space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-3 px-5 py-2 rounded-lg bg-aiCyan/10 border border-aiCyan/30 text-xs text-aiCyan font-semibold tracking-[0.2em] uppercase hover:bg-aiCyan/20 hover:border-aiCyan/50 transition-all duration-300"
              >
                <div className="w-2 h-2 rounded-full bg-aiCyan animate-pulse" />
                {profile?.subTitle || "Full-Stack Developer"}
              </motion.div>

              <div className="space-y-4">
                <TypewriterText text={profile?.title || "Sumit Jain"} delay={0.5} />

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="text-5xl md:text-7xl font-black bg-gradient-to-r from-white via-aiCyan to-aiBlue bg-clip-text text-transparent leading-tight"
                >
                  {profile?.heroText || "Build Tomorrow's Solutions"}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                  className="text-slate-400 max-w-2xl text-lg leading-relaxed font-medium"
                >
                  {profile?.bio ? `${profile.bio.substring(0, 180)}...` : "Crafting intelligent systems with clean code and thoughtful design."}
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.5 }}
                className="pt-6 flex flex-wrap gap-4 justify-center lg:justify-start"
              >
                <motion.a
                  href="#projects"
                  whileHover={{ y: -4 }}
                  className="inline-flex items-center justify-center px-8 py-3 font-semibold text-white bg-slate-900/60 border border-slate-700 rounded-lg hover:border-aiCyan hover:bg-slate-800 hover:shadow-glow-md transition-all duration-300 backdrop-blur-sm"
                >
                  View Work
                </motion.a>

                <motion.button
                  onClick={onOpenContact}
                  whileHover={{ y: -4, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center px-8 py-3 font-semibold text-black bg-gradient-to-r from-aiCyan to-aiBlue rounded-lg shadow-glow-md hover:shadow-glow-lg transition-all duration-300 group relative overflow-hidden"
                >
                  <span className="relative z-10">Get in Touch</span>
                </motion.button>

                <motion.a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4 }}
                  className="inline-flex items-center justify-center px-8 py-3 font-semibold text-white border border-slate-600 rounded-lg hover:border-aiCyan hover:bg-slate-900/40 transition-all duration-300 backdrop-blur-sm"
                >
                  Resume
                </motion.a>
              </motion.div>
            </div>

            {/* Right Side: AI Identity Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.8, type: "spring" }}
              className="relative flex justify-center lg:justify-end"
            >
              <AIImage 
                src={profilePhoto} 
                fallbackSrc={defaultProfilePhoto}
                alt="Profile" 
                className="w-full max-w-[400px]"
              />
            </motion.div>
          </div>
        </div>
      </div>

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
