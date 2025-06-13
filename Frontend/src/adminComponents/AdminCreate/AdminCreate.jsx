import React, { useState } from 'react';
import axios from 'axios';
import './AdminCreate.css';import { useNavigate } from 'react-router-dom'; 

import { toast } from 'react-toastify'; 
const CreateUser = () => {
    const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('password', formData.password);
    

    for (const file of files) {
      data.append('profilePic', file);
    }

    try {
        await axios.post('http://localhost:7000/admin/user', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('User created successfully!'); 
        navigate('/adminDashboard');
      } catch (error) {
        console.error('Error creating user:', error);
        toast.error('Error creating user. .');
      }
    };

  return (
    <div className="create-user-form">
      <h2>Create a New User</h2>
      <form onSubmit={handleSubmit}>
  <label htmlFor="name">Name:</label>
  <input
    type="text"
    name="name"
    id="name"
    value={formData.name}
    onChange={handleChange}
    placeholder="Enter name"
    onKeyDown={(e) => {
      if (e.key === ' ') {
        e.preventDefault();  // Prevent space from being added
      }
    }}
    onPaste={(e) => {
      e.preventDefault();  // Prevent pasting
    }}
  />

  <label htmlFor="email">Email:</label>
  <input
    type="email"
    name="email"
    id="email"
    value={formData.email}
    onChange={handleChange}
    placeholder="Enter email"
  />

  <label htmlFor="phone">Phone:</label>
  <input
    type="text"
    name="phone"
    id="phone"
    value={formData.phone}
    onChange={handleChange}
    placeholder="Enter phone number"
    maxLength="10"
  />

  <label htmlFor="password">Password:</label>
  <input
    type="password"
    name="password"
    id="password"
    value={formData.password}
    onChange={handleChange}
    placeholder="Enter password"
  />

  <label htmlFor="profilePic">Profile Picture:</label>
  <input
    type="file"
    name="profilePic"
    id="profilePic"
    multiple
    onChange={handleFileChange}
  />

  <button type="submit">Create User</button>
</form>


    </div>
  );
};

export default CreateUser;
