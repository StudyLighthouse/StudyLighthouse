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

const ChatComponent = ({ onChatSaved, onChatSelected }) => {
  const { user, loading } = useSession();
  const [doubt, setDoubt] = useState("");
  const [chatName, setChatName] = useState("");
  const [savedChats, setSavedChats] = useState([]);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [file, setFile] = useState(null);

  const fetchSavedChats = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/get_saved_chats", { 'cred': user });
      const chats = response.data;
      setSavedChats(chats);
    } catch (e) {
      console.log(`error: ${e}`);
      alert("error");
    }
  };

  const fetchChatMessages = async (chatId) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/get_chat_messages", {'id': chatId ,'cred':user });
      const messages = response.data;
      onChatSelected(messages);
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
        const storedMessages = [];
        var i = 0;
        while (i < sessionStorage.length-1) {
          const message = JSON.parse(sessionStorage.getItem(`message_${i}`));
          storedMessages.push(message);
          i++;
        }
        const response = await axios.post(
          "http://127.0.0.1:5000/save_chat",
          {
            name: chatName,
            chat: storedMessages,
            user: user,
          },
          {
            withCredentials: true,
          }
        );
        if (response.data.status === 1) {
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
          fetchSavedChats();
          onChatSaved(); 
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
        onChatSelected([]);
      }
    } else {
      onChatSelected([]);
    }
  };

  const handlePostDoubtToBackend = async (e) => {
    e.preventDefault();
    try {
      if (!user) {
        alert("Please log in to post your doubt.");
        return;
      }

      console.log(`Posting doubt to backend: ${doubt}`);
      const formData = new FormData();
      formData.append('user', JSON.stringify(user)); // Assuming `user` is available in the context
      formData.append('question', doubt); // Assuming `questionId` is available in the context
      formData.append('image', file); // Assuming `file` is available in the context
      const response = await axios.post(
        "http://127.0.0.1:5000/post_question", formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log("Response from backend:", response.data.message);
      alert(response.data.message);
      setDoubt("");
    } catch (error) {
      console.error("Error posting doubt to backend:", error);
      alert("Error posting doubt. Please try again.");
    }
  };

  const handleFileUpload = (file) => {
    if (file) {
      setImageUploaded(true);
      setFile(file);
      // Perform upload logic here if needed
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
            <div className="fileUploadWrapper">
              <label htmlFor="file">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 337 337">
                  <circle strokeWidth="20" stroke="#6c6c6c" fill="none" r="158.5" cy="168.5" cx="168.5"></circle>
                  <path strokeLinecap="round" strokeWidth="25" stroke="#6c6c6c" d="M167.759 79V259"></path>
                  <path strokeLinecap="round" strokeWidth="25" stroke="#6c6c6c" d="M79 167.138H259"></path>
                </svg>
                <span className="tooltip">Add an image</span>
              </label>
              <input type="file" id="file" name="file" accept="image/*" onChange={(e) => handleFileUpload(e.target.files[0])} />
              {imageUploaded && <p className="text-white">Image uploaded successfully!</p>}
            </div>
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
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 664 663">
                <path fill="none" d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"></path>
                <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="33.67" stroke="#6c6c6c" d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
