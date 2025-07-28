import React, { useState } from "react";
import { MenuIcon, Filter, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { SideNavigation } from "@/components/SideNavigation";

interface SKUItem {
  id: string;
  title: string;
  quantity: number;
  pending: number;
  channel: string;
  customer: string;
}

export const B2BPackingPage: React.FC = () => {
  const [, setLocation] = useLocation();
  const [assignToMe, setAssignToMe] = useState(false);
  const [picklistCode, setPicklistCode] = useState("");
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  // Sample SKU data
  const skuItems: SKUItem[] = [
    { id: "1", title: "Wireless Headphones Premium", quantity: 25, pending: 5, channel: "Online", customer: "TechCorp Ltd" },
    { id: "2", title: "USB-C Cable Set", quantity: 50, pending: 12, channel: "Retail", customer: "ElectroMax" },
    { id: "3", title: "Laptop Stand Adjustable", quantity: 15, pending: 3, channel: "Online", customer: "OfficeSupply Co" },
    { id: "4", title: "Bluetooth Mouse", quantity: 30, pending: 8, channel: "B2B", customer: "Corporate Solutions" },
    { id: "5", title: "Phone Case Premium", quantity: 40, pending: 15, channel: "Retail", customer: "Mobile World" },
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

        {/* SKU Items List */}
        <div className="absolute top-[120px] left-0 right-0 bottom-0 overflow-y-auto">
          <div className="p-4 space-y-3">
            {skuItems.map((item) => (
              <Card key={item.id} className="border border-greysbordere-0e-0e-0">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    {/* Left Side - Title and quantities */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-text-elementsprimary font-['Roboto',Helvetica] mb-2">
                        {item.title}
                      </h3>
                      <div className="flex gap-4">
                        <div className="text-sm">
                          <span className="text-text-elementssecondary">Quantity: </span>
                          <span className="text-text-elementsprimary font-medium">{item.quantity}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-text-elementssecondary">Pending: </span>
                          <span className="text-text-elementsprimary font-medium">{item.pending}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Channel and Customer */}
                    <div className="flex flex-col items-end text-right ml-4">
                      <div className="text-sm text-text-elementsprimary font-medium mb-1">
                        {item.channel}
                      </div>
                      <div className="text-xs text-text-elementssecondary">
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