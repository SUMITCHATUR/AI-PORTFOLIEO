import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section id="contact" className="py-20 relative z-10 container mx-auto px-6">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto cyber-glass border border-white/5 p-8 md:p-12 text-center"
      >
        <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyberCyan to-cyberBlue mb-6 uppercase tracking-[0.2em] cyber-text-glow">ESTABLISH_CONNECTION</h2>
        <p className="text-slate-400 mb-8 max-w-2xl mx-auto text-sm leading-relaxed font-mono uppercase tracking-tighter">
          SECURE_LINE: READY. SEND_SIGNAL FOR SYSTEM_COLLABORATION OR DATA_REQUISITION.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <a
            href="mailto:sumitchatur9@gmail.com"
            className="px-8 py-4 rounded-sm bg-cyberCyan text-black font-black hover:shadow-[0_0_20px_rgba(0,243,255,0.6)] transition-all transform hover:-translate-y-1 uppercase tracking-widest text-[10px]"
          >
            SEND_SIGNAL
          </a>
          <a
            href="https://linkedin.com/in/sumit-jain-1786a3326"
            target="_blank"
            rel="noreferrer"
            className="px-8 py-4 rounded-sm border border-white/10 text-white font-black hover:border-cyberCyan hover:text-cyberCyan transition-all transform hover:-translate-y-1 uppercase tracking-widest text-[10px]"
          >
            LINKEDIN_UPLINK
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
