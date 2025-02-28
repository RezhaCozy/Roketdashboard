import React, { useState } from "react";
import AffiliateStats from "./AffiliateStats";
import AffiliateGenerator from "./AffiliateGenerator";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import {
  ArrowDownLeft,
  ExternalLink,
  Users,
  Award,
  TrendingUp,
  UserPlus,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface ReferralOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  service: string;
  amount: number;
  commission: number;
  date: string;
  status: "completed" | "pending" | "canceled";
}

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

interface ResellerDashboardProps {
  referralOrders?: ReferralOrder[];
  subResellers?: SubReseller[];
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

const defaultReferralOrders: ReferralOrder[] = [
  {
    id: "1",
    orderNumber: "ORD-R001",
    customerName: "Sarah Johnson",
    service: "Landing Page Full Gambar",
    amount: 250000,
    commission: 25000,
    date: "2024-03-20",
    status: "completed",
  },
  {
    id: "2",
    orderNumber: "ORD-R002",
    customerName: "Michael Brown",
    service: "Jasa Desain Konten Iklan JPG",
    amount: 100000,
    commission: 10000,
    date: "2024-03-19",
    status: "completed",
  },
  {
    id: "3",
    orderNumber: "ORD-R003",
    customerName: "Emily Davis",
    service: "Website Development Package",
    amount: 1500000,
    commission: 150000,
    date: "2024-03-18",
    status: "completed",
  },
  {
    id: "4",
    orderNumber: "ORD-R004",
    customerName: "David Wilson",
    service: "MASTERAN CANVA LANDINGPAGE",
    amount: 120000,
    commission: 12000,
    date: "2024-03-17",
    status: "completed",
  },
  {
    id: "5",
    orderNumber: "ORD-R005",
    customerName: "Jessica Martinez",
    service: "JASA LANDINGPAGE RESPONSIVE",
    amount: 499000,
    commission: 49900,
    date: "2024-03-16",
    status: "completed",
  },
  {
    id: "6",
    orderNumber: "ORD-R006",
    customerName: "Robert Taylor",
    service: "JASA ADSCOPY IKLAN",
    amount: 100000,
    commission: 10000,
    date: "2024-03-15",
    status: "completed",
  },
  {
    id: "7",
    orderNumber: "ORD-R007",
    customerName: "Jennifer Anderson",
    service: "JASA VIDEO ADS/IKLAN/PROMOSI",
    amount: 750000,
    commission: 75000,
    date: "2024-03-14",
    status: "completed",
  },
  {
    id: "8",
    orderNumber: "ORD-R008",
    customerName: "Thomas Clark",
    service: "NEBENG HOSTING CEPAT/VPS",
    amount: 499000,
    commission: 49900,
    date: "2024-03-13",
    status: "pending",
  },
];

const ResellerDashboard = ({
  referralOrders = defaultReferralOrders,
  subResellers = defaultSubResellers,
  userLevel = "Tier 2",
  salesTarget = 5000000,
  currentSales = 3200000,
  nextLevel = "Tier 3",
}: ResellerDashboardProps) => {
  const [activeTab, setActiveTab] = useState("orders");
  const [recruitDialogOpen, setRecruitDialogOpen] = useState(false);
  const [expandedCommissionInfo, setExpandedCommissionInfo] = useState(false);
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "canceled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalCommission = referralOrders.reduce(
    (sum, order) => sum + (order.status !== "canceled" ? order.commission : 0),
    0,
  );

  // Calculate total earnings from sub-resellers
  const subResellerCommission = subResellers.reduce(
    (sum, reseller) => sum + reseller.commission,
    0,
  );

  // Progress percentage towards next level
  const progressPercentage = Math.min(
    Math.round((currentSales / salesTarget) * 100),
    100,
  );

  return (
    <div className="flex flex-col space-y-6 p-6 bg-white min-h-screen">
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Reseller Dashboard</h2>
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
        <Card className="mb-6">
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

        <AffiliateStats
          totalReferrals={24}
          totalOrders={referralOrders.length}
          totalEarnings={totalCommission + subResellerCommission}
          conversionRate={33.3}
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="orders">Direct Orders</TabsTrigger>
          <TabsTrigger value="team">My Team</TabsTrigger>
          <TabsTrigger value="mlm">MLM Structure</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Referral Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] w-full pr-4">
                    <div className="space-y-4">
                      {referralOrders.map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="p-2 rounded-full bg-green-100">
                              <ArrowDownLeft className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <div className="flex items-center">
                                <p className="font-medium">
                                  {order.orderNumber}
                                </p>
                                <Badge
                                  className={`ml-2 ${getStatusColor(order.status)}`}
                                >
                                  {order.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-500">
                                {order.customerName}
                              </p>
                              <p className="text-xs text-gray-400">
                                {order.service}
                              </p>
                              <p className="text-xs text-gray-400">
                                {order.date}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col items-end space-y-1">
                            <span className="font-semibold text-green-600">
                              +IDR {order.commission.toLocaleString()}
                            </span>
                            <span className="text-xs text-gray-500">
                              Order: IDR {order.amount.toLocaleString()}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs flex items-center"
                            >
                              <ExternalLink className="h-3 w-3 mr-1" /> Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <AffiliateGenerator />
            </div>
          </div>
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
                            <ExternalLink className="h-3 w-3 mr-1" /> Details
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs flex items-center text-blue-600"
                          >
                            <TrendingUp className="h-3 w-3 mr-1" /> Performance
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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

export default ResellerDashboard;
