"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export function MyCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  const images = [
    "/carousel/banner2.jpg",
    "/carousel/banner3.webp",
    "/carousel/banner4.jpg",
    "/carousel/banner5.png",
    "/carousel/banner6.jpg",
  ];
  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-screen overflow-hidden"
      opts={{ loop: true }}
      onMouseEnter={() => plugin.current.stop()}
      onMouseLeave={() => plugin.current.play()}
    >
      <CarouselContent className="flex">
        {images.map((imgsrc, index) => (
          <CarouselItem key={index} className="basis-full relative h-40 md:h-[250px] lg:h-[400px]">
            <Image
              src={imgsrc}
              alt="Fashion Banner"
              fill
              sizes="100vw" 
              className="object-cover"
              priority
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
