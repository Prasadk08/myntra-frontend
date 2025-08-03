'use client'
import { filterRange, getSearchData } from "@/redux/features/searchdata";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const SideNavbar = () => {
  const[selectedBrands,setSelectedBrands]= useState([])

  const dispatch = useDispatch()

  const handleBrands = (e)=>{
    const value= e.target.value
    setSelectedBrands((prev)=>
    (e.target.checked) ? [...prev,value] : prev.filter((item) => item !== value)
    )
  }

  const handleRange = (e)=>{
    const data = e.target.value
    const [min,max]=data.split('-').map(Number)
    dispatch(filterRange([min,max]))

  }
  useEffect(()=>{
    dispatch(getSearchData(selectedBrands[selectedBrands.length-1]))
  },[selectedBrands])
  return (
    <div className="side-navbar hidden md:block h-screen bg-[#1d2f6f] w-64 p-4 shadow-md overflow-y-auto fixed">
      {/* Categories Brands */}
      <div className="brands mb-6">
        <p className="font-bold text-lg text-white mb-3">Brands</p>
        
        {["tv","audio","laptop","mobile","gaming","appliances"].map((brand) => (
          <div key={brand} className="mb-2">
            <input type="checkbox" id={brand} name={brand} value={brand} checked={selectedBrands.includes(brand)} onChange={handleBrands}  />
            <label className="ml-2 text-white" htmlFor={brand}>
              {brand}
            </label>
          </div>
        ))}
      </div>

      {/* Price Range */}
      <div className="price-range mb-6">
        <p className="font-bold text-lg text-white mb-3">Price Range</p>
        <div className="space-y-2">
          <label className="block">
            <input type="radio" name="price" value="0-1000" onChange={handleRange}/>
            <span className="ml-2 text-white">₹0 - ₹1,000</span>
          </label>
          <label className="block">
            <input type="radio" name="price" value="1000-5000" onChange={handleRange} />
            <span className="ml-2 text-white">₹1,000 - ₹5,000</span>
          </label>
          <label className="block">
            <input type="radio" name="price" value="5000-10000" onChange={handleRange} />
            <span className="ml-2 text-white">₹5,000 - ₹10,000</span>
          </label>
          <label className="block">
            <input type="radio" name="price" value="10000+" onChange={handleRange}/>
            <span className="ml-2 text-white">₹10,000+</span>
          </label>
        </div>
      </div>

      {/* Ratings */}
      <div className="ratings mb-6">
        <p className="font-bold text-lg text-white mb-3">Ratings</p>
        {[4, 3, 2, 1].map((rating) => (
          <div key={rating} className="mb-2">
            <input type="checkbox" id={`star-${rating}`} />
            <label className="ml-2 text-white" htmlFor={`star-${rating}`}>
              {rating}★ & above
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideNavbar;
