import React from "react";
import { X, Home, Package, Truck, Settings, User, LogOut } from "lucide-react";

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
        className={`fixed top-0 h-full w-[320px] bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          left: `calc(50% - 206px)`, // 50% - (412px/2) = center of main container
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-6 bg-gray-50 border-b border-gray-200">
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold text-gray-900 font-['Roboto',sans-serif]">
              Menu
            </h2>
            <p className="text-sm text-gray-500 mt-1">HHD Mobile</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-gray-100 transition-colors shadow-sm"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 py-4">
          {navigationItems.map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-blue-50 hover:border-r-4 hover:border-r-blue-500 transition-all duration-200 group"
              onClick={() => {
                console.log(`Navigate to ${item.href}`);
                onClose();
              }}
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 group-hover:bg-blue-100 transition-colors">
                <item.icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
              </div>
              <span className="text-gray-800 font-medium font-['Roboto',sans-serif] group-hover:text-blue-700 transition-colors">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Footer - Logout */}
        <div className="border-t border-gray-200 bg-gray-50">
          <button
            className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-red-50 hover:border-r-4 hover:border-r-red-500 transition-all duration-200 group"
            onClick={() => {
              console.log("Logout");
              onClose();
            }}
          >
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 group-hover:bg-red-100 transition-colors">
              <LogOut className="w-5 h-5 text-gray-600 group-hover:text-red-600 transition-colors" />
            </div>
            <span className="text-gray-800 font-medium font-['Roboto',sans-serif] group-hover:text-red-700 transition-colors">
              Logout
            </span>
          </button>
        </div>
      </div>
    </>
  );
};