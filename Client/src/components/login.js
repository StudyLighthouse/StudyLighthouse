import React from "react";
import { X } from 'lucide-react';
import "../styles/login.css";

export default function Login({onClose}){
    return(
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="mt-0 flex flex-col text-white">
                <button onClick={onClose} className="place-self-end"><X size={20}/></button>
                <div className="bg-black px-20 py-10 login-div">
                    <h1 className="text-3xl font-bold text-center mb-3">Login</h1>
                    <form>
                        <label>Username: </label><br></br>
                        <input type="text" placeholder="Enter your name" className="rounded p-1"/><br/><br/>
                        <label>Password: </label><br></br>
                        <input type="password" placeholder="Enter password"className="rounded p-1"/><br/><br/>
                        <center><a href="/" className="underline">Forgot Password ???</a>
                        <button className="mt-4 flex items-center justify-center px-3 py-1 rounded-md login-submit">Submit</button><br></br>
                        Don't have an account???<br></br>
                        <a href="/" className="underline">SignUp</a></center>
                    </form>
                </div>
            </div>
        </div>
    )
}