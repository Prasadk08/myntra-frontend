"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { filterRange, getSearchData } from "@/redux/features/searchdata";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CgProfile } from "react-icons/cg";
import { IoHeart } from "react-icons/io5";
import { IoBagHandle } from "react-icons/io5";
import { HomeIcon, UserIcon } from "lucide-react";
import { CiFilter } from "react-icons/ci";
import { filteralldata } from "@/redux/features/alldata";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname()

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handlesubmit = async (e) => {
    try {
      const data = search.toLowerCase()
      const result = await dispatch(getSearchData(data)).unwrap();


      if (result.length > 0) {
        router.push("/searchdata");
      } else {
        toast("ITEM NOT FOUND!", {
          icon: "🙁",
        });
      }
    } catch (err) {
      console.log("Error fetching data:", err);
    }
  };

    const handleRange = (data)=>{
      const [min,max]=data.split('-').map(Number)
      if(pathname=="/products"){
        dispatch(filteralldata([min,max]))
      }else{
        dispatch(filterRange([min,max]))
      }
  
    }

  return (
    <>
      <nav className="bg-[#F1FAEE] flex w-screen h-16 flex-wrap items-center justify-between md:px-6 fixed top-0 shadow-md z-10">
        <Link href="/">
          <Image
            className="lg:mx-10 mx-4"
            src="/mytralogo.png"
            alt="Logo"
            width={35}
            height={35}
          />
        </Link>
        <div className="navlinks hidden md:flex md:ml-10  xl:ml-30 items-center">
          <Link
            className="text-xs lg:text-[15px] font-bold px-2 lg:px-5"
            href={"/products"}
          >
            MEN
          </Link>
          <Link
            className="text-xs lg:text-[15px] font-bold px-2 lg:px-5"
            href={"/products"}
          >
            WOMEN
          </Link>
          <Link
            className="text-xs lg:text-[15px] font-bold px-2 lg:px-5"
            href={"/products"}
          >
            KIDS
          </Link>
          <Link
            className="text-xs lg:text-[15px] font-bold px-2 lg:px-5"
            href={"/products"}
          >
            ACCESSORIES
          </Link>
        </div>
        <div className="searchbar">
          <input
            type="text"
            value={search}
            onChange={handleChange}
            className="px-6 py-1 bg-amber-100 rounded-xl mx-2 w-[150px] sm:w-[180px] md:w-[200px]"
            placeholder="search here"
          />
          <button
            className="px-2 text-base lg:px-4 lg:py-2 border bg-amber-200 md:mx-3 rounded-xl"
            onClick={handlesubmit}
          >
            search
          </button>
          {/* <ul className="absolute bg-white w-lg top-12 rounded-xl">
        <li className="p-4 text-sm text-gray-400">This is list</li>
        <li>This is list</li>
        <li>This is list</li>
        <li>This is list</li>
      </ul> */}
        </div>
        <div className="hidden md:flex nav-icons">
          <Link className="font-bold p-2 lg:px-5" href={"/profile"}>
            <CgProfile size={25} className="text-lg sm:text-lg md:text-xl" />
          </Link>
          {/* <Link className="text-[15px] font-bold px-5" href={""}>
          PROFILE
        </Link> */}
          <Link className="font-bold p-2 lg:px-5" href={"/showitem/wishlist"}>
            <IoHeart className="text-red-500 text-lg sm:text-lg md:text-xl" />
          </Link>

          <Link className="font-bold p-2 lg:px-5 " href={"/showitem/cart"}>
            <IoBagHandle className="text-lg sm:text-lg md:text-xl" />
          </Link>
        </div>
      </nav>

      <div className="fixed bottom-0 left-0 w-screen bg-white shadow-md z-50 md:hidden flex justify-around items-center h-14">
        <Link href="/" className="flex flex-col items-center text-gray-600">
          <HomeIcon className="w-6 h-6" />
          <span className="text-xs">Home</span>
        </Link>
        <Link
          href="/showitem/wishlist"
          className="flex flex-col items-center text-gray-600"
        >
          <IoHeart className="w-6 h-6" color="red" />
          <span className="text-xs">Wishlist</span>
        </Link>
        <Link
          href="/showitem/cart"
          className="flex flex-col items-center text-gray-600"
        >
          {/* <BagIcon className="w-6 h-6" /> */}
          <IoBagHandle className="w-6 h-6" />
          <span className="text-xs">Cart</span>
        </Link>
        <Link
          href="/profile"
          className="flex flex-col items-center text-gray-600"
        >
          <UserIcon className="w-6 h-6" />
          <span className="text-xs">Profile</span>
        </Link>
        {(pathname=="/products" || pathname=="/searchdata") && ( <DropdownMenu>
          <DropdownMenuTrigger className="flex flex-col items-center text-gray-600">
            <CiFilter className="w-6 h-6" />
            <span className="text-xs">Filter</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Price</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={()=>handleRange("0-1000")}>0-1000</DropdownMenuItem>
            <DropdownMenuItem onClick={()=>handleRange("1000-2000")}>1000-2000</DropdownMenuItem>
            <DropdownMenuItem onClick={()=>handleRange("2000-3000")}>2000-3000</DropdownMenuItem>
            <DropdownMenuItem onClick={()=>handleRange("3000-5000")}>3000-5000</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>)}
       
      </div>
    </>
  );
};

export default Navbar;
