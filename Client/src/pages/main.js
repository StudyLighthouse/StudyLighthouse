import React, { useEffect } from 'react';
import Header from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import '../styles/main.css';
import { useSession } from '../contexts/SessionContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const robo1 = 'https://firebasestorage.googleapis.com/v0/b/study-lighthouse.appspot.com/o/project%20photoes%2Frobot%20assistant.png?alt=media&token=3fdd9d42-36fe-4821-8311-af276ee0bd0e'
const robo2 = 'https://firebasestorage.googleapis.com/v0/b/study-lighthouse.appspot.com/o/project%20photoes%2Frobot.png?alt=media&token=19f21849-5564-44f8-805a-84e42c721b2a'

export default function Main() {
    const navigate = useNavigate();
    const { user, loading } = useSession();

    useEffect(() => {
        if (!loading && !user) {
            navigate('/signin');
        } else {
            toast.success("Logged In Successfully.");
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
            <img src={robo2} alt='pic'  className='absolute lg:top-1/2 md:top-1/2 top-1/2 -left-40 opacity-45 h-1/2 sm:h-1/4 sm:top-3/4 sm:-left-16 -z-10'/>
            <img src={robo1} alt='pic'  className='absolute top-0 lg:top-0 md:top-0 lg:-right-1.5 md:-right-20 opacity-45 h-1/2 sm:h-1/4 sm:top-12 sm:-right-8 -z-10'/>
            <Header />
            <div className="flex flex-col items-center justify-around h-full gap-4 pt-8 sm:overflow-y-scroll cards sm:no-scrollbar lg:flex-row md:flex-col xl:flex-row">
                <div className=' maincard blue sm:h-60 w-80 md:h-96 md:w-[32rem] lg:w-[22rem]' onClick={() => handleNavigation('/speechgpt')}><p>Speech Generator</p></div>
                <div className=' maincard gold sm:h-60 w-80 md:h-96 md:w-[32rem] lg:w-[22rem]' onClick={() => handleNavigation('/textgpt')}><p>Text Generator</p></div>
                <div className=' maincard blue sm:h-60 w-80 md:h-96 md:w-[32rem] lg:w-[22rem]' onClick={() => handleNavigation('/questionsfeed')}><p>Solve Problems</p></div>
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
        </div>
    );
}