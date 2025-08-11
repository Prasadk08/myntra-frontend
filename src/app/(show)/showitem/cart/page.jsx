"use client";
import Bucket from "@/components/Bucket";
import axios from "axios";
import { usePathname,useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const pathname = usePathname();
  const router = useRouter()

  // useEffect(() => {
  //     const storedData = localStorage.getItem("cart");
  //     const cartdata = storedData ? JSON.parse(storedData) : [];
  //     setCart(cartdata);

  // }, []);

  useEffect(() => {
    const callingData = async()=>{
      let token = localStorage.getItem("token")
      let res = await axios.get("https://myntra-backend-git5.onrender.com/show/cart",{
        headers:{
          authorization:`Bearer ${token}`
        }
      })

      setCart(res.data);
    }
    callingData()
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

  const handlePlaceOrder = async() => {
    
   try{
    let token = localStorage.getItem("token")
    let res = await axios.post("https://myntra-backend-git5.onrender.com/user/placeorder",{},{
        params:{totalBill:total},
        headers:{
          authorization:`Bearer ${token}`
        }
      })

      toast.success("Order Placed Successfully")
      router.push("/")
   }catch(e){
    if(e.response && e.response.status==401){
        toast.error("Please Login First")
        router.push("/login")
        return
      }
    toast.error("Failed to place order")
    console.log("Failed to place order ",e)
   }

  };

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-screen bg-gray-50">
      <h1 className="text-xl md:text-3xl font-bold mb-6 text-gray-800">
        My Shopping Bag
      </h1>
      <Bucket data={cart} removedata={removeItem} handleorder={handlePlaceOrder} total={total} />
    </div>
  );
};

export default CartPage;
