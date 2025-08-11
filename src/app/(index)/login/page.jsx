"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";



const LoginPage = () => {
  const [loginData, setLogindata] = useState({
    mobile:"",
    password:""
  });
  const router = useRouter()

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      let res = await axios.post("https://myntra-backend-git5.onrender.com/login",loginData)
      localStorage.setItem("token",res.data.token)
      toast.success("Login Successful")
      router.push("/")
    }catch(e){
      if(e.response && e.response.status==400){
        toast.error("Mobile Number is not registered")
      }else if(e.response && e.response.status==401){
        toast.error("Wrong Password")
      }else{
        toast.error("Something went Wrong")
        console.log("Something went wrong ",e)
      }

    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login to Your Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobile"
              value={loginData.module}
              onChange={(e) => setLogindata({...loginData,mobile:e.target.value})}
              placeholder="Enter your mobile number"
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 text-base"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={loginData.password}
              onChange={(e) => setLogindata({...loginData,password:e.target.value})}
              placeholder="**************"
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 text-base"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 text-white font-semibold py-3 rounded-lg hover:bg-pink-700 transition"
          >
            CONTINUE
          </button>
        </form>

        <p className="text-xs text-center text-gray-500 mt-6">
          By continuing, you agree to Myntra's Terms of Use and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
