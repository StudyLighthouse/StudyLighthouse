import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSession } from "../contexts/SessionContext";

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
  const { user, loading, signOut } = useSession();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.get('http://127.0.0.1:5000/logout');
      signOut();
      window.location.href = '/'; 
    } catch (error) {
      console.error('Error logging out:', error);
    }
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
            {user && !loading && (
              <>
                <span>{user.name}</span> 
                <img
                  src={user.profileImage} // Remove comments from here
                  alt="User Avatar"
                  className={avatarClass}
                  onClick={toggleDropdown}
                />
              </>
            )}
          </div>
          {isDropdownOpen && (
            <div className={dropdownMenuClass} ref={dropdownRef}>
              <a href='/profile'><button className={dropdownItemClass}>Profile</button></a>
              <a href='/editprofile'><button className={dropdownItemWithBorderClass}>Edit Profile</button></a>
              <a href='/studymaterials'><button className={dropdownItemWithBorderClass}>Study Materials</button></a>
              <button className={dropdownItemClass} onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
