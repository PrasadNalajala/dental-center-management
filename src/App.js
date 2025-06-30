import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PatientManagementPage from './pages/PatientManagementPage';
import IncidentManagementPage from './pages/IncidentManagementPage';
import PatientDashboardPage from './pages/PatientDashboardPage';
import CalendarPage from './pages/CalendarPage';
import Layout from './components/Layout';

const PrivateRoutesLayout = () => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
        
        <Route element={<PrivateRoutesLayout />}>
          {user?.role === 'Admin' ? (
            <>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/patients" element={<PatientManagementPage />} />
              <Route path="/incidents/:patientId" element={<IncidentManagementPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
            </>
          ) : (
            <Route path="/" element={<PatientDashboardPage />} />
          )}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
