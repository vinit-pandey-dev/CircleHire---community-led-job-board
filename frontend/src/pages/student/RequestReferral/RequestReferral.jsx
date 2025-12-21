import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { referralService } from '../../../services/referralService';
import './RequestReferral.css';

const RequestReferral = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Matching your Controller's req.body fields
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    linkedIn: '',
    resumeUrl: '', // This should be a link (Google Drive/Portfolio)
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await referralService.createReferral(formData);
      alert('Referral Request Sent Successfully!');
      navigate('/student/dashboard');
    } catch (error) {
      console.error(error);
      alert('Failed to send request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="referral-container">
      <div className="referral-card">
        <h2 className="title">Request a Referral</h2>
        <p className="subtitle">Ask professionals to refer you for a job.</p>

        <form onSubmit={handleSubmit}>
          
          <div className="form-row">
            <div className="form-group">
              <label>Target Company</label>
              <input 
                type="text" name="company" required 
                placeholder="e.g. Microsoft"
                value={formData.company} onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Job Role</label>
              <input 
                type="text" name="role" required 
                placeholder="e.g. SDE II"
                value={formData.role} onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>LinkedIn Profile URL</label>
            <input 
              type="url" name="linkedIn" required 
              placeholder="https://linkedin.com/in/yourprofile"
              value={formData.linkedIn} onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Resume Link (Drive/Docs)</label>
            <input 
              type="url" name="resumeUrl" required 
              placeholder="https://docs.google.com/..."
              value={formData.resumeUrl} onChange={handleChange}
            />
            <small>Make sure the link is publicly accessible.</small>
          </div>

          <div className="form-group">
            <label>Message to Professional</label>
            <textarea 
              name="message" rows="4" required 
              placeholder="Hi, I saw an opening at your company..."
              value={formData.message} onChange={handleChange}
            ></textarea>
          </div>

          <div className="actions">
            <button type="button" className="btn-cancel" onClick={() => navigate(-1)}>Cancel</button>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestReferral;