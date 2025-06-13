import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminProtected = ({ children }) => {
  const navigate = useNavigate();
  const { token, admin } = useSelector((state) => state.admin);
  
  useEffect(() => {
    if (!token || !admin) {
      navigate("/login");
    }
  }, [token, admin, navigate]);

  if (token && admin) {
    return children;
  }
};

export default AdminProtected;
