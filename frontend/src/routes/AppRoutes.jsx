import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// --- 1. IMPORT ALL PAGES ---

// Auth & Public
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Home from '../pages/Home';

// Professional Pages
import ProfessionalDashboard from '../pages/professional/ProfessionalDashboard.jsx'; // Check filename (Dashboard.jsx or ProfessionalDashboard.jsx)
import PostJob from '../pages/professional/PostJob';
import ManageReferrals from '../pages/professional/ManageReferrals'; // 👈 Added

// Student Pages
import StudentDashboard from '../pages/student/StudentDashboard/StudentDashboard.jsx'; // Check filename
import ApplyJob from '../pages/student/ApplyJob/ApplyJob.jsx'; // 👈 Added
import RequestReferral from '../pages/student/RequestReferral/RequestReferral.jsx'; // 👈 Added

// Shared Pages
import Profile from '../pages/shared/Profile'; // 👈 Added

// --- 2. DEFINE PROTECTED ROUTE COMPONENT ---
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-4">Loading...</div>;

  // Not logged in? Go to Login
  if (!user) return <Navigate to="/login" replace />;

  // Wrong Role? Go to their specific dashboard
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return user.role === 'professional' 
      ? <Navigate to="/professional/dashboard" replace />
      : <Navigate to="/student/dashboard" replace />;
  }

  return children;
};

// --- 3. DEFINE APP ROUTES ---
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 👨‍💻 PROFESSIONAL ROUTES */}
      <Route 
        path="/professional/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['professional', 'recruiter']}>
            <ProfessionalDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/professional/post-job" 
        element={
          <ProtectedRoute allowedRoles={['professional', 'recruiter']}>
            <PostJob />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/professional/referrals" 
        element={
          <ProtectedRoute allowedRoles={['professional', 'recruiter']}>
            <ManageReferrals />
          </ProtectedRoute>
        } 
      />

      {/* 🎓 STUDENT ROUTES */}
      <Route 
        path="/student/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/student/apply/:jobId" 
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <ApplyJob />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/student/request-referral" 
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <RequestReferral />
          </ProtectedRoute>
        } 
      />

      {/* 👤 SHARED ROUTES */}
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute allowedRoles={['student', 'professional', 'recruiter']}>
            <Profile />
          </ProtectedRoute>
        } 
      />

      {/* 404 Catch All */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;