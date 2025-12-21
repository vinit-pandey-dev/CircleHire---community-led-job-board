import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-container">
      {/* Navbar Overlay */}
      {/* <nav className="home-nav">
        <h1 className="logo">JobPortal</h1>
        <div className="nav-links">
          {user ? (
            // If logged in, show Dashboard link
            <Link 
              to={user.role === 'professional' ? '/professional/dashboard' : '/student/dashboard'} 
              className="btn-nav"
            >
              Go to Dashboard
            </Link>
          ) : (
            // If not logged in, show Login/Register
            <>
              <Link to="/login" className="link-text">Login</Link>
              <Link to="/register" className="btn-nav">Get Started</Link>
            </>
          )}
        </div>
      </nav> */}

      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Find Your Dream Job <br /> or The Perfect Candidate</h1>
          <p>
            Connect directly with professionals, ask for referrals, 
            and land your next opportunity with the power of networking.
          </p>
          
          <div className="hero-buttons">
            {!user && (
              <>
                <Link to="/register" className="btn-hero primary">I'm a Student</Link>
                <Link to="/register" className="btn-hero secondary">I'm a Recruiter</Link>
              </>
            )}
            {user && (
               <Link 
               to={user.role === 'professional' ? '/professional/dashboard' : '/student/dashboard'} 
               className="btn-hero primary"
             >
               Go to Dashboard
             </Link>
            )}
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <div className="icon">🚀</div>
          <h3>Easy Applications</h3>
          <p>Apply to top companies with a simple drag-and-drop resume upload.</p>
        </div>
        <div className="feature-card">
          <div className="icon">🤝</div>
          <h3>Direct Referrals</h3>
          <p>Don't just apply—get referred. Request referrals directly from professionals.</p>
        </div>
        <div className="feature-card">
          <div className="icon">💼</div>
          <h3>For Recruiters</h3>
          <p>Post jobs, manage applications, and find the best talent efficiently.</p>
        </div>
      </section>

      <footer className="home-footer">
        <p>© 2025 JobPortal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;