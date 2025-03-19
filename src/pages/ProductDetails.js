import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Spinner, Button, Alert, Table } from "react-bootstrap";
import toast from "react-hot-toast";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "../styles/ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { user, loading } = useAuth();
  const [bike, setBike] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBikeDetails = async () => {
      try {
        const response = await fetch(`https://bike-ecommerce-backend.onrender.com/api/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        setBike(data);
        toast.success("Product details loaded!");
      } catch (error) {
        setError(error.message);
        toast.error("Failed to load product details!");
      }
    };

    fetchBikeDetails();
  }, [id]);

  const handleAddToCart = () => {
    if (loading) return;
    if (!user) {
      toast.error("You must be logged in to add items to the cart!");
      return;
    }

    if (!bike || bike.quantity === 0) {
      toast.error("This bike is out of stock!");
      return;
    }

    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cartItems.find((item) => item._id === bike._id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ ...bike, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
    setBike((prevBike) => ({ ...prevBike, quantity: prevBike.quantity - 1 }));
    addToCart({ ...bike, quantity: 1 });

    toast.success(`${bike.name} added to cart!`);
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
            
            <Table striped bordered hover variant="dark" className="specs-table">
              <tbody>
                <tr><td>Brand</td><td>{bike.brand}</td></tr>
                <tr><td>Category</td><td>{bike.category}</td></tr>
                <tr><td>Engine Capacity</td><td>{bike.engineCapacity}</td></tr>
                <tr><td>Horsepower</td><td>{bike.horsepower}</td></tr>
                <tr><td>Torque</td><td>{bike.torque}</td></tr>
                <tr><td>Weight</td><td>{bike.weight}</td></tr>
                <tr><td>Top Speed</td><td>{bike.topSpeed}</td></tr>
                <tr><td>Fuel Capacity</td><td>{bike.fuelCapacity}</td></tr>
                <tr><td>Mileage</td><td>{bike.mileage}</td></tr>
                <tr><td>Transmission</td><td>{bike.transmission}</td></tr>
                <tr><td>Braking System</td><td>{bike.brakingSystem}</td></tr>
              </tbody>
            </Table>

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