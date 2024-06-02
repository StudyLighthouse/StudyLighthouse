import React from "react";
import "../styles/solveproblem.css";
import Header from "../components/Navbar";
import Question from "../components/question";

export default function Show() {
  return (
    <div className="max-h-screen border m-0 flex flex-col">
      <Header />
      <Question />
      <div className="solutions flex-grow flex items-end justify-center w-full">
        <div className="solution flex-grow-0">
          
        </div>
      </div>
    </div>
  );
}
