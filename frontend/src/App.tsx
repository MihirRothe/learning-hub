import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ResourceProvider } from './context/ResourceContext';
import { CollectionProvider } from './context/CollectionContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import MainLayout from './components/Layout/MainLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import DashboardPage from './pages/DashboardPage';
import LibraryPage from './pages/LibraryPage';
import CollectionsPage from './pages/CollectionsPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

// Placeholder Pages
const Discover = () => <div className="text-2xl font-bold">Discover Placeholder</div>;

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <CollectionProvider>
          <ResourceProvider>
            <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
                <Route index element={<DashboardPage />} />
                <Route path="library" element={<LibraryPage />} />
                <Route path="discover" element={<Discover />} />
                <Route path="collections" element={<CollectionsPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </ResourceProvider>
        </CollectionProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
