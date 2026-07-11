import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import Login from './pages/Login';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<DashboardLayout />}>
            {/* YAHAN BADAL DIYA: index ab ek attribute hai, tag nahi */}
            <Route index element={<Dashboard />} />
            <Route path="leads" element={<Leads />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

