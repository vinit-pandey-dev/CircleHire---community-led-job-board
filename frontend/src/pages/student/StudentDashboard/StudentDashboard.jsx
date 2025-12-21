import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { jobService } from '../../../services/jobService'; // You need to create this service
import JobCard from '../../../components/jobs/JobCard/JobCard';
import Navbar from '../../../components/common/Navbar/Navbar'; // Assuming you have a Navbar component
import './StudentDashboard.css';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await jobService.getAllJobs();
      setJobs(response.data);
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    } finally {
      setLoading(false);
    }
  };

// Inside StudentDashboard.jsx

// 1. Define the function
const handleApply = (jobId) => {
  console.log("Applying to job:", jobId);
  // Navigate to application page
  navigate(`/student/apply/${jobId}`);
};

// ... inside your return statement ...
{jobs.map(job => (
  <JobCard 
    key={job.id} 
    job={job} 
    onApply={handleApply}  /* 👈 This PROP is required! */
  />
))}

  // Filter jobs based on search
  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="student-dashboard">
      {/* Simple Top Bar */}
      <header className="dashboard-header">
        <h1>Find Your Dream Job</h1>
        <div className="user-info">
          <span>Hello, {user?.name}</span>
          <button onClick={logout} className="logout-link">Logout</button>
        </div>
      </header>

      {/* Search Section */}
      <div className="search-section">
        <input 
          type="text" 
          placeholder="Search by job title or company..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Job Grid */}
      <main className="jobs-container">
        {loading ? (
          <p>Loading jobs...</p>
        ) : filteredJobs.length > 0 ? (
          <div className="jobs-grid">
            {filteredJobs.map(job => (
              <JobCard key={job._id} job={job} onApply={handleApply} />
            ))}
          </div>
        ) : (
          <div className="no-jobs">
            <h3>No jobs found matching "{searchTerm}"</h3>
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;