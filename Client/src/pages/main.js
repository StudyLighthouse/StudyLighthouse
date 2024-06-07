import React, { useEffect } from 'react';
import Header from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import '../styles/main.css';
import { useSession } from '../contexts/SessionContext';

export default function Main() {
    const navigate = useNavigate();
    const { user, loading } = useSession();
    console.log(user)
    useEffect(() => {
        if (!loading && !user) {
            navigate('/signin');
        }
    }, [loading, user, navigate]);

    const handleNavigation = (route) => {
        navigate(route);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-black text-white pt-2 min-h-screen flex flex-col">
            <Header />
            <div className="flex flex-row items-center justify-around h-full w-full pt-32 cards">
                <div className='maincard blue' onClick={() => handleNavigation('/speechgpt')}><p>Speech Generator</p></div>
                <div className='maincard gold' onClick={() => handleNavigation('/textgpt')}><p>Text Generator</p></div>
                <div className='maincard blue' onClick={() => handleNavigation('/questionsfeed')}><p>Solve Problems</p></div>
            </div>
        </div>
    );
}
