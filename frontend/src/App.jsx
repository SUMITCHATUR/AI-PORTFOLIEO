import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ArchitectHome from './pages/ArchitectHome';
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
    <div className="min-h-screen text-white">
      <AnimatePresence>
        {loading && <AILoader onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      <Routes>
        <Route path="/" element={<ArchitectHome />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/projects" 
          element={
            <ProtectedRoute>
              <ManageProjects />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/files" 
          element={
            <ProtectedRoute>
              <ManageFiles />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/profile" 
          element={
            <ProtectedRoute>
              <ManageProfile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/views" 
          element={
            <ProtectedRoute>
              <ManageViews />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/analytics" 
          element={
            <ProtectedRoute>
              <AdminAnalytics />
            </ProtectedRoute>
          } 
          />
        <Route path="*" element={<ArchitectHome />} />
      </Routes>
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
