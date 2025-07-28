import React, { useState } from "react";
import { ArrowLeft, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation, useParams } from "wouter";

interface ShelfItem {
  id: string;
  shelfCode: string;
  skuCount: number;
  pendingQty: number;
}

export const PicklistDetailPage: React.FC = () => {
  const params = useParams();
  const picklistId = params.id || "PK1000";
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<"pending" | "scanned">("pending");

  // Sample shelf data
  const pendingShelves: ShelfItem[] = [
    { id: "1", shelfCode: "SHELF_001", skuCount: 5, pendingQty: 120 },
    { id: "2", shelfCode: "SHELF_002", skuCount: 3, pendingQty: 80 },
    { id: "3", shelfCode: "SHELF_003", skuCount: 3, pendingQty: 50 },
    { id: "4", shelfCode: "SHELF_004", skuCount: 3, pendingQty: 50 },
  ];

  const scannedShelves: ShelfItem[] = [];

  const handleBack = () => {
    setLocation("/b2b-packing");
  };

  const handleStartPicking = () => {
    console.log("Start picking clicked");
    // Navigate to picking interface or start picking flow
  };

  const handleMoreOptions = () => {
    console.log("More options clicked");
  };

  return (
    <div className="bg-white flex flex-row justify-center w-full min-h-screen">
      <div className="bg-white w-[412px] min-h-screen relative">
        {/* Header */}
        <header className="flex h-12 items-center justify-between w-full bg-white border-b border-[#e0e0e0] px-4">
          <div className="flex items-center gap-3">
            <button 
              className="flex items-center justify-center w-8 h-8 hover:bg-gray-100 rounded transition-colors duration-200"
              onClick={handleBack}
            >
              <ArrowLeft className="h-5 w-5 text-text-elementsprimary" />
            </button>
            <h1 className="font-PAGE-TITLE font-[number:var(--PAGE-TITLE-font-weight)] text-text-elementsprimary text-[length:var(--PAGE-TITLE-font-size)] tracking-[var(--PAGE-TITLE-letter-spacing)] leading-[var(--PAGE-TITLE-line-height)] [font-style:var(--PAGE-TITLE-font-style)]">
              {picklistId}
            </h1>
          </div>
          
          <button 
            className="flex items-center justify-center w-8 h-8 hover:bg-gray-100 rounded transition-colors duration-200"
            onClick={handleMoreOptions}
          >
            <MoreVertical className="h-5 w-5 text-text-elementsprimary" />
          </button>
        </header>

        {/* Content */}
        <div className="flex flex-col pt-4 px-4 pb-20">
          {/* Tabs */}
          <div className="flex mb-6">
            <button
              className={`flex-1 pb-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "pending"
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-500 border-transparent hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("pending")}
            >
              Pending Shelf ({pendingShelves.length})
            </button>
            <button
              className={`flex-1 pb-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "scanned"
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-500 border-transparent hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("scanned")}
            >
              Scanned Shelf ({scannedShelves.length})
            </button>
          </div>

          {/* Section Header */}
          <div className="flex items-center justify-between mb-4 px-2">
            <span className="text-sm font-medium text-gray-600 uppercase">SECTION</span>
            <div className="flex items-center gap-1">
              <span className="text-sm text-gray-500">Shelf Code</span>
              <span className="text-sm text-gray-400">A-Z</span>
            </div>
          </div>

          {/* Shelf List */}
          <div className="flex flex-col gap-3">
            {activeTab === "pending" ? (
              pendingShelves.map((shelf) => (
                <Card key={shelf.id} className="border border-gray-200 rounded-lg shadow-sm">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {shelf.shelfCode}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500">SKU Count</span>
                        <span className="text-lg font-medium text-gray-900">{shelf.skuCount}</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-sm text-gray-500">Pending Qty</span>
                        <span className="text-lg font-medium text-gray-900">{shelf.pendingQty}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <p className="text-sm">No scanned shelves yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Fixed Bottom Button */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[412px] bg-white border-t border-gray-200 p-4">
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors duration-200"
            onClick={handleStartPicking}
          >
            START PICKING
          </Button>
        </div>
      </div>
    </div>
  );
};