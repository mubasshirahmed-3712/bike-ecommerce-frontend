import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // ✅ Import toast
import "../styles/Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      navigate("/register"); // Redirect to login if not logged in
    } else {
      setUser(userInfo);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    toast.success("Logged out successfully!"); // ✅ Show success toast

    setTimeout(() => {
      navigate("/register"); // Redirect after a slight delay
    }, 1500);
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <h2 className="profile-title">My Profile</h2>
        {user ? (
          <div className="profile-content">
            <p className="profile-info">
              <strong>Name:</strong> {user.name || "Not Provided"}
            </p>
            <p className="profile-info">
              <strong>Email:</strong> {user.email}
            </p>
            <button className="profile-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <p className="loading-text">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
