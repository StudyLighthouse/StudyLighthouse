import React, { useState } from "react";
import axios from "axios";
import "../styles/micInput.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SpeechToTextToSpeech = ({ setMessages }) => {
  const [responseText, setResponseText] = useState("");
  const {
    transcript,
    resetTranscript,
    // browserSupportsSpeechRecognition,
    listening: audioListen,
  } = useSpeechRecognition();
  const [listening, setListening] = useState(false);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    toast.error("Your browser does not support speech recognition.");
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
      console.log(text);
      const nextIndex = sessionStorage.length;
      const response = await axios.post(
        "https://studylighthouse.onrender.com/api/cohorequest_audio",
        { text, index: nextIndex }
      );
      const newUserMessage = {
        usr: text,
        response_parts: response.data.response_parts,
        audio: response.data.audio,
      };

      // Update sessionStorage
      sessionStorage.setItem(
        `message_${nextIndex}`,
        JSON.stringify(newUserMessage)
      );
      // Update messages state
      setResponseText(response.data.response_text);
      setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    } catch (error) {
      console.error("Error sending text to backend:", error);
      alert("Error sending text to backend.");
    }
  };

  const toggleListening = () => {
    if (!listening) {
      handleStartListening();
      toast.info("Listening");
    } else {
      handleStopListening();
      toast.info("Stopped listening");
    }
    setListening(!listening);
  };

  return (
    <div className="ooutt w-full" style={{ height: "5cm" }}>
      <div
        className={`switch ${listening ? "active" : ""}`}
        onClick={toggleListening}
      >
        <div className="mic-on">
          <svg
            viewBox="0 0 384 512"
            height="1em"
            xmlns="http://www.w3.org/2000/svg"
            className="microphone"
          >
            <path
              fill="aliceblue"
              d="M192 0C139 0 96 43 96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z"
            ></path>
          </svg>
        </div>
        <div className="mic-off">
          <svg
            viewBox="0 0 640 512"
            height="1em"
            xmlns="http://www.w3.org/2000/svg"
            className="microphone-slash"
          >
            <path
              fill="aliceblue"
              d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L472.1 344.7c15.2-26 23.9-56.3 23.9-88.7V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 21.2-5.1 41.1-14.2 58.7L416 300.8V96c0-53-43-96-96-96s-96 43-96 96v54.3L38.8 5.1zM344 430.4c20.4-2.8 39.7-9.1 57.3-18.2l-43.1-33.9C346.1 382 333.3 384 320 384c-70.7 0-128-57.3-128-128v-8.7L144.7 210c-.5 1.9-.7 3.9-.7 6v40c0 89.1 66.2 162.7 152 174.4V464H248c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H344V430.4z"
            ></path>
          </svg>
        </div>
      </div>
      <div className={`loader ${listening ? "active" : "none"}`}>
        <div className="loader-inner">
          {[...Array(55)].map((_, i) => (
            <div key={i} className="loader-block"></div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SpeechToTextToSpeech;
