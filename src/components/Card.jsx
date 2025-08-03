import Image from "next/image";
import React from "react";

const Card = ({ src, type }) => {
  const outfitType = [
    "Casual",
    "Formal",
    "Party Wear",
    "Wedding",
    "Traditional",
    "Festive Wear",
    "Ethnic",
    "Streetwear",
    "Sneakers",
    "Sports Shoes",
    "Loafers",
    "Formal Shoes",
    "Watches",
    "Casual Belt",
    "Multi-Groomer",
    "Beauty",
  ];

  return (
    <div className="h-42 w-22 md:h-75 md:w-60 rounded-2xl border md:m-5 overflow-hidden transform transition duration-300 hover:scale-105 shadow-2xl">
      <div className="h-35 w-22 md:h-65 md:w-60 relative">
        <Image
          src={src}
          alt="card-image"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
          className="object-cover"
        />
      </div>
      <div className="flex items-end justify-center">
        <h2 className="text-[10px] md:text-lg md:font-semibold p-2">{outfitType[type]}</h2>
      </div>
    </div>
  );
};

export default Card;
