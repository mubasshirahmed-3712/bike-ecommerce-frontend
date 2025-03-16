import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaShoppingCart, FaMotorcycle, FaUser, FaUserPlus } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { HiMenu, HiX } from "react-icons/hi";
import logo from "../assets/images/bike estore.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const storedUserInfo = localStorage.getItem("userInfo");
  const userInfo =
    storedUserInfo && storedUserInfo !== "undefined" && storedUserInfo !== "null"
      ? JSON.parse(storedUserInfo)
      : null;

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/register");
  };

  return (
    <nav className="custom-navbar">
      <div className="navbar-container">
        {/* Logo */}
        <NavLink className="custom-brand" to="/">
          <img src={logo} alt="BikeZone Logo" className="custom-logo" />
        </NavLink>

        {/* Hamburger Button */}
        <button className="custom-toggler" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <HiX className="toggler-icon" /> : <HiMenu className="toggler-icon" />}
        </button>

        {/* Navbar Links */}
        <div className={`custom-menu ${menuOpen ? "open" : ""}`}>
          <ul className="custom-nav-list">
            <li className="custom-nav-item">
              <NavLink className="custom-nav-link" to="/">
                <FaHome className="nav-icon" /> Home
              </NavLink>
            </li>
            <li className="custom-nav-item">
              <NavLink className="custom-nav-link" to="/products">
                <FaMotorcycle className="nav-icon" /> Products
              </NavLink>
            </li>
            <li className="custom-nav-item">
              <NavLink className="custom-nav-link" to="/cart">
                <FaShoppingCart className="nav-icon" /> Cart
              </NavLink>
            </li>
            {userInfo ? (
              <li className="custom-nav-item">
                <NavLink className="custom-nav-link" to="/profile">
                  <FaUser className="nav-icon" /> {userInfo.name || "Profile"}
                </NavLink>
              </li>
            ) : (
              <li className="custom-nav-item">
                <NavLink className="custom-nav-link" to="/register">
                  <FaUserPlus className="nav-icon" /> Register
                </NavLink>
              </li>
            )}
          </ul>
        </div>

        {/* Logout Button */}
        {userInfo && (
          <button onClick={handleLogout} className="logout-btn">
            <FiLogOut className="logout-icon" />
            <span>Logout</span>
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
