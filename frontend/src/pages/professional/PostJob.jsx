import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobService } from '../../services/jobService';
import './PostJob.css';

const PostJob = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Updated state to match your job.controller.js
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    jobType: 'fulltime', // Default to lowercase to match your backend map
    description: '',
    applyLink: '',       // New field
    tags: '',           // New field (comma separated)
    referralAvailable: true, // New field (Boolean)
    referralContact: '' // Optional contact info
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Prepare data (Convert tags string to array if backend expects array, or keep string)
      // Based on your controller, it looks like it accepts it as is.
      // We will trim the tags just in case.
      const payload = {
        ...formData,
        // Ensure jobType matches one of your map keys: "fulltime", "internship", etc.
      };

      // 2. Send to Backend
      await jobService.postJob(payload);
      
      alert('Job Posted Successfully!');
      navigate('/professional/dashboard');
    } catch (err) {
      console.error(err);
      setError('Failed to post job. Please ensure all fields are correct.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-job-container">
      <div className="form-card">
        <div className="form-header">
          <h2>Post a New Job</h2>
          <p>Share a new opportunity and accept referrals.</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          
          {/* Row 1: Basic Info */}
          <div className="form-row">
            <div className="form-group">
              <label>Job Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g. SDE I" />
            </div>
            <div className="form-group">
              <label>Company</label>
              <input type="text" name="company" value={formData.company} onChange={handleChange} required placeholder="e.g. Google" />
            </div>
          </div>

          {/* Row 2: Type & Location */}
          <div className="form-row">
            <div className="form-group">
              <label>Job Type</label>
              <select name="jobType" value={formData.jobType} onChange={handleChange}>
                {/* Values match your backend jobTypeMap keys */}
                <option value="fulltime">Full Time</option>
                <option value="internship">Internship</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
                <option value="onsite">Onsite</option>
              </select>
            </div>
            <div className="form-group">
              <label>Location</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} required placeholder="e.g. Bangalore" />
            </div>
          </div>

          {/* Row 3: Links & Tags */}
          <div className="form-group">
            <label>Application Link (External URL)</label>
            <input type="url" name="applyLink" value={formData.applyLink} onChange={handleChange} required placeholder="https://careers.google.com/..." />
          </div>

          <div className="form-group">
            <label>Tags (Comma separated)</label>
            <input type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="React, Node.js, Entry Level" />
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Job Description</label>
            <textarea name="description" rows="5" value={formData.description} onChange={handleChange} required></textarea>
          </div>

          {/* Referral Settings - Specific to your App */}
          <div className="referral-section">
            <label className="checkbox-container">
              <input 
                type="checkbox" 
                name="referralAvailable" 
                checked={formData.referralAvailable} 
                onChange={handleChange} 
              />
              <span className="checkmark"></span>
              Accept Referral Requests?
            </label>
            
            {formData.referralAvailable && (
              <div className="form-group mt-2">
                <label>Referral Contact / Note (Optional)</label>
                <input 
                  type="text" 
                  name="referralContact" 
                  value={formData.referralContact} 
                  onChange={handleChange} 
                  placeholder="e.g. DM me on LinkedIn after applying" 
                />
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Posting...' : 'Post Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;