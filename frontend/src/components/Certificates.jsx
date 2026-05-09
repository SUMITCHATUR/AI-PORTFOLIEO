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
    <section id="certificates" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Certificates
          <div className="h-1 bg-white w-20 mx-auto mt-4"></div>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              className="group block bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-gray-600 transition-colors"
            >
              <div className="h-12 w-12 mx-auto rounded-sm bg-gray-800 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 0 00.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-white transition-colors">{cert.originalName.split('.')[0]}</h3>
              <p className="text-gray-400 text-sm uppercase">Verified Certificate</p>
              <span className="text-xs text-white mt-4 inline-block uppercase tracking-widest">View Certificate →</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
