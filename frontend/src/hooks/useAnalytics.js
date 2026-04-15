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
  limit,
  getDocs
} from 'firebase/firestore';
import { db } from '../firebase/config';

const COUNTER_API_URL = 'https://api.countapi.xyz';
const COUNTER_NAMESPACE = 'sumitjain-portfolio';
const COUNTER_KEY = 'total-views';

export const useAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Increment total views count
  const incrementViews = async () => {
    let remoteCount = null;
    try {
      const analyticsRef = doc(db, 'analytics', 'summary');
      const now = serverTimestamp();
      
      // Create unique device identifier based on browser fingerprint
      const deviceKey = 'portfolio-device-visited';
      let deviceFingerprint = localStorage.getItem(deviceKey);
      
      if (!deviceFingerprint) {
        // Generate unique fingerprint for this device
        deviceFingerprint = (typeof crypto !== 'undefined' && crypto.randomUUID)
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}-${navigator.userAgent.slice(0, 50)}`;
        localStorage.setItem(deviceKey, deviceFingerprint);
      }
      
      // Check if this device has already visited today
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
      const dailyVisitKey = `portfolio-daily-visit-${deviceFingerprint}-${today}`;
      const hasVisitedToday = localStorage.getItem(dailyVisitKey);
      
      if (!hasVisitedToday) {
        // First visit today from this device - increment views
        await setDoc(analyticsRef, {
          totalViews: increment(1),
          totalVisitors: increment(1),
          lastUpdated: now
        }, { merge: true });
        
        // Mark this device as visited today
        localStorage.setItem(dailyVisitKey, 'true');
        
        // Log the unique visit
        await addDoc(collection(db, 'pageViews'), {
          deviceFingerprint,
          path: window.location.pathname || '/',
          userAgent: navigator.userAgent || '',
          isNewVisitor: true,
          visitDate: today,
          createdAt: now
        });
      } else {
        // Already visited today - don't increment views, just log the activity
        await addDoc(collection(db, 'pageViews'), {
          deviceFingerprint,
          path: window.location.pathname || '/',
          userAgent: navigator.userAgent || '',
          isNewVisitor: false,
          visitDate: today,
          createdAt: now
        });
      }
    } catch (err) {
      console.error('Error incrementing views:', err);
    }

    // Guaranteed public counter fallback (works even without Firebase write permissions).
    try {
      const response = await fetch(
        `${COUNTER_API_URL}/hit/${COUNTER_NAMESPACE}/${COUNTER_KEY}`
      );
      const data = await response.json();
      if (typeof data?.value === 'number') {
        remoteCount = data.value;
      }
    } catch (err) {
      console.error('CountAPI increment failed:', err);
    }

    if (typeof remoteCount === 'number') {
      setAnalyticsData((prev) => ({
        ...(prev || {}),
        totalViews: Math.max(remoteCount, prev?.totalViews || 0)
      }));
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

  // Get today's views count
  const getTodayViewsCount = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const viewsRef = collection(db, 'pageViews');
      const q = query(viewsRef, where('visitDate', '==', today), where('isNewVisitor', '==', true));
      const snapshot = await getDocs(q);
      return snapshot.size;
    } catch (err) {
      console.error('Error getting today views count:', err);
      return 0;
    }
  };

  // Get unique visitor count from pageViews collection
  const getUniqueVisitorCount = async () => {
    try {
      const viewsRef = collection(db, 'pageViews');
      const q = query(viewsRef, where('isNewVisitor', '==', true));
      const snapshot = await getDocs(q);
      return snapshot.size;
    } catch (err) {
      console.error('Error getting unique visitor count:', err);
      return 0;
    }
  };

  // Get analytics summary
  const getAnalyticsSummary = () => {
    try {
      const analyticsRef = doc(db, 'analytics', 'summary');
      const unsubscribe = onSnapshot(analyticsRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          // Get both unique visitor count and today's views
          Promise.all([
            getUniqueVisitorCount(),
            getTodayViewsCount()
          ]).then(([uniqueCount, todayCount]) => {
            setAnalyticsData({
              ...data,
              uniqueVisitors: uniqueCount || data.totalVisitors || 0,
              todayViews: todayCount || 0
            });
          });
        } else {
          setAnalyticsData({ totalViews: 0, totalVisitors: 0, uniqueVisitors: 0, todayViews: 0 });
        }
        setLoading(false);
      });

      // Also sync with CountAPI so public traffic is reflected on dashboard.
      const syncCountApi = async () => {
        try {
          const response = await fetch(
            `${COUNTER_API_URL}/get/${COUNTER_NAMESPACE}/${COUNTER_KEY}`
          );
          const data = await response.json();
          if (typeof data?.value === 'number') {
            setAnalyticsData((prev) => ({
              ...(prev || {}),
              totalViews: Math.max(data.value, prev?.totalViews || 0)
            }));
          }
        } catch (err) {
          console.error('CountAPI read failed:', err);
        }
      };

      syncCountApi();
      const pollId = window.setInterval(syncCountApi, 15000);

      return () => {
        unsubscribe?.();
        window.clearInterval(pollId);
      };
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
    getTodayViewsCount,
    formatRelativeTime
  };
};
