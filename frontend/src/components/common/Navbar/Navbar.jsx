import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          CircleHire
        </Link>

        {/* Navigation Links */}
        <ul className="nav-menu">
          
          {/* 1. PUBLIC (Not Logged In) */}
          {!user && (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link btn-signup">Get Started</Link>
              </li>
            </>
          )}

          {/* 2. LOGGED IN USERS (Common Links) */}
          {user && (
            <>
              {/* Role Specific Links */}
              {user.role === 'student' ? (
                <>
                  <li className="nav-item">
                    <Link to="/student/dashboard" className="nav-link">Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/student/request-referral" className="nav-link">Referrals</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/professional/dashboard" className="nav-link">Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/professional/post-job" className="nav-link">Post Job</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/professional/referrals" className="nav-link">Manage Referrals</Link>
                  </li>
                </>
              )}

              {/* Shared Links */}
              <li className="nav-item">
                <Link to="/profile" className="nav-link">Profile</Link>
              </li>
              
              <li className="nav-item">
                <button onClick={handleLogout} className="btn-logout">
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;