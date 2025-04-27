import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import user from "../../assets/user.png";
import { useAppDispatch } from '../../redux/store/hook';
import { logout } from '../../redux/features/auth/authSlice';
import ThemeToggle from '../Theme/ThemeToggle';
import { setSidebar } from '../../redux/features/preferences/preferencesSlice';

type Link = {
  name: string;
  to: string;
};

type HeaderProps = {
  items: Link[];
};

const Header = ({ items }: HeaderProps) => {
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
      dispatch(logout());
  }

  const isActive = (path: string) => location.pathname === path;

  const handleSidebar = () => {
    dispatch(setSidebar(true));
  }

  return (
    <>
      {/* Header */}
      <header className="shadow-md shadow-gray-300 z-30 relative">
        <div className="mx-4 md:mx-10 py-3 flex items-center justify-between">
          {/* Left Side: Hamburger */}
          <div className="flex items-center gap-4">
            {/* Hamburger (Mobile) */}
            <button
              className="md:hidden text-gray-700 dark:text-gray-300"
              onClick={handleSidebar}
            >
              <Menu size={24} />
            </button>

            {/* Logo */}
            <Link
              to="/"
              className="text-xl font-bold text-black dark:text-white"
            >
              MINI CRM
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-4 ml-6">
              {items.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  className={`text-sm font-medium ${
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

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="focus:outline-none cursor-pointer"
              >
                <img
                  src={user}
                  alt="profile"
                  className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-500"
                />
              </button>
              {showProfileMenu && (
                <div className="absolute right-0 border border-gray-200 hover:bg-gray-400 bg-white dark:bg-gray-700 dark:hover:bg-gray-500 text-black dark:text-white shadow-lg rounded-md p-2 w-40 z-50">
                  <button
                    className="cursor-pointer text-sm text-left w-full text-gray-700 dark:text-gray-200 hover:text-white dark:hover:text-white"
                    onClick={
                      handleLogout
                    }
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
