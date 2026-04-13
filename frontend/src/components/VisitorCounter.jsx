import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAnalytics } from '../hooks/useAnalytics';
import { Eye } from 'lucide-react';

const VisitorCounter = () => {
  const { analyticsData, getAnalyticsSummary } = useAnalytics();
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    const unsubscribe = getAnalyticsSummary();
    return () => unsubscribe?.();
  }, []);

  // Animate count change
  useEffect(() => {
    if (analyticsData?.totalViews) {
      const interval = setInterval(() => {
        setDisplayCount(prev => {
          if (prev < analyticsData.totalViews) return prev + 1;
          return prev;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [analyticsData?.totalViews]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 right-6 z-40 px-4 py-3 bg-gradient-to-r from-aiCyan/20 to-aiBlue/20 border border-aiCyan/30 rounded-full backdrop-blur-md shadow-lg"
    >
      <div className="flex items-center gap-3">
        <Eye size={18} className="text-aiCyan animate-pulse" />
        <span className="text-sm font-semibold text-white">
          {displayCount.toLocaleString()} views
        </span>
      </div>
    </motion.div>
  );
};

export default VisitorCounter;
