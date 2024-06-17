import React, { useState } from "react";
import { X } from 'lucide-react';
import "../styles/signup.css";
import axios from 'axios';

export default function Signup({ onClose }) {
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");  // Reset error message

        if (formData.password.length < 6) {
            setError("Password should be at least 6 characters long.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:5000/signup', formData);
            console.log(response.data);
            if (response.status === 201) {
                // Close the signup component
                onClose();
                // Optionally, you can show a success message to the user
                alert("Account created successfully!");
            } else {
                // Handle other response statuses if needed
                setError(`Error creating account: ${response.data.message}`);
            }
        } catch (error) {
            console.error('Error submitting form', error.response ? error.response.data : error.message);
            setError(`Error submitting form: ${error.response ? error.response.data.message : error.message}`);
        }
    };

    const handleGoogleSignin = async (e) => {
        e.preventDefault();
        window.location.href = 'http://127.0.0.1:5000/signin/google';
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center m-0">
            <div className="mt-10 flex flex-col text-white">
                <button onClick={onClose} className="place-self-end"><X size={20} /></button>
                <div className="container">
                    <div className="heading">Sign Up</div>
                    {error && <div className="error">{error}</div>} {/* Display error message */}
                    <form onSubmit={handleSubmit} className="form">
                        <input required className="input" type="text" name="name" placeholder="Name" onChange={handleChange} value={formData.name} />
                        <input required className="input" type="text" name="mobile" placeholder="Mobile Number" onChange={handleChange} value={formData.mobile} />
                        <input required className="input" type="email" name="email" placeholder="E-mail" onChange={handleChange} value={formData.email} />
                        <input required className="input" type="password" name="password" placeholder="Password" onChange={handleChange} value={formData.password} />
                        <input required className="input" type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} value={formData.confirmPassword} />
                        <input className="login-button" type="submit" value="Sign Up" />
                    </form>
                    <div className="social-account-container">
                        <span className="title">Or Sign up with</span>
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
