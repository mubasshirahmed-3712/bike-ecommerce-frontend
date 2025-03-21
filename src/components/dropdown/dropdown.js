import React from "react";
import { NavLink } from "react-router-dom";
import "./dropdown.css";

const FeaturesDropdown = () => {
  return (
    <div className="features-dropdown">
      <button className="buttonxyz">Features &nbsp; ▼</button>
      <div className="dropdown-content">
        <NavLink id="top" to="/recommend">
          Get Recommendations
        </NavLink>
        <NavLink id="bottom" to="/order-history">
          Order History
        </NavLink>
      </div>
    </div>
  );
};

export default FeaturesDropdown;
