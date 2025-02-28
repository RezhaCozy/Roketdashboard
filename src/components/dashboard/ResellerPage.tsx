import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Progress } from "../ui/progress";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import {
  Users,
  UserPlus,
  Award,
  Download,
  Link,
  Share2,
  Copy,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  FileText,
  Image,
} from "lucide-react";

interface SubReseller {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  sales: number;
  commission: number;
  level: "Tier 1" | "Tier 2" | "Tier 3";
  avatar: string;
  active: boolean;
}

interface MarketingKit {
  id: string;
  title: string;
  description: string;
  type: "image" | "document" | "video";
  thumbnail: string;
  downloadUrl: string;
}

interface ResellerPageProps {
  subResellers?: SubReseller[];
  marketingKits?: MarketingKit[];
  userLevel?: "Tier 1" | "Tier 2" | "Tier 3";
  salesTarget?: number;
  currentSales?: number;
  nextLevel?: "Tier 1" | "Tier 2" | "Tier 3";
}

const defaultSubResellers: SubReseller[] = [
  {
    id: "sr1",
    name: "Alex Johnson",
    email: "alex@example.com",
    joinDate: "2024-02-15",
    sales: 2500000,
    commission: 250000,
    level: "Tier 3",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    active: true,
  },
  {
    id: "sr2",
    name: "Maria Garcia",
    email: "maria@example.com",
    joinDate: "2024-02-20",
    sales: 1800000,
    commission: 180000,
    level: "Tier 1",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    active: true,
  },
  {
    id: "sr3",
    name: "James Wilson",
    email: "james@example.com",
    joinDate: "2024-03-01",
    sales: 3200000,
    commission: 320000,
    level: "Tier 2",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    active: true,
  },
  {
    id: "sr4",
    name: "Linda Chen",
    email: "linda@example.com",
    joinDate: "2024-03-05",
    sales: 950000,
    commission: 95000,
    level: "Tier 1",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Linda",
    active: false,
  },
];

const defaultMarketingKits: MarketingKit[] = [
  {
    id: "mk1",
    title: "Social Media Banner Pack",
    description: "High-quality banners for Facebook, Instagram, and Twitter",
    type: "image",
    thumbnail: "https://i.ibb.co/Jk1Lm1L/banner1.jpg",
    downloadUrl: "#",
  },
  {
    id: "mk2",
    title: "Product Presentation Template",
    description: "Professional PowerPoint template for product presentations",
    type: "document",
    thumbnail: "https://i.ibb.co/Qf7Yd9H/banner2.jpg",
    downloadUrl: "#",
  },
  {
    id: "mk3",
    title: "Email Marketing Templates",
    description: "Ready-to-use email templates for marketing campaigns",
    type: "document",
    thumbnail: "https://i.ibb.co/Lk8MMHJ/banner3.jpg",
    downloadUrl: "#",
  },
  {
    id: "mk4",
    title: "Promotional Video Templates",
    description: "Editable video templates for social media promotions",
    type: "video",
    thumbnail: "https://i.ibb.co/VvC0vpN/service1.png",
    downloadUrl: "#",
  },
  {
    id: "mk5",
    title: "Sales Pitch Guide",
    description: "Comprehensive guide for effective sales pitches",
    type: "document",
    thumbnail: "https://i.ibb.co/M6QMXLF/service2.png",
    downloadUrl: "#",
  },
  {
    id: "mk6",
    title: "Product Catalog Template",
    description: "Customizable product catalog template",
    type: "document",
    thumbnail: "https://i.ibb.co/Xy6Wbf4/service4.png",
    downloadUrl: "#",
  },
];

const ResellerPage = ({
  subResellers = defaultSubResellers,
  marketingKits = defaultMarketingKits,
  userLevel = "Tier 2",
  salesTarget = 5000000,
  currentSales = 3200000,
  nextLevel = "Tier 3",
}: ResellerPageProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [recruitDialogOpen, setRecruitDialogOpen] = useState(false);
  const [expandedCommissionInfo, setExpandedCommissionInfo] = useState(false);
  const [affiliateLink, setAffiliateLink] = useState(
    "https://roketmarket.com?ref=user123",
  );
  const [copied, setCopied] = useState(false);

  // Progress percentage towards next level
  const progressPercentage = Math.min(
    Math.round((currentSales / salesTarget) * 100),
    100,
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(affiliateLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join Roketmarket Reseller Program",
          text: "Become a reseller and earn commissions with Roketmarket!",
          url: affiliateLink,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "image":
        return <Image className="h-5 w-5" />;
      case "document":
        return <FileText className="h-5 w-5" />;
      case "video":
        return <FileText className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <div className="flex flex-col space-y-6 p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Reseller Program</h2>
        <div className="flex items-center gap-2">
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-3 py-1">
            <Award className="w-4 h-4 mr-1" />
            {userLevel} Level
          </Badge>
          <Button
            onClick={() => setRecruitDialogOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Recruit Reseller
          </Button>
        </div>
      </div>

      {/* Level Progress */}
      <Card className="mb-2">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-2">
            <div>
              <p className="text-sm font-medium">Progress to {nextLevel}</p>
              <p className="text-xs text-muted-foreground">
                IDR {currentSales.toLocaleString()} / IDR{" "}
                {salesTarget.toLocaleString()}
              </p>
            </div>
            <Badge variant="outline" className="font-normal">
              {progressPercentage}%
            </Badge>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">
            Sell IDR {(salesTarget - currentSales).toLocaleString()} more to
            reach {nextLevel} level
          </p>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="team">My Team</TabsTrigger>
          <TabsTrigger value="mlm">MLM Structure</TabsTrigger>
          <TabsTrigger value="marketing">Marketing Kit</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="pt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Resellers
                    </p>
                    <p className="text-2xl font-bold">{subResellers.length}</p>
                  </div>
                  <div className="p-2 bg-indigo-100 rounded-full">
                    <Users className="h-5 w-5 text-indigo-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Team Sales</p>
                    <p className="text-2xl font-bold">
                      IDR{" "}
                      {subResellers
                        .reduce((sum, r) => sum + r.sales, 0)
                        .toLocaleString()}
                    </p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-full">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Commissions
                    </p>
                    <p className="text-2xl font-bold">
                      IDR{" "}
                      {subResellers
                        .reduce((sum, r) => sum + r.commission, 0)
                        .toLocaleString()}
                    </p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Award className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Reseller Recruitment</CardTitle>
              <CardDescription>
                Share your affiliate link to recruit new resellers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-md font-medium text-blue-800 mb-2">
                  How to Recruit Resellers
                </h3>
                <ol className="list-decimal list-inside text-blue-700 space-y-2">
                  <li>Share your affiliate link with potential resellers</li>
                  <li>
                    When they sign up using your link, they'll be added to your
                    team
                  </li>
                  <li>
                    You'll earn commissions from their sales based on your level
                  </li>
                  <li>
                    Help them grow their business to increase your earnings
                  </li>
                </ol>
                <Button
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white w-full"
                  onClick={() => setRecruitDialogOpen(true)}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Invite New Reseller
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="pt-6">
          <Card>
            <CardHeader>
              <CardTitle>My Reseller Team</CardTitle>
              <CardDescription>
                Manage your team of sub-resellers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium">Team Performance</h3>
                    <p className="text-sm text-muted-foreground">
                      Total team members: {subResellers.length}
                    </p>
                  </div>
                  <Button
                    onClick={() => setRecruitDialogOpen(true)}
                    variant="outline"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Member
                  </Button>
                </div>

                <ScrollArea className="h-[500px]">
                  <div className="space-y-4">
                    {subResellers.map((reseller) => (
                      <div
                        key={reseller.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <img
                            src={reseller.avatar}
                            alt={reseller.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <div className="flex items-center">
                              <p className="font-medium">{reseller.name}</p>
                              <Badge className="ml-2 bg-blue-100 text-blue-800">
                                {reseller.level}
                              </Badge>
                              {!reseller.active && (
                                <Badge className="ml-2 bg-red-100 text-red-800">
                                  Inactive
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">
                              {reseller.email}
                            </p>
                            <p className="text-xs text-gray-400">
                              Joined: {reseller.joinDate}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col items-end space-y-1">
                          <span className="font-semibold text-green-600">
                            +IDR {reseller.commission.toLocaleString()}
                          </span>
                          <span className="text-xs text-gray-500">
                            Sales: IDR {reseller.sales.toLocaleString()}
                          </span>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs flex items-center"
                            >
                              View Details
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs flex items-center text-blue-600"
                            >
                              <TrendingUp className="h-3 w-3 mr-1" />{" "}
                              Performance
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mlm" className="pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Multi-Level Marketing Structure</CardTitle>
              <CardDescription>
                Understand how our MLM system works and your earnings potential
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-blue-800">
                      Commission Structure
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setExpandedCommissionInfo(!expandedCommissionInfo)
                      }
                      className="text-blue-800"
                    >
                      {expandedCommissionInfo ? (
                        <>
                          <ChevronUp className="h-4 w-4 mr-1" /> Less Info
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4 mr-1" /> More Info
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-800 mb-2">
                        Level 1 (Direct)
                      </h4>
                      <p className="text-2xl font-bold text-blue-900">10%</p>
                      <p className="text-sm text-blue-700">
                        Commission on direct referrals
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-800 mb-2">
                        Level 2
                      </h4>
                      <p className="text-2xl font-bold text-blue-900">5%</p>
                      <p className="text-sm text-blue-700">
                        Commission from sub-resellers
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-800 mb-2">
                        Level 3
                      </h4>
                      <p className="text-2xl font-bold text-blue-900">2%</p>
                      <p className="text-sm text-blue-700">
                        Commission from level 3 resellers
                      </p>
                    </div>
                  </div>

                  {expandedCommissionInfo && (
                    <div className="mt-4">
                      <Separator className="my-4" />
                      <h4 className="font-medium mb-2">
                        Recurring Commission Structure
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Our MLM system provides recurring commissions on
                        subscription services and repeat purchases.
                      </p>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Subscription Services</span>
                          <span className="font-medium">
                            5% monthly recurring
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Repeat Purchases</span>
                          <span className="font-medium">
                            3% lifetime commission
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Hosting & Maintenance</span>
                          <span className="font-medium">
                            7% annual recurring
                          </span>
                        </div>
                      </div>

                      <Separator className="my-4" />

                      <h4 className="font-medium mb-2">Rank Advancement</h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Tier 1</span>
                            <span>0 - 2,000,000 IDR in sales</span>
                          </div>
                          <Progress value={100} className="h-2 mt-1" />
                        </div>
                        <div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Tier 2</span>
                            <span>2,000,000 - 5,000,000 IDR in sales</span>
                          </div>
                          <Progress value={60} className="h-2 mt-1" />
                        </div>
                        <div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Tier 3</span>
                            <span>5,000,000+ IDR in sales</span>
                          </div>
                          <Progress value={0} className="h-2 mt-1" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Your MLM Network</h3>
                  <div className="relative">
                    {/* Simple visualization of MLM structure */}
                    <div className="flex justify-center mb-8">
                      <div className="bg-blue-100 border-2 border-blue-500 rounded-lg p-3 text-center w-40">
                        <p className="font-bold">You</p>
                        <p className="text-sm">{userLevel}</p>
                      </div>
                    </div>

                    <div className="flex justify-center mb-8">
                      <div className="grid grid-cols-3 gap-8">
                        {subResellers.slice(0, 3).map((reseller) => (
                          <div
                            key={reseller.id}
                            className="bg-green-50 border border-green-300 rounded-lg p-3 text-center w-32"
                          >
                            <p className="font-medium">{reseller.name}</p>
                            <p className="text-xs">{reseller.level}</p>
                            <div className="mt-1 w-full h-0.5 bg-gray-200"></div>
                            <p className="text-xs mt-1">
                              IDR {reseller.sales.toLocaleString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <div className="grid grid-cols-4 gap-4">
                        {Array(4)
                          .fill(0)
                          .map((_, i) => (
                            <div
                              key={i}
                              className="bg-gray-50 border border-gray-200 rounded-lg p-2 text-center w-24"
                            >
                              <p className="text-xs font-medium">Level 3</p>
                              <p className="text-xs text-gray-500">
                                +{Math.floor(Math.random() * 5) + 1} members
                              </p>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Connecting lines */}
                    <div className="absolute top-12 left-1/2 w-0.5 h-8 bg-blue-300 -ml-0.5"></div>
                    <div className="absolute top-20 left-1/2 w-40 h-0.5 bg-blue-300 -ml-20"></div>
                    <div className="absolute top-20 left-1/2 w-40 h-0.5 bg-blue-300 -ml-0.5"></div>
                    <div className="absolute top-20 left-1/2 w-0.5 h-8 bg-blue-300 -ml-20"></div>
                    <div className="absolute top-20 left-1/2 w-0.5 h-8 bg-blue-300 ml-20"></div>
                    <div className="absolute top-20 left-1/2 w-0.5 h-8 bg-blue-300 -ml-0.5"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="marketing" className="pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Marketing Kit</CardTitle>
              <CardDescription>
                Download marketing materials to promote our services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {marketingKits.map((kit) => (
                  <Card key={kit.id} className="overflow-hidden">
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={kit.thumbnail}
                        alt={kit.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-1">
                        {getTypeIcon(kit.type)}
                        <h3 className="font-medium">{kit.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {kit.description}
                      </p>
                      <Button
                        variant="outline"
                        className="w-full flex items-center justify-center gap-2"
                        onClick={() => window.open(kit.downloadUrl, "_blank")}
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recruit Reseller Dialog */}
      <Dialog open={recruitDialogOpen} onOpenChange={setRecruitDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Invite New Reseller</DialogTitle>
            <DialogDescription>
              Invite someone to join your reseller network and earn commissions
              from their sales.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter their name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter their email address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number (WhatsApp)</Label>
              <Input id="phone" placeholder="Enter their phone number" />
            </div>

            <div className="bg-blue-50 p-3 rounded-md text-sm">
              <p className="font-medium text-blue-800">Reseller Benefits</p>
              <ul className="list-disc list-inside text-blue-700 mt-1 space-y-1">
                <li>10% commission on direct sales</li>
                <li>5% commission from their sub-resellers</li>
                <li>Access to exclusive marketing materials</li>
                <li>Monthly training and support</li>
              </ul>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setRecruitDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              Send Invitation
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResellerPage;
