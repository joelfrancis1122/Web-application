import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserProtected = ({ children }) => {
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!token || !user) {  
      navigate('/login');
    }
  }, [token, user, navigate]); 

  if (token && user) {
    return children;  
  }

  return null; 
};

export default UserProtected;
