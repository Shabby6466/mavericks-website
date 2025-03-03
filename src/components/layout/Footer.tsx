import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400">
              © {new Date().getFullYear()} BlackBox Mavericks. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-accent-purple transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-accent-purple transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-accent-purple transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;