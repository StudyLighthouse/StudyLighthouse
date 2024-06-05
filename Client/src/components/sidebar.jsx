import React, { useState } from "react";
import axios from "axios";
import { useSession } from "../contexts/SessionContext";
import "../styles/sidebar.css";

const inputClasses = "w-full p-2 mb-2 bg-zinc-800 text-white rounded border border-white";
const buttonClasses = "w-full mb-2 bg-600 text-white rounded";
const thickBorderButtonClasses = "w-full mb-2 bg-black text-white rounded border-4 border-black";
const activeButtonClasses = "w-full mb-2 bg-600 text-white rounded border border-white";
const hoverActiveButtonClasses = "hover:bg-black active:bg-black";

const ChatComponent = () => {
  const { user, loading } = useSession(); // Get user and loading state from session context
  const [activeButton, setActiveButton] = useState(null);
  const [doubt, setDoubt] = useState("");
  const [chatName, setChatName] = useState(""); // Add state for chat name
  console.log(user)
  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId === activeButton ? null : buttonId);
  };

  const handlePostDoubtToBackend = async () => {
    try {
        // Check if the user is logged in
        if (!user) {
            alert("Please log in to post your doubt.");
            return;
        }

        console.log(`Posting doubt to backend: ${doubt}`);
        const response = await axios.post(
            "http://127.0.0.1:5000/post_question",
            {
                question: doubt,
                user: user // Include user data in the request body
            },
            {
                withCredentials: true // Include cookies in the request
            }
        );
        console.log('Response from backend:', response.data.message);
        alert(response.data.message); // Show success message
        setDoubt(""); // Clear the input after posting
    } catch (error) {
        console.error("Error posting doubt to backend:", error);
        alert("Error posting doubt. Please try again.");
    }
};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="chatComponent bg-black justify-between flex flex-col" style={{ width: "20%" }}>
      <div className="bg-zinc-800 p-4 flex-grow overflow-y-auto">
        <div className="mb-4">
          <label className="block text-white mb-2">Enter the name:</label>
          <input
            type="text"
            placeholder="Enter a name to save the chat as"
            value={chatName}
            onChange={(e) => setChatName(e.target.value)}
            className={inputClasses}
          />
          <button className={thickBorderButtonClasses}>SAVE</button>
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">Chat History:</label>
          <button
            className={`${activeButton === 1 ? activeButtonClasses : buttonClasses} ${hoverActiveButtonClasses}`}
            onClick={() => handleButtonClick(1)}
          >
            Capitals
          </button>
          <button
            className={`${activeButton === 2 ? activeButtonClasses : buttonClasses} ${hoverActiveButtonClasses}`}
            onClick={() => handleButtonClick(2)}
          >
            Capitals
          </button>
          <button
            className={`${activeButton === 3 ? activeButtonClasses : buttonClasses} ${hoverActiveButtonClasses}`}
            onClick={() => handleButtonClick(3)}
          >
            Capitals
          </button>
        </div>
        <div className="outer">
          <h3 className="text-white mb-4">Post your DOUBT</h3>
          <div className="messageBox">
            <input
              required
              placeholder="Write here..."
              type="text"
              value={doubt}
              onChange={(e) => setDoubt(e.target.value)}
              id="messageInput"
              className={inputClasses}
            />
            <button id="sendButton" onClick={handlePostDoubtToBackend}>
              <span>POST</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
