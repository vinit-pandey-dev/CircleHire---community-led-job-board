import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css'; // Import the CSS file here

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await login(formData);

      if (user.role === 'professional' || user.role === 'recruiter') {
        navigate('/professional/dashboard');
      } else {
        navigate('/student/dashboard');
      }

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Login failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          
          {/* Email */}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email" name="email" required
              className="form-input"
              placeholder="you@example.com"
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" name="password" required
              className="form-input"
              placeholder="••••••••"
              onChange={handleChange}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn-login"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account? <Link to="/register" className="link-register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;