import React, { useState } from "react";
import axios from "axios";
import "../styles/Register.css";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const Register = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const endpoint = isLogin
        ? "https://bike-ecommerce-backend.onrender.com/api/users/login"
        : "https://bike-ecommerce-backend.onrender.com/api/users/register";

      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : { name: formData.name, email: formData.email, password: formData.password };

      const { data } = await axios.post(endpoint, payload, {
        headers: { "Content-Type": "application/json" },
      });

      localStorage.setItem(
        "userInfo",
        JSON.stringify({ name: data.name, email: data.email, token: data.token })
      );

      toast.success(isLogin ? "Login Successful!" : "Registration Successful!");

      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
      setFormData((prev) => ({ ...prev, password: "", confirmPassword: "" }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page gallcon">
      <motion.div
        className="register-container"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="form-box">
          <h2 className="brand-logo">BikeZone</h2>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-input"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="form-input"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Processing..." : isLogin ? "Login" : "Signup"}
            </button>
          </form>

          <div className="toggle-box">
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <span onClick={() => setIsLogin(!isLogin)} className="toggle-link">
                {isLogin ? "Signup" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;