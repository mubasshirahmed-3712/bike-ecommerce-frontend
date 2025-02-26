import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>; // Wait until authentication state is loaded

  return user ? <Outlet /> : <Navigate to="/Register" />;
};

export default ProtectedRoute;
