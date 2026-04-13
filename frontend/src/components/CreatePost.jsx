import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { ImagePlus, Send, Loader2 } from 'lucide-react';

const CreatePost = ({ onPostCreated }) => {
  const [caption, setCaption] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setError('');
  };

  const CLOUD_NAME = 'dnluqzdkq';
  const UPLOAD_PRESET = 'portfolio_upload';

  const uploadImage = async (file) => {
    const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    setUploading(true);

    try {
      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Cloudinary upload failed');
      }

      const data = await response.json();
      setUploading(false);
      return data.secure_url;
    } catch (err) {
      setUploading(false);
      throw err;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!caption.trim()) {
      setError('Caption is required to publish a post.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      let imageUrl = '';

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      await addDoc(collection(db, 'posts'), {
        caption: caption.trim(),
        imageUrl,
        createdAt: serverTimestamp(),
      });

      setCaption('');
      setImageFile(null);
      setImagePreview('');
      setSuccess('Post published successfully.');
      if (onPostCreated) onPostCreated();
      setTimeout(() => setSuccess(''), 4000);
    } catch (err) {
      console.error('Error creating post:', err);
      setError(err?.message || 'Unable to publish post. Please try again.');
      setTimeout(() => setError(''), 4000);
    } finally {
      setSubmitting(false);
      setUploading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl cyber-glass border border-white/10 bg-[#020617]/85 backdrop-blur-xl rounded-3xl p-5 shadow-[0_0_40px_rgba(0,212,255,0.10)]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-aiCyan/70 mb-2">Create Post</p>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Share something..."
            className="w-full min-h-[110px] resize-none rounded-3xl border border-white/10 bg-[#081426]/90 px-5 py-4 text-sm text-white placeholder:text-slate-500 outline-none transition-all focus:border-aiCyan/70 focus:ring-2 focus:ring-aiCyan/10"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_auto] items-center">
          <label className="flex items-center gap-3 rounded-3xl border border-white/10 bg-[#020617]/80 px-4 py-3 cursor-pointer transition-all hover:border-aiCyan/40 hover:bg-[#0a1b32]/90">
            <ImagePlus size={20} className="text-aiCyan" />
            <span className="text-sm text-slate-200">Upload image</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>

          <button
            type="submit"
            disabled={submitting || uploading || !caption.trim()}
            className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-aiCyan to-aiBlue px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black shadow-[0_0_25px_rgba(0,212,255,0.2)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(0,212,255,0.35)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting || uploading ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin text-slate-900" /> Posting...</>
            ) : (
              <><Send size={16} className="mr-2" /> Post</>
            )}
          </button>
        </div>

        {imagePreview && (
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#020617]/80">
            <img src={imagePreview} alt="Preview" className="h-48 w-full object-cover" />
          </div>
        )}

        {success && (
          <p className="text-sm text-emerald-300">{success}</p>
        )}

        {error && (
          <p className="text-sm text-rose-400">{error}</p>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
