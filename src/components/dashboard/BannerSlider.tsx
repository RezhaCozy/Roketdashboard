import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import type { CarouselApi } from "../ui/carousel";

interface Banner {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
}

interface BannerSliderProps {
  banners?: Banner[];
}

const defaultBanners: Banner[] = [
  {
    id: "1",
    imageUrl: "https://i.ibb.co/Jk1Lm1L/banner1.jpg",
    title: "Welcome to Roketmarket",
    description: "Your one-stop solution for digital marketing needs",
  },
  {
    id: "2",
    imageUrl: "https://i.ibb.co/Qf7Yd9H/banner2.jpg",
    title: "Professional Services",
    description: "Explore our range of digital marketing services",
  },
  {
    id: "3",
    imageUrl: "https://i.ibb.co/Lk8MMHJ/banner3.jpg",
    title: "Expert Solutions",
    description: "Get started with our marketing packages today",
  },
];

const BannerSlider = ({ banners = defaultBanners }: BannerSliderProps) => {
  const [api, setApi] = React.useState<CarouselApi>();

  React.useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <Carousel className="w-full" setApi={setApi}>
      <CarouselContent className="-ml-2 md:-ml-4">
        {banners.map((banner) => (
          <CarouselItem
            key={banner.id}
            className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-[25%] first:lg:basis-[25%] [&:nth-child(2)]:lg:basis-[50%] last:lg:basis-[25%]"
          >
            <div className="relative h-[400px] w-full overflow-hidden rounded-xl">
              <img
                src={banner.imageUrl}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {banner.title}
                </h2>
                <p className="text-white/90">{banner.description}</p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default BannerSlider;
