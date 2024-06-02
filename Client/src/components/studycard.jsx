import React from "react";
import "../styles/studycard.css";


export default function ProblemsSolved() {
  // Rename the component to ProfileSolved
  return (
    <div className="card">
        <div className="card-info flex flex-col p-2">
            <p className="title p-2">Hover to reveal question</p>
            <div className="text-down">
                <p className="question">What is the capital of Andhra Pradesh?</p>
                <p>Acceptance: 25</p>
            </div>
        </div>
    </div>


    // <div className="box">
    //   <div className="question-box">
    //     <div className="question">
    //     <p className="q">what is the capital of Andhra Pradesh?</p>
    //     </div>
    //     <div className="text-down">
    //       <p>Acceptence : 25 &#x1f44d;</p>
    //     </div>
    //   </div>
    // </div>
  );
}