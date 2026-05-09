import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Contact
          <div className="h-1 bg-white w-20 mx-auto mt-4"></div>
        </h2>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-900 rounded-lg p-8 border border-gray-800 text-center"
        >
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-sm leading-relaxed">
            Ready to establish connection for system collaboration or data requisition.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a
              href="mailto:sumitchatur9@gmail.com"
              className="px-8 py-4 rounded-sm bg-white text-black font-bold hover:bg-gray-200 transition-all uppercase tracking-widest text-sm"
            >
              Send Message
            </a>
            <a
              href="https://linkedin.com/in/sumit-jain-1786a3326"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 rounded-sm border border-gray-600 text-white hover:border-gray-400 transition-all uppercase tracking-widest text-sm"
            >
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
