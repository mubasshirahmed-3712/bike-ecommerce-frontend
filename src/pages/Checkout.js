
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Checkout.css";

const Checkout = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    postalCode: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo || !userInfo.token) {
      alert("Please log in to place an order.");
      navigate("/register");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty!");
      navigate("/cart");
      return;
    }

    const orderDetails = {
      userDetails: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        postalCode: formData.postalCode,
      },
      cart: cart.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      totalPrice: cart.reduce((total, item) => total + item.price * item.quantity, 0),
    };

    try {
      const res = await fetch("https://bike-ecommerce-backend.onrender.com/api/orders/place", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify(orderDetails),
      });

      if (res.ok) {
        alert("Order Confirmed! A confirmation email has been sent.");
        localStorage.removeItem("cart");
        navigate("/");
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <input type="text" name="postalCode" placeholder="Postal Code" value={formData.postalCode} onChange={handleChange} required />
        <button type="submit" disabled={loading}>{loading ? "Processing..." : "Confirm Order"}</button>
      </form>
    </div>
  );
};

export default Checkout;
