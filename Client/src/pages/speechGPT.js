import React, { useEffect } from 'react';
import '../styles/speechGpt.css';
import Header from '../components/Navbar';
import ChatComponent from '../components/sidebar';
import AudioToText from '../components/micInput';

export default function SpeechGpt() {
    useEffect(() => {
        document.body.classList.add('speechGptBody');
        return () => {
            document.body.classList.remove('speechGptBody');
        };
    }, []);

    return (
        <div className="speechGpt w-full h-full pt-4 ml-0 flex flex-col">
            <Header />
            <img className='img1 absolute' src='Text,Speech Human.png' alt="Human" />
            <img className='img2 absolute' src='Text,Speech Robot.png' alt="Robot" />
            <div className='content flex'>
                <ChatComponent />
                <AudioToText />
            </div>
        </div>
    );
}
