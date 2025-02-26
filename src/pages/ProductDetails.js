import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Spinner, Button, Alert } from "react-bootstrap";
import { CartContext } from "../context/CartContext"; 
import { useAuth } from "../context/AuthContext"; 
import "../styles/ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { user, loading } = useAuth();
  const [bike, setBike] = useState(null);
  const [error, setError] = useState(null);
  const [cartError, setCartError] = useState(null);

  useEffect(() => {
    const fetchBikeDetails = async () => {
      try {
        const response = await fetch(`https://bike-ecommerce-backend.onrender.com/api/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        setBike(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchBikeDetails();
  }, [id]);

  const handleAddToCart = () => {
    if (loading) return;
    if (!user) {
      setCartError("You must be logged in to add items to the cart.");
      return;
    }

    if (!bike || bike.quantity === 0) return;

    // Get existing cart from localStorage
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cartItems.find((item) => item._id === bike._id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ ...bike, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));

    // Update the bike quantity in UI
    setBike((prevBike) => ({
      ...prevBike,
      quantity: prevBike.quantity - 1,
    }));

    addToCart({ ...bike, quantity: 1 });
  };

  if (loading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger" className="error-message">Error: {error}</Alert>;
  }

  if (!bike) {
    return <Alert variant="warning" className="error-message">Product not found!</Alert>;
  }

  return (
    <div className="product-details">
      <div className="container">
        <h2 className="product-title">{bike.name}</h2>
        <div className="row product-content">
          <div className="col-md-6">
            <img
              src={`https://bike-ecommerce-backend.onrender.com${bike.image}`}
              alt={bike.name}
              className="product-image"
              onError={(e) => (e.target.src = "/images/default-bike.jpg")}
            />
          </div>

          <div className="col-md-6 product-info">
            <p className="product-description">{bike.description}</p>
            <h4 className="product-price">{`$${bike.price.toLocaleString()}`}</h4>
            <p className="product-stock"><strong>Stock:</strong> {bike.quantity}</p>

            {cartError && <Alert variant="danger">{cartError}</Alert>}

            <Button
              variant="success"
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={bike.quantity === 0}
            >
              {bike.quantity > 0 ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
