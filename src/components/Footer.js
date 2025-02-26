import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import logo from "../assets/images/logo3.png"; // Ensure correct path
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo & About Section */}
        <div className="footer-section logo-section">
          <img src={logo} alt="BikeZone Logo" className="footer-logo" />
          <p>Your go-to platform for high-performance superbikes.</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section links-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/products">Products</NavLink>
            </li>
            <li>
              <NavLink to="/cart">Cart</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
            <li>
              <NavLink to="/about">About Us</NavLink>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="footer-section social-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="footer-section contact-section">
          <h4>Contact Us</h4>
          <p>Email: bike.estore259@gmail.com</p>
          <p>Phone: +91 7032142693</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} BikeZone. All rights reserved.</p>
        <p className="designed-by">
          Designed with <span className="heart">❤</span> by
          <a
            href="https://mubasshirsportfolio.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Mubasshir Ahmed
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
