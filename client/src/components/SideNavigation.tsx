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
          className="fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 h-full w-[280px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          left: `calc(50% - 206px)`, // 50% - (412px/2) = center of main container
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Package className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 font-['Roboto',sans-serif]">
              Menu
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 py-2">
          {navigationItems.map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-gray-50 transition-colors duration-150 group"
              onClick={() => {
                console.log(`Navigate to ${item.href}`);
                onClose();
              }}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
              </div>
              <span className="text-gray-900 font-medium font-['Roboto',sans-serif] group-hover:text-blue-600 transition-colors">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Footer - Logout */}
        <div className="border-t border-gray-100 p-2">
          <button
            className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-red-50 transition-colors duration-150 group"
            onClick={() => {
              console.log("Logout");
              onClose();
            }}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <LogOut className="w-5 h-5 text-gray-600 group-hover:text-red-600 transition-colors" />
            </div>
            <span className="text-gray-900 font-medium font-['Roboto',sans-serif] group-hover:text-red-600 transition-colors">
              Logout
            </span>
          </button>
        </div>
      </div>
    </>
  );
};