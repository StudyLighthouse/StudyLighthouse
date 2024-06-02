import React from 'react';
import '../styles/textGpt.css';
import Header from '../components/Navbar';
import ChatComponent from '../components/sidebar';
import InputBar from '../components/promptInput';

export default function TextGpt(){
    return(
        <div className="textGpt w-full pt-4 ml-0">
            <div className='top '>
            <Header/>
            </div>
            <img className='img1 absolute  ' src='Text,Speech Human.png'></img>
            <img className='img2 absolute ' src='Text,Speech Robot.png'></img>
            <div className='bottom flex '>
                <div className='sidebar'>
                    <ChatComponent/>
                </div>
                <div className='chat w-fit'>
                    <div className='user_chat h-4/5'></div>
                    <div className='input mt-7'>
                    <InputBar/>
                    </div>
                </div>
            </div>
        </div>
    )
}