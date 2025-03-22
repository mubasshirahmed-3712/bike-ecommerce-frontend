import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaShoppingCart,
  FaMotorcycle,
  FaUser,
  FaUserPlus,
} from "react-icons/fa";
 // eslint-disable-next-line 
import { FaMagnifyingGlassDollar } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { HiMenu, HiX } from "react-icons/hi";
import { toast } from "react-hot-toast"; // ✅ Import Toast
import logo from "../assets/images/bike estore.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Navbar.css";
import FeaturesDropdown from "./dropdown/dropdown";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const storedUserInfo = localStorage.getItem("userInfo");
  const userInfo =
    storedUserInfo &&
    storedUserInfo !== "undefined" &&
    storedUserInfo !== "null"
      ? JSON.parse(storedUserInfo)
      : null;

  // ✅ Handle Scroll Effect
  useEffect(() => {
    let prevScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolling(currentScrollY > prevScrollY && currentScrollY > 50);
      prevScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Handle Logout with Toast
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    toast.success("Logged out successfully!"); // 🔥 Show Toast
    navigate("/register");
  };

  return (
    <nav
      className={`navbar navbar-expand-lg custom-navbar ${
        isScrolling ? "hidden-navbar" : ""
      }`}
    >
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
            {/* <li className="nav-item custom-nav-item">
              <NavLink className="nav-link custom-nav-link" to="/recommend">
                <FaMagnifyingGlassDollar className="nav-icon" />
                Get recommendations
              </NavLink>
            </li> */}
            <li className="nav-item custom-nav-item">
              <NavLink className="nav-link custom-nav-link" to="/cart">
                <FaShoppingCart className="nav-icon" /> Cart
              </NavLink>
            </li>
            {/* <li className="nav-item custom-nav-item">
              <NavLink className="nav-link custom-nav-link" to="/order-history">
                <FaShoppingCart className="nav-icon" /> Order History
              </NavLink>
            </li> */}
            

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

<li className="nav-item custom-nav-item">
              <FeaturesDropdown />
            </li>
          </ul>
        </div>

        {/* Logout Button (Fixed at Right) */}
        {userInfo && (
          <div className="custom-logout-container lgc">
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
