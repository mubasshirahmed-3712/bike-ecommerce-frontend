import React, { useState, useEffect } from "react";
import { Button, Table, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/Cart.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const updateCartInStorage = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = cart.map((item) =>
      item._id === productId ? { ...item, quantity: newQuantity } : item
    );
    updateCartInStorage(updatedCart);
  };

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    updateCartInStorage(updatedCart);
  };

  const handleProceedToCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Navigate to checkout page (order will be placed there)
    navigate("/checkout");
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart-page container">
      <h2 className="text-center">🛒 Your Shopping Cart</h2>

      {cart.length === 0 ? (
        <Alert variant="warning" className="text-center">Your cart is empty!</Alert>
      ) : (
        <>
          <Table striped bordered hover className="cart-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img
                      src={`https://bike-ecommerce-backend.onrender.com${item.image}`}
                      alt={item.name}
                      className="cart-image"
                      onError={(e) => (e.target.src = "/images/default-bike.jpg")}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>${item.price.toLocaleString()}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item._id, Number(e.target.value))}
                      className="quantity-input"
                    />
                  </td>
                  <td>${(item.price * item.quantity).toLocaleString()}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleRemoveFromCart(item._id)}>
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="cart-summary">
            <h4>Total: ${totalPrice.toLocaleString()}</h4>
            <Button variant="primary" className="checkout-btn" onClick={handleProceedToCheckout}>
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
