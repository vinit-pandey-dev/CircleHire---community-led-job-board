import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiCalendar, FiClock, FiArrowRight, FiBriefcase } from 'react-icons/fi';
import './JobCard.css';

const JobCard = ({ job, onApply }) => {
  if (!job) return null;

  const formattedDate = new Date(job.createdAt).toLocaleDateString();
  const description = job.description ? job.description : "No description available";

  return (
    <div className="job-card">
      <div className="job-card-header">
        <div className="job-header-left">
          <h3 className="job-title">{job.title}</h3>
          <p className="job-company">{job.company}</p>
        </div>
        <span className={`job-type-badge ${job.jobType?.toLowerCase()}`}>
          {job.jobType}
        </span>
      </div>

      <div className="job-meta-grid">
        <span className="meta-item">
          <FiMapPin className="meta-icon" /> {job.location || 'Remote'}
        </span>
        <span className="meta-item">
          <FiCalendar className="meta-icon" /> {formattedDate}
        </span>
        {/* Optional: Add experience if you have that field, or remove */}
        <span className="meta-item">
            <FiBriefcase className="meta-icon" /> {job.experience || 'Fresher'}
        </span>
      </div>

      <div className="divider"></div>

      <p className="job-description">
        {description.length > 90 ? description.substring(0, 90) + '...' : description}
      </p>

      <div className="job-actions">
        <Link to={`/student/jobs/${job.id}`} className="btn-details">
            View Details
        </Link>
        <button className="btn-apply" onClick={() => onApply(job.id)}>
          Apply Now <FiArrowRight className="btn-icon" />
        </button>
      </div>
    </div>
  );
};

export default JobCard;