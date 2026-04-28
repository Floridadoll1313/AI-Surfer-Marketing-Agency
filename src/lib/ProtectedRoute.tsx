import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  // Show loading screen while auth state resolves
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // If user is not logged in → send them to MEMBERS (Stripe Pricing Table)
  if (!user) {
    return <Navigate to="/members" replace />;
  }

  // If user is logged in → allow access
  return <>{children}</>;
};

export default ProtectedRoute;
