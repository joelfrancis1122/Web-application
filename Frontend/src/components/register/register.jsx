import React, { useState } from 'react';
import axios from 'axios';
import './register.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    })
    
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (user.name.includes(' ')) {
            toast.error('Name should not contain spaces');
            return;
        }
        if (user.password !== user.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            console.log(user);
            
            const response = await axios.post('http://localhost:7000/register', user);
           if(response.status==200){
            toast.success('Registration successful!');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
           }else{

               toast.error('Registration failed. Please check your details.');
           }
        } catch (error) {
            toast.error('Registration failed. Please check your details.');
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };
    return (
        <div className="register-container">
            <h2 className="register-title">Register</h2>
            <form className="register-form" onSubmit={handleRegister}>
                <div className="input-group">
                    <label htmlFor="name" className="input-label">Name:</label>
                    <input
                        id="name"
                        name='name'
                        type="text"
                        onChange={handleChange}
                        required
                        className="input-field"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="email" className="input-label">Email:</label>
                    <input
                        id="email"
                        type="email"
                        name='email'
                        onChange={handleChange}
                        required
                        className="input-field"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="phone" className="input-label">Phone Number:</label>
                    <input
                        id="phone"
                        type="number"
                        name='phone'
                        onChange={handleChange}
                        required
                        className="input-field"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password" className="input-label">Password:</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        required
                        className="input-field"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="confirmPassword" className="input-label">Confirm Password:</label>
                    <input
                        id="confirmPassword"
                        name='confirmPassword'
                        type="password"
                        onChange={handleChange}
                        required
                        className="input-field"
                    />
                </div>
                <button type="submit" className="submit-button">Register</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Register;
