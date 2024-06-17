import React, { useEffect, useState } from "react";
import '../styles/textGpt.css';
import Header from '../components/Navbar';
import ChatComponent from '../components/sidebar';
import InputBar from '../components/promptInput';
import { useSession } from '../contexts/SessionContext'; // Import useSession hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

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

    if (loading) {
        return <div>Loading...</div>; // Show loading state while session is being validated
    }


    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
        // Update the height of the right section after a small delay to ensure DOM is updated
      };

    return (
        <div className="textGpt w-full h-screen ml-0 flex flex-col">
            <Header setMessages={setMessages} onMenuToggle={handleMenuToggle} isMenuOpen={isMenuOpen} currentPage="textGpt"/>
            <img className="img1 absolute" src="Text,Speech Human.png" alt="Human" />
            <img className="img2 absolute" src="Text,Speech Robot.png" alt="Robot" />
            <div className="content flex-grow flex h-full">
                <div className={`h-full lg:w-1/5 md:w-1/4 sm:w-1/2 md:h-full flex flex-shrink sidebar-container ${isMenuOpen ? "open" : ""}`}>
                <ChatComponent onChatSaved={fetchMessages} onChatSelected={setMessages} /> {/* Pass onChatSaved and onChatSelected callbacks */}
                </div>
                <div className={`communication lg:w-4/5 md:w-full h-full pb-2 ${isMenuOpen ? "shifted" : ""}`}>
                <div className="user_bot w-full">
                        {messages.map((msg, index) => (
                            <div key={index}>
                                <div className="usr h-1/5 p-4">
                                    <h3 className="text-black">{msg.usr}</h3>
                                </div>
                                {msg.response_parts.map((part, idx) => (
                                    part.is_code ? (
                                        <pre key={idx}>
                                            <code dangerouslySetInnerHTML={{ __html: hljs.highlightAuto(part.text).value }} />
                                        </pre>
                                    ) : (
                                        <p key={idx}>{part.text}</p>
                                    )
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="text_inn w-full flex flex-">
                        <InputBar setMessages={setMessages} /> {/* Pass setMessages as a prop */}
                    </div>
                </div>
            </div>
        </div>
    );
}
