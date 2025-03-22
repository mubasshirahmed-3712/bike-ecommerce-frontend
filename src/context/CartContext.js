import React, { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";


export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  // Load Cart from Local Storage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save Cart to Local Storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add to Cart
  const addToCart = (product) => {
    if (!user) {
      toast.error("Please log in to add items to the cart.");
      return;
    }

    const existingItem = cart.find((item) => item._id === product._id);

    if (existingItem) {
      // Update quantity
      setCart(
        cart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Update Quantity
  const updateQuantity = (productId, newQuantity) => {
    if (!user) {
      toast.error("Please log in to update cart items.");
      return;
    }

    setCart(
      cart.map((item) =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove from Cart
  const removeFromCart = (productId) => {
    if (!user) {
      toast.error("Please log in to remove items from the cart.");
      return;
    }

    setCart(cart.filter((item) => item._id !== productId));
  };

  // Clear Cart after Checkout
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
