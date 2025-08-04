'use client'

import React from "react";
import { useEffect, useState } from "react";
import Bucket from "@/components/Bucket";

const page = () => {
  const [wishlist, setwishlist] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const storedData = localStorage.getItem("wishlist");
    const wishlistdata = storedData ? JSON.parse(storedData) : [];

    setwishlist(wishlistdata);
  }, []);

  // useEffect(() => {
  //   const storedData = localStorage.getItem("wishlist");
  //   const wishlistdata = storedData ? JSON.parse(storedData) : [];

  //   const total = wishlistdata.reduce((acc, val) => acc + val.price, 0);
  //   setTotal(total);
  // }, [cart]);


  const removeItem = (id) => {
    const wishlistdata = wishlist.filter((item) => item.id !== id);
    setwishlist(wishlistdata);
    localStorage.setItem("wishlist", JSON.stringify(wishlistdata));
  };

  return  (
    <div className="max-w-7xl mx-auto p-6 min-h-screen bg-gray-50">
      <h1 className="text-xl md:text-3xl font-bold mb-6 text-gray-800">
        Wishlist
      </h1>
      <Bucket data={wishlist} removedata={removeItem} />;
    </div>
  );
  
};

export default page;
