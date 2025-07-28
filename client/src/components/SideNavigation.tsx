import React from "react";
import { X, Home, Package, Truck, Settings, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SideNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SideNavigation: React.FC<SideNavigationProps> = ({
  isOpen,
  onClose,
}) => {
  // Navigation menu items
  const navigationItems = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: Package, label: "B2B Picking", href: "/b2b-picking" },
    { icon: Truck, label: "B2C Picking", href: "/b2c-picking" },
    { icon: Settings, label: "Settings", href: "/settings" },
    { icon: User, label: "Profile", href: "/profile" },
  ];

  return (
    <>
      {/* Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 h-full w-80 bg-white-100 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          left: `calc(50% - 206px)`, // 50% - (412px/2) = center of main container
        }}
      >
        {/* Header with close button */}
        <div className="flex items-center justify-between p-4 border-b border-greysbordere-0e-0e-0">
          <h2 className="text-lg font-semibold text-text-elementsprimary font-['Roboto',Helvetica]">
            Navigation
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-gray-100"
          >
            <X className="h-5 w-5 text-text-elementsprimary" />
          </Button>
        </div>

        {/* Navigation items */}
        <nav className="py-4">
          <ul className="space-y-2">
            {navigationItems.map((item, index) => (
              <li key={index}>
                <button
                  className="w-full flex items-center gap-3 px-6 py-3 text-left hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => {
                    // Handle navigation here
                    console.log(`Navigate to ${item.href}`);
                    onClose();
                  }}
                >
                  <item.icon className="h-5 w-5 text-text-elementssecondary" />
                  <span className="text-text-elementsprimary font-['Roboto',Helvetica] font-medium">
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-greysbordere-0e-0e-0">
          <button
            className="w-full flex items-center gap-3 px-2 py-3 text-left hover:bg-gray-50 transition-colors duration-200"
            onClick={() => {
              console.log("Logout");
              onClose();
            }}
          >
            <LogOut className="h-5 w-5 text-text-elementssecondary" />
            <span className="text-text-elementsprimary font-['Roboto',Helvetica] font-medium">
              Logout
            </span>
          </button>
        </div>
      </div>
    </>
  );
};