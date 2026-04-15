import React from 'react';
import { Heart, Trash2 } from 'lucide-react';

const formatRelativeTime = (timestamp) => {
  if (!timestamp?.toDate) return 'Just now';
  const date = timestamp.toDate();
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds} sec ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? '' : 's'} ago`;
};

const PostCard = ({ post, canDelete, onDelete }) => {
  return (
    <article className="group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#061226]/90 p-4 shadow-[0_0_18px_rgba(0,0,0,0.22)] transition-transform duration-300 hover:-translate-y-0.5 hover:border-aiCyan/30 hover:shadow-[0_0_25px_rgba(0,212,255,0.18)] flex flex-col h-full">
      <div className="mb-3">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-aiCyan">Sumit Jain</p>
        <p className="text-xs text-slate-500 mt-1">{formatRelativeTime(post.createdAt)}</p>
      </div>
      <div className="mt-4 flex-1">
        <p className="text-sm leading-6 text-slate-200 whitespace-pre-wrap break-words">{post.caption?.replace(/\\n/g, '\n')}</p>
      </div>

      {post.imageUrl && (
        <div className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-[#020617]/80">
          <img src={post.imageUrl} alt="post" className="w-full h-auto max-h-96 object-contain" />
        </div>
      )}
    </article>
  );
};

export default PostCard;
