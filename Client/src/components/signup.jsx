import React from "react"
import { X } from 'lucide-react';
import "../styles/signup.css"

export default function Signup({onClose}){
    return(
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="mt-10 flex flex-col text-white">
                <button onClick={onClose} className="place-self-end"><X size={20}/></button>
                <div class="container">
        <div class="heading">Sign Up</div>
        <form action="" class="form">
            <input required="" class="input" type="text" name="email" id="email" placeholder="Name"/>
            <input required="" class="input" type="text" name="email" id="email" placeholder="Mobile Number"/>
            <input required="" class="input" type="email" name="email" id="email" placeholder="E-mail"/>
            <input required="" class="input" type="password" name="password" id="password" placeholder="Password"/>
            <input required="" class="input" type="password" name="password" id="password" placeholder="Confirm Password"/>
            <span class="forgot-password"><a href="/">Forgot Password ?</a></span>
            <input class="login-button" type="submit" value="Sign Up"/>
        </form>
            <div class="social-account-container">
                <span class="title">Or Sign up with</span>
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