import React, { useState, useEffect } from 'react';
import '../styles/speechGpt.css';
import Header from '../components/Navbar';
import ChatComponent from '../components/sidebar';
import SpeechToTextToSpeech from '../components/micInput';
import { useSession } from '../contexts/SessionContext';
import { useNavigate } from 'react-router-dom';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import axios from 'axios';

export default function SpeechGpt() {
    const { user, loading } = useSession();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        document.body.classList.add('speechGptBody');
        return () => {
            document.body.classList.remove('speechGptBody');
        };
    }, []);

    const [messages, setMessages] = useState([]);
    const [audioUrl, setAudioUrl] = useState('');
    const [file,setFile]=useState('');

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
                setFile(`${lastMessage.audio}`)
                setAudioUrl(`https://studylighthouse.onrender.com/audio/${lastMessage.audio}`);
            }
        }
    }, [messages]);
const delete_audio=async ()=>{
    try {
        const response=await axios.post(`https://studylighthouse.onrender.com/delete_audio/${file}`)
        console.log(response.data.message)
    } catch (error) {
        console.log('error',error)
    }
}
const play_audio=async ()=>{
    try {
        const audio = new Audio(audioUrl);
        await audio.play();
        await delete_audio();
        
       } catch (error) {
         console.log('error',error)
       }
}
    useEffect(() => {
        if (audioUrl) {
           play_audio();
           
        }
    }, [audioUrl]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
        // Update the height of the right section after a small delay to ensure DOM is updated
      };

    return (
        <div className="textGpt w-screen h-screen ml-0 flex flex-col">
            <Header setMessages={setMessages} onMenuToggle={handleMenuToggle} isMenuOpen={isMenuOpen} currentPage="textGpt"/>
            <img className="img1 absolute" src="https://firebasestorage.googleapis.com/v0/b/study-lighthouse.appspot.com/o/project%20photoes%2FText%2CSpeech%20Human.png?alt=media&token=7889f4e1-9c23-47bd-a82f-df84712fd786" alt="Human" />
            <img className="img2 absolute" src="https://firebasestorage.googleapis.com/v0/b/study-lighthouse.appspot.com/o/project%20photoes%2FText%2CSpeech%20Robot.png?alt=media&token=60d9463a-69e0-4f18-9dfd-48d687d671ad" alt="Robot" />
            <div className="content flex-grow flex h-full">
            <div className={`h-screen lg:w-1/5 md:w-1/4 sm:w-1/2 md:h-screen flex flex-shrink sidebar-container ${isMenuOpen ? "open" : ""}`}>
                <ChatComponent onChatSaved={fetchMessages} onChatSelected={setMessages} />
                </div>
                <div className={`communication lg:w-4/5 md:w-full h-screen sm:w-full pb-2 ${isMenuOpen ? "shifted" : ""}`}>
                    <div className="user_bot w-full h-4/5">
                        {messages.map((msg, index) => (
                            <div key={index} className='mb-4'>
                                <div className='flex justify-end'>
                                    <div className="usr w-1/2 p-4 flex items-center gap-2 space-x-2">
                                        <h3 className="p-4 bg-gray-900 rounded-xl text-[#c48d00]">{msg.usr}</h3>
                                        <img
                                            src={user.profileImage}
                                            alt="User Avatar"
                                            className="h-10 w-10 rounded-full cursor-pointer"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-start mt-2">
                                    <div className="p-4 rounded-lg flex items-center gap-2 w-2/3">
                                        <img
                                                src={user.profileImage}
                                                alt="User Avatar"
                                                className="h-10 w-10 rounded-full cursor-pointer"
                                            />
                                        <div className="flex flex-col bg-zinc-900 rounded-xl p-4 space-y-2 w-full">
                                            {msg.response_parts.map((part, idx) => (
                                                <React.Fragment key={idx}>
                                                    {part.is_code ? (
                                                        <pre key={idx} className="bg-gray-800 text-white p-2 rounded-lg w-full overflow-x-auto">
                                                            <code dangerouslySetInnerHTML={{ __html: hljs.highlightAuto(part.text).value }} />
                                                        </pre>
                                                    ) : (
                                                        <p key={idx} className="text-white">
                                                            {part.text}
                                                            {part.audio && <audio src={`http://127.0.0.1:5000/audio/${part.audio}`} autoPlay/>}  
                                                        </p>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="inn w-full flex items-start flex-grow">
                        <SpeechToTextToSpeech setMessages={setMessages} />
                    </div>
                </div>
            </div>
        </div>
    );
}
