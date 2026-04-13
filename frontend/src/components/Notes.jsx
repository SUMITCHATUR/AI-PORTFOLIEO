import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '../firebase/config';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { FileText, Download, ExternalLink, BookOpen, Search } from 'lucide-react';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        console.log("Fetching notes...");
        const q = query(
          collection(db, 'files'), 
          where('category', '==', 'notes')
        );
        const querySnapshot = await getDocs(q);
        console.log("Notes found:", querySnapshot.size);
        const notesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setNotes(notesData);
      } catch (err) {
        console.error('Failed to fetch notes:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const filteredNotes = notes.filter(note => 
    note.originalName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return null;
  if (notes.length === 0) return null;

  return (
    <section id="notes" className="py-24 relative z-10 container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-2 uppercase tracking-[0.2em] cyber-text-glow">
            SECURITY <span className="text-cyberCyan">LOGS</span>
          </h2>
          <p className="text-slate-400 font-mono text-xs tracking-widest">UPLINK_STABLE: SHARED_RESOURCES</p>
        </motion.div>

        <div className="relative w-full md:w-80 font-mono">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-cyberCyan/50" size={18} />
          <input 
            type="text" 
            placeholder="ACCESS LOGS..." 
            className="w-full bg-[#020617]/50 border border-cyberCyan/20 rounded-sm py-3 pl-12 pr-6 text-white focus:border-cyberCyan outline-none backdrop-blur-sm transition-all shadow-inner text-xs tracking-widest"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note, i) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group cyber-glass bg-[#020617]/40 p-5 rounded-2xl border border-white/5 hover:border-cyberCyan/30 transition-all hover:shadow-[0_0_20px_rgba(0,243,255,0.1)] relative overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyberCyan/5 blur-3xl group-hover:bg-cyberCyan/10 transition-colors"></div>
            
            <div className="flex items-start gap-4 h-full">
              <div className="p-3 rounded-xl bg-[#020617] border border-white/10 text-cyberCyan group-hover:bg-cyberCyan group-hover:text-black transition-all shadow-lg">
                <FileText size={28} />
              </div>
              
              <div className="flex-1 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-1 pr-4">
                    <h3 className="font-bold text-slate-100 group-hover:text-cyberCyan transition-colors line-clamp-1 uppercase tracking-tighter text-sm" title={note.originalName}>
                      {note.originalName.split('.')[0]}
                    </h3>
                    <div className="w-1.5 h-1.5 rounded-full bg-cyberCyan shadow-[0_0_8px_rgba(0,243,255,1)]"></div>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-slate-500 font-bold tracking-widest uppercase">
                    <span className="text-cyberBlue border-b border-cyberBlue/20">{note.size ? (note.size / 1024).toFixed(1) + ' KB' : 'DOCX'}</span>
                    <span className="w-1 h-1 bg-slate-800 rounded-full"></span>
                    <span>{note.createdAt ? new Date(note.createdAt).toLocaleDateString() : 'SECURED_DATA'}</span>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <a 
                    href={note.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 py-2 rounded-lg bg-[#020617] text-slate-300 text-[10px] tracking-widest font-black uppercase hover:bg-slate-800 flex items-center justify-center gap-2 border border-white/5 transition-all"
                  >
                    <BookOpen size={14} /> View
                  </a>
                  <a 
                    href={note.url} 
                    download
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-cyberCyan/10 text-cyberCyan hover:bg-cyberCyan hover:text-black transition-all border border-cyberCyan/20"
                    title="Download Note"
                  >
                    <Download size={16} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredNotes.length === 0 && (
        <div className="text-center py-20 bg-[#020617]/20 rounded-3xl border border-dashed border-white/10">
          <p className="text-slate-500 italic">No system logs found matching search criteria.</p>
        </div>
      )}
    </section>
  );
};

export default Notes;
