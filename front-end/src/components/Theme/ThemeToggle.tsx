import { Moon, Sun } from 'lucide-react';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';// Assuming you are using react-feather icons
import { useAppSelector } from '../../redux/store/hook';
import { setTheme } from '../../redux/features/preferences/preferencesSlice';

const ThemeToggle: React.FC = () => {
  const theme = useAppSelector((state) => state.preferences.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    // On initial load, apply the dark class based on the redux state
    if (theme === "dark") {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    console.log(theme);
    // Toggle the theme in Redux state
    dispatch(setTheme(theme === "dark" ? "light" : "dark"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;
