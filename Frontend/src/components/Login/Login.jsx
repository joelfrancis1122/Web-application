import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logUser } from '../../sclices/userSclice';
import {logAdmin} from '../../sclices/adminSlice';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = useSelector((state) => state.user.token);
    const adminToken = useSelector((state) => state.admin.token);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:7000/login', {
                email,
                password,
            });

            console.log(response,"response")
            if (response.status === 200) {
                if(response.data?.user.isAdmin){
                    dispatch(logAdmin(response.data));
                } 
                else{            
                dispatch(logUser(response.data));
                }

                const userInfo = response.data?.user;
                toast.success('Login successful!');

                setTimeout(() => {
                    if (userInfo && userInfo.isAdmin) {
                        navigate('/admin');
                    } else {
                        navigate('/home');
                    }
                }, 1500);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed.');
        }
    };

    useEffect(() => {
        if (token) {
            navigate('/home');
        }
       else if (adminToken) {
            navigate('/admin');
        }
    }, [token, navigate]);

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>

            <form className="login-form" onSubmit={handleLogin}>
                <div className="input-group">
                    <label htmlFor="email" className="input-label">Email:</label>
                    <input
                        id="email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input-field"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password" className="input-label">Password:</label>
                    <input
                        id="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input-field"
                    />
                </div>
                <button type="submit" className="submit-button">Login</button>
            </form>
            <div className="register-link-container">
                <p>Don't have an account?</p>
                <Link to="/register" className="register-link">Register here</Link>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
