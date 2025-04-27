import { X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

type Link = {
    name: string;
    to: string;
  };
  
  type SidebarProps = {
    items: Link[];
  };

  
  const Sidebar = ({items}: SidebarProps) => {
      
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();



  const isActive = (path: string) => location.pathname === path;

    return (
        <>

{sidebarOpen && (
    <div className="fixed inset-0 z-40 md:hidden">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div className="absolute left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Menu
          </h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-600 dark:text-gray-300"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="space-y-3">
          {items.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              onClick={() => setSidebarOpen(false)}
              className={`block text-sm font-medium ${
                isActive(link.to)
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )}
  </>
)
}

export default Sidebar;