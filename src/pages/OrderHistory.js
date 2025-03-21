import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Assuming you have authentication context
import "./OrderHistory.css"; // Add styling if needed

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth(); // Get logged-in user info

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://bike-ecommerce-backend.onrender.com/api/orders/history", {
          headers: { Authorization: `Bearer ${user.token}` }, // Send token for auth
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (user) fetchOrders();
  }, [user]);

  return (
    <div className="order-history">
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>No past orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <h3>Order ID: {order._id}</h3>
              <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
              <p>Total Price: ${order.totalPrice.toFixed(2)}</p>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.name} - {item.quantity} x ${item.price}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
