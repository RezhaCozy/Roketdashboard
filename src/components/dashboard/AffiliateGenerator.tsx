import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Copy, Link, Share2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { Alert, AlertDescription } from "../ui/alert";

interface AffiliateGeneratorProps {
  userId?: string;
  userName?: string;
}

const AffiliateGenerator = ({
  userId = "user123",
  userName = "John Doe",
}: AffiliateGeneratorProps) => {
  const [selectedService, setSelectedService] = useState("all");
  const [affiliateLink, setAffiliateLink] = useState(
    `https://roketmarket.com?ref=${userId}`,
  );
  const [copied, setCopied] = useState(false);

  const handleServiceChange = (value: string) => {
    setSelectedService(value);
    if (value === "all") {
      setAffiliateLink(`https://roketmarket.com?ref=${userId}`);
    } else {
      setAffiliateLink(
        `https://roketmarket.com/service/${value}?ref=${userId}`,
      );
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(affiliateLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out Roketmarket",
          text: "I recommend this service on Roketmarket!",
          url: affiliateLink,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Affiliate Link Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="link">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="link">Generate Link</TabsTrigger>
            <TabsTrigger value="materials">Marketing Materials</TabsTrigger>
          </TabsList>

          <TabsContent value="link" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="service">Select Service</Label>
              <Select
                value={selectedService}
                onValueChange={handleServiceChange}
              >
                <SelectTrigger id="service">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services (Homepage)</SelectItem>
                  <SelectItem value="landingpage-full">
                    Landing Page Full Gambar
                  </SelectItem>
                  <SelectItem value="landingpage-responsive">
                    Landing Page Responsive
                  </SelectItem>
                  <SelectItem value="website-development">
                    Website Development
                  </SelectItem>
                  <SelectItem value="canva-template">Canva Template</SelectItem>
                  <SelectItem value="content-design">Content Design</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="affiliate-link">Your Affiliate Link</Label>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="affiliate-link"
                    value={affiliateLink}
                    readOnly
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" onClick={handleCopy}>
                  <Copy className="h-4 w-4 mr-2" />
                  {copied ? "Copied!" : "Copy"}
                </Button>
                <Button variant="outline" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Alert className="mt-4">
              <AlertDescription>
                You earn 10% commission on all purchases made through your
                affiliate link.
              </AlertDescription>
            </Alert>
          </TabsContent>

          <TabsContent value="materials" className="space-y-4 pt-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Marketing Materials</h3>
              <p className="text-sm text-muted-foreground">
                Use these pre-made materials to promote Roketmarket services on
                your social media or website.
              </p>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <img
                      src="https://i.ibb.co/Jk1Lm1L/banner1.jpg"
                      alt="Promotional Banner 1"
                      className="w-full h-auto rounded-md mb-2"
                    />
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          "https://i.ibb.co/Jk1Lm1L/banner1.jpg",
                        );
                      }}
                    >
                      <Copy className="h-4 w-4 mr-2" /> Copy Image URL
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <img
                      src="https://i.ibb.co/Qf7Yd9H/banner2.jpg"
                      alt="Promotional Banner 2"
                      className="w-full h-auto rounded-md mb-2"
                    />
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          "https://i.ibb.co/Qf7Yd9H/banner2.jpg",
                        );
                      }}
                    >
                      <Copy className="h-4 w-4 mr-2" /> Copy Image URL
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AffiliateGenerator;
