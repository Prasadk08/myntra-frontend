"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SideNavbar from "@/components/SideNavbar";
import Link from "next/link";
import Loading from "@/app/loading/page";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Showdata from "@/components/Showdata";

const Page = () => {

  const { searchdata: products, loading } = useSelector(
    (state) => state.searchdata
  );


  if (loading) return <Loading />;

  return (
    <Showdata products={products} />
  );
};

export default Page;
