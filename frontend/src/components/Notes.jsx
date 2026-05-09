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
    <section id="notes" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <motion.div
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-2">
              Security Logs
            </h2>
            <p className="text-gray-400 text-sm">System documentation and resources</p>
          </motion.div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search logs..." 
              className="w-full bg-gray-800 border border-gray-600 rounded-sm py-3 pl-12 pr-6 text-white focus:border-gray-400 outline-none transition-all text-sm"
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
              className="group bg-gray-900 p-5 rounded-lg border border-gray-800 hover:border-gray-600 transition-colors"
            >
              <div className="flex items-start gap-4 h-full">
                <div className="p-3 rounded-sm bg-gray-800 flex items-center justify-center text-white">
                  <FileText size={20} />
                </div>
                
                <div className="flex-1 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-white text-sm" title={note.originalName}>
                        {note.originalName.split('.')[0]}
                      </h3>
                      <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span>{note.size ? (note.size / 1024).toFixed(1) + ' KB' : 'DOC'}</span>
                      <span>{note.createdAt ? new Date(note.createdAt).toLocaleDateString() : 'Document'}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <a 
                      href={note.url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex-1 py-2 rounded-lg bg-gray-800 text-gray-300 text-sm hover:bg-gray-700 flex items-center justify-center gap-2 transition-colors"
                    >
                      <BookOpen size={14} /> View
                    </a>
                    <a 
                      href={note.url} 
                      download
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
                      title="Download Note"
                    >
                      <Download size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredNotes.length === 0 && (
          <div className="text-center py-20 bg-gray-900 rounded-lg p-8 text-gray-400 border border-gray-800">
            <p className="text-lg">No logs found matching search criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Notes;
