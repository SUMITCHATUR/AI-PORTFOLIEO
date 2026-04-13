import React, { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/config';
import CreatePost from './CreatePost';
import { Trash2 } from 'lucide-react';

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

const ManagePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const postsQuery = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      const postList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPosts(postList);
      setLoading(false);
    }, (snapshotError) => {
      console.error('Fetch posts error:', snapshotError);
      setError('Unable to load posts.');
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleDelete = async (postId) => {
    if (!window.confirm('Delete this post?')) return;
    setDeletingId(postId);
    try {
      await deleteDoc(doc(db, 'posts', postId));
    } catch (err) {
      console.error('Delete error:', err);
      setError('Failed to delete post.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* Create Post Section */}
      <div>
        <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-[0.1em]">Create New Post</h3>
        <CreatePost onPostCreated={() => {}} />
      </div>

      {/* Posts Management Section */}
      <div>
        <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-[0.1em]">Your Posts</h3>

        {loading && <p className="text-slate-400">Loading posts...</p>}
        {error && <p className="text-rose-400">{error}</p>}

        {!loading && posts.length === 0 && (
          <div className="cyber-glass rounded-2xl border border-white/10 bg-[#020617]/80 p-8 text-center text-slate-400">
            No posts yet. Create your first post above.
          </div>
        )}

        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
          {posts.map((post) => (
            <div key={post.id} className="flex-shrink-0 w-[350px] snap-center">
              <div
                className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-[#061226]/90 p-5 shadow-[0_0_18px_rgba(0,0,0,0.22)] hover:border-aiCyan/30 transition-all flex flex-col"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-aiCyan">Sumit Jain</p>
                    <p className="text-xs text-slate-500 mt-1">{formatRelativeTime(post.createdAt)}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(post.id)}
                    disabled={deletingId === post.id}
                    className="inline-flex items-center gap-1 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs text-rose-300 transition-all hover:bg-rose-500/20 disabled:opacity-50 flex-shrink-0"
                  >
                    <Trash2 size={12} /> {deletingId === post.id ? 'Del...' : 'Del'}
                  </button>
                </div>

                <div className="mb-4 flex-1 min-h-0 overflow-hidden">
                  <p className="text-sm leading-5 text-slate-200 whitespace-pre-wrap break-words line-clamp-4">{post.caption?.replace(/\\n/g, '\n')}</p>
                </div>

                {post.imageUrl && (
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#020617]/80 mt-3">
                    <img src={post.imageUrl} alt="post" className="w-full h-32 object-cover" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManagePosts;
