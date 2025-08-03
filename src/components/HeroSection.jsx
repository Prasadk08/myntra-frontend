import React from "react";
import { MyCarousel } from "./MyCarousel";
import Card from "./Card";
import Link from "next/link";

const HeroSection = () => {
  const cardImages = [
    "/card/card1men.jpg",
    "/card/card2men.avif",
    "/card/card3men.jpg",
    "/card/card4men.jpg",
    "/card/card5women.jpg",
    "/card/card8women.jpg",
    "/card/card9women.jpg",
    "/card/card10women.jpg",
    "/card/cardfoot1.jpg",
    "/card/cardfoot2.jpg",
    "/card/cardfoot3.jpg",
    "/card/cardfoot4.jpg",
    "/card/cardacc1.jpg",
    "/card/cardacc2.jpg",
    "/card/cardacc3.jpg",
    "/card/cardacc4.jpg",
  ];
  
  return (
    <div className="min-h-screen w-full">
      <MyCarousel />
      <div className="all-cards">
        <div className="grid w-screen max-w-6xl grid-cols-3 md:grid-cols-4 gap-2 mx-auto">
          {cardImages.map((imagesrc, index) => (
            <Link href="/products" key={index} className="h-40 w-22 md:h-75 md:w-60 mx-auto my-2" >
            <Card src={imagesrc}type={index}  />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
