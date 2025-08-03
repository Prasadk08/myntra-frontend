"use client";
import React, { useEffect, useState } from "react";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow p-4 rounded-xl text-sm text-gray-700"
            >
              <div className="font-semibold mb-1">Order ID: {order.id}</div>
              <div className="text-xs mb-2">Placed on: {order.date}</div>
              <div>Total Items: {order.items.length}</div>
              <div>Total Amount: ₹{order.total}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
