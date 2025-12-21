import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/authService';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    bio: '',            // New Field
    linkedIn: '',       // New Field
    techStack: '',      // New Field (Crucial for your backend crash)
    college: '',        // New Field
    graduationYear: ''  // New Field
  });

  const [resume, setResume] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = new FormData();
      // Append all text fields
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });
      
      // Append resume if exists
      if (resume) {
        data.append('resume', resume);
      }

      await authService.register(data);
      
      alert('Registration successful! Please login.');
      navigate('/login');

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.response?.data?.msg || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card" style={{ maxWidth: '600px' }}> {/* Made wider for more fields */}
        <h2 className="register-title">Create an Account</h2>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          
          {/* Row 1: Name & Email */}
          <div className="form-row">
            <div className="form-group half">
              <label className="form-label">Full Name</label>
              <input type="text" name="name" required className="form-input" onChange={handleChange} />
            </div>
            <div className="form-group half">
              <label className="form-label">Email Address</label>
              <input type="email" name="email" required className="form-input" onChange={handleChange} />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" name="password" required className="form-input" onChange={handleChange} />
          </div>

          {/* Role */}
          <div className="form-group">
            <label className="form-label">I am a...</label>
            <select name="role" className="form-input" onChange={handleChange} value={formData.role}>
              <option value="student">Student</option>
              <option value="professional">Professional / Recruiter</option>
            </select>
          </div>

          {/* --- EXTRA FIELDS REQUIRED BY BACKEND --- */}
          
          <div className="form-group">
             <label className="form-label">Bio / Summary</label>
             <textarea name="bio" rows="2" className="form-input" placeholder="Tell us about yourself..." onChange={handleChange}></textarea>
          </div>

          <div className="form-group">
            <label className="form-label">Tech Stack (Comma separated)</label>
            <input 
              type="text" 
              name="techStack" 
              className="form-input" 
              placeholder="e.g. React, Node.js, Python" // Backend splits this by comma
              required={formData.role === 'student'} // Required for students
              onChange={handleChange} 
            />
          </div>

          <div className="form-group">
             <label className="form-label">LinkedIn URL</label>
             <input type="url" name="linkedIn" className="form-input" placeholder="https://linkedin.com/in/..." onChange={handleChange} />
          </div>

          {/* Student Specific Fields */}
          {formData.role === 'student' && (
            <>
              <div className="form-row">
                <div className="form-group half">
                  <label className="form-label">College / University</label>
                  <input type="text" name="college" className="form-input" onChange={handleChange} />
                </div>
                <div className="form-group half">
                  <label className="form-label">Graduation Year</label>
                  <input type="number" name="graduationYear" className="form-input" placeholder="2025" onChange={handleChange} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Upload Resume (PDF/Doc)</label>
                <input type="file" name="resume" accept=".pdf,.doc,.docx" className="form-input file-input" onChange={handleFileChange} />
              </div>
            </>
          )}

          <button type="submit" disabled={loading} className="btn-register">
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="register-footer">
          <p>Already have an account? <Link to="/login" className="link-login">Login here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;