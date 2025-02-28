import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { Trophy, Award, TrendingUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Reseller {
  id: string;
  name: string;
  avatar: string;
  level: "Tier 1" | "Tier 2" | "Tier 3";
  sales: number;
  commission: number;
  rank: number;
}

interface ResellerLeaderboardProps {
  resellers?: Reseller[];
}

const defaultResellers: Reseller[] = [
  {
    id: "1",
    name: "Alex Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    level: "Tier 3",
    sales: 7500000,
    commission: 750000,
    rank: 1,
  },
  {
    id: "2",
    name: "Maria Garcia",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    level: "Tier 2",
    sales: 6200000,
    commission: 620000,
    rank: 2,
  },
  {
    id: "3",
    name: "James Wilson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    level: "Tier 2",
    sales: 5800000,
    commission: 580000,
    rank: 3,
  },
  {
    id: "4",
    name: "Linda Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Linda",
    level: "Tier 2",
    sales: 4500000,
    commission: 450000,
    rank: 4,
  },
  {
    id: "5",
    name: "Robert Taylor",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
    level: "Tier 1",
    sales: 3800000,
    commission: 380000,
    rank: 5,
  },
  {
    id: "6",
    name: "Sarah Adams",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    level: "Tier 1",
    sales: 3200000,
    commission: 320000,
    rank: 6,
  },
  {
    id: "7",
    name: "David Kim",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    level: "Tier 1",
    sales: 2800000,
    commission: 280000,
    rank: 7,
  },
  {
    id: "8",
    name: "Emily Brown",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    level: "Tier 1",
    sales: 2500000,
    commission: 250000,
    rank: 8,
  },
];

const ResellerLeaderboard = ({
  resellers = defaultResellers,
}: ResellerLeaderboardProps) => {
  const getLevelBadge = (level: string) => {
    switch (level) {
      case "Tier 3":
        return <Badge className="bg-purple-100 text-purple-800">Tier 3</Badge>;
      case "Tier 2":
        return <Badge className="bg-blue-100 text-blue-800">Tier 2</Badge>;
      case "Tier 1":
        return <Badge className="bg-gray-100 text-gray-800">Tier 1</Badge>;
      default:
        return null;
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Trophy className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Trophy className="h-5 w-5 text-amber-700" />;
      default:
        return (
          <span className="font-bold text-gray-500 w-5 text-center">
            {rank}
          </span>
        );
    }
  };

  return (
    <Card className="w-full bg-white p-6">
      <CardHeader className="px-0 pt-0">
        <div className="flex justify-between items-center mb-4">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Reseller Leaderboard
          </CardTitle>
          <Badge variant="outline" className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            Top Performers
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="px-0 pb-0">
        <ScrollArea className="h-[280px] w-full pr-4">
          <div className="space-y-3">
            {resellers.map((reseller) => (
              <div
                key={reseller.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8">
                    {getRankIcon(reseller.rank)}
                  </div>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={reseller.avatar} alt={reseller.name} />
                    <AvatarFallback>{reseller.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{reseller.name}</p>
                      {getLevelBadge(reseller.level)}
                    </div>
                    <p className="text-xs text-gray-500">
                      Sales: IDR {reseller.sales.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-green-600">
                    IDR {reseller.commission.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">Total Commission</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ResellerLeaderboard;
