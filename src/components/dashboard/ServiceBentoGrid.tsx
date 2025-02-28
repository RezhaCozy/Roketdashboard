import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import OrderForm from "./OrderForm";
import { useState } from "react";

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  size?: "small" | "medium" | "large";
  highlight?: boolean;
}

interface ServiceBentoGridProps {
  services?: Service[];
}

const defaultServices: Service[] = [
  {
    id: "1",
    title: "JASA LANDINGPAGE FULL GAMBAR",
    description: "Landing Page Powerfull Konversi diatas 15%",
    price: 250000,
    imageUrl:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=2069&auto=format&fit=crop",
    size: "medium",
    highlight: true,
  },
  {
    id: "2",
    title: "JASA LANDINGPAGE RESPONSIVE",
    description: "Landingpage Responsive Keren Konversi Kenceng!",
    price: 499000,
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    size: "small",
  },
  {
    id: "3",
    title: "JASA LANDINGPAGE PREMIUM",
    description: "Landingpage Premium dengan Fitur Lengkap",
    price: 750000,
    imageUrl:
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=2070&auto=format&fit=crop",
    size: "small",
  },
  {
    id: "4",
    title: "JASA PEMBUATAN WEBSITE",
    description:
      "Buat Bisnis Onlinemu Menjadi Lebih Profesional dengan Website Berkualitas Tinggi",
    price: 1500000,
    imageUrl:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2064&auto=format&fit=crop",
    size: "large",
    highlight: true,
  },
  {
    id: "5",
    title: "MASTERAN CANVA LANDINGPAGE",
    description: "Template Landingpage Canva BEST DEAL",
    price: 120000,
    imageUrl:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop",
    size: "small",
  },
  {
    id: "6",
    title: "JASA RISET PRODUK UNTUK IKLAN",
    description: "Jasa Riset Produk dari Marketplace untuk Testing Iklan",
    price: 100000,
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    size: "small",
  },
  {
    id: "7",
    title: "NEBENG HOSTING CEPAT/VPS",
    description:
      "Tingkatkan Kecepatan dan Kinerja Website-mu dengan Hosting VPS",
    price: 499000,
    imageUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop",
    size: "medium",
  },
  {
    id: "8",
    title: "JASA DESAIN KONTEN IKLAN JPG",
    description:
      "Konten Iklan Kreatif untuk Facebook Ads / Instagram Ads / Google Ads",
    price: 100000,
    imageUrl:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
    size: "small",
  },
];

const ServiceBentoGrid = ({
  services = defaultServices,
}: ServiceBentoGridProps) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <div className="w-full bg-background p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Promo Layanan</h2>
        <p className="text-muted-foreground">
          Layanan terbaik untuk kebutuhan digital marketing Anda
        </p>
      </div>

      <div className="grid grid-cols-4 auto-rows-[180px] gap-4">
        {services.map((service) => {
          // Determine the size of the card based on the service size
          const sizeClasses = {
            small: "col-span-1 row-span-1",
            medium: "col-span-2 row-span-1",
            large: "col-span-2 row-span-2",
          }[service.size || "small"];

          return (
            <Card
              key={service.id}
              className={`${sizeClasses} overflow-hidden transition-all hover:shadow-lg cursor-pointer group ${service.highlight ? "ring-2 ring-primary/50" : ""}`}
              onClick={() => setSelectedService(service)}
            >
              <div className="relative h-full w-full overflow-hidden">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex flex-col justify-end">
                  <div>
                    <h3 className="font-bold text-white text-lg line-clamp-1">
                      {service.title}
                    </h3>
                    {(service.size === "medium" ||
                      service.size === "large") && (
                      <p className="text-white/80 text-sm mt-1 line-clamp-2">
                        {service.description}
                      </p>
                    )}
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-white font-semibold">
                        IDR {service.price.toLocaleString()}
                      </p>
                      <Button
                        size="sm"
                        className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 group-hover:translate-x-1 transition-transform"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Dialog
        open={!!selectedService}
        onOpenChange={() => setSelectedService(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedService?.title}</DialogTitle>
          </DialogHeader>
          <OrderForm
            selectedService={selectedService}
            onClose={() => setSelectedService(null)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServiceBentoGrid;
