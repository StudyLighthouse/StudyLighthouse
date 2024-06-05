import React from "react";
import "../styles/questioncard.css";

const CardComponent = ({ question }) => {
  console.log("CardComponent props:", question);
  return (
    <div className="main">
      <div className="quest_card">
        <div className="fl">
          <div className="que_fullscreen">
            <svg className="fullscreen_svg" viewBox="0 0 24 24">
              {/* SVG content */}
            </svg>
          </div>
        </div>
        <div className="data">
          <div className="img">
            {/* Image content */}
          </div>
          <div className="text">
            <div className="text_m">{question.username}</div>
            <div className="text_m">{question.question}</div>
            <div className="text_s">{question.timestamp}</div>
          </div>
        </div>
      </div>
      <div className="quest_card_back"></div>
      <div className="btns">
        <div className="likes">
          <svg className="likes_svg" viewBox="0 0 24 24">
            {/* SVG content */}
          </svg>
          <span className="likes_text">Like</span>
        </div>
        <div className="comments">
          <svg className="comments_svg" viewBox="0 0 24 24">
            {/* SVG content */}
          </svg>
          <span className="comments_text">Comment</span>
        </div>
        <div className="views">
          <svg className="views_svg" viewBox="0 0 24 24">
            {/* SVG content */}
          </svg>
          <span className="views_text">View</span>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
