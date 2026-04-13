import React, { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/config';
import PostCard from './PostCard';

const ADMIN_EMAIL = 'admin@yourdomain.com';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const isAdmin = user?.email === ADMIN_EMAIL;

  useEffect(() => {
    const postsQuery = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      const postList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPosts(postList);
      setLoading(false);
    }, (snapshotError) => {
      console.error('Feed fetch error:', snapshotError);
      setError('Unable to load feed.');
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleDelete = async (postId) => {
    if (!isAdmin) return;
    try {
      await deleteDoc(doc(db, 'posts', postId));
    } catch (err) {
      console.error('Delete post error:', err);
      setError('Failed to delete post.');
    }
  };

  return (
    <section className="container mx-auto px-6 py-12">
      <div className="mb-10 flex flex-col gap-3 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-aiCyan/70">Developer Feed</p>
        <h2 className="text-3xl font-black text-white sm:text-4xl">Share progress, wins, and updates</h2>
        <p className="mx-auto max-w-2xl text-sm text-slate-400">A modern, dark social feed for your portfolio that keeps your audience informed with polished cards and smooth motion.</p>
      </div>

      <div className="mt-10">
        {loading && <p className="text-sm text-slate-500">Loading posts...</p>}
        {error && <p className="text-sm text-rose-400">{error}</p>}
        {!loading && posts.length === 0 && (
          <div className="cyber-glass rounded-3xl border border-white/10 bg-[#020617]/80 p-8 text-center text-slate-400">
            No posts yet. Create the first update to show progress on your portfolio.
          </div>
        )}

        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
          {posts.map((post) => (
            <div key={post.id} className="flex-shrink-0 w-[350px] snap-center">
              <PostCard
                post={post}
                canDelete={isAdmin}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feed;
