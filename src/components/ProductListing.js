import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Spinner, Alert } from "react-bootstrap";
import { CartContext } from "../context/CartContext"; 
import toast from "react-hot-toast"; // ✅ Import hot toast
import "../styles/productStyles.css";

const ProductListing = () => {
  const { addToCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const [bikes, setBikes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await fetch("https://bike-ecommerce-backend.onrender.com/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch bikes");
        }
        const data = await response.json();
        setBikes(data);
      } catch (error) {
        setError(error.message);
        toast.error("Failed to load products. Please try again."); // ✅ Error toast for API failure
      } finally {
        setLoading(false);
      }
    };

    fetchBikes();
  }, []);

  const handleAddToCart = (bikeId) => {
    const selectedBike = bikes.find((bike) => bike._id === bikeId);
    if (!selectedBike || selectedBike.quantity === 0) {
      toast.error("This bike is out of stock!"); // ✅ Error toast if out of stock
      return;
    }

    // Update stock UI
    setBikes((prevBikes) =>
      prevBikes.map((bike) =>
        bike._id === bikeId ? { ...bike, quantity: bike.quantity - 1 } : bike
      )
    );

    // Update cart in localStorage
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cartItems.find((item) => item._id === bikeId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ ...selectedBike, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
    addToCart({ ...selectedBike, quantity: 1 });

    toast.success(`${selectedBike.name} added to cart!`); // ✅ Success toast for adding to cart
  };

  return (
    <div className="product-listing">
      <div className=" product-container">
        <h2>Explore Our Premium Superbikes</h2>

        <div className="go-to-cart-btn-container">
          <Link to="/cart" className="btn btn-warning go-to-cart-btn">
            Go to Cart
          </Link>
        </div>

        {loading ? (
          <div className="spinner-container">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : error ? (
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        ) : (
          <div className="rowz">
            {bikes.map((bike) => (
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
                  <p><strong>Available Stock:</strong> {bike.quantity}</p>

                  <div className="btn-container">
                    <Link to={`/product/${bike._id}`} className="btn btn-primary">
                      View Details
                    </Link>
                    <button
                      className="btn btn-success"
                      onClick={() => handleAddToCart(bike._id)}
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
    </div>
  );
};

export default ProductListing;
