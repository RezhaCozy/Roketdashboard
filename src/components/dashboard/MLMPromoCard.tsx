import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Award, Users, TrendingUp, Gift, ChevronRight } from "lucide-react";
import { Progress } from "../ui/progress";

interface TierInfo {
  name: string;
  salesTarget: number;
  commission: {
    direct: number;
    level2: number;
    level3: number;
  };
  rewards: string[];
}

interface MLMPromoCardProps {
  tiers?: TierInfo[];
}

const defaultTiers: TierInfo[] = [
  {
    name: "Tier 1",
    salesTarget: 0,
    commission: {
      direct: 5,
      level2: 0,
      level3: 0,
    },
    rewards: ["Basic marketing materials"],
  },
  {
    name: "Tier 2",
    salesTarget: 2000000,
    commission: {
      direct: 10,
      level2: 3,
      level3: 0,
    },
    rewards: ["Premium marketing kit", "Monthly training sessions"],
  },
  {
    name: "Tier 3",
    salesTarget: 5000000,
    commission: {
      direct: 15,
      level2: 5,
      level3: 2,
    },
    rewards: [
      "Exclusive branding materials",
      "Priority support",
      "Quarterly bonus rewards",
    ],
  },
];

const serviceCommissions = [
  { service: "Landing Page Full Gambar", commission: "IDR 25,000" },
  { service: "Landing Page Responsive", commission: "IDR 49,900" },
  { service: "Website Development", commission: "IDR 150,000" },
  { service: "Hosting & VPS", commission: "IDR 49,900 + 5% recurring" },
  { service: "Content Design", commission: "IDR 10,000 - 15,000" },
];

const MLMPromoCard = ({ tiers = defaultTiers }: MLMPromoCardProps) => {
  return (
    <Card className="w-full bg-white">
      <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <Award className="h-5 w-5" />
              Multi-Level Marketing Program
            </CardTitle>
            <CardDescription className="text-white/80 mt-1">
              Earn commissions and rewards as you grow your network
            </CardDescription>
          </div>
          <Badge className="bg-white/20 text-white hover:bg-white/30">
            <Users className="h-3 w-3 mr-1" /> Recruitment Program
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Tier Progression */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-indigo-600" />
              Tier Progression & Benefits
            </h3>

            <div className="space-y-6">
              {tiers.map((tier, index) => (
                <div key={tier.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Badge
                        className={`${index === 0 ? "bg-gray-100 text-gray-800" : index === 1 ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"}`}
                      >
                        {tier.name}
                      </Badge>
                      {index < tiers.length - 1 && (
                        <span className="text-sm text-muted-foreground">
                          {tier.salesTarget.toLocaleString()} -{" "}
                          {tiers[index + 1].salesTarget.toLocaleString()} IDR
                          sales
                        </span>
                      )}
                      {index === tiers.length - 1 && (
                        <span className="text-sm text-muted-foreground">
                          {tier.salesTarget.toLocaleString()}+ IDR sales
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm font-medium">Commission Rates</p>
                      <div className="mt-1 space-y-1">
                        <p className="text-sm">
                          Direct:{" "}
                          <span className="font-semibold">
                            {tier.commission.direct}%
                          </span>
                        </p>
                        <p className="text-sm">
                          Level 2:{" "}
                          <span className="font-semibold">
                            {tier.commission.level2}%
                          </span>
                        </p>
                        <p className="text-sm">
                          Level 3:{" "}
                          <span className="font-semibold">
                            {tier.commission.level3}%
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg md:col-span-2">
                      <p className="text-sm font-medium">Rewards & Benefits</p>
                      <ul className="mt-1 space-y-1">
                        {tier.rewards.map((reward, i) => (
                          <li
                            key={i}
                            className="text-sm flex items-start gap-1"
                          >
                            <Gift className="h-3 w-3 mt-1 text-indigo-600 flex-shrink-0" />
                            <span>{reward}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {index < tiers.length - 1 && (
                    <div className="pt-2">
                      <Progress
                        value={
                          (tier.salesTarget /
                            tiers[tiers.length - 1].salesTarget) *
                          100
                        }
                        className="h-1"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Service Commission Table */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              Service Commission Examples
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-2">
                {serviceCommissions.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 border-b border-gray-200 last:border-0"
                  >
                    <span className="text-sm">{item.service}</span>
                    <span className="text-sm font-medium text-green-600">
                      {item.commission}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
            Join Our Reseller Program <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MLMPromoCard;
