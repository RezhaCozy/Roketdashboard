import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";
import { AlertCircle, CreditCard, ArrowLeft } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";

interface OrderItem {
  id: string;
  title: string;
  price: number;
  description: string;
}

interface CheckoutPageProps {
  orderItems?: OrderItem[];
  onClose?: () => void;
  onSubmit?: () => void;
}

const defaultOrderItems: OrderItem[] = [
  {
    id: "1",
    title: "JASA LANDINGPAGE FULL GAMBAR",
    price: 250000,
    description: "Landing Page Powerfull Konversi diatas 15%",
  },
  {
    id: "2",
    title: "JASA DESAIN KONTEN IKLAN JPG",
    price: 100000,
    description:
      "Konten Iklan Kreatif untuk Facebook Ads / Instagram Ads / Google Ads",
  },
];

const banks = [
  { id: "bca", name: "BCA", account: "1234567890", holder: "PT Roketmarket" },
  {
    id: "mandiri",
    name: "Mandiri",
    account: "0987654321",
    holder: "PT Roketmarket",
  },
  { id: "bni", name: "BNI", account: "1122334455", holder: "PT Roketmarket" },
  { id: "bri", name: "BRI", account: "5544332211", holder: "PT Roketmarket" },
];

const CheckoutPage = ({
  orderItems = defaultOrderItems,
  onClose,
  onSubmit,
}: CheckoutPageProps) => {
  const [selectedBank, setSelectedBank] = useState(banks[0].id);
  const [paymentMethod, setPaymentMethod] = useState("bank");

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + item.price, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    onSubmit?.();
    window.location.hash = "dashboard";
  };

  return (
    <div className="flex flex-col space-y-6 p-6 bg-white min-h-screen">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-semibold">Checkout</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>
                Review your order before proceeding to payment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {orderItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-start p-4 border rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.description}
                      </p>
                    </div>
                    <p className="font-semibold text-primary">
                      IDR {item.price.toLocaleString()}
                    </p>
                  </div>
                ))}

                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Subtotal:</span>
                    <span className="font-semibold">
                      IDR {calculateTotal().toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-medium">Tax (11%):</span>
                    <span className="font-semibold">
                      IDR {Math.round(calculateTotal() * 0.11).toLocaleString()}
                    </span>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total:</span>
                    <span className="text-lg font-bold text-primary">
                      IDR {Math.round(calculateTotal() * 1.11).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Project Requirements</CardTitle>
              <CardDescription>
                Provide details about your project requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="project-brief">Project Brief</Label>
                  <Textarea
                    id="project-brief"
                    placeholder="Describe your project requirements, goals, and any specific preferences..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file-upload">
                    Reference Files (Optional)
                  </Label>
                  <Input id="file-upload" type="file" multiple />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bank" id="bank" />
                    <Label htmlFor="bank">Bank Transfer</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="credit" id="credit" />
                    <Label htmlFor="credit">Credit Card</Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "bank" && (
                  <div className="space-y-4">
                    <Alert className="py-2">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-xs">
                        Please transfer the exact amount to the selected bank
                        account below. Use your email as the transfer
                        description.
                      </AlertDescription>
                    </Alert>

                    <RadioGroup
                      value={selectedBank}
                      onValueChange={setSelectedBank}
                    >
                      <div className="grid grid-cols-1 gap-2">
                        {banks.map((bank) => (
                          <div
                            key={bank.id}
                            className={`border rounded-lg p-3 cursor-pointer transition-colors ${selectedBank === bank.id ? "border-primary bg-primary/5" : ""}`}
                          >
                            <RadioGroupItem
                              value={bank.id}
                              id={bank.id}
                              className="sr-only"
                            />
                            <Label
                              htmlFor={bank.id}
                              className="cursor-pointer space-y-1 block"
                            >
                              <div className="font-medium">{bank.name}</div>
                              <div className="text-sm text-muted-foreground">
                                No. Rekening: {bank.account}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                A/N: {bank.holder}
                              </div>
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {paymentMethod === "credit" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="card-number"
                          placeholder="1234 5678 9012 3456"
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name-on-card">Name on Card</Label>
                      <Input id="name-on-card" placeholder="John Doe" />
                    </div>
                  </div>
                )}

                <div className="pt-4">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={handleSubmit}
                  >
                    Pay IDR{" "}
                    {Math.round(calculateTotal() * 1.11).toLocaleString()}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
