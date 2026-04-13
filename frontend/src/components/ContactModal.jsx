import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, MessageCircle, Linkedin, Github, ExternalLink } from 'lucide-react';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

const ContactModal = ({ isOpen, onClose }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (isOpen) {
      const fetchContact = async () => {
        try {
          const snap = await getDoc(doc(db, 'profile', 'main'));
          if (snap.exists()) {
            setProfile(snap.data());
          }
        } catch (err) {
          console.error('Error fetching contact details:', err);
        }
      };
      fetchContact();
    }
  }, [isOpen]);

  const contactOptions = [
    {
      name: 'Email',
      icon: <Mail className="w-6 h-6" />,
      label: 'Send an Email',
      value: profile?.email || 'sumitchatur9@gmail.com',
      link: `mailto:${profile?.email || 'sumitchatur9@gmail.com'}`,
      color: 'from-blue-500 to-cyan-400',
      shadow: 'shadow-blue-500/20'
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="w-6 h-6" />,
      label: 'Chat on WhatsApp',
      value: profile?.whatsapp || '9822461130',
      link: `https://wa.me/${(profile?.whatsapp || '9822461130').replace(/\D/g, '')}`,
      color: 'from-green-500 to-emerald-400',
      shadow: 'shadow-green-500/20'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-6 h-6" />,
      label: 'Connect on LinkedIn',
      value: 'LinkedIn Profile',
      link: profile?.linkedin || 'https://linkedin.com/in/sumit-jain-1786a3326',
      color: 'from-blue-600 to-indigo-500',
      shadow: 'shadow-blue-600/20'
    },
    {
      name: 'GitHub',
      icon: <Github className="w-6 h-6" />,
      label: 'Follow on GitHub',
      value: 'GitHub Profile',
      link: profile?.github || 'https://github.com/SUMITCHATUR',
      color: 'from-purple-600 to-pink-500',
      shadow: 'shadow-purple-600/20'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-slate-950/40 backdrop-blur-md"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-lg cyber-glass bg-[#020617]/90 border border-white/5 rounded-2xl p-8 shadow-2xl backdrop-blur-2xl pointer-events-auto relative overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyberCyan/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyberBlue/10 rounded-full blur-3xl" />

              {/* Header */}
              <div className="flex justify-between items-center mb-8 relative z-10">
                <div>
                  <h2 className="text-3xl font-black text-white tracking-[0.2em] uppercase cyber-text-glow">SECURE_<span className="text-cyberCyan">UPLINK</span></h2>
                  <p className="text-slate-500 text-[10px] font-mono tracking-widest uppercase mt-2">SELECT_CHANNEL: ENCRYPTED_COMMUNICATION</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-sm bg-[#020617] text-cyberCyan hover:bg-cyberCyan hover:text-black transition-all border border-cyberCyan/20"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 gap-4 relative z-10">
                {contactOptions.map((option, index) => (
                  <motion.a
                    key={option.name}
                    href={option.link}
                    target={option.name !== 'Email' ? "_blank" : undefined}
                    rel="noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group flex items-center p-4 rounded-sm bg-[#020617]/40 border border-white/5 hover:border-cyberCyan/50 transition-all hover:shadow-[0_0_20px_rgba(0,243,255,0.1)] transform hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 rounded-sm bg-cyberCyan/10 flex items-center justify-center text-cyberCyan shadow-lg mr-4 border border-cyberCyan/20 group-hover:bg-cyberCyan group-hover:text-black transition-all">
                      {option.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-black text-[10px] tracking-widest uppercase">{option.name}</h3>
                      <p className="text-slate-500 text-[10px] font-mono overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px] uppercase">{option.value}</p>
                    </div>
                    <ExternalLink size={14} className="text-cyberCyan/40 group-hover:text-cyberCyan transition-colors" />
                  </motion.a>
                ))}
              </div>

              {/* Footer text */}
              <p className="text-center text-slate-600 text-[9px] font-mono tracking-tighter uppercase mt-8 relative z-10">
                LATEST_PING: RESPONSIVE_WITHIN_24_CYCLES
              </p>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
