import React, { useEffect, useState } from 'react';
import { referralService } from '../../services/referralService';
//import Navbar from '../../components/Navbar'; // Assuming you have this
import './ManageReferral.css';

const ManageReferrals = () => {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Referrals on Load
  useEffect(() => {
    loadReferrals();
  }, []);

  const loadReferrals = async () => {
    try {
      // Calls GET /api/referrals/getReferrals
      const res = await referralService.getProfessionalReferrals();
      setReferrals(res.data.data); // Adjust based on your API response structure
    } catch (err) {
      console.error("Failed to load referrals", err);
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle Status Update (Accept/Reject)
  const handleStatusUpdate = async (id, newStatus) => {
    if(!window.confirm(`Are you sure you want to mark this as ${newStatus}?`)) return;

    try {
      // Calls PATCH /api/referrals/:id
      await referralService.updateReferralStatus(id, newStatus);
      
      // Refresh list locally to show new status
      setReferrals(prev => prev.map(ref => 
        ref.id === id ? { ...ref, status: newStatus } : ref
      ));
      
      alert(`Referral marked as ${newStatus}`);
    } catch (err) {
      alert("Failed to update status");
    }
  };

  return (
    <div className="manage-referrals-page">
      {/* <Navbar /> */}
      <div className="container">
        <h2 className="page-title">Manage Referral Requests</h2>

        {loading ? (
          <p>Loading requests...</p>
        ) : referrals.length === 0 ? (
          <div className="empty-state">No referral requests yet.</div>
        ) : (
          <div className="referral-list">
            {referrals.map((req) => (
              <div key={req.id} className={`referral-card status-${req.status}`}>
                <div className="card-header">
                  <div>
                    <h3>{req.user.name}</h3>
                    <p className="role-text">Asking for: <strong>{req.role}</strong> at <strong>{req.company}</strong></p>
                  </div>
                  <span className={`status-badge ${req.status}`}>{req.status}</span>
                </div>

                <div className="card-body">
                  <p className="message">"{req.message}"</p>
                  
                  <div className="links">
                    <a href={req.linkedIn} target="_blank" rel="noreferrer" className="link-btn linkedin">
                      View LinkedIn
                    </a>
                    <a href={req.resumeUrl} target="_blank" rel="noreferrer" className="link-btn resume">
                      View Resume
                    </a>
                  </div>
                </div>

                {/* Only show buttons if status is 'open' */}
                {req.status === 'open' && (
                  <div className="card-actions">
                    <button 
                      className="btn-reject" 
                      onClick={() => handleStatusUpdate(req.id, 'rejected')}
                    >
                      Reject
                    </button>
                    <button 
                      className="btn-accept" 
                      onClick={() => handleStatusUpdate(req.id, 'fulfilled')}
                    >
                      ✅ Refer Candidate
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageReferrals;