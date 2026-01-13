import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/common/Navbar/Navbar'; 
import Sidebar from './components/common/Sidebar/Sidebar'; 

const Layout = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (user) {
    return (
      <div style={{ display: 'flex' }}>
        <Sidebar />

        <div style={{ 
          marginLeft: '250px', 
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

  return (
    <>
      <Navbar /> 
      <div style={{ minHeight: '100vh', backgroundColor: 'white' }}>
        <AppRoutes />
      </div>
    </>
  );
};


function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout /> 
      </AuthProvider>
    </Router>
  );
}

export default App;