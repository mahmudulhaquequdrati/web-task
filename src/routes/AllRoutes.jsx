import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { useProfile } from "../hooks/userHook";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import AuthProtected from "./AuthProtected";

const AllRoutes = () => {
  const { userProfile } = useProfile();
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <AuthProtected>
                <Home />
              </AuthProtected>
            }
          />
          <Route
            path="login"
            element={userProfile ? <Navigate to="/" /> : <Login />}
          />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </React.Fragment>
  );
};

export default AllRoutes;
