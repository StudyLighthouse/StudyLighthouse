import React, { useEffect } from 'react';
import '../styles/textGpt.css';
import Header from '../components/Navbar';
import ChatComponent from '../components/sidebar';
import InputBar from '../components/promptInput';

export default function TextGpt() {
    useEffect(() => {
        document.body.classList.add('textGptBody');
        return () => {
            document.body.classList.remove('textGptBody');
        };
    }, []);

    return (
        <div className="textGpt w-full h-full pt-4 ml-0 flex flex-col">
            <Header />
            {/* <img className='img1 absolute' src='Text,Speech Human.png' alt="Human" />
            <img className='img2 absolute' src='Text,Speech Robot.png' alt="Robot" /> */}
            <div className='content flex-grow flex'>
                <ChatComponent />
                <InputBar />
            </div>
        </div>
    );
}
