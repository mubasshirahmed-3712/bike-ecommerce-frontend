import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Spinner, Alert } from "react-bootstrap";
import { CartContext } from "../context/CartContext"; 
import toast from "react-hot-toast"; 
import "../styles/BikeRecommendation.css";

const BikeRecommendation = () => {
  const { addToCart } = useContext(CartContext);
  const [bikes, setBikes] = useState([]);
  const [filteredBikes, setFilteredBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    budget: "",
    purpose: "",
    engineCapacity: "",
    brand: "",
  });

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await fetch("https://bike-ecommerce-backend.onrender.com/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch bikes");
        }
        const data = await response.json();
        setBikes(data);
        setFilteredBikes(data);
      } catch (error) {
        setError(error.message);
        toast.error("Failed to load bikes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBikes();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filterBikes = () => {
    let filtered = bikes;

    if (filters.budget) {
      const [min, max] = filters.budget.split("-").map(Number);
      filtered = filtered.filter((bike) => bike.price >= min && bike.price <= max);
    }

    if (filters.purpose) {
      filtered = filtered.filter((bike) => bike.category.toLowerCase().includes(filters.purpose.toLowerCase()));
    }

    if (filters.engineCapacity) {
      filtered = filtered.filter((bike) => bike.engineCapacity === filters.engineCapacity);
    }

    if (filters.brand) {
      filtered = filtered.filter((bike) => bike.brand.toLowerCase().includes(filters.brand.toLowerCase()));
    }

    setFilteredBikes(filtered);

    if (filtered.length === 0) {
      toast.error("No bikes match your criteria!");
    }
  };

  const handleAddToCart = (bike) => {
    if (bike.quantity === 0) {
      toast.error("This bike is out of stock!");
      return;
    }

    addToCart({ ...bike, quantity: 1 });

    toast.success(`${bike.name} added to cart!`);
  };

  return (
    <div className="recommendation-page">
      <h2>Find Your Perfect Bike</h2>

      {/* Filter Form */}
      <div className="filter-form">
        <label>Budget:</label>
        <select name="budget" value={filters.budget} onChange={handleFilterChange}>
          <option value="">Select</option>
          <option value="1000-5000">$1000 - $5000</option>
          <option value="5000-10000">$5000 - $10000</option>
          <option value="10000-20000">$10,000 - $20,000</option>
        </select>

        <label>Purpose:</label>
        <select name="purpose" value={filters.purpose} onChange={handleFilterChange}>
          <option value="">Select</option>
          <option value="commuter">Commuter</option>
          <option value="sports">Sports</option>
          <option value="off-road">Off-Road</option>
        </select>

        <label>Engine Capacity:</label>
        <select name="engineCapacity" value={filters.engineCapacity} onChange={handleFilterChange}>
          <option value="">Select</option>
          <option value="150cc">150cc</option>
          <option value="300cc">300cc</option>
          <option value="600cc">600cc</option>
        </select>

        <label>Brand:</label>
        <select name="brand" value={filters.brand} onChange={handleFilterChange}>
          <option value="">Select</option>
          <option value="yamaha">Yamaha</option>
          <option value="honda">Honda</option>
          <option value="suzuki">Suzuki</option>
        </select>

        <button onClick={filterBikes} className="btn btn-primary">Find Bikes</button>
      </div>

      {/* Bike Listings */}
      {loading ? (
        <div className="spinner-container">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      ) : (
        <div className="row">
          {filteredBikes.map((bike) => (
            <div className="col-md-4 col-sm-6 mb-4" key={bike._id}>
              <div className="product-card">
                <img
                  src={`https://bike-ecommerce-backend.onrender.com${bike.image}`}
                  alt={bike.name}
                  className="bike-image"
                  onError={(e) => (e.target.src = "/images/default-bike.jpg")}
                />
                <h3>{bike.name}</h3>
                <p>{bike.description}</p>
                <h4>{`$${bike.price.toLocaleString()}`}</h4>
                <p><strong>Stock:</strong> {bike.quantity}</p>

                <div className="btn-container">
                  <Link to={`/product/${bike._id}`} className="btn btn-primary">
                    View Details
                  </Link>
                  <button
                    className="btn btn-success"
                    onClick={() => handleAddToCart(bike)}
                    disabled={bike.quantity === 0}
                  >
                    {bike.quantity > 0 ? "Add to Cart" : "Out of Stock"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BikeRecommendation;
