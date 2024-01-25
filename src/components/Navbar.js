import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-[#032541] z-[999]">
      <div className="container mx-auto px-[20px] xl:px-[100px] flex items-center justify-between py-3">
        <a href="/" className="text-white text-3xl">IaMDB</a>
        <div className="flex space-x-4">
          <a href="/movie-watched" className="text-white">
            Watchlist
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;