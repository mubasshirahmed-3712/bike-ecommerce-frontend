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
      (!filters.engineCapacity || bike.engineCapacity === filters.engineCapacity)
    );
  });

  return (
    <div className="recommendation-container">
      <h2 className="recommendation-title">Find Your Perfect Bike</h2>

      {/* Filters */}
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
