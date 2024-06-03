import React from 'react';
import '../styles/editprofile.css'
import Header from '../components/Navbar'

export default function Editprofile() {
  return (
      <div className=" text-white dark:text-black p-4">
        <Header />
          <h1 className="text-3xl font-bold mt-4 text-white">Edit Profile</h1>
          <div className="mt-4 w-full flex flex-col items-center">
              <img src="https://placehold.co/100x100" alt="Profile Image" className="rounded-full h-32 w-32" crossorigin="anonymous"/><br></br>
              <button className="bg-blue-600 text-white px-4 py-2 w-40 mt-2 rounded-lg">UPLOAD IMAGE</button>
          </div>
          
          <div className='flex flex-row'>
            <div className="flex flex-col md:flex-row mt-6 w-2/4">
                <div className="flex-1 p-4">
                    <div className="mb-4 flex flex-row w-1/2 justify-between">
                        <label className="block text-zinc-400">Username:</label>
                        <span className="text-blue-400">Study Partner</span> 
                    </div>
                    <div className="mb-4 flex flex-row w-1/2 justify-between">
                        <label className="block text-zinc-400">Contact:</label>
                        <span className="text-blue-400">9238***102</span>
                    </div>
                    <div className="mb-4 flex flex-row w-1/2 justify-between">
                        <label className="block text-zinc-400">E-Mail:</label>
                        <span className="text-blue-400">xyz@gmail.com</span>
                    </div>
                    <div className="mb-4 flex flex-row w-1/2 justify-between">
                        <label className="block text-zinc-400">Password:</label><br></br>
                        <div className='flex flex-col'>
                          <input type="password" placeholder="Current Password" className="bg-zinc-800 text-white py-1 px-2 w-full rounded mb-2"/>
                          <input type="password" placeholder="New Password" className="bg-zinc-800 text-white py-1 px-2 w-full rounded mb-2"/>
                          <input type="password" placeholder="Confirm Password" className="bg-zinc-800 text-white py-1 px-2 w-full rounded mb-4"/>
                          <center><button className="bg-blue-600 text-white rounded-lg h-8 w-24">Submit</button></center>
                        </div>
                    </div>
                    <div className="mb-4 flex flex-row w-1/2 justify-between">
                        <label className="block text-zinc-400">GitHub URL:</label>
                        <a href="https://github.com/xyz" className="text-blue-400">https://github.com/xyz</a>
                    </div>
                    <div className="mb-4 flex flex-row w-1/2 justify-between">
                        <label className="block text-zinc-400">LinkedIn URL:</label>
                        <a href="https://linkedin.com/xyz" className="text-blue-400">https://linkedin.com/xyz</a>
                    </div>
                </div>
            </div>
            <div className="flex-1 pr-20 mt-6 w-1/2">
                <div className="mb-4">
                    {/* <label className="block text-zinc-400 mr-2 w-2/6">New Username:</label> */}
                    <div className='w-full flex flex-row items-center gap-4'>
                        <div className="wave-group">
                            <input required type="text" className="editinput" />
                            <span className="editbar"></span>
                            <label className="editlabel">
                                <span className="label-char" style={{ "--index": 0 }}>N</span>
                                <span className="label-char" style={{ "--index": 0 }}>e</span>
                                <span className="label-char" style={{ "--index": 0 }}>w</span>
                                <span className="label-char mr-2" style={{ "--index": 0 }}></span>
                                <span className="label-char" style={{ "--index": 0 }}>U</span>
                                <span className="label-char" style={{ "--index": 0 }}>s</span>
                                <span className="label-char" style={{ "--index": 0 }}>e</span>
                                <span className="label-char" style={{ "--index": 0 }}>r</span>
                                <span className="label-char" style={{ "--index": 0 }}>n</span>
                                <span className="label-char" style={{ "--index": 1 }}>a</span>
                                <span className="label-char" style={{ "--index": 2 }}>m</span>
                                <span className="label-char" style={{ "--index": 3 }}>e</span>
                            </label>
                        </div>
                        <button className="bg-blue-600 text-white rounded-lg h-8 w-24">Submit</button>
                    </div>
                </div>
                <div className="mt-7">
                    <img src="https://placehold.co/300x300" alt="Illustration" className="h-48 w-96" crossorigin="anonymous"/>
                </div>
                <div className="mb-4 mt-7 flex flex-row items-center justify-between">
                    {/* <label className="block text-zinc-400 mr-2 w-2/6">New GitHub URL:</label> */}
                    <div className='w-full flex flex-row items-center gap-4'>
                        <div className="wave-group">
                            <input required type="text" className="editinput" />
                            <span className="editbar"></span>
                            <label className="editlabel">
                                <span className="label-char" style={{ "--index": 0 }}>N</span>
                                <span className="label-char" style={{ "--index": 0 }}>e</span>
                                <span className="label-char" style={{ "--index": 0 }}>w</span>
                                <span className="label-char mr-2" style={{ "--index": 0 }}></span>
                                <span className="label-char" style={{ "--index": 0 }}>G</span>
                                <span className="label-char" style={{ "--index": 0 }}>i</span>
                                <span className="label-char" style={{ "--index": 0 }}>t</span>
                                <span className="label-char" style={{ "--index": 0 }}>H</span>
                                <span className="label-char" style={{ "--index": 0 }}>u</span>
                                <span className="label-char" style={{ "--index": 1 }}>b</span>
                                <span className="label-char mr-2" style={{ "--index": 2 }}></span>
                                <span className="label-char" style={{ "--index": 3 }}>U</span>
                                <span className="label-char" style={{ "--index": 3 }}>R</span>
                                <span className="label-char" style={{ "--index": 3 }}>L</span>
                            </label>
                        </div>
                        <button className="bg-blue-600 text-white rounded-lg h-8 w-24">Submit</button>
                    </div>
                </div>
                <div className="mb-4 flex flex-row items-center justify-between">
                    {/* <label className="block text-zinc-400 mr-2 w-2/6">New LinkedIn URL:</label> */}
                    <div className='w-full flex flex-row items-center gap-4'>
                        <div className="wave-group">
                            <input required type="text" className="editinput" />
                            <span className="editbar"></span>
                            <label className="editlabel">
                                <span className="label-char" style={{ "--index": 0 }}>N</span>
                                <span className="label-char" style={{ "--index": 0 }}>e</span>
                                <span className="label-char" style={{ "--index": 0 }}>w</span>
                                <span className="label-char mr-2" style={{ "--index": 0 }}></span>
                                <span className="label-char" style={{ "--index": 0 }}>L</span>
                                <span className="label-char" style={{ "--index": 0 }}>i</span>
                                <span className="label-char" style={{ "--index": 0 }}>n</span>
                                <span className="label-char" style={{ "--index": 0 }}>k</span>
                                <span className="label-char" style={{ "--index": 0 }}>e</span>
                                <span className="label-char" style={{ "--index": 1 }}>d</span>
                                <span className="label-char" style={{ "--index": 1 }}>I</span>
                                <span className="label-char" style={{ "--index": 1 }}>n</span>
                                <span className="label-char mr-2" style={{ "--index": 2 }}></span>
                                <span className="label-char" style={{ "--index": 3 }}>U</span>
                                <span className="label-char" style={{ "--index": 3 }}>R</span>
                                <span className="label-char" style={{ "--index": 3 }}>L</span>
                            </label>
                        </div>
                        <button className="bg-blue-600 text-white rounded-lg h-8 w-24">Submit</button>
                    </div>
                </div>
            </div>
          </div>
      </div>
  )
}