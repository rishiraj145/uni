import React, { useState } from "react";
import { ArrowLeft, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";

interface PicklistItem {
  id: string;
  code: string;
  description: string;
  assignedTo?: string;
}

export const B2BPackingPage: React.FC = () => {
  const [, setLocation] = useLocation();
  const [assignToMe, setAssignToMe] = useState(false);
  const [picklistCode, setPicklistCode] = useState("");

  // Sample picklist data
  const picklists: PicklistItem[] = [
    { id: "1", code: "PL001", description: "Electronics - Zone A", assignedTo: "John Doe" },
    { id: "2", code: "PL002", description: "Accessories - Zone B" },
    { id: "3", code: "PL003", description: "Components - Zone C", assignedTo: "Jane Smith" },
    { id: "4", code: "PL004", description: "Cables - Zone D" },
  ];

  const filteredPicklists = picklists.filter(item => 
    assignToMe ? !item.assignedTo : true
  );

  const handleBack = () => {
    setLocation("/");
  };

  const handleFilter = () => {
    // Filter functionality
    console.log("Filter clicked");
  };

  const handlePicklistSearch = () => {
    // Search picklist
    console.log("Searching for:", picklistCode);
  };

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
              onClick={handleFilter}
              className="h-10 w-10 p-0"
            >
              <Filter className="h-5 w-5 text-text-elementsprimary" />
            </Button>
          </div>
        </header>

        {/* Control Section */}
        <div className="p-4 space-y-4">
          {/* Assign to Me Toggle */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-text-elementsprimary font-['Roboto',Helvetica]">
              Assign to me
            </label>
            <Switch
              checked={assignToMe}
              onCheckedChange={setAssignToMe}
            />
          </div>

          {/* Picklist Code Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-elementsprimary font-['Roboto',Helvetica]">
              Picklist Code
            </label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter picklist code"
                value={picklistCode}
                onChange={(e) => setPicklistCode(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={handlePicklistSearch}
                className="bg-coloursprimaryblue hover:bg-coloursprimaryblue/90 text-white"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Picklist Items */}
        <div className="px-4 pb-4">
          <div className="space-y-3">
            {filteredPicklists.map((item) => (
              <Card key={item.id} className="border border-greysbordere-0e-0e-0">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-text-elementsprimary font-['Roboto',Helvetica]">
                        {item.code}
                      </h3>
                      <p className="text-sm text-text-elementssecondary">
                        {item.description}
                      </p>
                      {item.assignedTo && (
                        <p className="text-xs text-coloursprimaryblue mt-1">
                          Assigned to: {item.assignedTo}
                        </p>
                      )}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-coloursprimaryblue text-coloursprimaryblue hover:bg-coloursprimaryblue hover:text-white"
                    >
                      Select
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};