import { useEffect, useState } from 'react';
import { 
  doc, 
  updateDoc, 
  getDoc, 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  getDocs 
} from 'firebase/firestore';
import { db } from '../firebase/config';

export const useAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Increment total views count
  const incrementViews = async () => {
    try {
      const analyticsRef = doc(db, 'analytics', 'summary');
      const analyticsDoc = await getDoc(analyticsRef);
      
      if (analyticsDoc.exists()) {
        await updateDoc(analyticsRef, {
          totalViews: (analyticsDoc.data().totalViews || 0) + 1,
          lastUpdated: new Date()
        });
      } else {
        // First time - create the document
        await updateDoc(analyticsRef, {
          totalViews: 1,
          totalVisitors: 0,
          lastUpdated: new Date()
        }).catch(() => {
          // If update fails, it means doc doesn't exist
          addDoc(collection(db, 'analytics'), {
            id: 'summary',
            totalViews: 1,
            totalVisitors: 0,
            lastUpdated: new Date()
          });
        });
      }
    } catch (err) {
      console.error('Error incrementing views:', err);
    }
  };

  // Track authenticated user visit
  const trackUserVisit = async (userData) => {
    try {
      if (!userData?.email) return;

      await addDoc(collection(db, 'visitors'), {
        name: userData.name,
        email: userData.email,
        displayName: userData.displayName,
        photoURL: userData.photoURL,
        visitTime: new Date(),
        uid: userData.uid
      });

      // Also increment total visitors count
      const analyticsRef = doc(db, 'analytics', 'summary');
      const analyticsDoc = await getDoc(analyticsRef);
      if (analyticsDoc.exists()) {
        await updateDoc(analyticsRef, {
          totalVisitors: (analyticsDoc.data().totalVisitors || 0) + 1
        });
      }
    } catch (err) {
      console.error('Error tracking user visit:', err);
    }
  };

  // Get analytics summary
  const getAnalyticsSummary = (callback) => {
    try {
      const analyticsRef = doc(db, 'analytics', 'summary');
      const unsubscribe = onSnapshot(analyticsRef, (doc) => {
        if (doc.exists()) {
          setAnalyticsData(doc.data());
        }
        setLoading(false);
      });
      return unsubscribe;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Get all visitors (for admin)
  const getAllVisitors = (callback) => {
    try {
      const visitorsRef = collection(db, 'visitors');
      const q = query(visitorsRef, orderBy('visitTime', 'desc'));
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const visitorsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setVisitors(visitorsData);
        setLoading(false);
      });
      return unsubscribe;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Format relative time
  const formatRelativeTime = (timestamp) => {
    if (!timestamp?.toDate) return 'Just now';
    const date = timestamp.toDate();
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return {
    analyticsData,
    visitors,
    loading,
    error,
    incrementViews,
    trackUserVisit,
    getAnalyticsSummary,
    getAllVisitors,
    formatRelativeTime
  };
};
