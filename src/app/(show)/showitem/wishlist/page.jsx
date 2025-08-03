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

  return <Bucket data={wishlist} removedata={removeItem} />;
};

export default page;
