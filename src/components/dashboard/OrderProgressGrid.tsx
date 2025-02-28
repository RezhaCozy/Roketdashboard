import React, { useState } from "react";
import { Card, CardHeader } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { OrderCard } from "./OrderCard";
import { CommentDialog } from "./CommentDialog";

interface OrderProgress {
  id: string;
  orderNumber: string;
  status: "pending" | "processing" | "preview" | "completed";
  description: string;
  date: string;
  comments?: { id: string; text: string; author: string; date: string }[];
}

interface OrderProgressGridProps {
  orders?: OrderProgress[];
}

const defaultOrders: OrderProgress[] = [
  // Pending Orders (2)
  {
    id: "1",
    orderNumber: "ORD-001",
    status: "pending",
    description: "Landing Page Full Gambar",
    date: "2024-03-22",
    comments: [],
  },
  {
    id: "2",
    orderNumber: "ORD-002",
    status: "pending",
    description: "Jasa Desain Konten Iklan JPG",
    date: "2024-03-21",
    comments: [],
  },

  // Processing Order (1)
  {
    id: "3",
    orderNumber: "ORD-003",
    status: "processing",
    description: "Website Development Package",
    date: "2024-03-19",
    comments: [],
  },

  // Preview Orders (3)
  {
    id: "10",
    orderNumber: "ORD-010",
    status: "preview",
    description: "E-commerce Website Design",
    date: "2024-03-20",
    comments: [],
  },
  {
    id: "11",
    orderNumber: "ORD-011",
    status: "preview",
    description: "Corporate Branding Package",
    date: "2024-03-19",
    comments: [],
  },
  {
    id: "12",
    orderNumber: "ORD-012",
    status: "preview",
    description: "Social Media Marketing Kit",
    date: "2024-03-18",
    comments: [],
  },

  // Completed Orders (5)
  {
    id: "4",
    orderNumber: "ORD-004",
    status: "completed",
    description: "Landing Page Responsive",
    date: "2024-03-18",
    comments: [],
  },
  {
    id: "5",
    orderNumber: "ORD-005",
    status: "completed",
    description: "Video Ads Production",
    date: "2024-03-17",
    comments: [],
  },
  {
    id: "6",
    orderNumber: "ORD-006",
    status: "completed",
    description: "Social Media Content Pack",
    date: "2024-03-16",
    comments: [],
  },
  {
    id: "7",
    orderNumber: "ORD-007",
    status: "completed",
    description: "SEO Optimization Service",
    date: "2024-03-15",
    comments: [],
  },
  {
    id: "8",
    orderNumber: "ORD-008",
    status: "completed",
    description: "Brand Identity Package",
    date: "2024-03-14",
    comments: [],
  },
];

const OrderProgressGrid = ({
  orders: initialOrders = defaultOrders,
}: OrderProgressGridProps) => {
  // Sort orders by date (newest first)
  const sortedInitialOrders = [...initialOrders].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const [orders, setOrders] = useState(sortedInitialOrders);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const columns = ["Pending", "Processing", "Preview", "Completed"];

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeOrder = orders.find((order) => order.id === active.id);
    if (!activeOrder) return;

    const overContainer = over.id.toString();
    const newStatus = overContainer.toLowerCase() as OrderProgress["status"];

    setOrders(
      orders.map((order) =>
        order.id === activeOrder.id ? { ...order, status: newStatus } : order,
      ),
    );
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? { ...order, status: newStatus as OrderProgress["status"] }
          : order,
      ),
    );
  };

  const handleAddComment = (orderId: string, text: string) => {
    setOrders(
      orders.map((order) => {
        if (order.id === orderId) {
          return {
            ...order,
            comments: [
              ...(order.comments || []),
              {
                id: Date.now().toString(),
                text,
                author: "Current User",
                date: new Date().toLocaleString(),
              },
            ],
          };
        }
        return order;
      }),
    );
  };

  return (
    <div className="w-full bg-white p-6">
      <h2 className="text-2xl font-semibold mb-6">Order Progress</h2>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((column) => {
            // Sort orders by date (newest first) within each column
            const columnOrders = orders
              .filter(
                (order) => order.status.toLowerCase() === column.toLowerCase(),
              )
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime(),
              );

            return (
              <Card
                key={column}
                className="flex flex-col h-[450px] overflow-hidden"
              >
                <CardHeader className="flex flex-row items-center justify-between py-4">
                  <div className="flex items-center">
                    <h3 className="font-semibold text-lg">{column}</h3>
                    {column === "Preview" && columnOrders.length > 0 && (
                      <span className="ml-2 relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                      </span>
                    )}
                  </div>
                  <div className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-medium">
                    {columnOrders.length}
                  </div>
                </CardHeader>
                <ScrollArea className="flex-1 px-4">
                  <SortableContext
                    id={column}
                    items={columnOrders.map((order) => order.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="flex flex-col gap-4 pb-4">
                      {columnOrders.map((order) => (
                        <OrderCard
                          key={order.id}
                          order={order}
                          onOpenComments={(orderId) =>
                            setSelectedOrder(orderId)
                          }
                          onStatusChange={handleStatusChange}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </ScrollArea>
              </Card>
            );
          })}
        </div>
      </DndContext>

      <CommentDialog
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        orderId={selectedOrder || ""}
        comments={orders.find((o) => o.id === selectedOrder)?.comments || []}
        onAddComment={handleAddComment}
      />
    </div>
  );
};

export default OrderProgressGrid;
