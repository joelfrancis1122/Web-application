import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/register/register';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './components/Profile/Profile';
import AdminDashboard from './adminComponents/AdminDashboard';
import AdminEdit from './adminComponents/AdminEdit/AdminEdit';
import AdminCreate from './adminComponents/AdminCreate/AdminCreate'
import UserProtected from './components/userProtected';
import AdminHome from './components/Home/adminHome';
import AdminProtected from './components/adminProtected';



function App() {


  
  return (
//use pages 
    <Router>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<UserProtected><Home /></UserProtected>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminProtected><AdminHome /></AdminProtected>} />
        <Route path="/adminDashboard" element={<AdminProtected><AdminDashboard /></AdminProtected>} />
        <Route path="/adminDashboard/edit-user" element={<AdminProtected><AdminEdit /></AdminProtected>} />
        <Route path="/create-user" element={<AdminProtected><AdminCreate /></AdminProtected>} />
      </Routes>
    </Router>


  );
}

export default App;
