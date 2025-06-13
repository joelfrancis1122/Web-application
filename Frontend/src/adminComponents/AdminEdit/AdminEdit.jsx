
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminEdit = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userId');
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [loading, setLoading] = useState(true);
  const [phone,setPhone] = useState('')
  useEffect(() => {
    if (!userId) {
      toast.error('No user ID provided.');
      navigate('/admin');
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/admin/user?userId=${userId}`);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user details:', error);
        toast.error('Error fetching user details.');
      }
    };

    fetchUser();
  }, [userId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:7000/admin/user?userId=${userId}`, user);
      toast.success('User updated successfully!');
      navigate('/adminDashboard');
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Error updating user. Please try again.');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="admin-edit">
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>
      <form className="edit-form" onSubmit={handleSubmit}>
  <div className="input-group">
    <label htmlFor="name" className="input-label">Name:</label>
    <input
      id="name"
      name="name"
      type="text"
      value={user.name}
      onChange={handleChange}
      required
      className="input-field"
      onKeyDown={(e) => {
        if (e.key === ' ') {
          e.preventDefault();  // Prevent space from being added
        }
      }}
      onPaste={(e) => {
        e.preventDefault();  // Prevent pasting
      }}
    />
  </div>
  
  <div className="input-group">
    <label htmlFor="email" className="input-label">Email:</label>
    <input
      id="email"
      name="email"
      type="email"
      value={user.email}
      onChange={handleChange}
      required
      className="input-field"
    />
  </div>
  
  <div className="input-group">
    <label htmlFor="phone" className="input-label">Phone:</label>
    <input
      id="phone"
      name="phone"
      type="text"
      value={user.phone}
      maxLength="10"  // Limit the input to 10 characters
      onChange={handleChange}
      className="input-field"
    />
  </div>
  
  <div className="input-group">
    <label htmlFor="password" className="input-label">Password:</label>
    <input
      id="password"
      name="password"
      type="password"
      value={user.password}
      onChange={handleChange}
      className="input-field"
    />
  </div>
  
  <button type="submit" className="submit-button">Save Changes</button>
</form>

    </div>
  );
};

export default AdminEdit;
