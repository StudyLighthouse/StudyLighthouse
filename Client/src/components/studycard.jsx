import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/studycard.css";

export default function ProblemsSolved({ solutionId, userId, question, solution, likes }) {
  const navigate = useNavigate();
  console.log(solutionId);
  const handleCardClick = () => {
    navigate(`/solved/${solutionId}/${userId}`);
  };

  return (
    <div className="card" onClick={handleCardClick}>
      <div className="card-info flex flex-col p-2">
        <p className="title p-2">{question}</p>
        <div className="text-down">
          <p className="question">{solution}</p>
          <p>Likes: {likes}</p>
        </div>
      </div>
    </div>
  );
}
