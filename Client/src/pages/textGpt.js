import React, { useEffect } from 'react';
import '../styles/textGpt.css';
import Header from '../components/Navbar';
import ChatComponent from '../components/sidebar';
import InputBar from '../components/promptInput';
import { useSession } from '../contexts/SessionContext'; // Import useSession hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function TextGpt() {
    const { user, loading } = useSession(); // Get user and loading state from session context
    const navigate = useNavigate(); // Initialize the navigate function

    useEffect(() => {
        document.body.classList.add('textGptBody');
        return () => {
            document.body.classList.remove('textGptBody');
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
