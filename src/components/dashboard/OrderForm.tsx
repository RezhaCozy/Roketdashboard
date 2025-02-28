import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Upload, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import { DialogContent } from "../ui/dialog";

interface Service {
  id: string;
  title: string;
  price: number;
}

interface OrderFormProps {
  selectedService?: Service | null;
  onClose?: () => void;
}

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

const OrderForm = ({ selectedService, onClose }: OrderFormProps) => {
  const [selectedBank, setSelectedBank] = useState(banks[0].id);
  const [files, setFiles] = useState<FileList | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    onClose?.();
  };

  return (
    <DialogContent className="max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Service Details */}
            {selectedService && (
              <div className="bg-muted p-4 rounded-lg">
                <p className="font-medium">Selected Service:</p>
                <p className="text-lg font-semibold">{selectedService.title}</p>
                <p className="text-primary font-semibold mt-2">
                  Rp {selectedService.price.toLocaleString()}
                </p>
              </div>
            )}

            {/* Contact Information */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Contact Information</h3>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">WhatsApp Number</Label>
                <Input id="phone" type="tel" required />
              </div>
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <Label>Reference Files (Optional)</Label>
              <div className="border-2 border-dashed rounded-lg p-3 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                <Input
                  type="file"
                  multiple
                  className="hidden"
                  id="files"
                  onChange={(e) => setFiles(e.target.files)}
                  accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                />
                <Label htmlFor="files" className="cursor-pointer">
                  <Upload className="w-6 h-6 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">
                    Drop files here or click to upload
                  </p>
                  {files && (
                    <p className="mt-1 text-xs text-primary">
                      {files.length} file(s) selected
                    </p>
                  )}
                </Label>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Project Brief */}
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Project Brief</h3>
              <Label htmlFor="brief">Project Requirements</Label>
              <Textarea
                id="brief"
                placeholder="Please describe your project requirements, goals, and any specific preferences..."
                className="min-h-[100px]"
                required
              />
            </div>

            {/* Payment Method */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Payment Method</h3>
              <Alert className="py-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  Please transfer the exact amount to the selected bank account
                  below. Use your email as the transfer description.
                </AlertDescription>
              </Alert>
              <RadioGroup value={selectedBank} onValueChange={setSelectedBank}>
                <div className="grid grid-cols-2 gap-2">
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
                        <div className="font-medium text-sm">{bank.name}</div>
                        <div className="text-xs text-muted-foreground">
                          No. Rekening: {bank.account}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          A/N: {bank.holder}
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4 pt-2">
          <Button type="button" variant="outline" onClick={onClose} size="sm">
            Cancel
          </Button>
          <Button type="submit" size="sm">
            Place Order
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};

export default OrderForm;
