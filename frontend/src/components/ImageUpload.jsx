import React, { useState } from 'react';
import { Upload, X, CheckCircle, Image as ImageIcon, Loader2 } from 'lucide-react';

/**
 * ImageUpload Component
 * Reusable component for Cloudinary uploads.
 * @param {Function} onUpload - Callback that receives the secure_url after upload.
 */
const ImageUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [error, setError] = useState('');

  const CLOUD_NAME = 'dnluqzdkq';
  const UPLOAD_PRESET = 'portfolio_upload';
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setError('');
      setUploadedUrl(''); 
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select an image first');
      return;
    }

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
      // 1. Upload to Cloudinary
      const response = await fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Cloudinary upload failed');

      const data = await response.json();
      const imageUrl = data.secure_url;
      
      setUploadedUrl(imageUrl);
      
      // 2. Execute callback for parent component
      if (onUpload) {
        onUpload(imageUrl);
      }
      
    } catch (err) {
      console.error('Upload Process Error:', err);
      setError('Failed to complete upload process. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const clearSelection = () => {
    setFile(null);
    setPreview(null);
    setUploadedUrl('');
    setError('');
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4 p-6 cyber-glass bg-[#020617]/80 border border-white/5 rounded-2xl backdrop-blur-xl shadow-2xl relative z-50">
      <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2 uppercase tracking-widest">
        <ImageIcon size={20} className="text-cyberCyan" />
        SYSTEM_DATA_UPLOAD
      </h2>

      <div className="flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-xl p-4 transition-all hover:border-cyberCyan/50 min-h-[220px] relative bg-[#020617]/40">
        {!preview ? (
          <label className="flex flex-col items-center cursor-pointer group">
            <div className="p-5 bg-[#020617] rounded-sm text-slate-500 mb-3 group-hover:scale-110 group-hover:bg-cyberCyan/10 group-hover:text-cyberCyan transition-all border border-white/5 group-hover:border-cyberCyan/20">
              <Upload size={28} />
            </div>
            <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">INITIALIZE_FILE_TRANSFER</span>
            <p className="text-[10px] text-cyberCyan/40 mt-1 uppercase tracking-tighter">SPEC: PNG_JPG_WEBP</p>
            <input 
              type="file" 
              className="hidden" 
              accept="image/*"
              onChange={handleFileChange} 
            />
          </label>
        ) : (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-800 shadow-inner">
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            {!uploading && !uploadedUrl && (
              <button 
                onClick={clearSelection}
                className="absolute top-3 right-3 p-1.5 bg-black/60 text-white rounded-full hover:bg-red-500 transition-colors shadow-lg"
              >
                <X size={16} />
              </button>
            )}
            
            {uploading && (
              <div className="absolute inset-0 bg-[#020617]/80 flex flex-col items-center justify-center text-white backdrop-blur-sm">
                <Loader2 className="animate-spin mb-3 text-cyberCyan" size={32} />
                <span className="text-[10px] font-black tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-cyberCyan to-cyberBlue uppercase">ENCRYPTING_DATA...</span>
              </div>
            )}

            {uploadedUrl && (
              <div className="absolute inset-0 bg-green-500/20 backdrop-blur-[4px] flex flex-col items-center justify-center text-white">
                <div className="p-3 bg-green-500 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.6)] animate-bounce">
                    <CheckCircle size={32} />
                </div>
                <span className="mt-4 bg-slate-950/80 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-green-500/30 shadow-lg">Done & Saved</span>
              </div>
            )}
          </div>
        )}
      </div>

      {error && (
        <motion.p initial={{opacity:0}} animate={{opacity:1}} className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 p-3 rounded-xl flex items-center gap-2">
          <X size={14} /> {error}
        </motion.p>
      )}

      <div className="flex gap-3 pt-2">
        {!uploadedUrl && preview && (
          <button 
            onClick={handleUpload}
            disabled={uploading}
            className="w-full bg-cyberCyan text-black font-black py-4 rounded-sm shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:shadow-[0_0_30px_rgba(0,243,255,0.6)] transition-all disabled:opacity-50 flex items-center justify-center gap-3 active:scale-95 uppercase tracking-widest text-[10px]"
          >
            {uploading ? 'TRANSFERRING...' : <><Upload size={20} /> EXECUTE_TRANSFER</>}
          </button>
        )}
        
        {uploadedUrl && (
          <button 
            onClick={clearSelection}
            className="w-full bg-slate-800 text-slate-300 font-bold py-4 rounded-xl hover:bg-slate-700 transition-all border border-slate-700"
          >
            UPLOAD ANOTHER
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
