import React, { useState, useEffect } from "react";
import "../styles/BikeRecommendation.css";
import toast from "react-hot-toast";

const BikeRecommendation = () => {
  const [filters, setFilters] = useState({
    brand: "",
    category: "",
    engineCapacity: "",
  });

  const [bikes, setBikes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [engineCapacities, setEngineCapacities] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await fetch(
          "https://bike-ecommerce-backend.onrender.com/api/products"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch bikes");
        }
        const data = await response.json();
        setBikes(data);

        // Extract unique brands, categories, and engine capacities dynamically
        const uniqueBrands = [...new Set(data.map((bike) => bike.brand))];
        const uniqueCategories = [...new Set(data.map((bike) => bike.category))];
        const uniqueEngineCapacities = [...new Set(data.map((bike) => bike.engineCapacity))].sort((a, b) => a - b);

        setBrands(uniqueBrands);
        setCategories(uniqueCategories);
        setEngineCapacities(uniqueEngineCapacities);
      } catch (error) {
        setError(error.message);
        toast.error("Failed to load bikes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBikes();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Filtering Logic
  const filteredBikes = bikes.filter((bike) => {
    return (
      (!filters.brand || bike.brand === filters.brand) &&
      (!filters.category || bike.category === filters.category) &&
      (!filters.engineCapacity || bike.engineCapacity === Number(filters.engineCapacity))
    );
  });

  return (
    <div className="recommendation-container">
      <h2 className="recommendation-title">Find Your Perfect Bike</h2>

      {/* Filters */}
      <div className="filter-section">
        {/* Brand Filter */}
        <select name="brand" onChange={handleChange} className="filter-dropdown">
          <option value="">Select Brand</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>

        {/* Category Filter */}
        <select name="category" onChange={handleChange} className="filter-dropdown">
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Engine Capacity Filter */}
        <select name="engineCapacity" onChange={handleChange} className="filter-dropdown">
          <option value="">Select Engine Capacity</option>
          {engineCapacities.map((capacity) => (
            <option key={capacity} value={capacity}>
              {capacity}cc
            </option>
          ))}
        </select>
      </div>

      {/* Loading and Error Handling */}
      {loading ? (
        <p className="loading-text">Loading bikes...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : (
        <div className="bike-results">
          {filteredBikes.length > 0 ? (
            filteredBikes.map((bike) => (
              <div key={bike._id} className="bike-card">
                <img
                  src={`https://bike-ecommerce-backend.onrender.com${bike.image}`}
                  alt={bike.name}
                  className="bike-image"
                  onError={(e) => (e.target.src = "/images/default-bike.jpg")}
                />
                <h3 className="bike-name">{bike.name}</h3>
                <p className="bike-description">{bike.description}</p>
                <h4 className="bike-price">${bike.price.toLocaleString()}</h4>
              </div>
            ))
          ) : (
            <p className="no-results">No bikes match your criteria.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BikeRecommendation;
