import React from "react";
import { X } from 'lucide-react';
import "../styles/login.css";

export default function Login({onClose}){
    return(
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className=" flex flex-col text-white">
                <button onClick={onClose} className="place-self-end"><X size={20}/></button>
                <div class="container">
        <div class="heading">Login</div>
        <form action="" class="form">
            <input required="" class="input" type="text" name="email" id="email" placeholder="Username"/>
            <input required="" class="input" type="password" name="password" id="password" placeholder="Password"/>
            <span class="forgot-password"><a href="/">Forgot Password ?</a></span>
            <input class="login-button" type="submit" value="Login"/>
        </form>
            <div class="social-account-container">
                <span class="title">Or Sign in with</span>
                <div class="social-accounts">
                <button class="social-button google">
                    <img width="24" height="24" src="https://img.icons8.com/material-sharp/24/google-logo.png" alt="google-logo"/>
                </button>
                
                </div>
            </div>
            </div>
        </div>
    </div>
    )
}