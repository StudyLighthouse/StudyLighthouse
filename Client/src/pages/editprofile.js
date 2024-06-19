import React, { useState } from 'react';
import '../styles/editprofile.css';
import Header from '../components/Navbar';
import { useSession } from '../contexts/SessionContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      toast.success(`${field} updated successfully!`);
      // Clear the form field after successful submission
      setFormData((prevFormData) => ({ ...prevFormData, [field]: '' }));
    } catch (error) {
      console.error(error);
      toast.error(`Failed to update ${field}`);
    }
  };

  return (
    <div className="text-white dark:text-black w-screen h-screen">
      <Header />
      <h1 className="lg:text-3xl font-bold mt-4 text-white flex justify-center md:text-xl sm:text-lg">Edit Profile</h1>
      <div className="mt-4 w-full flex flex-col items-center">
        <img src={user.profileImage || "https://placehold.co/100x100"} alt="Profile Image" className="rounded-full lg:h-32 md:h-28 sm:h-24" /><br />
        <input type="file" name="profileImage" onChange={handleInputChange} className="mt-1 cursor-pointer lg:w-[20%] md:w-[30%] sm:w-[40%]" id="profileImage" />
        <label htmlFor="profileImage" className="text-white text-center sm:text-xs md:text-base lg:text-lg px-4 py-2 w-40 mt-2">UPLOAD IMAGE</label>
        <button onClick={() => handleSubmit('profileImage')} className="bg-blue-600 text-white px-4 py-2 lg:w-40 md:w-36 sm:w-32 mt-2 sm:text-xs md:text-base lg:text-lg rounded-lg cursor-pointer">SUBMIT IMAGE</button>
      </div>
      <div className='flex lg:flex-row md:flex-col sm:flex-col md:items-center sm:items-center'>
        <div className="flex mt-6 lg:w-2/4 md:w-full sm:w-full lg:pl-48 md:pl-0 sm:pl-16">
          <div className="flex flex-col w-full md:items-center lg:items-start sm:items-start p-4">
            <div className="mb-4 flex flex-row lg:w-[50%] md:w-[40%] sm:w-[80%] justify-between">
              <label className="block text-zinc-400">Username:</label>
              <span className="text-blue-400">{user.name}</span>
            </div>
            <div className="mb-4 flex flex-row lg:w-[50%] md:w-[40%] sm:w-[80%] justify-between">
              <label className="block text-zinc-400">Contact:</label>
              <span className="text-blue-400">{user.newContact}</span>
            </div>
            <div className="lg:mb-48 md:mb-4 sm:mb-4 flex flex-row lg:w-[50%] md:w-[40%] sm:w-[80%] justify-between">
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
            <div className="mb-4 flex flex-row w-[80%] justify-between">
              <label className="block text-zinc-400">GitHub URL:</label>
              <a href={user.newGithub} className="text-blue-400 cursor-pointer">{user.newGithub}</a>
            </div>
            <div className="mb-4 flex flex-row w-[80%] justify-between">
              <label className="block text-zinc-400">LinkedIn URL:</label>
              <a href={user.newLinkedin} className="text-blue-400 cursor-pointer">{user.newLinkedin}</a>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center pr-20 mt-6 lg:w-1/2 md:w-full sm:w-full">
          <div className="mb-4">
            <div className='w-full flex flex-row items-center gap-4'>
              <div className="wave-group">
                <input type="text" name="newUsername" value={formData.newUsername} className="editinput" onChange={handleInputChange} />
                <span className="editbar"></span>
                <label className="editlabel">
                  <span className="label-char" style={{ "--index": 0 }}>N</span>
                  <span className="label-char" style={{ "--index": 1 }}>e</span>
                  <span className="label-char" style={{ "--index": 2 }}>w</span>
                  <span className="label-char mr-2" style={{ "--index": 3 }}></span>
                  <span className="label-char" style={{ "--index": 4 }}>U</span>
                  <span className="label-char" style={{ "--index": 5 }}>s</span>
                  <span className="label-char" style={{ "--index": 6 }}>e</span>
                  <span className="label-char" style={{ "--index": 7 }}>r</span>
                  <span className="label-char" style={{ "--index": 8 }}>n</span>
                  <span className="label-char" style={{ "--index": 9 }}>a</span>
                  <span className="label-char" style={{ "--index": 10 }}>m</span>
                  <span className="label-char" style={{ "--index": 11 }}>e</span>
                </label>
              </div>
              <button onClick={() => handleSubmit('newUsername')} className="bg-blue-600 text-white rounded-lg lg:h-8 lg:w-24 sm:w-16 sm:h-10 md:w-20 md:h-10">Submit</button>
            </div>
          </div>
          <div className="mb-4">
            <div className='w-full flex flex-row items-center gap-4'>
              <div className="wave-group">
                <input type="text" name="newContact" value={formData.newContact} className="editinput" onChange={handleInputChange} />
                <span className="editbar"></span>
                <label className="editlabel">
                  <span className="label-char" style={{ "--index": 0 }}>N</span>
                  <span className="label-char" style={{ "--index": 1 }}>e</span>
                  <span className="label-char" style={{ "--index": 2 }}>w</span>
                  <span className="label-char mr-2" style={{ "--index": 3 }}></span>
                  <span className="label-char" style={{ "--index": 4 }}>C</span>
                  <span className="label-char" style={{ "--index": 5 }}>o</span>
                  <span className="label-char" style={{ "--index": 6 }}>n</span>
                  <span className="label-char" style={{ "--index": 7 }}>t</span>
                  <span className="label-char" style={{ "--index": 8 }}>a</span>
                  <span className="label-char" style={{ "--index": 9 }}>c</span>
                  <span className="label-char" style={{ "--index": 10 }}>t</span>
                </label>
              </div>
              <button onClick={() => handleSubmit('newContact')} className="bg-blue-600 text-white rounded-lg lg:h-8 lg:w-24 sm:w-16 sm:h-10 md:w-20 md:h-10">Submit</button>
            </div>
          </div>
          <div className="mt-7">
            <img src="https://placehold.co/300x300" alt="Illustration" className="h-32 w-96" />
          </div>
          <div className="mb-4 mt-7 flex flex-row items-center justify-between">
            <div className='w-full flex flex-row items-center gap-4'>
              <div className="wave-group">
                <input type="text" name="newGithub" value={formData.newGithub} className="editinput" onChange={handleInputChange} />
                <span className="editbar"></span>
                <label className="editlabel">
                  <span className="label-char" style={{ "--index": 0 }}>N</span>
                  <span className="label-char" style={{ "--index": 1 }}>e</span>
                  <span className="label-char" style={{ "--index": 2 }}>w</span>
                  <span className="label-char mr-2" style={{ "--index": 3 }}></span>
                  <span className="label-char" style={{ "--index": 4 }}>G</span>
                  <span className="label-char" style={{ "--index": 5 }}>i</span>
                  <span className="label-char" style={{ "--index": 6 }}>t</span>
                  <span className="label-char" style={{ "--index": 7 }}>H</span>
                  <span className="label-char" style={{ "--index": 8 }}>u</span>
                  <span className="label-char" style={{ "--index": 9 }}>b</span>
                  <span className="label-char mr-2" style={{ "--index": 10 }}></span>
                  <span className="label-char" style={{ "--index": 11 }}>U</span>
                  <span className="label-char" style={{ "--index": 12 }}>R</span>
                  <span className="label-char" style={{ "--index": 13 }}>L</span>
                </label>
              </div>
              <button onClick={() => handleSubmit('newGithub')} className="bg-blue-600 text-white rounded-lg lg:h-8 lg:w-24 sm:w-16 sm:h-10 md:w-20 md:h-10">Submit</button>
            </div>
          </div>
          <div className="mb-4 flex flex-row items-center justify-between">
            <div className='w-full flex flex-row items-center gap-4'>
              <div className="wave-group">
                <input type="text" name="newLinkedin" value={formData.newLinkedin} className="editinput" onChange={handleInputChange} />
                <span className="editbar"></span>
                <label className="editlabel">
                  <span className="label-char" style={{ "--index": 0 }}>N</span>
                  <span className="label-char" style={{ "--index": 1 }}>e</span>
                  <span className="label-char" style={{ "--index": 2 }}>w</span>
                  <span className="label-char mr-2" style={{ "--index": 3 }}></span>
                  <span className="label-char" style={{ "--index": 4 }}>L</span>
                  <span className="label-char" style={{ "--index": 5 }}>i</span>
                  <span className="label-char" style={{ "--index": 6 }}>n</span>
                  <span className="label-char" style={{ "--index": 7 }}>k</span>
                  <span className="label-char" style={{ "--index": 8 }}>e</span>
                  <span className="label-char" style={{ "--index": 9 }}>d</span>
                  <span className="label-char" style={{ "--index": 10 }}>I</span>
                  <span className="label-char" style={{ "--index": 11 }}>n</span>
                  <span className="label-char mr-2" style={{ "--index": 12 }}></span>
                  <span className="label-char" style={{ "--index": 13 }}>U</span>
                  <span className="label-char" style={{ "--index": 14 }}>R</span>
                  <span className="label-char" style={{ "--index": 15 }}>L</span>
                </label>
              </div>
              <button onClick={() => handleSubmit('newLinkedin')} className="bg-blue-600 text-white rounded-lg lg:h-8 lg:w-24 sm:w-16 sm:h-10 md:w-20 md:h-10">Submit</button>
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}
