import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
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
}

interface ServiceGridProps {
  services?: Service[];
}

const defaultServices: Service[] = [
  {
    id: "1",
    title: "JASA LANDINGPAGE FULL GAMBAR",
    description: "Landing Page Powerfull Konversi diatas 15%",
    price: 250000,
    imageUrl: "https://i.ibb.co/VvC0vpN/service1.png",
  },
  {
    id: "2",
    title: "JASA LANDINGPAGE RESPONSIVE",
    description: "Landingpage Responsive Keren Konversi Kenceng!",
    price: 499000,
    imageUrl: "https://i.ibb.co/M6QMXLF/service2.png",
  },
  {
    id: "3",
    title: "JASA LANDINGPAGE RESPONSIVE",
    description: "Landingpage Responsive Keren Konversi Kenceng!",
    price: 750000,
    imageUrl: "https://i.ibb.co/M6QMXLF/service2.png",
  },
  {
    id: "4",
    title: "JASA PEMBUATAN WEBSITE",
    description:
      "Buat Bisnis Onlinemu Menjadi Lebih Profesional dengan Website Berkualitas Tinggi",
    price: 1500000,
    imageUrl: "https://i.ibb.co/Xy6Wbf4/service4.png",
  },
  {
    id: "5",
    title: "MASTERAN CANVA LANDINGPAGE",
    description: "Template Landingpage Canva BEST DEAL",
    price: 120000,
    imageUrl: "https://i.ibb.co/wQZ9q83/service5.png",
  },
  {
    id: "6",
    title: "JASA RISET PRODUK UNTUK IKLAN",
    description: "Jasa Riset Produk dari Marketplace untuk Testing Iklan",
    price: 100000,
    imageUrl: "https://i.ibb.co/VxKvzNv/service6.png",
  },
  {
    id: "7",
    title: "NEBENG HOSTING CEPAT/VPS",
    description:
      "Tingkatkan Kecepatan dan Kinerja Website-mu dengan Hosting VPS",
    price: 499000,
    imageUrl: "https://i.ibb.co/Lp0X4Ls/service7.png",
  },
  {
    id: "8",
    title: "JASA DESAIN KONTEN IKLAN JPG",
    description:
      "Konten Iklan Kreatif untuk Facebook Ads / Instagram Ads / Google Ads",
    price: 100000,
    imageUrl: "https://i.ibb.co/VCyW0LH/service8.png",
  },
  {
    id: "9",
    title: "JASA DESAIN KONTEN IKLAN GIF",
    description:
      "Bikin Iklanmu Makin Dinamis dan Menarik dengan Konten Iklan Format GIF",
    price: 150000,
    imageUrl: "https://i.ibb.co/G3QvGxQ/service9.png",
  },
  {
    id: "10",
    title: "JASA ADSCOPY IKLAN",
    description: "Buat Iklan Lebih Efektif dengan Copywriting yang Tepat",
    price: 100000,
    imageUrl: "https://i.ibb.co/Xt8TLHP/service10.png",
  },
  {
    id: "11",
    title: "PAKET REBRANDING PRODUK",
    description:
      "Paket Lengkap Rebranding Produk dari Marketplace sampai Siap Ngiklan",
    price: 499000,
    imageUrl: "https://i.ibb.co/VxKvzNv/service11.png",
  },
  {
    id: "12",
    title: "JASA VIDEO ADS/IKLAN/PROMOSI",
    description: "Jasa Pembuatan Video Ads Profesional untuk Promosi Produk",
    price: 750000,
    imageUrl: "https://i.ibb.co/G3QvGxQ/service12.png",
  },
];

const ServiceGrid = ({ services = defaultServices }: ServiceGridProps) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <div className="w-full bg-background p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Our Services</h2>
        <p className="text-muted-foreground">
          Explore our range of professional services
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service.id} className="transition-all hover:shadow-lg">
            <CardHeader className="p-0">
              <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <CardTitle className="text-lg">{service.title}</CardTitle>
                <p className="mt-2 text-sm text-muted-foreground">
                  {service.description}
                </p>
                <p className="mt-4 text-lg font-semibold text-[#3730A3]">
                  IDR {service.price.toLocaleString()}
                </p>
              </div>
            </CardHeader>
            <CardContent className="pb-6">
              <Button
                className="w-full group bg-[#3730A3] hover:bg-[#2D2583] text-white"
                onClick={() => setSelectedService(service)}
              >
                ORDER
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog
        open={!!selectedService}
        onOpenChange={() => setSelectedService(null)}
      >
        <DialogContent className="max-w-3xl">
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

export default ServiceGrid;
