import React, { useState, useEffect } from 'react';
import '../styles/speechGpt.css';
import Header from '../components/Navbar';
import ChatComponent from '../components/sidebar';
import SpeechToTextToSpeech from '../components/micInput';
import { useSession } from '../contexts/SessionContext';
import { useNavigate } from 'react-router-dom';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import axios from 'axios';

export default function SpeechGpt() {
    const { user, loading } = useSession();
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add('speechGptBody');
        return () => {
            document.body.classList.remove('speechGptBody');
        };
    }, []);

    const [messages, setMessages] = useState([]);
    const [audioUrl, setAudioUrl] = useState('');

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
            navigate('/signin');
        }
    }, [loading, user, navigate]);

    useEffect(() => {
        if (messages.length > 0) {
            const lastMessage = messages[messages.length - 1];
            if (lastMessage.audio) {
                setAudioUrl(`http://127.0.0.1:5000/audio/${lastMessage.audio}`);
            }
        }
    }, [messages]);

    useEffect(() => {
        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.play();
        }
    }, [audioUrl]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="textGpt w-full h-full pt-4 ml-0 flex flex-col">
            <Header setMessages={setMessages} />
            <img className="img1 absolute" src="Text,Speech Human.png" alt="Human" />
            <img className="img2 absolute" src="Text,Speech Robot.png" alt="Robot" />
            <div className="content flex-grow flex">
                <ChatComponent onChatSaved={fetchMessages} onChatSelected={setMessages} />
                <div className="communication w-4/5 pb-2">
                    <div className="user_bot w-full">
                        {messages.map((msg, index) => (
                            <div key={index}>
                                <div className="usr h-1/5 p-4">
                                    <h3 className="text-black">{msg.usr}</h3>
                                </div>
                                {msg.response_parts.map((part, idx) => (
                                    <React.Fragment key={idx}>
                                        {part.is_code ? (
                                            <pre>
                                                <code dangerouslySetInnerHTML={{ __html: hljs.highlightAuto(part.text).value }} />
                                            </pre>
                                        ) : (
                                            <p>
                                                {part.text}
                                                {part.audio && <audio src={`http://127.0.0.1:5000/audio/${part.audio}`} autoPlay />}
                                            </p>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="inn w-full flex flex-grow">
                        <SpeechToTextToSpeech setMessages={setMessages} />
                    </div>
                </div>
            </div>
        </div>
    );
}
