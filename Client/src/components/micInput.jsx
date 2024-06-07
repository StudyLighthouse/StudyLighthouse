import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/micInput.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const SpeechToTextToSpeech = ({ setMessages }) => {
  const [responseText, setResponseText] = useState('');
  const [voices, setVoices] = useState([]);
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [listening, setListening] = useState(false);

  useEffect(() => {
      const handleVoicesChanged = () => {
          const availableVoices = window.speechSynthesis.getVoices();
          console.log('Available voices:', availableVoices);
          setVoices(availableVoices);
      };

      // Initialize voices on component mount and handle voices change event
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
          window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
      }

      // Attempt to load voices immediately
      handleVoicesChanged();
  }, []);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      alert("Your browser does not support speech recognition.");
  }

  const handleStartListening = () => {
      console.log("Started listening");
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
  };

  const handleStopListening = () => {
      console.log("Stopped listening");
      SpeechRecognition.stopListening();
      handleSendToBackend(transcript);
      resetTranscript();
  };

  const handleSendToBackend = async (text) => {
      try {
          console.log(`Sending text to backend: ${text}`);
          const response = await axios.post('http://127.0.0.1:5000/api/cohorequest', { text });
          console.log('Response from backend:', response.data);
          const newUserMessage = { "usr": text, "res": response.data.response_text };

          // Update sessionStorage
          const nextIndex = sessionStorage.length-1;
          sessionStorage.setItem(`message_${nextIndex}`, JSON.stringify(newUserMessage));

          // Update messages state
          setResponseText(response.data.response_text);
          handleSpeak(response.data.response_text);
          setMessages(prevMessages => [...prevMessages, newUserMessage]);
      } catch (error) {
          console.error("Error sending text to backend:", error);
      }
  };

  const handleSpeak = (textToSpeak) => {
      try {
          const utterance = new SpeechSynthesisUtterance(textToSpeak);

          // Select a female voice if available
          const femaleVoice = voices.find(voice =>
              voice.name.includes('Google UK English Female') ||
              voice.name.includes('Google US English Female') ||
              voice.name.includes('Microsoft Zira Desktop - English (United States)') ||
              voice.name.includes('Microsoft Hazel Desktop - English (Great Britain)')
          );

          if (femaleVoice) {
              utterance.voice = femaleVoice;
          } else if (voices.length > 0) {
              utterance.voice = voices[0]; // Fallback to the first available voice
          }

          console.log('Speaking with voice:', utterance.voice);
          window.speechSynthesis.speak(utterance);
      } catch (error) {
          console.error("Error in handleSpeak:", error);
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
      <div className='ooutt w-full'style={{height:"5cm"}}>
          <div className={`switch ${listening ? 'active' : ''}`} onClick={toggleListening}>
              <div className="mic-on">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-mic-fill" viewBox="0 0 16 16">
                      <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z"></path>
                      <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"></path>
                  </svg>
              </div>
              <div className="mic-off">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-mic-mute-fill" viewBox="0 0 16 16">
                      <path d="M13 8c0 .564-.094 1.107-.266 1.613l-.814-.814A4.02 4.02 0 0 0 12 8V7a.5.5 0 0 1 1 0v1zm-5 4c.818 0 1.578-.245 2.212-.667l.718.719a4.973 4.973 0 0 1-2.43.923V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 1 0v1a4 4 0 0 0 4 4zm3-9v4.879L5.158 2.037A3.001 3.001 0 0 1 11 3z"></path>
                      <path d="M9.486 10.607 5 6.12V8a3 3 0 0 0 4.486 2.607zm-7.84-9.253 12 12 .708-.708-12-12-.708.708z"></path>
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
 