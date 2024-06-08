import React, { useState } from 'react';
import '../styles/editprofile.css';
import Header from '../components/Navbar';
import { useSession } from '../contexts/SessionContext';
import axios from 'axios';

export default function Editprofile() {
    const { user, updateUserField } = useSession();
  const [formData, setFormData] = useState({
    newUsername: '',
    newContact: '',
    newGithub: '',
    newLinkedin: '',
    profileImage: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage') {
      setFormData({ ...formData, profileImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (field) => {
    const data = new FormData();
    data.append('user', JSON.stringify(user));
    data.append(field, formData[field]);
    if (field === 'profileImage') {
      data.append('profileImage', formData.profileImage);
    }

    try {
      const response = await axios.post(`http://127.0.0.1:5000/update_profile/${field}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      updateUserField(field, response.data.user[field === 'newUsername' ? 'name' : field]);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to update profile');
    }
  };

  return (
    <div className="text-white dark:text-black p-4">
      <Header />
      <h1 className="text-3xl font-bold mt-4 text-white">Edit Profile</h1>
      <div className="mt-4 w-full flex flex-col items-center">
        <img src={user.profileImage || "https://placehold.co/100x100"} alt="Profile Image" className="rounded-full h-32 w-32" /><br />
        <input type="file" name="profileImage" onChange={handleInputChange} className="" id="profileImage" />
        <label htmlFor="profileImage" className="bg-blue-600 text-white px-4 py-2 w-40 mt-2 rounded-lg cursor-pointer">UPLOAD IMAGE</label>
        <button onClick={() => handleSubmit('profileImage')} className="bg-blue-600 text-white px-4 py-2 w-40 mt-2 rounded-lg">SUBMIT IMAGE</button>
      </div>
      
      <div className='flex flex-row'>
        <div className="flex flex-col md:flex-row mt-6 w-2/4">
          <div className="flex-1 p-4">
            <div className="mb-4 flex flex-row w-1/2 justify-between">
              <label className="block text-zinc-400">Username:</label>
              <span className="text-blue-400">{user.name}</span>
            </div>
            <div className="mb-4 flex flex-row w-1/2 justify-between">
              <label className="block text-zinc-400">Contact:</label>
              <span className="text-blue-400">{user.mobile}</span>
            </div>
            <div className="mb-4 flex flex-row w-1/2 justify-between">
              <label className="block text-zinc-400">E-Mail:</label>
              <span className="text-blue-400">{user.email}</span>
            </div>
            {/* <div className="mb-4 flex flex-row w-1/2 justify-between">
              <label className="block text-zinc-400">Password:</label><br />
              <div className='flex flex-col'>
                <input type="password" name="currentPassword" placeholder="Current Password" className="bg-zinc-800 text-white py-1 px-2 w-full rounded mb-2" onChange={handleInputChange} />
                <input type="password" name="newPassword" placeholder="New Password" className="bg-zinc-800 text-white py-1 px-2 w-full rounded mb-2" onChange={handleInputChange} />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" className="bg-zinc-800 text-white py-1 px-2 w-full rounded mb-4" onChange={handleInputChange} />
                <center><button onClick={() => handleSubmit('password')} className="bg-blue-600 text-white rounded-lg h-8 w-24">Submit</button></center>
              </div>
            </div> */}
            <div className="mb-4 flex flex-row w-1/2 justify-between">
              <label className="block text-zinc-400">GitHub URL:</label>
              <a href={user.github} className="text-blue-400">{user.newGithub}</a>
            </div>
            <div className="mb-4 flex flex-row w-1/2 justify-between">
              <label className="block text-zinc-400">LinkedIn URL:</label>
              <a href={user.linkedin} className="text-blue-400">{user.newLinkedin}</a>
            </div>
          </div>
        </div>
        <div className="flex-1 pr-20 mt-6 w-1/2">
          <div className="mb-4">
            <div className='w-full flex flex-row items-center gap-4'>
              <div className="wave-group">
                <input type="text" name="newUsername" className="editinput" onChange={handleInputChange} />
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
              <button onClick={() => handleSubmit('newUsername')} className="bg-blue-600 text-white rounded-lg h-8 w-24">Submit</button>
            </div>
          </div>
          <div className="mb-4">
            <div className='w-full flex flex-row items-center gap-4'>
              <div className="wave-group">
                <input type="text" name="newContact" className="editinput" onChange={handleInputChange} />
                <span className="editbar"></span>
                <label className="editlabel">
                  <span className="label-char" style={{ "--index": 0 }}>N</span>
                  <span className="label-char" style={{ "--index": 0 }}>e</span>
                  <span className="label-char" style={{ "--index": 0 }}>w</span>
                  <span className="label-char mr-2" style={{ "--index": 0 }}></span>
                  <span className="label-char" style={{ "--index": 0 }}>C</span>
                  <span className="label-char" style={{ "--index": 0 }}>o</span>
                  <span className="label-char" style={{ "--index": 0 }}>n</span>
                  <span className="label-char" style={{ "--index": 0 }}>t</span>
                  <span className="label-char" style={{ "--index": 0 }}>a</span>
                  <span className="label-char" style={{ "--index": 1 }}>c</span>
                  <span className="label-char" style={{ "--index": 2 }}>t</span>
                </label>
              </div>
              <button onClick={() => handleSubmit('newContact')} className="bg-blue-600 text-white rounded-lg h-8 w-24">Submit</button>
            </div>
          </div>
          <div className="mt-7">
            <img src="https://placehold.co/300x300" alt="Illustration" className="h-32 w-96" />
          </div>
          <div className="mb-4 mt-7 flex flex-row items-center justify-between">
            <div className='w-full flex flex-row items-center gap-4'>
              <div className="wave-group">
                <input type="text" name="newGithub" className="editinput" onChange={handleInputChange} />
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
              <button onClick={() => handleSubmit('newGithub')} className="bg-blue-600 text-white rounded-lg h-8 w-24">Submit</button>
            </div>
          </div>
          <div className="mb-4 flex flex-row items-center justify-between">
            <div className='w-full flex flex-row items-center gap-4'>
              <div className="wave-group">
                <input type="text" name="newLinkedin" className="editinput" onChange={handleInputChange} />
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
              <button onClick={() => handleSubmit('newLinkedin')} className="bg-blue-600 text-white rounded-lg h-8 w-24">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
