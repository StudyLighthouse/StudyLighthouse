import React, { useState, useEffect } from 'react';
import '../styles/speechGpt.css';
import Header from '../components/Navbar';
import ChatComponent from '../components/sidebar';
import SpeechToTextToSpeech from '../components/micInput';
import { useSession } from '../contexts/SessionContext'; // Import useSession hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate


export default function SpeechGpt() {
    const { user, loading } = useSession(); // Get user and loading state from session context
    const navigate = useNavigate();
    useEffect(() => {
        document.body.classList.add('speechGptBody');
        return () => {
            document.body.classList.remove('speechGptBody');
        };
    }, []);

    const [messages, setMessages] = useState([]);

    const fetchMessages = () => {
        const storedMessages = [];
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            if (key.startsWith("message_")) {
                const message = JSON.parse(sessionStorage.getItem(key));
                storedMessages.push(message);
            }
        }
        setMessages(storedMessages);
    };
    useEffect(() => {
        fetchMessages();
    }, []);
    useEffect(() => {
        if (!loading && !user) {
            navigate('/signin'); // Redirect to signin if user is not authenticated
        }
    }, [loading, user, navigate]);

    if (loading) {
        return <div>Loading...</div>; // Show loading state while session is being validated
    }

    return (
        <div className="textGpt w-full h-full pt-4 ml-0 flex flex-col">
            <Header setMessages={setMessages}/>
            <img className="img1 absolute" src="Text,Speech Human.png" alt="Human" />
            <img className="img2 absolute" src="Text,Speech Robot.png" alt="Robot" />
            <div className="content flex-grow flex">
                <ChatComponent onChatSaved={fetchMessages} onChatSelected={setMessages}/> {/* Pass onChatSaved callback */}
                <div className="communication w-4/5 pb-2">
                    <div className="user_bot w-full">
                        {messages.map((msg, index) => (
                            <div key={index}>
                                <div className="usr h-1/5 p-4">
                                    <h3 className="text-white">{msg.usr}</h3>
                                </div>
                                <div className="bot h-1/5 p-4">
                                    <h3 className="text-white">{msg.res}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="inn  w-full flex flex-grow">
                        <SpeechToTextToSpeech setMessages={setMessages} />
                    </div>
                </div>
            </div>
        </div>
    );
}
