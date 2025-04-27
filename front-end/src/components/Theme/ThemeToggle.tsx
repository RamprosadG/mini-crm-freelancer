import { Moon, Sun } from 'lucide-react';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';// Assuming you are using react-feather icons
import { useAppSelector } from '../../redux/store/hook';
import { setTheme } from '../../redux/features/preferences/preferencesSlice';

const ThemeToggle: React.FC = () => {
  const theme = useAppSelector((state) => state.preferences.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    console.log(theme);
    dispatch(setTheme(theme === "dark" ? "light" : "dark"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;
