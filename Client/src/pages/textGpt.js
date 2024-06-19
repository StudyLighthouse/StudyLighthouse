import React, { useEffect, useState } from "react";
import '../styles/textGpt.css';
import Header from '../components/Navbar';
import ChatComponent from '../components/sidebar';
import InputBar from '../components/promptInput';
import { useSession } from '../contexts/SessionContext'; // Import useSession hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

export default function TextGpt() {
    const { user, loading } = useSession(); // Get user and loading state from session context
    const navigate = useNavigate(); // Initialize the navigate function
    const [messages, setMessages] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        document.body.classList.add("textGptBody");
        return () => {
            document.body.classList.remove("textGptBody");
        };
    }, []);

    useEffect(() => {
        if (!loading && !user) {
            navigate('/signin'); // Redirect to signin if user is not authenticated
        }
    }, [loading, user, navigate]);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="textGpt w-screen h-screen ml-0 flex flex-col">
            <Header setMessages={setMessages} onMenuToggle={handleMenuToggle} isMenuOpen={isMenuOpen} currentPage="textGpt"/>
            <div className="content flex-grow flex h-full">
                <div className={`h-screen lg:w-1/5 md:w-1/4 sm:w-1/2 md:h-screen flex flex-shrink sidebar-container ${isMenuOpen ? "open" : ""}`}>
                    <ChatComponent onChatSaved={fetchMessages} onChatSelected={setMessages} /> {/* Pass onChatSaved and onChatSelected callbacks */}
                </div>
                
                <div className={`communication lg:w-4/5 md:w-full sm:w-full h-screen pb-2 ${isMenuOpen ? "shifted" : ""}`}>
                    <div className="user_bot w-full h-4/5">
                        {messages.map((msg, index) => (
                            <div key={index} className="mb-4">
                                <div className="flex justify-end">
                                <TestingToast setMessages={setMessages}/>
                                    <div className="usr p-4 w-1/2 rounded-lg flex items-center gap-2 space-x-2">
                                        <h3 className="text-black p-4 bg-gray-100">{msg.usr}</h3>
                                        {/* Remove img tag with src links */}
                                    </div>
                                </div>
                                <div className="flex justify-start mt-2">
                                    <div className="p-4 rounded-lg flex items-center gap-2 w-2/3">
                                        {/* Replace img tag with user profile image */}
                                        <div className="flex flex-col bg-gray-200 p-4 space-y-2 w-full">
                                            {msg.response_parts.map((part, idx) => (
                                                part.is_code ? (
                                                    <pre key={idx} className="bg-gray-800 text-white p-2 rounded-lg w-full">
                                                        <code dangerouslySetInnerHTML={{ __html: hljs.highlightAuto(part.text).value }} />
                                                    </pre>
                                                ) : (
                                                    <p key={idx} className="text-black">{part.text}</p>
                                                )
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text_inn w-full flex items-start h-1/5">
                        <InputBar setMessages={setMessages} /> {/* Pass showLoadingToast and dismissAllToasts */}
                    </div>
                </div>
               
            </div>
        </div>
    );
}
