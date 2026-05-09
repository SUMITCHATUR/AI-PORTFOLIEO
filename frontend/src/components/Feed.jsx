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
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Updates
          <div className="h-1 bg-white w-20 mx-auto mt-4"></div>
        </h2>

        <div className="space-y-8">
          {loading && <p className="text-sm text-gray-400 text-center">Loading posts...</p>}
          {error && <p className="text-sm text-red-400 text-center">{error}</p>}
          {!loading && posts.length === 0 && (
            <div className="bg-gray-900 rounded-lg p-8 text-center text-gray-400 border border-gray-800">
              No posts yet. Create the first update to show progress on your portfolio.
            </div>
          )}

          {posts.map((post) => (
            <div key={post.id} className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-gray-600 transition-colors">
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
