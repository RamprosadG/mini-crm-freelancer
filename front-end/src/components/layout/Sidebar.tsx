import { X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store/hook";
import { setSidebar } from "../../redux/features/preferences/preferencesSlice";

type Link = {
    name: string;
    to: string;
  };
  
  type SidebarProps = {
    items: Link[];
  };

  
  const Sidebar = ({items}: SidebarProps) => {
    const sidebarOpen = useAppSelector((state) => state.preferences.sidebar);
    const dispatch = useAppDispatch();
    const location = useLocation();

    const handleSidebar = () => {
      dispatch(setSidebar(false));
    }


  const isActive = (path: string) => location.pathname === path;

    return (
        <>

{sidebarOpen && (
    <div className="fixed inset-0 z-40 md:hidden">
      {/* Overlay */}

      {/* Sidebar */}
      <div className="absolute left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            MINI CRM
          </h2>
          <button
            onClick={handleSidebar}
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
              onClick={handleSidebar}
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