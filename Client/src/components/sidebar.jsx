import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "../contexts/SessionContext";
import "../styles/sidebar.css";

const inputClasses =
  "w-full p-2 mb-2 bg-zinc-800 text-white rounded border border-white";
const buttonClasses = "w-full mb-2 bg-600 text-white rounded";
const thickBorderButtonClasses =
  "w-full mb-2 bg-black text-white rounded border-4 border-black";
const activeButtonClasses =
  "w-full mb-2 bg-600 text-white rounded border border-white";
const hoverActiveButtonClasses = "hover:bg-black active:bg-black";

const ChatComponent = ({ onChatSaved, onChatSelected }) => { // Accept onChatSelected prop
  const { user, loading } = useSession(); // Get user and loading state from session context
  const [doubt, setDoubt] = useState("");
  const [chatName, setChatName] = useState(""); // Add state for chat name
  const [savedChats, setSavedChats] = useState([]);

  console.log(user);

  const fetchSavedChats = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/get_saved_chats", { 'cred': user });
      const chats = response.data;
      console.log(chats);
      setSavedChats(chats);
    } catch (e) {
      console.log(`error: ${e}`);
      alert("error");
    }
  };

  const fetchChatMessages = async (chatId) => {
    try {
      console.log(chatId)
      const response = await axios.post("http://127.0.0.1:5000/get_chat_messages", {'id': chatId ,'cred':user });
      const messages = response.data;
      console.log(messages);
      onChatSelected(messages); // Call the onChatSelected callback with fetched messages
    } catch (e) {
      console.log(`error: ${e}`);
      alert("Error fetching chat messages");
    }
  };

  useEffect(() => {
    fetchSavedChats();
  }, []);

  const saveChat = async () => {
    try {
      if (chatName === "") {
        alert("please provide the name");
      } else {
        // Fetch messages from session storage
        const storedMessages = [];
        var i = 0;
        while (i < sessionStorage.length - 1) {
          const message = JSON.parse(sessionStorage.getItem(`message_${i}`));
          storedMessages.push(message);
          i++;
        }
        const response = await axios.post(
          "http://127.0.0.1:5000/save_chat",
          {
            name: chatName,
            chat: storedMessages,
            user: user, // Include user data in the request body
          },
          {
            withCredentials: true, // Include cookies in the request
          }
        );
        if (response.data.status === 1) {
          // Gather keys to remove first
          const keysToRemove = [];
          for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            if (key.startsWith("message_")) {
              keysToRemove.push(key);
            }
          }
          // Remove the gathered keys
          keysToRemove.forEach((key) => {
            sessionStorage.removeItem(key);
          });
          fetchSavedChats();
          onChatSaved(); 
          // Notify parent component that chat was saved
        }
        
        alert(response.data.message);
      }
    } catch (e) {
      console.log("error : ", e);
      alert("Error in saving chat");
    }
    setChatName('');
  };

  const handleNewChat = () => {
    if (sessionStorage.length > 1) {
      const confirmNewChat = window.confirm("Do you want to start a new chat without saving the current one?");
      if (confirmNewChat) {
        // Clear session storage
        const keysToRemove = [];
        for (let i = 0; i < sessionStorage.length; i++) {
          const key = sessionStorage.key(i);
          if (key.startsWith("message_")) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach((key) => {
          sessionStorage.removeItem(key);
        });

        // Update parent component's messages state
        onChatSelected([]);
      }
    } else {
      onChatSelected([]); // No messages to clear, just reset messages state
    }
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
          user: user, // Include user data in the request body
        },
        {
          withCredentials: true, // Include cookies in the request
        }
      );
      console.log("Response from backend:", response.data.message);
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
    <div
      className="chatComponent bg-black justify-between flex flex-col"
      style={{ width: "20%" }}
    >
      <div className="bg-zinc-800 p-4 flex-grow overflow-y-auto">
        <button onClick={handleNewChat}>New Chat</button>
        <div className="mb-4">
          <label className="block text-white mb-2">
            Enter the name to Your chat:
          </label>
          <input
            type="text"
            placeholder="Enter a name to save the chat as"
            value={chatName}
            onChange={(e) => setChatName(e.target.value)}
            className={inputClasses}
          />
          <button className={thickBorderButtonClasses} onClick={saveChat}>
            SAVE
          </button>
        </div>
        <h2 className="block text-white mb-2">Chat History:</h2>
        <div className="mb-4 overflow-y-auto flex flex-col align-middle" style={{ height: "35vh" }}>
          {savedChats.map((c, index) => (
            <div key={index} className="w-full border-white mb-1">
              <form onSubmit={(e) => {
                e.preventDefault(); // Prevent form submission
                fetchChatMessages(e.target.elements[0].value); // Fetch chat messages
              }}>
                <input type="hidden" value={c['uid']} />
                <button type="submit" className="h-10 text-white w-full" style={{ border: "1px solid black" }}>{c['name']}</button>
              </form>
            </div>
          ))}
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
