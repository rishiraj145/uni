import React, { useState } from "react";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, useParams } from "wouter";

// Mock shelf data based on scanned barcode
const mockShelfData = {
  aisle: "15",
  section: "006", 
  level: "A",
  shelves: [
    {
      code: "SHELF_001",
      skuCount: 5,
      pendingQty: 120
    },
    {
      code: "SHELF_002", 
      skuCount: 3,
      pendingQty: 80
    }
  ]
};

export const ShelfDetailPage: React.FC = () => {
  const params = useParams();
  const picklistId = params.id || "PK1000";
  const [, setLocation] = useLocation();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleBack = () => {
    setLocation(`/tote-scanner/${picklistId}`);
  };

  const handleClose = () => {
    setLocation(`/picklist/${picklistId}`);
  };

  const toggleSort = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const sortedShelves = [...mockShelfData.shelves].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.code.localeCompare(b.code);
    } else {
      return b.code.localeCompare(a.code);
    }
  });

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

        {/* Scan SHELF Section */}
        <div className="bg-gray-800 p-4 relative">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white text-lg font-medium">Scan SHELF</h2>
            <button 
              className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors"
            >
              <Trash2 className="h-5 w-5 text-white" />
            </button>
          </div>

          {/* Barcode Display */}
          <div className="bg-white rounded-lg p-4 mx-2">
            <div className="flex justify-center mb-2">
              {/* Barcode lines */}
              <div className="flex items-end gap-px">
                {Array.from({length: 40}, (_, i) => (
                  <div 
                    key={i}
                    className="bg-black"
                    style={{
                      width: Math.random() > 0.5 ? '2px' : '1px',
                      height: `${20 + Math.random() * 20}px`
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* Location Info */}
            <div className="flex justify-between items-center text-center">
              <div className="flex-1">
                <div className="text-black text-2xl font-bold">{mockShelfData.aisle}</div>
                <div className="text-gray-600 text-sm">AISLE</div>
                <div className="text-xl">↓</div>
              </div>
              <div className="flex-1">
                <div className="text-black text-2xl font-bold">{mockShelfData.section}</div>
                <div className="text-gray-600 text-sm">SECTION</div>
              </div>
              <div className="flex-1">
                <div className="text-black text-2xl font-bold">{mockShelfData.level}</div>
                <div className="text-gray-600 text-sm">LEVEL</div>
                <div className="text-xl">↓</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="flex">
            <button className="flex-1 py-3 px-4 text-blue-600 border-b-2 border-blue-600 font-medium">
              Pending Shelf <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs ml-1">2</span>
            </button>
            <button className="flex-1 py-3 px-4 text-gray-500 font-medium">
              Scanned Shelf <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs ml-1">0</span>
            </button>
          </div>
        </div>

        {/* Section Header */}
        <div className="bg-gray-100 px-4 py-3 flex justify-between items-center">
          <div className="text-gray-800 font-medium">SECTION B</div>
          <button 
            onClick={toggleSort}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <span className="text-sm">Shelf Code</span>
            <span className="text-lg">{sortOrder === 'asc' ? 'A↑' : 'Z↓'}</span>
          </button>
        </div>

        {/* Shelf List */}
        <div className="flex-1 overflow-y-auto">
          {sortedShelves.map((shelf, index) => (
            <div key={shelf.code} className="bg-white border-b border-gray-200 p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-lg font-semibold text-gray-900 mb-1">
                    {shelf.code}
                  </div>
                  <div className="text-gray-500 text-sm">
                    SKU Count <span className="font-semibold text-gray-700">{shelf.skuCount}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-gray-500 text-sm mb-1">Pending Qty</div>
                  <div className="text-lg font-bold text-gray-900">{shelf.pendingQty}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};