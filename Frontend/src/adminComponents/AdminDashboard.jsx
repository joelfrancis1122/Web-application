import React, { useEffect } from "react";
import axios from "axios";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { setUsers, deleteUser, setSearchQuery } from "../sclices/adminSlice";

const AdminDashboard = () => {
  const { users,token } = useSelector((state) => state.admin);

  const searchQuery = useSelector((state) => state.admin.searchQuery);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7000/admin/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch(setUsers(response.data));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [dispatch]);

  const handleEdit = (userId) => {
    navigate(`edit-user?userId=${userId}`);
  };

  const handleDelete = async (userId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:7000/admin/user?userId=${userId}`);
        dispatch(deleteUser(userId));
        Swal.fire("Deleted!", "User has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      Swal.fire(
        "Error!",
        "There was an error deleting the user. Please try again.",
        "error"
      );
    }
  };

  const handleCreateUser = () => {
    navigate("/create-user");
  };

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-dashboard">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard - All Users</h1>

      <input
        type="text"
        placeholder="Search by name or email"
        value={searchQuery}
        onChange={handleSearch}
        className="search-input"
      />

      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-left">
              <th className="py-2 px-4">Profile</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Phone</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
         <tbody>
  {filteredUsers.length > 0 ? (
    filteredUsers.map((user) => (
      <tr key={user._id} className="border-b">
        <td className="py-2 px-4">
          <img
            src={`/uploads/${user.profilePic}`}
            alt={user.name || "Default User"}
            className="profile-picture"
            onError={(e) => {
              e.target.src = "adi.png";
              e.target.alt = "Default User";
            }}
            aria-label={`Profile picture of ${user.name || "Default User"}`}
          />
        </td>
        <td className="py-2 px-4">{user.name}</td>
        <td className="py-2 px-4">{user.email}</td>
        <td className="py-2 px-4">{user.phone}</td>
        <td className="py-2 px-4">
          <div className="flex space-x-2">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => handleEdit(user._id)}
              aria-label={`Edit ${user.name}'s profile`}
            >
              Edit
            </button>
            &nbsp;
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => handleDelete(user._id)}
              aria-label={`Delete ${user.name}'s profile`}
            >
              
                Delete
            </button>
          </div>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5" className="py-2 px-4 text-center">
        No users found
      </td>
    </tr>
  )}
</tbody>

        </table>
      </div>
      <div className="mt-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleCreateUser}
        >
          Create User
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
