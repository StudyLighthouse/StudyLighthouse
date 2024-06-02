import React, { useState, useEffect } from 'react';
import '../styles/micInput.css';

const AudioToText = () => {
  const [listening, setListening] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('This browser does not support speech recognition. Please try Google Chrome.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setListening(true);
      console.log('Speech recognition started');
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = 0; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      setText(finalTranscript);
      console.log('Interim transcript:', interimTranscript);
      console.log('Final transcript:', finalTranscript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event);
    };

    recognition.onend = () => {
      setListening(false);
      console.log('Speech recognition ended');
    };

    const toggleListening = () => {
      if (listening) {
        recognition.stop();
      } else {
        recognition.start();
      }
    };

    return () => {
      recognition.stop();
    };
  }, [listening]);

  return (
    <div className='micinput w-full'>
      <div className={`switch ${listening ? 'active' : ''}`} onClick={() => setListening(!listening)}>
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

export default AudioToText;