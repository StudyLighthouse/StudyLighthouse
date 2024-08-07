import React, { useEffect, useState } from "react";
import CardComponent from "../components/questioncard";
import Header from "../components/Navbar";
import axios from "axios";
import io from "socket.io-client";
import "../styles/feed.css";
import Loading from "../components/Loading";

const Feed = () => {
  const [questions, setQuestions] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    document.body.classList.add("textGptBody");
    return () => {
      document.body.classList.remove("textGptBody");
    };
  }, []);

  useEffect(() => {
    setLoad(true);
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "https://studylighthouse.onrender.com/get_questions",
          {
            withCredentials: true,
          }
        );
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoad(false);
      }
    };

    fetchQuestions();

    // Setup WebSocket connection
    const socket = io("https://studylighthouse.onrender.com/");

    // Listen for new questions
    socket.on("new_question", (newQuestion) => {
      setQuestions((prevQuestions) => [newQuestion, ...prevQuestions]);
    });

    // Clean up the connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  if (load) {
    return <Loading />;
  }

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
