import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { jobService } from '../../services/jobService';
import { FiBriefcase, FiUsers, FiAward, FiPlus, FiArrowRight } from 'react-icons/fi'; // 👈 Import icons
import './ProfessionalDashboard.css';

const ProfessionalDashboard = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    try {
      const res = await jobService.getAllJobs(); 
      // Filter strictly for this user's jobs
      const myJobs = res.data.filter(job => job.postedBy?.id === user.id); 
      setJobs(myJobs);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      {/* 1. Header Section */}
      <header className="dashboard-header">
        <div className="header-text">
          <h1>Hello, {user?.name.split(' ')[0]}! 👋</h1>
          <p>Here is what's happening with your job postings.</p>
        </div>
        <Link to="/professional/post-job" className="btn-primary">
          <FiPlus /> Post New Job
        </Link>
      </header>

      {/* 2. Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card blue-accent">
          <div className="stat-icon-bg"><FiBriefcase /></div>
          <div className="stat-info">
            <h3>Active Jobs</h3>
            <p className="stat-number">{jobs.length}</p>
          </div>
        </div>
        <div className="stat-card green-accent">
          <div className="stat-icon-bg"><FiUsers /></div>
          <div className="stat-info">
            <h3>Total Applicants</h3>
            <p className="stat-number">0</p>
          </div>
        </div>
        <div className="stat-card purple-accent">
          <div className="stat-icon-bg"><FiAward /></div>
          <div className="stat-info">
            <h3>Referrals</h3>
            <p className="stat-number">0</p>
          </div>
        </div>
      </div>

      {/* 3. Recent Jobs Section */}
      <div className="content-section">
        <div className="section-header">
          <h2>Your Recent Postings</h2>
          <button className="btn-text">View All</button>
        </div>
        
        {loading ? (
          <p>Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <div className="empty-state">
            <FiBriefcase className="empty-icon" />
            <h3>No jobs posted yet</h3>
            <p>Create your first job posting to attract top talent.</p>
            <Link to="/professional/post-job" className="btn-outline">Create Job</Link>
          </div>
        ) : (
          <div className="jobs-list">
            {jobs.map((job) => (
              <div key={job.id} className="job-row-card">
                <div className="job-details">
                  <div className="job-title-row">
                    <h3>{job.title}</h3>
                    <span className={`status-badge ${job.jobType.toLowerCase()}`}>{job.jobType}</span>
                  </div>
                  <div className="job-meta">
                    <span>📍 {job.location || 'Remote'}</span>
                    <span>📅 {new Date(job.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="job-actions">
                  <div className="applicants-preview">
                    <span>0 Applicants</span>
                  </div>
                  <Link to={`/professional/job/${job.id}`} className="btn-icon">
                     Details <FiArrowRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionalDashboard;