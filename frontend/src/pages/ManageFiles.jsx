import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { db } from '../firebase/config';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

const ManageFiles = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState('general');

  const fetchFiles = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'files'));
      const filesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFiles(filesData);
    } catch (err) {
      console.error('Error fetching files:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return alert('Please select a file first.');

    setUploading(true);
    try {
      // 1. Upload to Cloudinary (using 'auto' to support PDF/Docs)
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('upload_preset', 'portfolio_upload');

      const response = await fetch(`https://api.cloudinary.com/v1_1/dnluqzdkq/auto/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Cloudinary detailed error:', errorData);
        throw new Error(errorData.error?.message || 'Cloudinary upload failed');
      }

      const data = await response.json();
      const downloadURL = data.secure_url;

      // 2. Save metadata to Firestore
      await addDoc(collection(db, 'files'), {
        originalName: selectedFile.name,
        url: downloadURL,
        publicId: data.public_id,
        category,
        size: selectedFile.size,
        createdAt: new Date().toISOString()
      });
      
      setSelectedFile(null);
      setCategory('general');
      document.getElementById('fileInput').value = '';
      alert('File Uploaded Successfully! 🎉 (via Cloudinary)');
      fetchFiles();
    } catch (error) {
      console.error('Upload Error:', error);
      alert('Upload fail ho gaya! Check karein ki aapka internet sahi hai ya nahi. Error: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (file) => {
    if (!window.confirm('Confirm deletion of this file?')) return;
    try {
      // Delete from Firestore only (Cloudinary delete requires backend signature)
      await deleteDoc(doc(db, 'files', file.id));
      alert('File removed from Portfolio.');
      fetchFiles();
    } catch (error) {
      console.error('Delete Error:', error);
      alert('Delete failed');
    }
  };

  const formatSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024, sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen pt-32 px-6 container mx-auto text-slate-100 pb-12">
      <Link to="/dashboard" className="text-cyberCyan hover:text-white mb-6 inline-block transition-colors font-mono font-bold text-xs uppercase tracking-widest">&larr; DB_RETURN</Link>
      <h1 className="text-3xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyberCyan to-cyberBlue uppercase tracking-[0.2em] cyber-text-glow">
        SYSTEM_DATA: REQUISITION
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="cyber-glass p-6 rounded-2xl lg:col-span-1 h-fit"
        >
          <h2 className="text-xl font-black mb-6 text-white uppercase tracking-tighter border-b border-white/5 pb-2">DATA_INGESTION</h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="block text-[10px] text-slate-400 mb-2 ml-1 uppercase tracking-widest font-black">SELECT_PACKET</label>
              <input 
                id="fileInput"
                type="file" 
                className="w-full bg-[#020617] border border-white/10 rounded-sm p-3 text-xs font-mono focus:border-cyberCyan outline-none text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-[10px] file:font-black file:bg-cyberCyan file:text-black hover:file:opacity-80" 
                onChange={e => setSelectedFile(e.target.files[0])} 
              />
            </div>

            <div>
              <label className="block text-[10px] text-slate-400 mb-2 ml-1 uppercase tracking-widest font-black">CLASSIFICATION</label>
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#020617] border border-white/10 rounded-sm p-4 text-xs font-mono focus:border-cyberCyan outline-none text-white appearance-none cursor-pointer uppercase tracking-widest"
              >
                <option value="general">GENERAL_DATA</option>
                <option value="certificate">VALID_CERT</option>
                <option value="achievement">MILESTONE_LOG</option>
                <option value="notes">SYSTEM_NOTES</option>
              </select>
            </div>
            
            <button type="submit" disabled={uploading || !selectedFile} className="w-full bg-cyberCyan text-black font-black py-4 rounded-sm shadow-[0_0_20px_rgba(0,243,255,0.4)] hover:shadow-[0_0_35px_rgba(0,243,255,0.8)] transition-all disabled:opacity-50 disabled:shadow-none text-xs tracking-[0.2em] uppercase">
              {uploading ? 'UPLOADING_DATA...' : 'EXECUTE_UPLINK'}
            </button>
          </form>
        </motion.div>

        {/* File List Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 space-y-4"
        >
          {loading ? <p>Loading files...</p> : files.length === 0 ? (
            <div className="glass-card text-center p-8 text-slate-400 border-dashed border-2 border-slate-700">No files uploaded yet.</div>
          ) : (
            files.map(file => (
              <div key={file.id} className="glass-card bg-slate-950/60 p-4 rounded-xl border border-slate-700/50 flex flex-col sm:flex-row gap-4 items-center justify-between group">
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-bold truncate" title={file.originalName}>{file.originalName}</h3>
                    <span className={`text-[10px] uppercase px-2 py-0.5 rounded-sm font-black border ${
                      file.category === 'certificate' ? 'bg-cyberCyan/10 border-cyberCyan/30 text-cyberCyan' : 
                      file.category === 'achievement' ? 'bg-cyberBlue/10 border-cyberBlue/30 text-cyberBlue' : 
                      'bg-slate-800 border-slate-700 text-slate-400'
                    }`}>
                      {file.category}
                    </span>
                  </div>
                  <div className="flex gap-4 text-xs text-slate-400 mt-1">
                    <span>{formatSize(file.size)}</span>
                    <span>{file.createdAt ? new Date(file.createdAt).toLocaleDateString() : 'N/A'}</span>
                  </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <a href={file.url} target="_blank" rel="noreferrer" className="flex-1 sm:flex-none text-center px-4 py-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white rounded transition-colors text-sm font-semibold border border-blue-500/30">
                    View
                  </a>
                  <button onClick={() => handleDelete(file)} className="flex-1 sm:flex-none px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded transition-colors text-sm font-semibold border border-red-500/30">
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ManageFiles;
