import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../theme/ThemeContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white/5 backdrop-blur-md dark:bg-dark-900/80 border-b border-gray-200/10 dark:border-gray-800/30 sticky top-0 z-50 shadow-glass dark:shadow-glass-dark transition-all duration-300">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-primary from-gradient-start via-gradient-mid to-gradient-end hover:opacity-80 transition-all duration-300 transform hover:scale-105 cursor-pointer">
            BlackBox Mavericks
          </span>
        </div>
        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-300 hover:text-white transition-all duration-300 hover:text-accent-purple-light relative group py-2 px-3 rounded-lg hover:bg-white/5 dark:hover:bg-dark-800/30">
              <span>Home</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-primary from-gradient-start to-gradient-end transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-all duration-300 hover:text-accent-purple-light relative group py-2 px-3 rounded-lg hover:bg-white/5 dark:hover:bg-dark-800/30">
              <span>About</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-primary from-gradient-start to-gradient-end transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </a>
            <a href="#" className="text-white font-medium relative group py-2 px-3 rounded-lg bg-gradient-primary from-gradient-start to-gradient-end opacity-90 hover:opacity-100 transition-all duration-300 shadow-neon">
              <span>Events</span>
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-all duration-300 hover:text-accent-purple-light relative group py-2 px-3 rounded-lg hover:bg-white/5 dark:hover:bg-dark-800/30">
              <span>Contact</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-primary from-gradient-start to-gradient-end transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </a>
          </nav>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-dark-800/50 backdrop-blur-xs text-gray-300 hover:text-white transition-all duration-300 hover:shadow-neon-blue transform hover:scale-105"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;