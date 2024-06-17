import React, { useEffect, useState } from "react";
import CardComponent from "../components/questioncard";
import Header from '../components/Navbar';
import axios from "axios";
import io from "socket.io-client";
import "../styles/feed.css";

const Feed = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    document.body.classList.add('textGptBody');
    return () => {
        document.body.classList.remove('textGptBody');
    };
}, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/get_questions", {
          withCredentials: true,
        });
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();

    // Setup WebSocket connection
    const socket = io("http://127.0.0.1:5000");

    // Listen for new questions
    socket.on("new_question", (newQuestion) => {
      setQuestions((prevQuestions) => [newQuestion, ...prevQuestions]);
    });

    // Clean up the connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  console.log("Questions:", questions);

  return (
    <div className="mainfeed h-screen w-screen">
      <Header />
    <div className="q_feed bg-black h-full flex justify-center pt-10"> 
      <div className="items-center flex flex-col gap-10 lg:w-1/2 md:w-3/4 sm:w-3/4">
        {questions.map((question, index) => (
          <CardComponent key={index} question={question} />
        ))}
      </div>
    </div>
    </div>
  );
};

export default Feed;
