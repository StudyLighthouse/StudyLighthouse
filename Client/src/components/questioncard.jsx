import React from "react";
import "../styles/sidebar.css";

const CardComponent = ({ question }) => {
  return (
    <div className="cardComponent bg-zinc-800 p-4 mb-4 rounded shadow-md">
      <div className="cardHeader flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">
          {question.username}
        </h3>
        <span className="text-sm text-gray-400">
          {new Date(question.timestamp?.seconds * 1000).toLocaleString()}
        </span>
      </div>
      <div className="cardBody mt-2">
        <p className="text-white">{question.question}</p>
      </div>
    </div>
  );
};

export default CardComponent;
