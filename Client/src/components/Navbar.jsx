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

const Header = ({ onMenuToggle, isMenuOpen, currentPage }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, loading, signOut } = useSession();
  const isStudyMaterialsPage = currentPage === "StudyMaterials";
  const isTextGPTPage = currentPage === "textGpt";
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
          {(isStudyMaterialsPage || isTextGPTPage) && (
            <button className="menu-toggle" onClick={onMenuToggle}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="icon-xl-heavy"><path fill="currentColor" fill-rule="evenodd" d="M8.857 3h6.286c1.084 0 1.958 0 2.666.058.729.06 1.369.185 1.961.487a5 5 0 0 1 2.185 2.185c.302.592.428 1.233.487 1.961.058.708.058 1.582.058 2.666v3.286c0 1.084 0 1.958-.058 2.666-.06.729-.185 1.369-.487 1.961a5 5 0 0 1-2.185 2.185c-.592.302-1.232.428-1.961.487C17.1 21 16.227 21 15.143 21H8.857c-1.084 0-1.958 0-2.666-.058-.728-.06-1.369-.185-1.96-.487a5 5 0 0 1-2.186-2.185c-.302-.592-.428-1.232-.487-1.961C1.5 15.6 1.5 14.727 1.5 13.643v-3.286c0-1.084 0-1.958.058-2.666.06-.728.185-1.369.487-1.96A5 5 0 0 1 4.23 3.544c.592-.302 1.233-.428 1.961-.487C6.9 3 7.773 3 8.857 3M6.354 5.051c-.605.05-.953.142-1.216.276a3 3 0 0 0-1.311 1.311c-.134.263-.226.611-.276 1.216-.05.617-.051 1.41-.051 2.546v3.2c0 1.137 0 1.929.051 2.546.05.605.142.953.276 1.216a3 3 0 0 0 1.311 1.311c.263.134.611.226 1.216.276.617.05 1.41.051 2.546.051h.6V5h-.6c-1.137 0-1.929 0-2.546.051M11.5 5v14h3.6c1.137 0 1.929 0 2.546-.051.605-.05.953-.142 1.216-.276a3 3 0 0 0 1.311-1.311c.134-.263.226-.611.276-1.216.05-.617.051-1.41.051-2.546v-3.2c0-1.137 0-1.929-.051-2.546-.05-.605-.142-.953-.276-1.216a3 3 0 0 0-1.311-1.311c-.263-.134-.611-.226-1.216-.276C17.029 5.001 16.236 5 15.1 5zM5 8.5a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1M5 12a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1" clip-rule="evenodd"></path></svg>
            </button>
          )}
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