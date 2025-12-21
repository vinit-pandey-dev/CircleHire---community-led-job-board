import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';
//import Navbar from '../../components/Navbar'; 
import './Profile.css';

const Profile = () => {
  const { user, login } = useAuth(); // We use login() to update local context after save
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',     // Assuming your User model has 'bio' or 'techStack'
    company: '', // Professional only
    role: '',    // Read-only
  });

  // Load user data into form
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || user.techStack || '', // Adjust based on your DB field
        company: user.company || '',
        role: user.role || 'student'
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // API Call to update profile
      const res = await authService.updateProfile(formData);
      
      // Update local storage/context so header updates immediately
      // This is a hacky way; ideally context has an update function
      localStorage.setItem('user', JSON.stringify(res.data));
      window.location.reload(); // Simple reload to reflect changes
      
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="loading">Loading Profile...</div>;

  return (
    <div className="profile-page">
      {/* <Navbar /> */}
      <div className="profile-container">
        
        {/* Profile Header Card */}
        <div className="profile-header">
          <div className="avatar-circle">
            {formData.name.charAt(0).toUpperCase()}
          </div>
          <div className="header-info">
            <h2>{user.name}</h2>
            <span className={`role-badge ${user.role}`}>{user.role}</span>
          </div>
          <button 
            className="btn-toggle-edit"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {/* Profile Details Form */}
        <div className="profile-body">
          <form onSubmit={handleSave}>
            
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" name="name"
                value={formData.name} onChange={handleChange}
                disabled={!isEditing}
                className={isEditing ? 'editable' : 'readonly'}
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" name="email"
                value={formData.email} onChange={handleChange}
                disabled={true} // Usually email shouldn't be changed easily
                className="readonly"
              />
            </div>

            {/* Conditional: Professional Company */}
            {user.role === 'professional' && (
              <div className="form-group">
                <label>Company</label>
                <input 
                  type="text" name="company"
                  value={formData.company} onChange={handleChange}
                  disabled={!isEditing}
                  className={isEditing ? 'editable' : 'readonly'}
                  placeholder="Where do you work?"
                />
              </div>
            )}

            {/* Bio / Tech Stack */}
            <div className="form-group">
              <label>{user.role === 'student' ? 'Tech Stack / Skills' : 'Bio'}</label>
              <textarea 
                name="bio" rows="4"
                value={formData.bio} onChange={handleChange}
                disabled={!isEditing}
                className={isEditing ? 'editable' : 'readonly'}
                placeholder="React, Node.js, Python..."
              />
            </div>

            {/* Student Resume Section (Read Only for now) */}
            {user.role === 'student' && (
              <div className="resume-section">
                <h3>My Resume</h3>
                {user.resumeUrl ? (
                  <div className="resume-box">
                    <span>📄 Resume_v1.pdf</span>
                    <a href={user.resumeUrl} target="_blank" rel="noreferrer" className="btn-view">View</a>
                  </div>
                ) : (
                  <p className="no-resume">No resume uploaded. Please re-register or use Apply Job to upload.</p>
                )}
              </div>
            )}

            {isEditing && (
              <div className="form-actions">
                <button type="submit" className="btn-save" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;