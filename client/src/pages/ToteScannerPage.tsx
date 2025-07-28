import React from "react";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, useParams } from "wouter";

export const ToteScannerPage: React.FC = () => {
  const params = useParams();
  const picklistId = params.id || "PK1000";
  const [, setLocation] = useLocation();

  const handleBack = () => {
    setLocation(`/picklist/${picklistId}`);
  };

  const handleClose = () => {
    setLocation(`/picklist/${picklistId}`);
  };

  const handleToteIconClick = () => {
    console.log("Tote icon clicked - Scanner action");
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
        <div className="flex flex-col h-full">
          {/* Scan SHELF Section - Camera View */}
          <div className="bg-black flex flex-col items-center justify-center relative flex-1">
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

            {/* Camera Viewfinder */}
            <div className="relative flex items-center justify-center">
              {/* Scanning Frame */}
              <div className="relative w-80 h-40 border-2 border-white border-opacity-60 rounded-2xl">
                {/* Corner brackets */}
                <div className="absolute top-2 left-2 w-8 h-8 border-t-3 border-l-3 border-white rounded-tl-lg"></div>
                <div className="absolute top-2 right-2 w-8 h-8 border-t-3 border-r-3 border-white rounded-tr-lg"></div>
                <div className="absolute bottom-2 left-2 w-8 h-8 border-b-3 border-l-3 border-white rounded-bl-lg"></div>
                <div className="absolute bottom-2 right-2 w-8 h-8 border-b-3 border-r-3 border-white rounded-br-lg"></div>
                
                {/* Scanning line animation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4/5 h-0.5 bg-red-500 animate-pulse shadow-lg"></div>
                </div>
                
                {/* Center instruction */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-sm text-center bg-black bg-opacity-70 px-4 py-2 rounded-full backdrop-blur-sm">
                    Position barcode here
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Instruction */}
          <div className="bg-white flex items-center justify-center py-8">
            <p className="text-gray-700 text-lg font-medium">
              Scan tote to continue picking
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};