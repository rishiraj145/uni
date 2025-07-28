import React, { useState } from "react";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation, useParams } from "wouter";

interface ShelfItem {
  id: string;
  shelfCode: string;
  skuCount: number;
  pendingQty: number;
}

export const ToteScannerPage: React.FC = () => {
  const params = useParams();
  const picklistId = params.id || "PK1000";
  const shelfCode = params.shelf || "start";
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<"pending" | "scanned">("pending");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Sample shelf data
  const pendingShelves: ShelfItem[] = [
    { id: "1", shelfCode: "SHELF_001", skuCount: 5, pendingQty: 120 },
    { id: "2", shelfCode: "SHELF_002", skuCount: 3, pendingQty: 80 },
  ];

  const scannedShelves: ShelfItem[] = [];

  // Sort shelves based on sort order
  const sortedShelves = [...(activeTab === "pending" ? pendingShelves : scannedShelves)].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.shelfCode.localeCompare(b.shelfCode);
    } else {
      return b.shelfCode.localeCompare(a.shelfCode);
    }
  });

  const handleBack = () => {
    setLocation(`/picklist/${picklistId}`);
  };

  const handleClose = () => {
    setLocation(`/picklist/${picklistId}`);
  };

  const handleToteIconClick = () => {
    console.log("Tote icon clicked");
  };

  const handleSortToggle = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
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
              TOTE_01
            </h1>
          </div>
          
          <Button 
            variant="ghost" 
            className="text-gray-600 hover:text-gray-800 font-medium"
            onClick={handleClose}
          >
            CLOSE
          </Button>
        </header>

        {/* Content */}
        <div className="flex flex-col">
          {/* Scan SHELF Section - Top Part */}
          <div className="bg-gray-800 flex flex-col items-center justify-center relative py-8">
            {/* Scan SHELF Title */}
            <div className="absolute top-6 left-0 right-0 flex items-center justify-center">
              <h2 className="text-white text-lg font-medium">Scan SHELF</h2>
              <button 
                className="absolute right-6 w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors"
                onClick={handleToteIconClick}
              >
                <Trash2 className="h-5 w-5 text-white" />
              </button>
            </div>

            {/* Shelf Barcode */}
            <div className="bg-red-500 rounded-xl p-4 mx-6 shadow-lg w-80">
              {/* Barcode Section */}
              <div className="bg-white rounded-lg p-4">
                {/* Barcode Lines */}
                <div className="flex justify-center mb-3">
                  <div className="flex gap-px">
                    {Array.from({ length: 45 }, (_, i) => (
                      <div
                        key={i}
                        className={`bg-black ${
                          Math.random() > 0.5 ? 'w-0.5' : 'w-px'
                        } h-12`}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Shelf Information */}
                <div className="flex items-center justify-between bg-white border-t-2 border-black pt-2">
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold">↓</div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">15</div>
                      <div className="text-xs text-gray-600">AISLE</div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold">006</div>
                    <div className="text-xs text-gray-600">SECTION</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold">A</div>
                    <div className="text-xs text-gray-600">LEVEL</div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold">↓</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs and Shelf List Section */}
          <div className="flex flex-col pt-4 px-4 pb-4">
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
              <span className="text-sm font-medium text-gray-600 uppercase font-bold">SECTION B</span>
              <button
                onClick={handleSortToggle}
                className="flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded transition-colors"
              >
                <span className="text-sm text-gray-500">Shelf Code</span>
                <span className="text-sm text-gray-400">{sortOrder === "asc" ? "A-Z" : "Z-A"}</span>
              </button>
            </div>

            {/* Shelf List */}
            <div className="flex flex-col gap-3">
              {activeTab === "pending" ? (
                sortedShelves.map((shelf) => (
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
        </div>
      </div>
    </div>
  );
};