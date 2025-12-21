import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { FiGrid, FiUsers, FiBriefcase, FiSend, FiUser, FiLogOut } from 'react-icons/fi';
import './Sidebar.css';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null; // Don't show sidebar if not logged in

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>CircleHire</h2>
      </div>

      <ul className="sidebar-links">
        {/* STUDENT LINKS */}
        {user.role === 'student' && (
          <>
            <li><NavLink to="/student/dashboard" className={({isActive})=> isActive ? 'active' : ''}><FiGrid className="icon" /> Dashboard</NavLink></li>
            <li><NavLink to="/student/request-referral" className={({isActive})=> isActive ? 'active' : ''}><FiUsers className="icon" /> Get Referral</NavLink></li>
          </>
        )}

        {/* PROFESSIONAL LINKS */}
        {(user.role === 'professional' || user.role === 'recruiter') && (
          <>
            <li><NavLink to="/professional/dashboard" className={({isActive})=> isActive ? 'active' : ''}><FiGrid className="icon" /> Dashboard</NavLink></li>
            <li><NavLink to="/professional/post-job" className={({isActive})=> isActive ? 'active' : ''}><FiBriefcase className="icon" /> Post Job</NavLink></li>
            <li><NavLink to="/professional/referrals" className={({isActive})=> isActive ? 'active' : ''}><FiSend className="icon" /> Referrals</NavLink></li>
          </>
        )}

        {/* SHARED LINKS */}
        <div className="divider"></div>
        <li><NavLink to="/profile" className={({isActive})=> isActive ? 'active' : ''}><FiUser className="icon" /> Profile</NavLink></li>
        <li><button onClick={handleLogout} className="logout-btn"><FiLogOut className="icon" /> Logout</button></li>
      </ul>
    </aside>
  );
};

export default Sidebar;