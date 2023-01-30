import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useProfile } from "../hooks/userHook";

const AuthProtected = ({ children }) => {
  const { userProfile, loading } = useProfile();

  const location = useLocation();
  if (loading) {
    return <div>Loading...</div>;
  }

  return !userProfile && !loading ? (
    <Navigate to={{ pathname: "/login", state: { from: location } }} />
  ) : (
    children
  );
  // }
};

export default AuthProtected;
