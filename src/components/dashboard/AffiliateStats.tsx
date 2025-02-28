import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Users, ShoppingBag, DollarSign, TrendingUp } from "lucide-react";

interface AffiliateStatsProps {
  totalReferrals?: number;
  totalOrders?: number;
  totalEarnings?: number;
  conversionRate?: number;
}

const AffiliateStats = ({
  totalReferrals = 24,
  totalOrders = 8,
  totalEarnings = 1250000,
  conversionRate = 33.3,
}: AffiliateStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalReferrals}</div>
          <p className="text-xs text-muted-foreground">Unique visitors</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Orders Generated
          </CardTitle>
          <ShoppingBag className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalOrders}</div>
          <p className="text-xs text-muted-foreground">From your referrals</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            IDR {totalEarnings.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">Commission earned</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{conversionRate}%</div>
          <p className="text-xs text-muted-foreground">Visitors to orders</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AffiliateStats;
