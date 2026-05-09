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
      
      {/* Technical Archetype Section */}
      <section className="py-20 px-6 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Technical Archetype
            <div className="h-1 bg-white w-20 mx-auto mt-4"></div>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Systems Architecture Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-900 rounded-lg p-8 border border-gray-800 hover:border-gray-600 transition-colors"
            >
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-6">
                <div className="text-white font-bold text-xl">A</div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Systems Architecture</h3>
              <p className="text-gray-400 mb-6">
                Designing robust backends and cloud-native solutions that scale without compromise.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded">ARCHITECTOS</span>
                <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded">AWS</span>
                <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded">GCP</span>
              </div>
            </motion.div>

            {/* Interface Engineering Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-900 rounded-lg p-8 border border-gray-800 hover:border-gray-600 transition-colors"
            >
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-6">
                <div className="w-6 h-6 border-2 border-white rounded"></div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Interface Engineering</h3>
              <p className="text-gray-400 mb-6">
                Crafting immersive front-end experiences with pixel-perfect precision and motion logic.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded">BLAST (WEBGL)</span>
                <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded">TYPESCRIPT</span>
                <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded">FRAMER</span>
              </div>
            </motion.div>

            {/* Machine Learning Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gray-900 rounded-lg p-8 border border-gray-800 hover:border-gray-600 transition-colors"
            >
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-6">
                <div className="w-6 h-6 bg-white rounded"></div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Machine Learning</h3>
              <p className="text-gray-400 mb-6">
                Integrating advanced AI models into functional product workflows for smarter UX.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded">PYTHON</span>
                <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded">OPENAI</span>
                <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded">LANGCHAIN</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Professional Lineage Section */}
      <section className="py-20 px-6 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Professional Lineage
            <div className="h-1 bg-white w-20 mx-auto mt-4"></div>
          </h2>
          <div className="space-y-12">
            {/* Lead Architect */}
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/4">
                <div className="text-gray-400 text-sm">2023 - PRESENT</div>
              </div>
              <div className="md:w-3/4">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Lead Architect</h3>
                    <div className="text-gray-400 mb-4">METATECH SYSTEMS, ZURICH</div>
                    <p className="text-gray-300 leading-relaxed">
                      Migrated legacy monolithic services to a globally distributed mesh architecture, achieving 40% reduction in latency and 99.99% uptime across 12 regions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Senior Frontend Engineer */}
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/4">
                <div className="text-gray-400 text-sm">2020 - 2023</div>
              </div>
              <div className="md:w-3/4">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Senior Frontend Engineer</h3>
                    <div className="text-gray-400 mb-4">AETHER DESIGN LAB, NY</div>
                    <p className="text-gray-300 leading-relaxed">
                      Developed high-fidelity creative tools for web-based 3D modeling, focusing on WebGL performance optimization and collaborative real-time state synchronization using CRDTs.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Software Developer */}
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/4">
                <div className="text-gray-400 text-sm">2019 - 2019</div>
              </div>
              <div className="md:w-3/4">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Software Developer</h3>
                    <div className="text-gray-400 mb-4">INITIAL FLOW CORP, SF</div>
                    <p className="text-gray-300 leading-relaxed">
                      Early-stage engineer building fintech dashboards, implemented security protocols and automated CI/CD pipelines for microservices deployment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-8">
            <span className="text-gray-400 text-sm">POSTGRESQL</span>
            <span className="text-gray-400 text-sm">DOCKER</span>
            <span className="text-gray-400 text-sm">REDIS</span>
            <span className="text-gray-400 text-sm">THREE.JS</span>
            <span className="text-gray-400 text-sm">FIGMA</span>
            <span className="text-gray-400 text-sm">RUST</span>
          </div>
        </div>
      </section>

      <Contact />
      
    </div>
  );
};

export default Home;
