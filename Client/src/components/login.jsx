import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useSession } from '../contexts/SessionContext';
import { X } from 'lucide-react';

export default function Login({ onClose }) {
    const navigate = useNavigate();
    const { setUser } = useSession();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
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
        try {
            const response = await axios.post('http://127.0.0.1:5000/signin', formData, { withCredentials: true });
            if (response.status === 200) {
                setUser(response.data.user); // Set the user data and persist it in session storage
                onClose();
                navigate('/main');
                alert("Logged in successfully!");
            } else {
                setError(response.data.message || 'Error logging in');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Error submitting form');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="mt-10 flex flex-col text-white bg-gray-800 p-6 rounded-lg">
                <button onClick={onClose} className="self-end"><X size={20} /></button>
                <div className="container">
                    <div className="heading text-2xl mb-4">Login</div>
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    <form onSubmit={handleSubmit} className="form">
                        <input
                            required
                            className="input p-2 mb-2 rounded"
                            type="email"
                            name="email"
                            placeholder="E-mail"
                            onChange={handleChange}
                            value={formData.email}
                        />
                        <input
                            required
                            className="input p-2 mb-2 rounded"
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            value={formData.password}
                        />
                        <span className="forgot-password block mb-2"><a href="/" className="text-blue-400">Forgot Password?</a></span>
                        <input className="login-button p-2 bg-blue-500 rounded cursor-pointer" type="submit" value="Login" />
                    </form>
                    <div className="social-account-container mt-4">
                        <span className="title block mb-2">Or Sign in with</span>
                        <div className="social-accounts">
                            {/* Implement Google Sign-In button if needed */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
