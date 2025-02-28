import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface WithdrawFormProps {
  balance?: number;
  onClose?: () => void;
  onSubmit?: () => void;
}

const banks = [
  { id: "bca", name: "BCA", account: "", holder: "" },
  { id: "mandiri", name: "Mandiri", account: "", holder: "" },
  { id: "bni", name: "BNI", account: "", holder: "" },
  { id: "bri", name: "BRI", account: "", holder: "" },
];

const WithdrawForm = ({
  balance = 0,
  onClose,
  onSubmit,
}: WithdrawFormProps) => {
  const [selectedBank, setSelectedBank] = useState(banks[0].id);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState(balance.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    onSubmit?.();
    onClose?.();
  };

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>Withdraw Funds</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-muted p-4 rounded-lg">
          <p className="font-medium">Available Balance:</p>
          <p className="text-xl font-bold text-primary">
            IDR {balance.toLocaleString()}
          </p>
        </div>

        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="amount">Withdraw Amount</Label>
            <Input
              id="amount"
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              max={balance}
              required
            />
          </div>

          <Alert className="py-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              Withdrawals are processed within 1-3 business days. Minimum
              withdrawal amount is IDR 50,000.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label>Bank Account</Label>
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
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="account-number">Account Number</Label>
            <Input
              id="account-number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="account-name">Account Holder Name</Label>
            <Input
              id="account-name"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-2">
          <Button type="button" variant="outline" onClick={onClose} size="sm">
            Cancel
          </Button>
          <Button type="submit" size="sm">
            Submit Withdrawal
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};

export default WithdrawForm;
