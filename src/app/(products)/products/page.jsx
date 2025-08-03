"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SideNavbar from "@/components/SideNavbar";
import Link from "next/link";
import Loading from "@/app/loading/page";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const Page = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const reduxData = useSelector((state) => state.searchdata);
  const reduxDataa = useSelector((state) => state.searchdata.searchdata);
  useEffect(() => {
    if ((reduxData.error=="") &&(reduxData.searchdata && reduxData.searchdata.length > 0)) {
      setProducts(reduxData.searchdata);
      setLoading(false);
    } else {
      toast("ITEM NOT FOUND!", {
        icon: "🙁",
      });
      if(products.length==0){
        callingData();

      }
    }
  }, [reduxDataa]);

  // useEffect(() => {
    const callingData = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.in/api/products");
        setProducts(res.data.products);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

  //   callingData();
  // }, []);

  if (loading) return <Loading />;

  return (
    <div className="flex">
      <SideNavbar />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 md:ml-64">
        {products.map((product, index) => (
          <Link href={`/showitem/${product.id}`} key={index}>
            <div className="bg-white p-4 rounded shadow transition-transform hover:scale-105 hover:shadow-lg">
              <div className="h-48 flex items-center justify-center mb-2 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="object-contain h-full w-full"
                />
              </div>
              <div className="item-info h-40 flex flex-col justify-between">
                <h3 className="text-base font-semibold line-clamp-2">
                  {product.title}
                </h3>

                <p className="text-gray-600 text-sm line-clamp-2 mt-1">
                  {product.description}
                </p>

                <div className="mt-2 text-xs text-yellow-700">
                  ⭐ {product.rating?.rate} / 5 ({product.rating?.count}{" "}
                  reviews)
                </div>

                <span className="block mt-1 font-bold text-green-700 text-base">
                  ₹{product.price}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
