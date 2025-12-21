import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobService } from '../../../services/jobService';
import { applicationService } from '../../../services/applicationService';
import './ApplyJob.css';

const ApplyJob = () => {
  const { jobId } = useParams(); // Get ID from URL (e.g., /apply/123)
  const navigate = useNavigate();
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // Form State
  const [coverLetter, setCoverLetter] = useState('');
  const [resume, setResume] = useState(null);

  // 1. Fetch Job Details on Load
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await jobService.getJobById(jobId);
        setJob(res.data);
      } catch (err) {
        console.error("Failed to load job", err);
        alert("Job not found!");
        navigate('/student/dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchJobDetails();
  }, [jobId, navigate]);

  // 2. Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('coverLetter', coverLetter);
      formData.append('jobId', jobId);
      if (resume) {
        formData.append('resume', resume);
      }

      await applicationService.applyForJob(jobId, formData);
      
      alert('Application Submitted Successfully!');
      navigate('/student/dashboard');
      
    } catch (err) {
      console.error(err);
      alert('Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="loading-screen">Loading Job Details...</div>;

  return (
    <div className="apply-container">
      <div className="apply-card">
        {/* Job Header Summary */}
        <div className="job-summary">
          <h2>Apply for {job.title}</h2>
          <p className="company-name">at {job.company}</p>
          <div className="tags">
            <span className="tag">{job.jobType}</span>
            <span className="tag">{job.location}</span>
          </div>
        </div>

        <hr className="divider" />

        {/* Application Form */}
        <form onSubmit={handleSubmit}>
          
          {/* Cover Letter */}
          <div className="form-group">
            <label>Cover Letter / Why you?</label>
            <textarea
              rows="6"
              placeholder="I am the best fit for this role because..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Resume Upload */}
          <div className="form-group">
            <label>Upload Resume (PDF/DOC)</label>
            <div className="file-upload-wrapper">
              <input 
                type="file" 
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResume(e.target.files[0])}
                required
              />
            </div>
            <small>If you don't upload one, we might use your profile resume.</small>
          </div>

          {/* Actions */}
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ApplyJob;