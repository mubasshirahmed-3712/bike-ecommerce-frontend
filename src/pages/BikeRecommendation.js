import React, { useState } from "react";
import bikesData from "../data/bikes"; // Import your bike data
import "../styles/BikeRecommendation.css"; // Import the CSS file

const BikeRecommendation = () => {
  const [filters, setFilters] = useState({
    brand: "",
    category: "",
    engineCapacity: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Filtering Logic
  const filteredBikes = bikesData.filter((bike) => {
    return (
      (!filters.brand || bike.brand === filters.brand) &&
      (!filters.category || bike.category === filters.category) &&
      (!filters.engineCapacity || bike.engineCapacity === filters.engineCapacity)
    );
  });

  return (
    <div className="recommendation-container">
      <h2 className="recommendation-title">Find Your Perfect Bike</h2>

      {/* Filter Section */}
      <div className="filter-section">
        <select name="brand" onChange={handleChange} className="filter-dropdown">
          <option value="">Select Brand</option>
          <option value="Harley Davidson">Harley Davidson</option>
          <option value="Ducati">Ducati</option>
          <option value="Kawasaki">Kawasaki</option>
          <option value="Yamaha">Yamaha</option>
          <option value="Honda">Honda</option>
          <option value="Suzuki">Suzuki</option>
          <option value="KTM">KTM</option>
          <option value="Triumph">Triumph</option>
          <option value="Aprilia">Aprilia</option>
        </select>

        <select name="category" onChange={handleChange} className="filter-dropdown">
          <option value="">Select Category</option>
          <option value="Superbike">Superbike</option>
          <option value="Cruiser">Cruiser</option>
          <option value="Naked">Naked</option>
          <option value="Touring">Touring</option>
        </select>

        <select name="engineCapacity" onChange={handleChange} className="filter-dropdown">
          <option value="">Select Engine Capacity</option>
          <option value="300cc-500cc">300cc - 500cc</option>
          <option value="600cc-800cc">600cc - 800cc</option>
          <option value="1000cc+">1000cc+</option>
        </select>
      </div>

      {/* Results Section */}
      <div className="bike-results">
        {filteredBikes.length > 0 ? (
          filteredBikes.map((bike, index) => (
            <div key={index} className="bike-card">
              <img src={bike.image} alt={bike.name} className="bike-image" />
              <h3 className="bike-name">{bike.name}</h3>
              <p className="bike-description">{bike.description}</p>
              <h4 className="bike-price">${bike.price}</h4>
            </div>
          ))
        ) : (
          <p className="no-results">No bikes match your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default BikeRecommendation;
