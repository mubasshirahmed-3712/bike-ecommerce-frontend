import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/NotFound.css";
import Lottie from "lottie-react";
import bikeAnimation from "../assets/bike-animation.json"; // Lottie animation JSON

const NotFound = () => {
  const [dynamicText, setDynamicText] = useState(""); // Dynamic Typing Effect
  const [countdown, setCountdown] = useState(5); // Countdown Timer
  const navigate = useNavigate();

  useEffect(() => {
    // Dynamic Typing Effect
    const messages = [
      "Oops! This page went off-road... 🚴‍♂️",
      "Looks like you took a wrong turn!",
      "Don't worry, let's get you back!"
    ];
    let i = 0;
    let j = 0;
    let currentText = "";
    let isDeleting = false;

    const typingInterval = setInterval(() => {
      if (!isDeleting) {
        currentText = messages[i].substring(0, j + 1);
        j++;
        if (j === messages[i].length) isDeleting = true;
      } else {
        currentText = messages[i].substring(0, j - 1);
        j--;
        if (j === 0) {
          isDeleting = false;
          i = (i + 1) % messages.length;
        }
      }
      setDynamicText(currentText);
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  // Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          navigate("/");
        }
        return prev - 1;
      });
    }, 2000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="error-page">
      <div className="error-content">
        <Lottie animationData={bikeAnimation} className="error-animation" />
        <h1 className="error-code">404</h1>
        <h2 className="error-message">{dynamicText}</h2> {/* Dynamic Typing Effect */}
        <p className="error-description">The page you are looking for does not exist.</p>
        <p className="error-countdown">Redirecting in {countdown} seconds...</p>
        <Link to="/" className="error-button">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
