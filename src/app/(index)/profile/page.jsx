"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineSupportAgent } from "react-icons/md";
import { BiLogIn } from "react-icons/bi";
import { TbShoppingBag } from "react-icons/tb";

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "",
    mobile: "",
    address: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const data = JSON.parse(storedUser);
      setUser(data[0]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:w-3xl mx-auto">
      <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
        <FaUserCircle size={50} className="text-gray-500" />
        {user.name ? (
          <div>
            <h2 className="font-bold text-lg text-gray-800 uppercase">
              {user.name}
            </h2>
            <p className="text-sm text-gray-500">{user.mobile}</p>
          </div>
        ) : (
          <div>
            <h2 className="font-bold text-lg text-gray-800">Welcome Guest</h2>
            <div className="flex gap-4 mt-1">
              <Link href="/signup" className="text-blue-600 font-semibold">
                Create Account
              </Link>
              <Link href="/login" className="text-blue-600 font-semibold">
                Login
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 space-y-4">
        <Link
          href="/myorders"
          className="flex items-center justify-between bg-white p-4 rounded-xl shadow text-gray-700"
        >
          <span className="flex items-center gap-3">
            <TbShoppingBag size={22} />
            My Orders
          </span>
        </Link>

        <Link
          href="/support"
          className="flex items-center justify-between bg-white p-4 rounded-xl shadow text-gray-700"
        >
          <span className="flex items-center gap-3">
            <MdOutlineSupportAgent size={22} />
            Help & Support
          </span>
        </Link>

        {!user && (
          <Link
            href="/login"
            className="flex items-center justify-between bg-white p-4 rounded-xl shadow text-gray-700"
          >
            <span className="flex items-center gap-3">
              <BiLogIn size={22} />
              Login to see more
            </span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
