import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import AdminAnalytics from './pages/AdminAnalytics';
import ProtectedRoute from './components/ProtectedRoute';
import ManageProjects from './pages/ManageProjects';
import ManageFiles from './pages/ManageFiles';
import ManageProfile from './pages/ManageProfile';
import ManageViews from './pages/ManageViews';
import ContactModal from './components/ContactModal';
import ImageUpload from './components/ImageUpload';
import VisitorCounter from './components/VisitorCounter';
import { AuthProvider } from './context/AuthContext';
import { useAnalytics } from './hooks/useAnalytics';
import AILoader from './components/AILoader';
import CustomCursor from './components/CustomCursor';
import AnimatedBackground from './components/AnimatedBackground';
import { AnimatePresence, motion } from 'framer-motion';


function AppContent() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [loading, setLoading] = useState(!sessionStorage.getItem('loader-shown'));
  const [lowMotion, setLowMotion] = useState(localStorage.getItem('low-motion') === 'true');
  const { incrementViews } = useAnalytics();

  // Track page views
  useEffect(() => {
    incrementViews();
  }, []);

  const toggleMotion = () => {
    const newVal = !lowMotion;
    setLowMotion(newVal);
    localStorage.setItem('low-motion', newVal.toString());
  };

  const handleLoadingComplete = () => {
    setLoading(false);
    sessionStorage.setItem('loader-shown', 'true');
  };

  return (
    <div className="relative min-h-screen text-textPrimary w-full overflow-hidden bg-primary">
      <AnimatePresence mode="wait">
        {loading && <AILoader onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      <CustomCursor />
      
      {/* Luxury Animated Background */}
      <AnimatedBackground />
      
      {/* Content layer */}
      <div className="relative z-10 w-full h-full">
        <Navbar onOpenContact={() => setIsContactOpen(true)} />
        <VisitorCounter />
        <Routes>
          <Route path="/" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              <Home onOpenContact={() => setIsContactOpen(true)} />
            </motion.div>
          } />
          <Route path="/login" element={
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <Login />
            </motion.div>
          } />
          <Route 
            path="/dashboard" 
            element={
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              >
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              </motion.div>
            } 
          />
          <Route 
            path="/dashboard/projects" 
            element={
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              >
                <ProtectedRoute>
                  <ManageProjects />
                </ProtectedRoute>
              </motion.div>
            } 
          />
          <Route 
            path="/dashboard/files" 
            element={
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              >
                <ProtectedRoute>
                  <ManageFiles />
                </ProtectedRoute>
              </motion.div>
            } 
          />
          <Route 
            path="/dashboard/profile" 
            element={
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              >
                <ProtectedRoute>
                  <ManageProfile />
                </ProtectedRoute>
              </motion.div>
            } 
          />
          <Route 
            path="/dashboard/views" 
            element={
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              >
                <ProtectedRoute>
                  <ManageViews />
                </ProtectedRoute>
              </motion.div>
            } 
          />
          <Route 
            path="/admin/analytics" 
            element={
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              >
                <ProtectedRoute>
                  <AdminAnalytics />
                </ProtectedRoute>
              </motion.div>
            } 
          />
          <Route path="*" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              <Home onOpenContact={() => setIsContactOpen(true)} />
            </motion.div>
          } />
        </Routes>
        
        <ContactModal 
          isOpen={isContactOpen} 
          onClose={() => setIsContactOpen(false)} 
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
