import React from 'react';
import Header from '../components/Navbar'

export default function Friendprofile() {
    return (
      <div className="bg-black text-white p-6 rounded-lg w-full h-screen flex flex-col ">
        <Header />
        <div className="w-full">
          <h2 className="text-3xl font-bold text-left mb-4 ml-6 pt-4">Study_Buddy's Profile</h2>
          <div className="flex items-center mb-4">
            <img className="w-16 h-16 rounded-full mr-4 ml-10" src="https://placehold.co/100x100" alt="Profile Picture"/>
            <div className='ml-4'>
              <p className="text-blue-400">@Study_Buddy</p>
              <div className="flex items-center">
                <span className="text-yellow-400 text-xl">★★★★☆</span>
              </div>
            </div>
          </div>
          <div className="mb-4 pt-8 ml-10">
            <p><span className="font-bold">GitHub URL:</span> <a href="https://github.com/xyz" className="text-blue-600 ml-10">https://github.com/xyz</a></p>
            <br />
            <p><span className="font-bold">LinkedIn URL:</span> <a href="https://linkedin.com/xyz" className="text-blue-600 ml-7">https://linkedin.com/xyz</a></p>
          </div>
          <div>
            <h3 className="font-bold mb-2 text-xl ml-10 pt-4">Solved Problems:</h3>   
          </div>
        </div>
      </div>
    );
  }