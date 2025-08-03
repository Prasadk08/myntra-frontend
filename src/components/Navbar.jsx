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
import { getSearchData } from "@/redux/features/searchdata";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CgProfile } from "react-icons/cg";
import { IoHeart } from "react-icons/io5";
import { IoBagHandle } from "react-icons/io5";
import { HomeIcon, UserIcon } from "lucide-react";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handlesubmit = async (e) => {
    try {
      const result = await dispatch(getSearchData(search)).unwrap();

      if (result.length > 0) {
        router.push("/products");
      } else {
        toast("ITEM NOT FOUND!", {
          icon: "🙁",
        });
      }
    } catch (err) {
      console.log("Error fetching data:", err);
    }
  };

  return (
    <>
      <nav className="bg-[#F1FAEE] flex w-screen h-16  flex-wrap items-center justify-between md:px-6 fixed top-0 shadow-md z-10">
        <Image
          className="lg:mx-10 mx-4"
          src="/mytralogo.png"
          alt="Logo"
          width={35}
          height={35}
        />
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
            className="px-6 py-2 bg-amber-100 rounded-xl w-[80x] sm:w-[120px] md:w-[200px]"
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
          <DropdownMenu>
            <DropdownMenuTrigger>
              <CgProfile size={25} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link className="text-[15px] font-bold px-5" href={"/signup"}>
                  Create Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link className="text-[15px] font-bold px-5" href={"/login"}>
                  Login
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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

      <div className="fixed bottom-0 left-0 w-full bg-white shadow-md z-50 md:hidden flex justify-around items-center h-14">
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
        <Link href="/showitem/cart" className="flex flex-col items-center text-gray-600">
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
      </div>
    </>
  );
};

export default Navbar;
