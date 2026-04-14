import { useState } from 'react';
import { 
  doc, 
  setDoc,
  increment,
  serverTimestamp,
  collection, 
  addDoc, 
  query, 
  where,
  orderBy, 
  onSnapshot,
  limit
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
      const now = serverTimestamp();
      const sessionKey = 'portfolio-analytics-session-id';
      let sessionId = sessionStorage.getItem(sessionKey);
      if (!sessionId) {
        sessionId = (typeof crypto !== 'undefined' && crypto.randomUUID)
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
        sessionStorage.setItem(sessionKey, sessionId);
      }

      // Atomic upsert so first write and all future writes work reliably.
      await setDoc(analyticsRef, {
        totalViews: increment(1),
        totalVisitors: increment(0),
        lastUpdated: now
      }, { merge: true });

      // Keep event-level logs for charting and time-based analytics.
      await addDoc(collection(db, 'pageViews'), {
        sessionId,
        path: window.location.pathname || '/',
        userAgent: navigator.userAgent || '',
        createdAt: now
      });
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
        visitTime: serverTimestamp(),
        uid: userData.uid
      });

      // Increment unique/auth visitors metric.
      const analyticsRef = doc(db, 'analytics', 'summary');
      await setDoc(analyticsRef, {
        totalVisitors: increment(1),
        lastUpdated: serverTimestamp()
      }, { merge: true });
    } catch (err) {
      console.error('Error tracking user visit:', err);
    }
  };

  // Get analytics summary
  const getAnalyticsSummary = () => {
    try {
      const analyticsRef = doc(db, 'analytics', 'summary');
      const unsubscribe = onSnapshot(analyticsRef, (snapshot) => {
        if (snapshot.exists()) {
          setAnalyticsData(snapshot.data());
        } else {
          setAnalyticsData({ totalViews: 0, totalVisitors: 0 });
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

  // Get recent page view events for analytics charts.
  const getRecentViews = (days = 30, callback) => {
    try {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - days);

      const q = query(
        collection(db, 'pageViews'),
        where('createdAt', '>=', cutoff),
        orderBy('createdAt', 'desc'),
        limit(2000)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const views = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data()
        }));
        callback?.(views);
      });
      return unsubscribe;
    } catch (err) {
      setError(err.message);
      return undefined;
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
    getRecentViews,
    formatRelativeTime
  };
};
