import React from 'react';
import { Heart, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <motion.article 
      className="premium-card group relative w-full overflow-hidden rounded-2xl p-6 flex flex-col h-full cinematic-light"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      {/* Premium border glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="mb-4">
          <p className="text-xs font-bold uppercase tracking-wider text-accent font-display">Sumit Jain</p>
          <p className="text-xs text-textSecondary mt-1 font-body">{formatRelativeTime(post.createdAt)}</p>
        </div>
        
        <div className="mt-6 flex-1">
          <p className="text-sm leading-7 text-textPrimary font-body whitespace-pre-wrap break-words">{post.caption?.replace(/\\n/g, '\n')}</p>
        </div>

        {post.imageUrl && (
          <div className="mt-6 overflow-hidden rounded-xl border border-cardBorder bg-secondary/50">
            <div className="relative group/image">
              <img 
                src={post.imageUrl} 
                alt="post" 
                className="w-full h-auto max-h-80 object-contain transition-transform duration-700 group-hover/image:scale-105" 
              />
              {/* Subtle overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-accent/10 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        )}
      </div>
    </motion.article>
  );
};

export default PostCard;
