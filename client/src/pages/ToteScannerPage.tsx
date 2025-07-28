import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, useParams } from "wouter";

export const ToteScannerPage: React.FC = () => {
  const params = useParams();
  const picklistId = params.id || "PK1000";
  const [, setLocation] = useLocation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [scannedData, setScannedData] = useState<string>("");
  const [cameraError, setCameraError] = useState<string>("");

  // Start camera when component mounts
  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment", // Use back camera for barcode scanning
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraStream(stream);
        setCameraError("");
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setCameraError("Camera access denied. Please allow camera permissions and refresh.");
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
  };

  const handleBack = () => {
    stopCamera();
    setLocation(`/picklist/${picklistId}`);
  };

  const handleClose = () => {
    stopCamera();
    setLocation(`/picklist/${picklistId}`);
  };

  const handleToteIconClick = () => {
    console.log("Tote icon clicked - Scanner action");
    // Simulate barcode scan result for demo
    const mockBarcodeData = "SHELF_001_12345";
    setScannedData(mockBarcodeData);
    console.log("Scanned data:", mockBarcodeData);
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
              {/* Camera Video Stream */}
              <div className="relative w-64 h-32 rounded-2xl overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                
                {/* Scanning Frame Overlay */}
                <div className="absolute inset-0 border-2 border-white border-opacity-60 rounded-2xl">
                  {/* Corner brackets */}
                  <div className="absolute top-1 left-1 w-6 h-6 border-t-2 border-l-2 border-white rounded-tl-lg"></div>
                  <div className="absolute top-1 right-1 w-6 h-6 border-t-2 border-r-2 border-white rounded-tr-lg"></div>
                  <div className="absolute bottom-1 left-1 w-6 h-6 border-b-2 border-l-2 border-white rounded-bl-lg"></div>
                  <div className="absolute bottom-1 right-1 w-6 h-6 border-b-2 border-r-2 border-white rounded-br-lg"></div>
                  
                  {/* Scanning line animation */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4/5 h-0.5 bg-red-500 animate-pulse shadow-lg"></div>
                  </div>
                  
                  {/* Center instruction */}
                  {!cameraError && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white text-xs text-center bg-black bg-opacity-70 px-3 py-1 rounded-full backdrop-blur-sm">
                        Position barcode here
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Camera Error Fallback */}
                {cameraError && (
                  <div className="absolute inset-0 bg-gray-800 flex items-center justify-center rounded-2xl">
                    <div className="text-white text-xs text-center px-3">
                      {cameraError}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Scanned Data Display */}
            {scannedData && (
              <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                <div className="bg-green-600 text-white px-4 py-2 rounded-lg">
                  Scanned: {scannedData}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Instruction */}
          <div className="bg-white flex flex-col items-center justify-center py-8">
            <p className="text-gray-700 text-lg font-medium mb-2">
              Scan tote to continue picking
            </p>
            
            {/* Manual Input for Testing */}
            <button
              onClick={handleToteIconClick}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Simulate Scan (for testing)
            </button>
            
            {scannedData && (
              <div className="mt-3 text-sm text-green-600">
                Ready to continue with: {scannedData}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};