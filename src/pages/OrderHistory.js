import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Card, Button, Spinner } from "react-bootstrap";
import { toast } from "react-hot-toast";
import "../styles/orderHistory.css";
import "bootstrap/dist/css/bootstrap.min.css";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://bike-ecommerce-backend.onrender.com/api/orders/history", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to load order history!");
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchOrders();
  }, [user]);

  const handleViewDetails = (orderId) => {
    toast.success(`Viewing details for Order ID: ${orderId}`);
    // Navigate to order details page if implemented
  };

  return (
    <div className="order-history-container">
      <h2 className="order-history-title">Order History</h2>
      {loading ? (
        <div className="loader">
          <Spinner animation="border" variant="light" />
        </div>
      ) : orders.length === 0 ? (
        <p className="no-orders">No past orders found.</p>
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            <Card key={order._id} className="order-card">
              <Card.Body>
                <Card.Title>Order ID: {order._id}</Card.Title>
                <Card.Subtitle className="mb-2 datecss">
                  Date: {new Date(order.createdAt).toLocaleString()}
                </Card.Subtitle>
                <Card.Text>Total Price: <strong>${order.totalPrice.toFixed(2)}</strong></Card.Text>
                <div className="order-items">
                  {order.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <div className="order-item-info">
                        <p>{item.name}</p>
                        <p>{item.quantity} x ${item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="primary" onClick={() => handleViewDetails(order._id)}>
                  View Details
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;