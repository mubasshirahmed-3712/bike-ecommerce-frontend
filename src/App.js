import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductListing from "./components/ProductListing";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import 'bootstrap/dist/css/bootstrap.min.css';

import BikeRecommendation from "./pages/BikeRecommendation";
import Footer from "./components/Footer";
import Checkout from "./pages/Checkout";
import { AuthProvider } from "./context/AuthContext"; 
import { CartProvider } from "./context/CartContext"; 
import ProtectedRoute from "./components/ProtectedRoute"; 
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider> 
      <CartProvider> 
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductListing />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<Register />} />
            <Route path="/recommend" element={<BikeRecommendation />} />

            <Route path="*" element={<NotFound />} />

            {/* ✅ Protected Routes Group */}
            <Route element={<ProtectedRoute />}>
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
          <Toaster />
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
