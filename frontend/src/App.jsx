import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/common/Navbar/Navbar'; 
import Sidebar from './components/common/Sidebar/Sidebar'; // 👈 Import the new Sidebar

// --- INTERNAL LAYOUT COMPONENT ---
// This component decides whether to show Navbar or Sidebar
const Layout = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  // 🟢 CASE 1: LOGGED IN USER -> SHOW SIDEBAR
  if (user) {
    return (
      <div style={{ display: 'flex' }}>
        {/* Fixed Sidebar on the Left */}
        <Sidebar />
        
        {/* Main Content pushed to the right */}
        <div style={{ 
          marginLeft: '250px', // Must match Sidebar width
          width: 'calc(100% - 250px)', 
          minHeight: '100vh',
          backgroundColor: '#f4f7f6'
        }}>
          <div style={{ padding: '20px' }}>
            <AppRoutes />
          </div>
        </div>
      </div>
    );
  }

  // 🔵 CASE 2: GUEST / PUBLIC -> SHOW NAVBAR
  return (
    <>
      <Navbar /> {/* Top Navigation */}
      <div style={{ minHeight: '100vh', backgroundColor: 'white' }}>
        <AppRoutes />
      </div>
    </>
  );
};

// --- MAIN APP COMPONENT ---
function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout /> {/* 👈 usage of the internal layout component */}
      </AuthProvider>
    </Router>
  );
}

export default App;