import React, { useState, useEffect, useRef } from 'react';

const buttonClass = 'bg-zinc-700 text-white py-2 px-4 rounded';
const imageClass = 'h-10 w-10';
const avatarClass = 'h-10 w-10 rounded-full cursor-pointer';
const containerClass = 'bg-zinc-800 text-white flex items-center justify-between p-4 relative';
const flexClass = 'flex items-center space-x-4';
const dropdownMenuClass = 'absolute mt-2 w-48 bg-zinc-800 text-white rounded-lg shadow-lg flex flex-col items-center right-0 border border-gray-700';
const dropdownItemClass = 'px-4 py-2 hover:bg-zinc-700 hover:text-yellow-300 w-full text-center transition duration-200 ease-in-out';
const dropdownItemWithBorderClass = `${dropdownItemClass} border-t border-gray-700`;

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div style={{ backgroundColor: "black" }}>
      <div className={containerClass}>
        <div className={flexClass}>
          <img src="https://placehold.co/40x40" alt="Logo" className={imageClass} />
          <a href='/todolist'><button className={buttonClass}>To-Do List</button></a>
        </div>
        <div className="relative">
          <div className={flexClass}>
            <span>Study_Buddy</span>
            <img
              src="data:image/png;base64,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" alt="User Avatar" className={avatarClass} onClick={toggleDropdown} />
          </div>
          {isDropdownOpen && (
            <div className={dropdownMenuClass} ref={dropdownRef}>
              <a href='/profile'><button className={dropdownItemClass}>Profile</button></a>
              <a href='/editprofile'><button className={dropdownItemWithBorderClass}>Edit Profile</button></a>
              <a href='/friendprofile'><button className={dropdownItemWithBorderClass}>Logout</button></a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
