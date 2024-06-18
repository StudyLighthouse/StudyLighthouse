import React, { useEffect } from 'react';
import Header from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import '../styles/main.css';
import { useSession } from '../contexts/SessionContext';

const robo1 = 'robot assistant.png'
const robo2 = 'robot.png'

export default function Main() {
    const navigate = useNavigate();
    const { user, loading } = useSession();

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
        <div className="flex flex-col h-screen w-screen">
            <img src={robo2} alt='pic'  className='absolute top-1/2 -left-40 opacity-45 h-1/2 -z-10'/>
            <img src={robo1} alt='pic'  className='absolute -right-1.5 opacity-45 h-1/2 -z-10'/>
            <Header />
            <div className="flex flex-col items-center justify-around h-full gap-4 pt-8 sm:overflow-y-scroll cards sm:no-scrollbar lg:flex-row md:flex-col xl:flex-row">
                <div className=' maincard blue sm:h-60 w-80 md:h-96 md:w-[32rem] lg:w-[22rem]' onClick={() => handleNavigation('/speechgpt')}><p>Speech Generator</p></div>
                <div className=' maincard gold sm:h-60 w-80 md:h-96 md:w-[32rem] lg:w-[22rem]' onClick={() => handleNavigation('/textgpt')}><p>Text Generator</p></div>
                <div className=' maincard blue sm:h-60 w-80 md:h-96 md:w-[32rem] lg:w-[22rem]' onClick={() => handleNavigation('/questionsfeed')}><p>Solve Problems</p></div>
            </div>
        </div>
    );
}