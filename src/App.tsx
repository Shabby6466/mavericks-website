import React from 'react';
import { ThemeProvider } from './components/theme/ThemeContext';
import EventDashboard from './components/events/EventDashboard';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-dark-950 dark:via-dark-900 dark:to-dark-800 text-gray-900 dark:text-white flex flex-col relative overflow-hidden transition-colors duration-500">
        {/* Animated gradient background effects */}
        <div className="absolute inset-0 bg-gradient-radial from-accent-purple/10 via-transparent to-transparent dark:from-accent-purple/20 animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-gradient-conic from-accent-blue/10 via-transparent to-transparent dark:from-accent-blue/20 animate-spin-slow opacity-75"></div>
        <div className="absolute inset-0 bg-gradient-shine bg-[length:200%_200%] animate-shine opacity-5"></div>
        
        {/* Main content */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8 relative">
            <div className="absolute inset-0 bg-white/5 dark:bg-dark-900/30 backdrop-blur-sm rounded-xl shadow-glass dark:shadow-glass-dark"></div>
            <div className="relative z-10">
              <EventDashboard />
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;