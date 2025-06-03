import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppLayout from './components/Layout/AppLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ChartsStats from './pages/ChartsStats';
import SvgUploader from './pages/SvgUploader';
import PredictionHistory from './pages/PredictionHistory';
import LungCancerInfo from './pages/LungCancerInfo';
import SelfCheck from './pages/SelfCheck';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate to="/dashboard\" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="charts" element={<ChartsStats />} />
            <Route path="upload" element={<SvgUploader />} />
            <Route path="history" element={<PredictionHistory />} />
            <Route path="info" element={<LungCancerInfo />} />
            <Route path="self-check" element={<SelfCheck />} />
            <Route path="settings" element={<p className="p-8">Settings page content</p>} />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard\" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;