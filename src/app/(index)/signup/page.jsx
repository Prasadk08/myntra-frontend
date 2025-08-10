"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    password: "",
    address: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post("http://localhost:8080/signup", formData);
      localStorage.setItem("token",res.data.token)
      toast.success("SignUp Successfull");
      router.push("/")
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error("Mobile number is already registered");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create Your Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 text-base"
            />
          </div>

          <div>
            <label
              htmlFor="mobile"
              className="block text-sm font-medium text-gray-700"
            >
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              required
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter mobile number"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 text-base"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 text-base"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Enter Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 text-base"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 text-white font-semibold py-3 rounded-lg hover:bg-pink-700 transition"
          >
            SIGN UP
          </button>
        </form>

        <p className="text-xs text-center text-gray-500 mt-6">
          By signing up, you agree to Myntra's Terms of Use and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
