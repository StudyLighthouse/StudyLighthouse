import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSession } from "../contexts/SessionContext";
import "../styles/questioncard.css";

const CardComponent = ({ question }) => {
  const navigate = useNavigate();
  const { user, loading } = useSession();
  const [error, setError] = useState("");

  const handleCardClick = async () => {
    if (!user) {
      alert("Please log in to solve the problem.");
      return;
    }

    try {
      // Fetch the question details
      const response = await axios.get(`http://127.0.0.1:5000/get_question/${question.id}`, {
        withCredentials: true,
      });
      const questionDetails = response.data;
      console.log(response.data)

      // Navigate to the solve page with question details
      navigate(`/solveproblem/${question.id}`, { state: { questionDetails } });
    } catch (error) {
      console.error("Error logging question view or fetching question details:", error);
      setError("Failed to log question view or fetch question details.");
    }
  };

  const handleSolutionsClick = async (e) => {
    e.stopPropagation();
  
    if (!user) {
      alert("Please log in to view solutions.");
      return;
    }
  
    try {
      navigate(`/solutions/${question.id}`); // Navigate to the solutions page with the question ID
    } catch (error) {
      console.error("Error navigating to solutions page:", error);
      setError("Failed to navigate to solutions page.");
    }
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }

  // Format the timestamp
  const formattedDate = new Date(question.timestamp).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div>
      <div className="que_container">
        <div className="main" onClick={handleCardClick}>
          <div className="quest_card">
            <div className="card_content h-full">
              <p className="text_m">{question.question}</p>
            </div>
            <div className="quest_card_back"></div>
          </div>
          <div className="btns">
            <div>
              <div className="username_text">{question.username}</div>
            </div>
            <div>
              <div className="timestamp">{formattedDate}</div>
              <center><button onClick={handleSolutionsClick} className="bb">Solutions</button></center>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
