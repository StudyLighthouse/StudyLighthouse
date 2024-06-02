import React from "react"
import { X } from 'lucide-react';
import "../styles/signup.css"

export default function Signup({onClose}){
    return(
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="mt-0 flex flex-col text-white">
                <button onClick={onClose} className="place-self-end"><X size={20}/></button>
                <div className="bg-black px-20 py-10 rounded-lg border-2 signup-div">
                    <h1 className="text-3xl font-bold text-center mb-5">SignUp</h1>
                    <form>
                        <label>Name: </label><br></br>
                        <input type="text" placeholder="Enter your name" className="rounded p-1"/><br/><br/>
                        <label>Email: </label><br></br>
                        <input type="email" placeholder="Enter email" className="rounded p-1"/><br/><br/>
                        <label>Mobile Number: </label><br></br>
                        <input type="number" placeholder="Enter number" className="rounded p-1"/><br/><br/>
                        <label>Password: </label><br></br>
                        <input type="password" placeholder="Enter password" className="rounded p-1"/><br/><br/>
                        <center><a href="/" className="underline">Already have an account??</a><br></br>
                        <button className="mt-4 px-3 py-1 rounded-md bg-white signup-submit">Submit</button></center>
                    </form>
                </div>
            </div>
        </div>
    )
}