import React, { useState } from "react";
import "../styles/sidebar.css";
const inputClasses =
  "w-full p-2 mb-2 bg-zinc-800 text-white rounded border border-white";
const buttonClasses = "w-full mb-2 bg-600 text-white rounded";
const thickBorderButtonClasses =
  "w-full mb-2 bg-black text-white rounded border-4 border-black";
const activeButtonClasses =
  "w-full mb-2 bg-600 text-white rounded border border-white";
const hoverActiveButtonClasses = "hover:bg-black active:bg-black";

const ChatComponent = () => {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId === activeButton ? null : buttonId);
  };

  return (
    <div
      className="chatComponent bg-black justify-between flex flex-col"
      style={{ width: "20%" }}
    >
      <div className="bg-zinc-800 p-4 flex-grow overflow-y-auto">
        <div className="mb-4">
          <label className="block text-white mb-2">Enter the name:</label>
          <input
            type="text"
            placeholder="Enter a name to save the chat as"
            className={inputClasses}
          />
          <button className={thickBorderButtonClasses}>SAVE</button>
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">Chat History:</label>
          <button
            className={`${
              activeButton === 1 ? activeButtonClasses : buttonClasses
            } ${hoverActiveButtonClasses}`}
            onClick={() => handleButtonClick(1)}
          >
            Capitals
          </button>
          <button
            className={`${
              activeButton === 2 ? activeButtonClasses : buttonClasses
            } ${hoverActiveButtonClasses}`}
            onClick={() => handleButtonClick(2)}
          >
            Capitals
          </button>
          <button
            className={`${
              activeButton === 3 ? activeButtonClasses : buttonClasses
            } ${hoverActiveButtonClasses}`}
            onClick={() => handleButtonClick(3)}
          >
            Capitals
          </button>
        </div>
        <div className="outer">
        <h3 className="text-white mb-4">Post your DOUBT</h3>
          <div className="messageBox">
            <div className="fileUploadWrapper">
              <label htmlFor="file">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 337 337"
                >
                  <circle
                    strokeWidth="20"
                    stroke="#6c6c6c"
                    fill="none"
                    r="158.5"
                    cy="168.5"
                    cx="168.5"
                  ></circle>
                  <path
                    strokeLinecap="round"
                    strokeWidth="25"
                    stroke="#6c6c6c"
                    d="M167.759 79V259"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeWidth="25"
                    stroke="#6c6c6c"
                    d="M79 167.138H259"
                  ></path>
                </svg>
                <span className="tooltip">Add an image</span>
              </label>
              <input type="file" id="file" name="file" />
            </div>
            <input
              required
              placeholder="Write here..."
              type="text"
              id="messageInput"
            />
            <button id="sendButton">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 664 663"
              >
                <path
                  fill="none"
                  d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                ></path>
                <path
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="33.67"
                  stroke="#6c6c6c"
                  d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
