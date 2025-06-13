import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../sclices/userSclice";
import { updateAdmin } from "../../sclices/adminSlice"; // Ensure correct import of the admin action

const Profile = () => {
  const [file, setFile] = useState(null);
  const [profileImage, setProfileImage] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // Get user data from Redux if logged in as user
  const user = useSelector((state) => state.user.user);
  const userToken = useSelector((state) => state.user.token);

  // Get admin data from Redux if logged in as admin
  const admin = useSelector((state) => state.admin.admin);
  const adminToken = useSelector((state) => state.admin.token);

  // Determine if current session is for user or admin
  const isUser = !!user;
  const isAdmin = !!admin;

  // Get appropriate data (user/admin)
  const currentUser = isUser ? user : isAdmin ? admin : null;
  const token = isUser ? userToken : adminToken;

  // Effect to set the profile picture if available
  useEffect(() => {
    if (currentUser && currentUser.profilePic) {
      setProfileImage(currentUser.profilePic);
    }
  }, [currentUser]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      // Use axios to upload the profile picture
      const response = await axios.post(
        `http://localhost:7000/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure the correct token is sent
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Upload response:", response);

      // Dispatch appropriate action for user/admin
      if (isUser) {
        dispatch(updateUser(response.data.user)); // Update user in Redux store
        setTimeout(() => {
          toast.success("Profile picture updated successfully!");
          navigate("/home"); // Redirect to user home
        }, 2000);
      } else if (isAdmin) {
        dispatch(updateAdmin(response.data.user)); // Update admin in Redux store
        setTimeout(() => {
          toast.success("Profile picture updated successfully!");
          navigate("/admin"); // Redirect to admin dashboard
        }, 2000);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload profile picture.");
    }
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">Update Profile Picture</h2>

      <div className="current-profile-picture">
        {profileImage ? (
          <img
            src={`./uploads/${profileImage}`}
            alt="Current Profile"
            className="profile-picture-preview"
            onError={(e) => (e.target.src = "adi.png")} // Set default if error
          />
        ) : (
          <p>No profile picture available</p>
        )}
      </div>

      <div className="file-upload">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload} className="upload-button">
          Upload
        </button>
      </div>
    </div>
  );
};

export default Profile;
