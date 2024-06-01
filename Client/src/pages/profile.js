import React from 'react';
import Header from '../components/Navbar'
import ProblemsSolved from '../components/studycard';

export default function Profile() {
    return (
      <div className="bg-black text-white p-4 min-h-screen flex flex-col">
        <Header/>
        <h1 className="text-2xl font-bold mb-6 pt-4 italic">Profile</h1>
        <div className="flex items-center mb-10 ml-4">
          <img className="w-16 h-16 rounded-full" src="https://placehold.co/100x100" alt="Profile Image"/>
          <div className="ml-0">
            <div className="flex items-center">
              <span className="text-yellow-400 ml-24 text-xl">★★★★☆</span>
            </div>
          </div>
        </div>
        <div className="mb-4 ml-4">
          <p><strong>Username:</strong> <a href="#" className="text-blue-800 ml-20" >Study_Buddy</a></p>
          <br></br>
          <p><strong>Contact:</strong> <span className="text-blue-600 ml-24">9238***102</span></p>
          <br></br>
          <p><strong>E-Mail:</strong> <a href="mailto:xyz@gmail.com" className="text-blue-600 ml-24">xyz@gmail.com</a></p>
          <br></br>
          <p><strong>GitHub URL:</strong> <a href="https://github.com/xyz" className="text-blue-600 ml-16">https://github.com/xyz</a></p>
          <br></br>
          <p><strong>LinkedIn URL:</strong> <a href="https://github.com/xyz" className="text-blue-600 ml-12">https://github.com/xyz</a></p>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-2 ml-4">Solved Problems:</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 ml-4 pt-2">
            <ProblemsSolved/>
            {/* <div className="bg-zinc-800 p-4 rounded-lg">
              <p>What is the capital of Andhra Pradesh?</p>
              <p className="mt-2">Acceptance: 25 <span className="text-blue-400">👍</span></p>
            </div>
            <div className="bg-zinc-800 p-4 rounded-lg">
              <p>What is the capital of Andhra Pradesh?</p>
              <p className="mt-2">Acceptance: 25 <span className="text-blue-400">👍</span></p>
            </div>
            <div className="bg-zinc-800 p-4 rounded-lg">
              <p>What is the capital of Andhra Pradesh?</p>
              <p className="mt-2">Acceptance: 25 <span className="text-blue-400">👍</span></p>
            </div>
            <div className="bg-zinc-800 p-4 rounded-lg">
              <p>What is the capital of Andhra Pradesh?</p>
              <p className="mt-2">Acceptance: 25 <span className="text-blue-400">👍</span></p>
            </div>
            <div className="bg-zinc-800 p-4 rounded-lg">
              <p>What is the capital of Andhra Pradesh?</p>
              <p className="mt-2">Acceptance: 25 <span className="text-blue-400">👍</span></p>
            </div> */}
          </div>
        </div>
      </div>
    );
  }