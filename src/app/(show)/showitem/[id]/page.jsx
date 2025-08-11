"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedCart, setaddedCart] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const callingData = async () => {
      try {
        const res = await axios.get(
          `https://myntra-backend-git5.onrender.com/getoneproduct/${id}`
        );
        setProduct(() => res.data);
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
    const alreadyExistscart = olddatacart.some(
      (item) => item.id === product.id
    );
    setIsWishlisted(alreadyExists);
    setaddedCart(alreadyExistscart);
  }, [product]);

  const handleWishList = async (product) => {
    let token = localStorage.getItem("token")
    try {
      if (!token) {
        toast.success("Login is required");
        router.push("/login");
        return;
      }
      let res = await axios.post(
        `https://myntra-backend-git5.onrender.com/user/addtowish/${product._id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Item added to Wishlist");
    } catch (e) {
      if(e.response && e.response.status==401){
        toast.error("Please Login First")
        router.push("/login")
        return
      }
      toast.error("Something went wrong");
      console.log("something went wrong while adding in wishlist ", e);
    }
  };
  const handleCart = async(product) => {

    let token = localStorage.getItem("token")
    try {
      if (!token) {
        toast.success("Login is required");
        router.push("/login");
        return;
      }
      let res = await axios.post(
        `https://myntra-backend-git5.onrender.com/user/addtocart/${product._id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Item added to cart");
    } catch (e) {
      if(e.response && e.response.status==401){
        toast.error("Please Login First")
        router.push("/login")
        return
      }
      toast.error("Something went wrong");
      console.log("something went wrong while adding in cart ", e);
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
            <button
              className="p-2 md:px-20 md:py-4 text-base bg-[#FF527B] text-white mx-2 md:font-bold"
              onClick={() => handleWishList(product)}
            >
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
