"use client";
import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 px-6 md:px-16 py-10 mt-10 w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* SHOPPING SECTION */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">ONLINE SHOPPING</h3>
          <ul className="space-y-2 text-sm">
            <li>Men</li>
            <li>Women</li>
            <li>Kids</li>
            <li>Home & Living</li>
            <li>Beauty</li>
          </ul>
        </div>

        {/* USEFUL LINKS */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">USEFUL LINKS</h3>
          <ul className="space-y-2 text-sm">
            <li>Contact Us</li>
            <li>FAQs</li>
            <li>Terms & Conditions</li>
            <li>Returns</li>
            <li>Track Orders</li>
          </ul>
        </div>

        {/* EXPERIENCE */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">EXPERIENCE OUR APP</h3>
          <div className="flex flex-col gap-3">
            {/* <img src="/footer/playstore.png" alt="Play Store" className="h-10 w-auto" /> */}
            {/* <img src="/footer/appstore.png" alt="App Store" className="h-10 w-auto" /> */}
          </div>
        </div>

        {/* CONNECT WITH US */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">KEEP IN TOUCH</h3>
          <div className="flex gap-4 text-lg">
            <FaFacebookF className="hover:text-white cursor-pointer" />
            <FaInstagram className="hover:text-white cursor-pointer" />
            <FaTwitter className="hover:text-white cursor-pointer" />
            <FaYoutube className="hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>

      <hr className="my-6 border-gray-700" />

      <div className="text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Myntra Clone by Prasad. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
