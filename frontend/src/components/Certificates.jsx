import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';

const Certificates = () => {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const q = query(collection(db, 'files'), where('category', '==', 'certificate'));
        const querySnapshot = await getDocs(q);
        const certsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCerts(certsData);
      } catch (err) {
        console.error('Failed to fetch certificates:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCerts();
  }, []);

  if (loading) return null; // Or a skeleton

  if (certs.length === 0) return null; // Hide section if no certs

  return (
    <section id="certificates" className="py-20 relative z-10 container mx-auto px-6">
      <h2 className="text-3xl font-black text-white mb-10 text-center uppercase tracking-[0.2em] cyber-text-glow">SYSTEM_CLEARANCE: <span className="text-cyberCyan">VALIDATIONS</span></h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
        {certs.map((cert, i) => (
          <motion.a 
            key={cert.id}
            href={cert.url}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group block cyber-glass bg-[#020617]/60 p-6 rounded-2xl border border-white/5 hover:border-cyberCyan/50 transition-all shadow-xl hover:-translate-y-2"
          >
            <div className="h-12 w-12 mx-auto sm:mx-0 rounded-sm bg-cyberCyan/10 flex items-center justify-center text-cyberCyan mb-4 group-hover:scale-110 transition-transform border border-cyberCyan/20">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyberCyan transition-colors uppercase tracking-tight">{cert.originalName.split('.')[0]}</h3>
            <p className="text-slate-400 text-[10px] font-mono tracking-widest uppercase">Verified System Spec</p>
            <span className="text-[10px] text-cyberCyan font-black mt-4 inline-block uppercase tracking-widest">ACCESS_DOC &rarr;</span>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default Certificates;
