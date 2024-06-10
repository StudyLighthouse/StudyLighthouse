import React, { useState } from 'react';
import axios from 'axios';
import '../styles/micInput.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const SpeechToTextToSpeech = ({ setMessages }) => {
    const [responseText, setResponseText] = useState('');
    const { transcript, resetTranscript } = useSpeechRecognition();
    const [listening, setListening] = useState(false);

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        alert("Your browser does not support speech recognition.");
    }

    const handleStartListening = () => {
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true });
    };

    const handleStopListening = () => {
        SpeechRecognition.stopListening();
        handleSendToBackend(transcript);
        resetTranscript();
    };

    const handleSendToBackend = async (text) => {
        try {
            const nextIndex = sessionStorage.length;
            const response = await axios.post('http://127.0.0.1:5000/api/cohorequest', { text, index: nextIndex });
            const newUserMessage = {
                usr: text,
                response_parts: response.data.response_parts,
                audio: response.data.audio
            };
    
            // Update sessionStorage
            sessionStorage.setItem(`message_${nextIndex}`, JSON.stringify(newUserMessage));
    
            // Update messages state
            setResponseText(response.data.response_text);
            setMessages(prevMessages => [...prevMessages, newUserMessage]);
        } catch (error) {
            console.error("Error sending text to backend:", error);
        }
    };
    
    const toggleListening = () => {
        if (!listening) {
            handleStartListening();
        } else {
            handleStopListening();
        }
        setListening(!listening);
    };

    return (
        <div className='ooutt w-full' style={{ height: "5cm" }}>
            <div className={`switch ${listening ? 'active' : ''}`} onClick={toggleListening}>
                <div className="mic-on">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-mic-fill" viewBox="0 0 16 16">
                        <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z"></path>
                        <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1zm-5 4c.818 0 1.578-.245 2.212-.667l.718.719a4.973 4.973 0 0 1-2.43.923V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"></path>
                    </svg>
                </div>
                <div className="mic-off">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-mic-mute-fill" viewBox="0 0 16 16">
                        <path d="M13 8c0 .564-.094 1.107-.266 1.613l-.814-.814A4.02 4.02 0 0 0 12 8V7a.5.5 0 0 1 1 0v1zm-5 4c.818 0 1.578-.245 2.212-.667l.718.719a4.973 4.973 0 0 1-2.43.923V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"></path>
                    </svg>
                </div>
            </div>
            <div className={`loader ${listening ? 'active' : ''}`}>
                <div className="loader-inner">
                    {[...Array(55)].map((_, i) => (
                        <div key={i} className="loader-block"></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SpeechToTextToSpeech;
