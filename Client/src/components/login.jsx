import React, { useState } from "react";
import { X } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

export default function Login({ onClose }) {
    const navigate = useNavigate(); // Initialize useNavigate
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/signin', formData);
            console.log(response.data);
            if (response.status === 200) {
                // Close the login component
                onClose();
                // Redirect to the main page
                navigate('/main');
                // Optionally, you can show a success message
                alert("Logged in successfully!");
            } else {
                // Handle other response statuses if needed
                console.error('Error logging in:', response.data.message);
            }
        } catch (error) {
            console.error('Error submitting form', error);
        }
    };

    const handleGoogleSignin = () => {
        window.location.href = 'http://127.0.0.1:5000/signin/google';  // Redirects to the Google sign-in route on the backend
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="mt-10 flex flex-col text-white">
                <button onClick={onClose} className="place-self-end"><X size={20} /></button>
                <div className="container">
                    <div className="heading">Login</div>
                    <form onSubmit={handleSubmit} className="form">
                        <input required className="input" type="email" name="email" placeholder="E-mail" onChange={handleChange} value={formData.email} />
                        <input required className="input" type="password" name="password" placeholder="Password" onChange={handleChange} value={formData.password} />
                        <span className="forgot-password"><a href="/">Forgot Password?</a></span>
                        <input className="login-button" type="submit" value="Login" />
                    </form>
                    <div className="social-account-container">
                        <span className="title">Or Sign in with</span>
                        <div className="social-accounts">
                            <button className="social-button google" onClick={handleGoogleSignin}>
                                <img width="24" height="24" src="https://img.icons8.com/material-sharp/24/google-logo.png" alt="google-logo" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
