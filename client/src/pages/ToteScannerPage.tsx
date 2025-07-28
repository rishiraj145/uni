import React, { useState } from "react";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, useParams } from "wouter";

export const ToteScannerPage: React.FC = () => {
  const params = useParams();
  const picklistId = params.id || "PK1000";
  const shelfCode = params.shelf || "SHELF_001";
  const [, setLocation] = useLocation();

  const handleBack = () => {
    setLocation(`/picklist/${picklistId}`);
  };

  const handleToteIconClick = () => {
    console.log("Tote icon clicked");
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
        </header>

        {/* Content */}
        <div className="flex flex-col h-full">
          {/* Scan TOTE Section - Top Half */}
          <div className="flex-1 bg-gray-800 flex flex-col items-center justify-center relative">
            {/* Scan TOTE Title */}
            <div className="absolute top-6 left-0 right-0 flex items-center justify-center">
              <h2 className="text-white text-lg font-medium">Scan TOTE</h2>
              <button 
                className="absolute right-6 w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors"
                onClick={handleToteIconClick}
              >
                <Trash2 className="h-5 w-5 text-white" />
              </button>
            </div>

            {/* Tote Bag with Barcode */}
            <div className="bg-red-500 rounded-xl p-6 mx-6 shadow-lg max-w-sm">
              {/* Tote Label Header */}
              <div className="bg-white rounded-t-lg p-3 mb-2">
                <div className="text-blue-600 text-xs font-bold mb-1">TOTE LABELING</div>
                <div className="text-blue-600 text-xs">SOLUTION</div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">3D</span>
                  </div>
                  <span className="text-blue-600 text-xs font-bold">LABEL</span>
                </div>
                <div className="text-gray-600 text-xs mt-1">
                  www.tdsolutions.com
                </div>
                <div className="text-gray-600 text-xs">
                  solutions@tdsolutions.com
                </div>
                <div className="text-gray-600 text-xs">
                  Phone: 1-800-XXX-XXXX
                </div>
              </div>

              {/* Barcode Section */}
              <div className="bg-white rounded-b-lg p-3">
                {/* Barcode Lines */}
                <div className="flex justify-center mb-2">
                  <div className="flex gap-px">
                    {Array.from({ length: 40 }, (_, i) => (
                      <div
                        key={i}
                        className={`bg-black ${
                          Math.random() > 0.5 ? 'w-0.5' : 'w-px'
                        } ${
                          Math.random() > 0.7 ? 'h-12' : 'h-10'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                {/* Barcode Number */}
                <div className="text-center text-sm font-mono text-gray-800">
                  99123450
                </div>
              </div>
            </div>
          </div>

          {/* Instruction Section - Bottom Half */}
          <div className="flex-1 bg-white flex flex-col items-center justify-center px-6">
            {/* Instruction Header */}
            <div className="text-blue-600 text-sm font-medium mb-4 uppercase tracking-wider">
              INSTRUCTION
            </div>
            
            {/* Main Instruction Text */}
            <div className="text-center">
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Scan Tote to Start Picking
              </h3>
            </div>

            {/* Optional: Camera viewfinder indicator */}
            <div className="mt-8 flex justify-center">
              <div className="w-16 h-1 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};