import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home, About, Services, Contact } from './pages/PublicPages';
import { PortfolioIndex, ProjectDetail } from './pages/PortfolioPages';
import { AdminLogin, AdminDashboard, AdminLayout, AdminProjectEditor, AdminSeoTools } from './pages/AdminPages';
import { authService } from './services/store';

// Protected Route Wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/portfolio" element={<PortfolioIndex />} />
          <Route path="/portfolio/:slug" element={<ProjectDetail />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout><AdminDashboard /></AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <AdminLayout><AdminDashboard /></AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/seo" element={
          <ProtectedRoute>
            <AdminLayout><AdminSeoTools /></AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/project/:id" element={
          <ProtectedRoute>
            <AdminLayout><AdminProjectEditor /></AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/settings" element={
            <ProtectedRoute>
                <AdminLayout>
                   <div className="p-8"><h1 className="text-2xl font-serif">Settings Placeholder</h1><p>Functionality similar to project edit.</p></div>
                </AdminLayout>
            </ProtectedRoute>
        } />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;