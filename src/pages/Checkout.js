import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
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
      toast.error("Please log in to place an order.");
      navigate("/register");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty!");
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

    // Using toast.promise for better UI feedback
    await toast.promise(
      fetch("https://bike-ecommerce-backend.onrender.com/api/orders/place", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify(orderDetails),
      }).then(async (res) => {
        if (!res.ok) {
          throw new Error((await res.json()).message || "Failed to place order.");
        }
        return res.json();
      }),
      {
        loading: "Placing order...",
        success: "Order Confirmed! A confirmation email has been sent.",
        error: "Failed to place order. Please try again.",
      }
    );

    localStorage.removeItem("cart");
    navigate("/");
    setLoading(false);
  };

  return (
    <div className="checkout-page ">
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
