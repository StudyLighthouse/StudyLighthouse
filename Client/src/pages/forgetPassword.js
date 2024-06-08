import React, { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/forgot_password", { email });
      setMessage(response.data.message);
      setEmail("");
    } catch (error) {
      setError(error.response?.data?.message || "Error submitting form");
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" style={{border:"1px solid white",color:'white'}}>Send Password Reset Link</button>
      </form>
    </div>

        
        
    );
};

