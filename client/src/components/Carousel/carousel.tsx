'use client'
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
import Image from 'next/image';

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

  const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <div>
      <div className="flex justify-center w-full">
        <Carousel
          setApi={setApi}
          plugins={[plugin.current]}
          className="w-[90%] rounded-xl"
          onMouseEnter={() => plugin.current.stop()}
          onMouseLeave={() => plugin.current.reset()}
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1 w-full flex justify-center rounded-xl">
                  <div className="">
                    <Image
                      src={Anh1}
                      alt="@shadcn"
                      className="w-[1500px] h-[300px] rounded-xl"
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
