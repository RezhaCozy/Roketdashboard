import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Clock,
  Package,
  CheckCircle,
  XCircle,
  MessageSquare,
  GripVertical,
  Download,
  CreditCard,
  FileText,
  Image,
  Bell,
  Eye,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useState } from "react";

interface OrderCardProps {
  order: {
    id: string;
    orderNumber: string;
    status: "pending" | "processing" | "preview" | "completed";
    description: string;
    date: string;
    comments?: { id: string; text: string; author: string; date: string }[];
  };
  onOpenComments: (orderId: string) => void;
  onStatusChange?: (orderId: string, newStatus: string) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "processing":
      return "bg-blue-100 text-blue-800";
    case "preview":
      return "bg-purple-100 text-purple-800";
    case "completed":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "pending":
      return <Clock className="w-4 h-4" />;
    case "processing":
      return <Package className="w-4 h-4" />;
    case "preview":
      return <Bell className="w-4 h-4" />;
    case "completed":
      return <CheckCircle className="w-4 h-4" />;
    default:
      return null;
  }
};

export function OrderCard({
  order,
  onOpenComments,
  onStatusChange = () => {},
}: OrderCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: order.id,
  });

  const [detailsOpen, setDetailsOpen] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <>
      <Card
        ref={setNodeRef}
        style={style}
        className={`p-3 ${isDragging ? "opacity-50" : ""} cursor-move w-full`}
      >
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <GripVertical
                  className="h-5 w-5 text-gray-400"
                  {...attributes}
                  {...listeners}
                />
                <div>
                  <p className="font-medium">{order.orderNumber}</p>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
              </div>
            </div>
            <Badge className={getStatusColor(order.status)}>
              <span className="flex items-center gap-1">
                {getStatusIcon(order.status)}
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm">{order.description}</p>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs text-blue-600"
              onClick={() => setDetailsOpen(true)}
            >
              Edit Brief
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 h-8 px-2 w-auto"
              onClick={() => onOpenComments(order.id)}
            >
              <MessageSquare className="h-3 w-3" />
              {order.comments?.length || 0}
            </Button>
            <div className="flex flex-wrap gap-1 justify-end">
              {order.status === "completed" && (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 h-8 px-2 text-xs"
                >
                  <Download className="h-3 w-3" />
                  Download
                </Button>
              )}
              {order.status === "pending" && (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 h-8 px-2 text-xs"
                  onClick={() => (window.location.hash = "checkout")}
                >
                  <CreditCard className="h-3 w-3" />
                  Checkout
                </Button>
              )}
              {order.status === "preview" && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 h-8 px-2 text-xs"
                    onClick={() =>
                      window.open(
                        `https://preview.roketmarket.com/${order.id}`,
                        "_blank",
                      )
                    }
                  >
                    <Eye className="h-3 w-3" />
                    Preview
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 h-8 px-2 text-xs text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => setDetailsOpen(true)}
                  >
                    <ThumbsDown className="h-3 w-3" />
                    Revisi
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 h-8 px-2 text-xs text-green-600 border-green-200 hover:bg-green-50"
                    onClick={() => onStatusChange(order.id, "completed")}
                  >
                    <ThumbsUp className="h-3 w-3" />
                    Approve
                  </Button>
                </>
              )}
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-2 text-xs"
                onClick={() => setDetailsOpen(true)}
              >
                Details
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Order Details - {order.orderNumber}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5" /> Brief Details
                </h3>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="font-medium">Service:</p>
                  <p className="mb-2">{order.description}</p>

                  <p className="font-medium">Requirements:</p>
                  <p className="mb-2">
                    Create a responsive landing page with high conversion rate.
                    Include hero section, features, testimonials, and
                    call-to-action buttons.
                  </p>

                  <p className="font-medium">Timeline:</p>
                  <p>Ordered: {order.date}</p>
                  <p>
                    Expected delivery:{" "}
                    {
                      new Date(
                        new Date(order.date).getTime() +
                          7 * 24 * 60 * 60 * 1000,
                      )
                        .toISOString()
                        .split("T")[0]
                    }
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Image className="h-5 w-5" /> Uploaded Assets
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="border rounded-md overflow-hidden">
                    <img
                      src="https://i.ibb.co/Jk1Lm1L/banner1.jpg"
                      alt="Reference 1"
                      className="w-full h-32 object-cover"
                    />
                    <p className="p-2 text-sm truncate">
                      reference-image-1.jpg
                    </p>
                  </div>
                  <div className="border rounded-md overflow-hidden">
                    <img
                      src="https://i.ibb.co/Qf7Yd9H/banner2.jpg"
                      alt="Reference 2"
                      className="w-full h-32 object-cover"
                    />
                    <p className="p-2 text-sm truncate">logo-design.png</p>
                  </div>
                  <div className="border rounded-md overflow-hidden">
                    <div className="w-full h-32 bg-gray-100 flex items-center justify-center">
                      <FileText className="h-10 w-10 text-gray-400" />
                    </div>
                    <p className="p-2 text-sm truncate">brand-guidelines.pdf</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              {order.status === "completed" && (
                <Button className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  Download Files
                </Button>
              )}
              {order.status === "pending" && (
                <Button className="flex items-center gap-1">
                  <CreditCard className="h-4 w-4" />
                  Pay Invoice
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
