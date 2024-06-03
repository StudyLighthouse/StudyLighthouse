import React, { useEffect, useState } from "react";
import CardComponent from "../components/questioncard";
import axios from "axios";
import "../styles/sidebar.css";

const Feed = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/get_questions", {
          withCredentials: true
        });
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  return (
    <div
      className="feed bg-black justify-between flex flex-col"
      style={{ width: "60%" }}
    >
      <div className="bg-zinc-800 p-4 flex-grow overflow-y-auto">
        {questions.map((question) => (
          <CardComponent key={question.id} question={question} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
