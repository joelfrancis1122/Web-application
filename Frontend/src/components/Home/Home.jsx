import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // Import useDispatch
import { logoutUser } from '../../sclices/userSclice'; // Import logoutUser action
import './Home.css'; 

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize useDispatch

  // Get user data from Redux store
  const { user } = useSelector((state) => state.user);
 
console.log(user.profilePic,"risssss");

  const [userName, setUserName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      setUserName(user.name);
      setProfileImage(user.profilePic || '');
      setIsAdmin(user.isAdmin); 
    }
  }, [user]);



  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleAdminClick = () => {
    navigate('/adminDashboard'); 
  };

  const logout = () => {
    dispatch(logoutUser()); 
    navigate('/Login');
  };

  return (
    <div className="home-container">
      <div className="profile-preview">
        {profileImage ? (
          <img
            src={`./uploads/${profileImage}`}
            alt="Profile Preview"
            className="profile-picture-preview cursor-pointer"
            onClick={handleProfileClick}
            onError={(e) => e.target.src = 'adi.png'}
          />
        ) : (
          <img
            src={`adi.png`}
            alt="Profile Preview"
            className="profile-picture-preview cursor-pointer"
          />
        )}
      </div>

      <h1 className="home-title">Welcome Back, {userName}!</h1>

      <div className="home-buttons">
        <button onClick={logout} className="home-button">Logout</button>
      </div>

      {isAdmin && (
        <div className="home-buttons">
          <button onClick={handleAdminClick} className="home-button">Go to Admin Dashboard</button>
        </div>
      )}
    </div>
  );
};

export default Home;
