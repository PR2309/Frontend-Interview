import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 px-6">
      <div className="flex justify-between items-center">
        <div>© 2026 CA Monk Blog. All rights reserved.</div>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-300">Privacy</a>
          <a href="#" className="hover:text-gray-300">Terms</a>
          <a href="#" className="hover:text-gray-300">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;