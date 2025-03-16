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
    storedUserInfo &&
    storedUserInfo !== "undefined" &&
    storedUserInfo !== "null"
      ? JSON.parse(storedUserInfo)
      : null;

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/register");
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <NavLink className="navbar-brand custom-brand" to="/">
          <img src={logo} alt="BikeZone Logo" className="custom-logo" />
        </NavLink>

        {/* Hamburger Button */}
        <button
          className="navbar-toggler custom-toggler"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <HiX className="toggler-icon" />
          ) : (
            <HiMenu className="toggler-icon" />
          )}
        </button>

        {/* Centered Navbar Links */}
        <div
          className={`collapse navbar-collapse ${
            menuOpen ? "show" : ""
          } custom-collapse`}
        >
          <ul className="navbar-nav mx-auto custom-nav-list">
            <li className="nav-item custom-nav-item">
              <NavLink className="nav-link custom-nav-link" to="/">
                <FaHome className="nav-icon" /> Home
              </NavLink>
            </li>
            <li className="nav-item custom-nav-item">
              <NavLink className="nav-link custom-nav-link" to="/products">
                <FaMotorcycle className="nav-icon" /> Products
              </NavLink>
            </li>
            <li className="nav-item custom-nav-item">
              <NavLink className="nav-link custom-nav-link" to="/cart">
                <FaShoppingCart className="nav-icon" /> Cart
              </NavLink>
            </li>

            {/* Profile (Inside Nav Links) */}
            {userInfo && (
              <li className="nav-item custom-nav-item">
                <NavLink className="nav-link custom-nav-link" to="/profile">
                  <FaUser className="nav-icon" /> {userInfo.name || "Profile"}
                </NavLink>
              </li>
            )}

            {/* Register (If User is Logged Out) */}
            {!userInfo && (
              <li className="nav-item custom-nav-item">
                <NavLink className="nav-link custom-nav-link" to="/register">
                  <FaUserPlus className="nav-icon" /> Register
                </NavLink>
              </li>
            )}
          </ul>
        </div>

        {/* Logout Button (Fixed at Right) */}
        {userInfo && (
          <div className="custom-logout-container">
            <button onClick={handleLogout} className="logout-btn">
              <FiLogOut className="logout-icon" />
              <span className="logout-text">Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
