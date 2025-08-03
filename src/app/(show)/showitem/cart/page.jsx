"use client";
import Bucket from "@/components/Bucket";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const pathname = usePathname();

  // useEffect(() => {
  //     const storedData = localStorage.getItem("cart");
  //     const cartdata = storedData ? JSON.parse(storedData) : [];
  //     setCart(cartdata);

  // }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("cart");
    const cartdata = storedData ? JSON.parse(storedData) : [];
    setCart(cartdata);
  }, []);

  useEffect(() => {
  const total = cart.reduce((acc, val) => acc + val.price, 0);
  setTotal(total);
}, [cart])

  const removeItem = (id) => {
    const newcart = cart.filter((item) => item.id !== id);
    setCart(newcart);
    localStorage.setItem("cart", JSON.stringify(newcart));
  };

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-screen bg-gray-50">
      <h1 className="text-xl md:text-3xl font-bold mb-6 text-gray-800">
        My Shopping Bag
      </h1>
      <Bucket data={cart} removedata={removeItem} total={total} />
    </div>
  );
};

export default CartPage;
