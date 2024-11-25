"use client";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Anh1 from "@/assets/Images/hinh-dep.jpg";
import anh1 from "@/assets/Images/anh1.png";
import anh2 from "@/assets/Images/anh2.png";
import anh3 from "@/assets/Images/anh3.png";
import Image from "next/image";

const data = [
  {
    id: 1,
    image: anh1,
  },
  {
    id: 2,
    image: anh2,
  },
  {
    id: 3,
    image: anh3,
  }
]

export default function CustomCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <div>
      <div className="flex justify-center mt-[37px] w-full">
        <Carousel
          setApi={setApi}
          plugins={[plugin.current]}
          className="w-full rounded-xl"
          onMouseEnter={() => plugin.current.stop()}
          onMouseLeave={() => plugin.current.reset()}
        >
          <CarouselContent>
            {data.map((item, index) => (
              <CarouselItem key={index}>
                <div className="p-1 w-full flex justify-center">
                  <div className="rounded-xl">
                    <Image
                      src={item.image}
                      alt="@shadcn"
                      width={2000}
                      height={1000}
                      className="w-[2000px] h-[150px] md:h-[300px] rounded-xl border-black border-2"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="slide-count py-2 text-center text-sm text-muted-foreground relative">
        {[...Array(count)].map((_, index) => (
          <div
            key={index}
            className={`inline-block h-1 w-8 mx-1 bg-gray-300 rounded-full transition-all duration-300 ${
              index === current - 1 ? "bg-gray-600" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}
