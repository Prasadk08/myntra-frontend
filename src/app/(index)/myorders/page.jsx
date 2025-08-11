"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const router = useRouter()

  useEffect(() => {
    const callingData = async () => {
      let token = localStorage.getItem("token");
      console.log(token)
      try {
        if (!token) {
          toast.success("Login is required");
          router.push("/login");
          return;
        }
        let res = await axios.get(
          `https://myntra-backend-git5.onrender.com/user/myorders`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res.data)
        setOrders(res.data)
      } catch (e) {
        if (e.response && e.response.status == 401) {
          toast.error("Please Login First");
          router.push("/login");
          return;
        }
        toast.error("Something went wrong");
        console.log("something went wrong while adding in wishlist ", e);
      }
    };
    callingData();
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
              key={order._id}
              className="bg-white shadow p-4 rounded-xl text-sm text-gray-700"
            >
              <div className="font-semibold mb-1">Order ID: {order._id}</div>
              <div className="text-xs mb-2">Placed on: {new Date(order.createdAt).toLocaleString()}</div>
              <div>Total Items: {order.orders.length}</div>
              <div>Total Amount: ₹{order.totalBill}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
