import React, { useState } from "react";
import { ArrowLeft, Package, Scan, Check, AlertCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocation } from "wouter";

interface PackingItem {
  id: string;
  sku: string;
  name: string;
  quantity: number;
  packedQuantity: number;
  location: string;
  imageUrl?: string;
}

interface PackingOrder {
  id: string;
  orderNumber: string;
  customer: string;
  priority: "high" | "medium" | "low";
  totalItems: number;
  packedItems: number;
  status: "pending" | "in_progress" | "completed";
  items: PackingItem[];
}

export const B2BPackingPage: React.FC = () => {
  const [, setLocation] = useLocation();
  const [scanMode, setScanMode] = useState(false);
  const [scanValue, setScanValue] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<string>("ORD-2024-001");

  // Sample data - in real app this would come from API
  const packingOrder: PackingOrder = {
    id: "1",
    orderNumber: "ORD-2024-001",
    customer: "ABC Corporation",
    priority: "high",
    totalItems: 5,
    packedItems: 2,
    status: "in_progress",
    items: [
      {
        id: "1",
        sku: "SKU-001",
        name: "Wireless Bluetooth Headphones",
        quantity: 2,
        packedQuantity: 2,
        location: "A1-B2-C3"
      },
      {
        id: "2",
        sku: "SKU-002", 
        name: "USB-C Charging Cable",
        quantity: 5,
        packedQuantity: 5,
        location: "A2-B1-C4"
      },
      {
        id: "3",
        sku: "SKU-003",
        name: "Laptop Stand Adjustable",
        quantity: 1,
        packedQuantity: 0,
        location: "B1-C2-D1"
      },
      {
        id: "4",
        sku: "SKU-004",
        name: "Wireless Mouse",
        quantity: 3,
        packedQuantity: 0,
        location: "A3-B2-C1"
      },
      {
        id: "5",
        sku: "SKU-005",
        name: "Phone Case Premium",
        quantity: 4,
        packedQuantity: 0,
        location: "C1-D2-E3"
      }
    ]
  };

  const handleBack = () => {
    setLocation("/");
  };

  const handleScan = () => {
    setScanMode(!scanMode);
  };

  const handlePackItem = (itemId: string) => {
    // In real app, this would update the backend
    console.log(`Packing item ${itemId}`);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const completionPercentage = Math.round((packingOrder.packedItems / packingOrder.totalItems) * 100);

  return (
    <div className="bg-white flex flex-row justify-center w-full min-h-screen">
      <div className="bg-white-100 w-[412px] min-h-screen relative">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white-100 border-b border-greysbordere-0e-0e-0">
          <div className="flex items-center justify-between p-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="h-10 w-10 p-0"
            >
              <ArrowLeft className="h-5 w-5 text-text-elementsprimary" />
            </Button>
            
            <h1 className="text-lg font-semibold text-text-elementsprimary font-['Roboto',Helvetica]">
              B2B Packing
            </h1>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleScan}
              className={`h-10 w-10 p-0 ${scanMode ? 'bg-coloursprimaryblue text-white' : ''}`}
            >
              <Scan className="h-5 w-5" />
            </Button>
          </div>

          {/* Order Selection */}
          <div className="px-4 pb-4">
            <Select value={selectedOrder} onValueChange={setSelectedOrder}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ORD-2024-001">ORD-2024-001 - ABC Corporation</SelectItem>
                <SelectItem value="ORD-2024-002">ORD-2024-002 - XYZ Ltd</SelectItem>
                <SelectItem value="ORD-2024-003">ORD-2024-003 - Tech Solutions</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </header>

        {/* Scan Mode */}
        {scanMode && (
          <div className="p-4 bg-coloursprimaryblue/10 border-b border-coloursprimaryblue/20">
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  placeholder="Scan or enter SKU/Barcode"
                  value={scanValue}
                  onChange={(e) => setScanValue(e.target.value)}
                  className="border-coloursprimaryblue"
                />
              </div>
              <Button size="sm" className="bg-coloursprimaryblue">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Order Summary */}
        <div className="p-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-text-elementsprimary">
                  {packingOrder.orderNumber}
                </CardTitle>
                <Badge className={getPriorityColor(packingOrder.priority)}>
                  {packingOrder.priority.toUpperCase()}
                </Badge>
              </div>
              <p className="text-sm text-text-elementssecondary">
                {packingOrder.customer}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-elementssecondary">Progress</span>
                    <span className="text-text-elementsprimary font-medium">
                      {packingOrder.packedItems}/{packingOrder.totalItems} items ({completionPercentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-coloursprimaryblue h-2 rounded-full transition-all duration-300"
                      style={{ width: `${completionPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    packingOrder.status === 'completed' ? 'bg-green-500' :
                    packingOrder.status === 'in_progress' ? 'bg-coloursprimaryblue' : 'bg-gray-400'
                  }`} />
                  <span className="text-sm text-text-elementssecondary capitalize">
                    {packingOrder.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Items List */}
        <div className="px-4 pb-4">
          <h2 className="text-lg font-semibold text-text-elementsprimary mb-3 font-['Roboto',Helvetica]">
            Items to Pack
          </h2>
          
          <div className="space-y-3">
            {packingOrder.items.map((item) => {
              const isCompleted = item.packedQuantity === item.quantity;
              const isPartial = item.packedQuantity > 0 && item.packedQuantity < item.quantity;
              
              return (
                <Card key={item.id} className={`${
                  isCompleted ? 'bg-green-50 border-green-200' : 
                  isPartial ? 'bg-yellow-50 border-yellow-200' : 
                  'bg-white border-gray-200'
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      {/* Status Icon */}
                      <div className="flex-shrink-0 mt-1">
                        {isCompleted ? (
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        ) : isPartial ? (
                          <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                            <AlertCircle className="h-4 w-4 text-white" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                            <Package className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-text-elementsprimary truncate">
                              {item.name}
                            </h3>
                            <p className="text-sm text-text-elementssecondary">
                              SKU: {item.sku}
                            </p>
                            <p className="text-sm text-text-elementssecondary">
                              Location: {item.location}
                            </p>
                          </div>
                          
                          <div className="flex-shrink-0 text-right ml-2">
                            <div className="text-sm font-medium text-text-elementsprimary">
                              {item.packedQuantity}/{item.quantity}
                            </div>
                            {!isCompleted && (
                              <Button
                                size="sm"
                                onClick={() => handlePackItem(item.id)}
                                className="mt-2 bg-coloursprimaryblue text-white"
                              >
                                Pack
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Complete Order Button */}
        {completionPercentage === 100 && (
          <div className="sticky bottom-0 p-4 bg-white-100 border-t border-greysbordere-0e-0e-0">
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
              Complete Order
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};