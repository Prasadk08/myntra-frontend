"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isWishlisted, setIsWishlisted]=useState(false)
  const [addedCart, setaddedCart]=useState(false)
  useEffect(() => {
    const callingData = async () => {
      try {
        const res = await axios.get(
          `https://fakestoreapi.in/api/products/${id}`
        );
        setProduct(() => res.data.product);
      } catch (e) {
        console.log(e);
      }
    };
    callingData();
  }, []);

  useEffect(() => {
    const olddata = JSON.parse(localStorage.getItem("wishlist")) || [];
    const alreadyExists = olddata.some((item) => item.id === product.id);
    const olddatacart = JSON.parse(localStorage.getItem("wishlist")) || [];
    const alreadyExistscart = olddatacart.some((item) => item.id === product.id);
    setIsWishlisted(alreadyExists);
    setaddedCart(alreadyExistscart)
  }, [product]);

  const handleWishList = (product) => {
    const olddata = JSON.parse(localStorage.getItem("wishlist")) || [];
    const alreadyExists = olddata.some((item) => item.id === product.id);
    if(!alreadyExists){
      olddata.push(product);
      localStorage.setItem("wishlist", JSON.stringify(olddata));
      setIsWishlisted(true);
      toast.success("Item added to Wishlist")
    }
  
  };
  const handleCart = (product) => {
    const olddata = JSON.parse(localStorage.getItem("cart")) || [];
    const alreadyExists = olddata.some((item) => item.id === product.id);
    if(!alreadyExists){
      olddata.push(product);
      localStorage.setItem("cart", JSON.stringify(olddata));
      setaddedCart(true);
      toast.success("Item added to Cart")
    }
  
  };
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto h-screen p-4">
        <div className="flex flex-col items-center px-5">
          <div className="h-50 w-full md:h-100 mt-20 flex justify-center items-center">
            <img
              //src="/card/card3men.jpg"
              src={product.image}
              alt="product image"
              className="object-contain h-full w-full"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="my-5 p-2">
            <div className="text-xl brandtxt text-gray-800 md:text-3xl font-extrabold  px-4 uppercase">
              {product.brand}
            </div>
            <div className="text-lg prdtit md:text-xl font-bold px-4 text-gray-500">
              {product.title}
            </div>
            <p className="text-gray-400 text-sm p-4">MODEL {product.model}</p>

            <div className="flex mt-4">
              <div className="prdprice text-xl font-bold mx-4">
                ₹{product.price}
              </div>
              {product.discount ? (
                <div className="prddist text-xl mx-4">
                  ( {product.discount}%{" "}
                  <span className="font-bold uppercase">OFF</span> )
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="flex p-2">
            <button
              className="p-2 md:px-20 md:py-4 text-base bg-[#FF527B] text-white mx-2 md:font-bold"
              onClick={() => handleCart(product)}
            >
               {addedCart ? "ADDED TO BAG" : "ADD TO BAG"}
            </button>
            <button className="p-2 md:px-20 md:py-4 text-base bg-[#FF527B] text-white mx-2 md:font-bold" onClick={() => handleWishList(product)}>
               {isWishlisted ? "WISHLISTED" : "ADD TO WISHLIST"}
            </button>
          </div>
          <div>
            <p className="text-gray-600 my-5 p-2 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="text-lg font-black p-5">More Like This</div>
      </div>
    </>
  );
};

export default page;
