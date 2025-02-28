import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  ArrowRight,
  ShoppingCart,
  Package,
  FileText,
  CheckCircle,
  Plus,
  Minus,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import OrderForm from "./OrderForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import { Checkbox } from "../ui/checkbox";

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

interface ServicesPageProps {
  services?: Service[];
}

const defaultServices: Service[] = [
  {
    id: "1",
    title: "JASA LANDINGPAGE FULL GAMBAR",
    description: "Landing Page Powerfull Konversi diatas 15%",
    price: 250000,
    imageUrl: "https://i.ibb.co/VvC0vpN/service1.png",
    category: "web",
  },
  {
    id: "2",
    title: "JASA LANDINGPAGE RESPONSIVE",
    description: "Landingpage Responsive Keren Konversi Kenceng!",
    price: 499000,
    imageUrl: "https://i.ibb.co/M6QMXLF/service2.png",
    category: "web",
  },
  {
    id: "3",
    title: "JASA LANDINGPAGE PREMIUM",
    description: "Landingpage Premium dengan Fitur Lengkap",
    price: 750000,
    imageUrl: "https://i.ibb.co/M6QMXLF/service2.png",
    category: "web",
  },
  {
    id: "4",
    title: "JASA PEMBUATAN WEBSITE",
    description:
      "Buat Bisnis Onlinemu Menjadi Lebih Profesional dengan Website Berkualitas Tinggi",
    price: 1500000,
    imageUrl: "https://i.ibb.co/Xy6Wbf4/service4.png",
    category: "web",
  },
  {
    id: "5",
    title: "MASTERAN CANVA LANDINGPAGE",
    description: "Template Landingpage Canva BEST DEAL",
    price: 120000,
    imageUrl: "https://i.ibb.co/wQZ9q83/service5.png",
    category: "template",
  },
  {
    id: "6",
    title: "JASA RISET PRODUK UNTUK IKLAN",
    description: "Jasa Riset Produk dari Marketplace untuk Testing Iklan",
    price: 100000,
    imageUrl: "https://i.ibb.co/VxKvzNv/service6.png",
    category: "marketing",
  },
  {
    id: "7",
    title: "NEBENG HOSTING CEPAT/VPS",
    description:
      "Tingkatkan Kecepatan dan Kinerja Website-mu dengan Hosting VPS",
    price: 499000,
    imageUrl: "https://i.ibb.co/Lp0X4Ls/service7.png",
    category: "hosting",
  },
  {
    id: "8",
    title: "JASA DESAIN KONTEN IKLAN JPG",
    description:
      "Konten Iklan Kreatif untuk Facebook Ads / Instagram Ads / Google Ads",
    price: 100000,
    imageUrl: "https://i.ibb.co/VCyW0LH/service8.png",
    category: "design",
  },
  {
    id: "9",
    title: "JASA DESAIN KONTEN IKLAN GIF",
    description:
      "Bikin Iklanmu Makin Dinamis dan Menarik dengan Konten Iklan Format GIF",
    price: 150000,
    imageUrl: "https://i.ibb.co/G3QvGxQ/service9.png",
    category: "design",
  },
  {
    id: "10",
    title: "JASA ADSCOPY IKLAN",
    description: "Buat Iklan Lebih Efektif dengan Copywriting yang Tepat",
    price: 100000,
    imageUrl: "https://i.ibb.co/Xt8TLHP/service10.png",
    category: "marketing",
  },
  {
    id: "11",
    title: "PAKET REBRANDING PRODUK",
    description:
      "Paket Lengkap Rebranding Produk dari Marketplace sampai Siap Ngiklan",
    price: 499000,
    imageUrl: "https://i.ibb.co/VxKvzNv/service11.png",
    category: "marketing",
  },
  {
    id: "12",
    title: "JASA VIDEO ADS/IKLAN/PROMOSI",
    description: "Jasa Pembuatan Video Ads Profesional untuk Promosi Produk",
    price: 750000,
    imageUrl: "https://i.ibb.co/G3QvGxQ/service12.png",
    category: "design",
  },
];

const ServicesPage = ({ services = defaultServices }: ServicesPageProps) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [bulkOrderDialogOpen, setBulkOrderDialogOpen] = useState(false);
  const [bulkOrderItems, setBulkOrderItems] = useState<
    { service: Service; quantity: number }[]
  >([]);

  // Get unique categories
  const categories = [
    "all",
    ...new Set(services.map((service) => service.category)),
  ];

  // Filter services based on active tab
  const filteredServices = services.filter((service) => {
    if (activeTab === "all") return true;
    return service.category === activeTab;
  });

  const handleAddToBulkOrder = (service: Service) => {
    const existingItem = bulkOrderItems.find(
      (item) => item.service.id === service.id,
    );
    if (existingItem) {
      setBulkOrderItems(
        bulkOrderItems.map((item) =>
          item.service.id === service.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setBulkOrderItems([...bulkOrderItems, { service, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (serviceId: string, change: number) => {
    setBulkOrderItems(
      bulkOrderItems.map((item) => {
        if (item.service.id === serviceId) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }),
    );
  };

  const handleRemoveFromBulkOrder = (serviceId: string) => {
    setBulkOrderItems(
      bulkOrderItems.filter((item) => item.service.id !== serviceId),
    );
  };

  const calculateTotal = () => {
    return bulkOrderItems.reduce(
      (total, item) => total + item.service.price * item.quantity,
      0,
    );
  };

  return (
    <div className="flex flex-col space-y-6 p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Our Services</h2>
          <p className="text-muted-foreground">
            Explore our range of professional services
          </p>
        </div>
        <Button
          onClick={() => setBulkOrderDialogOpen(true)}
          className="flex items-center gap-2"
          variant="outline"
        >
          <Package className="h-4 w-4" />
          Bulk Order ({bulkOrderItems.length})
        </Button>
      </div>

      {/* How to Order Section */}
      <Card>
        <CardHeader>
          <CardTitle>How to Order</CardTitle>
          <CardDescription>
            Follow these simple steps to place your order
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <ShoppingCart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">1. Select Services</h3>
              <p className="text-sm text-muted-foreground">
                Browse our services and select the ones you need
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">2. Fill Requirements</h3>
              <p className="text-sm text-muted-foreground">
                Provide details about your project requirements
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">3. Complete Payment</h3>
              <p className="text-sm text-muted-foreground">
                Pay securely and we'll start working on your order
              </p>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-2">
              Bulk Order Available
            </h3>
            <p className="text-sm text-blue-700 mb-4">
              Need multiple services? Use our bulk order feature to order
              multiple services at once and save time.
            </p>
            <Button
              onClick={() => setBulkOrderDialogOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Package className="h-4 w-4 mr-2" />
              Start Bulk Order
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Services List */}
      <Card>
        <CardHeader>
          <CardTitle>Available Services</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="mb-6">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                  <Card
                    key={service.id}
                    className="transition-all hover:shadow-lg"
                  >
                    <CardHeader className="p-0">
                      <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
                        <img
                          src={service.imageUrl}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <CardTitle className="text-lg">
                          {service.title}
                        </CardTitle>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {service.description}
                        </p>
                        <p className="mt-4 text-lg font-semibold text-[#3730A3]">
                          IDR {service.price.toLocaleString()}
                        </p>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-6 flex gap-2">
                      <Button
                        className="flex-1 group bg-[#3730A3] hover:bg-[#2D2583] text-white"
                        onClick={() => setSelectedService(service)}
                      >
                        ORDER
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                      <Button
                        variant="outline"
                        className="flex items-center"
                        onClick={() => handleAddToBulkOrder(service)}
                      >
                        Add to Bulk
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Order Dialog */}
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

      {/* Bulk Order Dialog */}
      <Dialog open={bulkOrderDialogOpen} onOpenChange={setBulkOrderDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Bulk Order</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {bulkOrderItems.length === 0 ? (
              <div className="text-center py-8">
                <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  Your bulk order is empty
                </h3>
                <p className="text-muted-foreground mb-4">
                  Add services to your bulk order to get started
                </p>
                <Button onClick={() => setBulkOrderDialogOpen(false)}>
                  Browse Services
                </Button>
              </div>
            ) : (
              <>
                <ScrollArea className="max-h-[400px]">
                  <div className="space-y-4">
                    {bulkOrderItems.map((item) => (
                      <div
                        key={item.service.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={item.service.imageUrl}
                            alt={item.service.title}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <div>
                            <p className="font-medium">{item.service.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {item.service.description}
                            </p>
                            <p className="text-primary font-semibold mt-1">
                              IDR {item.service.price.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              handleQuantityChange(item.service.id, -1)
                            }
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              handleQuantityChange(item.service.id, 1)
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 ml-2"
                            onClick={() =>
                              handleRemoveFromBulkOrder(item.service.id)
                            }
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <Separator />

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total:</span>
                    <span className="text-lg font-bold text-primary">
                      IDR {calculateTotal().toLocaleString()}
                    </span>
                  </div>

                  {/* Bundle Options */}
                  <div className="mt-6 p-4 border rounded-lg bg-gray-50">
                    <h3 className="font-medium mb-3">Bundle Options</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="bundle-discount" />
                        <Label htmlFor="bundle-discount" className="text-sm">
                          Apply 10% Bundle Discount
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="express-delivery" />
                        <Label htmlFor="express-delivery" className="text-sm">
                          Express Delivery (+IDR 150,000)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="premium-support" />
                        <Label htmlFor="premium-support" className="text-sm">
                          Premium Support Package (+IDR 200,000)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="seo-package" />
                        <Label htmlFor="seo-package" className="text-sm">
                          SEO Optimization Package (+IDR 350,000)
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="project-brief">Project Brief</Label>
                    <Textarea
                      id="project-brief"
                      placeholder="Describe your project requirements here..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setBulkOrderDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button>Proceed to Checkout</Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServicesPage;
