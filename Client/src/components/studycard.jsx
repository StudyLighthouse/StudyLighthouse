import React from "react";
import "../styles/studycard.css";

export default function ProblemsSolved({ question, solution, likes }) {
  return (
    <div className="card">
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
