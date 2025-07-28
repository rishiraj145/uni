import React, { useState } from "react";
import { MenuIcon, Filter, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { SideNavigation } from "@/components/SideNavigation";

interface PicklistItem {
  id: string;
  picklistCode: string;
  pendingQuantity: number;
  pendingSection: number;
  channel: string;
  customer: string;
}

export const B2BPackingPage: React.FC = () => {
  const [, setLocation] = useLocation();
  const [assignToMe, setAssignToMe] = useState(false);
  const [picklistCode, setPicklistCode] = useState("");
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  // Sample picklist data
  const picklistItems: PicklistItem[] = [
    { id: "1", picklistCode: "PL001-WH", pendingQuantity: 25, pendingSection: 5, channel: "Online", customer: "TechCorp Ltd" },
    { id: "2", picklistCode: "PL002-USB", pendingQuantity: 50, pendingSection: 12, channel: "Retail", customer: "ElectroMax" },
    { id: "3", picklistCode: "PL003-LS", pendingQuantity: 15, pendingSection: 3, channel: "Online", customer: "OfficeSupply Co" },
    { id: "4", picklistCode: "PL004-BM", pendingQuantity: 30, pendingSection: 8, channel: "B2B", customer: "Corporate Solutions" },
    { id: "5", picklistCode: "PL005-PC", pendingQuantity: 40, pendingSection: 15, channel: "Retail", customer: "Mobile World" },
  ];

  const handleMenuClick = () => {
    setIsSideNavOpen(true);
  };

  const handleCloseSideNav = () => {
    setIsSideNavOpen(false);
  };

  const handleBack = () => {
    setLocation("/");
  };

  const handleFilter = () => {
    console.log("Filter clicked");
  };

  const handleSort = () => {
    console.log("A-Z Sort clicked");
  };

  return (
    <div className="bg-white flex flex-row justify-center w-full min-h-screen">
      <SideNavigation isOpen={isSideNavOpen} onClose={handleCloseSideNav} />
      <div className="bg-white-100 w-[412px] min-h-screen relative">
        {/* Header - Same as landing page */}
        <header className="flex flex-col w-[412px] items-start gap-4 absolute top-0 left-0 bg-transparent">
          <div className="flex h-12 items-center relative self-stretch w-full bg-white-100 border-b [border-bottom-style:solid] border-[#e0e0e0]">
            <button 
              className="relative w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
              onClick={handleMenuClick}
            >
              <MenuIcon className="h-6 w-6 text-text-elementsprimary" />
            </button>

            <div className="flex items-center gap-8 relative flex-1 grow">
              <h1 className="relative w-fit mt-[-1.00px] font-PAGE-TITLE font-[number:var(--PAGE-TITLE-font-weight)] text-text-elementsprimary text-[length:var(--PAGE-TITLE-font-size)] tracking-[var(--PAGE-TITLE-letter-spacing)] leading-[var(--PAGE-TITLE-line-height)] whitespace-nowrap [font-style:var(--PAGE-TITLE-font-style)]">
                B2B PACKING
              </h1>
            </div>

            {/* Assign to Me Button in Navbar */}
            <div className="flex items-center gap-2 pr-4">
              <span className="text-xs text-text-elementsprimary">Assign to me</span>
              <Switch
                checked={assignToMe}
                onCheckedChange={setAssignToMe}
                className="scale-75"
              />
            </div>
          </div>
        </header>

        {/* Filter Section - Below Navbar */}
        <div className="absolute top-12 left-0 right-0 p-4 bg-white-100 border-b border-greysbordere-0e-0e-0">
          <div className="flex items-center gap-3">
            {/* Filter Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleFilter}
              className="flex items-center gap-1 border-greysbordere-0e-0e-0"
            >
              <Filter className="h-4 w-4" />
              Filter
            </Button>

            {/* Picklist Code Input */}
            <div className="flex-1">
              <Input
                placeholder="Picklist Code"
                value={picklistCode}
                onChange={(e) => setPicklistCode(e.target.value)}
                className="h-8 text-sm"
              />
            </div>

            {/* A-Z Sort Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleSort}
              className="flex items-center gap-1 border-greysbordere-0e-0e-0"
            >
              <ArrowUpDown className="h-4 w-4" />
              A-Z
            </Button>
          </div>
        </div>

        {/* Picklist Items List */}
        <div className="absolute top-[120px] left-0 right-0 bottom-0 overflow-y-auto">
          <div className="p-4 space-y-3">
            {picklistItems.map((item) => (
              <Card key={item.id} className="border border-greysbordere-0e-0e-0">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    {/* Left Side - Picklist Code and Pending Info */}
                    <div className="flex-1 min-w-0">
                      {/* Picklist Code Title */}
                      <h3 className="font-medium text-text-elementsprimary font-['Roboto',Helvetica] mb-2 text-left">
                        {item.picklistCode}
                      </h3>
                      
                      {/* Vertical Flex for Pending Information */}
                      <div className="flex flex-col gap-1">
                        <div className="text-sm opacity-80">
                          <span className="text-text-elementssecondary">Pending Quantity: </span>
                          <span className="text-text-elementsprimary font-medium">{item.pendingQuantity}</span>
                        </div>
                        <div className="text-sm opacity-80">
                          <span className="text-text-elementssecondary">Pending Section: </span>
                          <span className="text-text-elementsprimary font-medium">{item.pendingSection}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Channel and Customer in Vertical Flex */}
                    <div className="flex flex-col items-end text-right ml-4 gap-1">
                      <div className="text-sm text-text-elementsprimary font-medium">
                        {item.channel}
                      </div>
                      <div className="text-sm text-text-elementsprimary font-medium">
                        {item.customer}
                      </div>
                    </div>
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