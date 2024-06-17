import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "../contexts/SessionContext";
import "../styles/sidebar.css";

const inputClasses =
  "w-[100%] p-2 mb-2 bg-zinc-800 text-white rounded border border-white";
const buttonClasses = "w-full mb-2 bg-600 text-white rounded";
const thickBorderButtonClasses =
  "w-[40%]  mb-2 bg-gray-800 rounded-xl text-white text-xs rounded p-2 border-4 border-black";
const activeButtonClasses =
  "w-[90%] mb-2 bg-600 text-white rounded border border-white";
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
      formData.append('user', JSON.stringify(user)); // Assuming user is available in the context
      formData.append('question', doubt); // Assuming questionId is available in the context
      formData.append('image', file); // Assuming file is available in the context
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
      alert("Image uploaded successfully!");
      // Perform upload logic here if needed
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="chatComponent bg-black w-full h-full"
    >
      <div className="bg-black p-2 text-white flex flex-shrink-0 flex-col justify-center items-center md:w-full">
        <button className="w-full flex flex-shrink justify-end pr-2 pt-3" onClick={handleNewChat}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" class="icon-xl-heavy"><path d="M15.673 3.913a3.121 3.121 0 1 1 4.414 4.414l-5.937 5.937a5 5 0 0 1-2.828 1.415l-2.18.31a1 1 0 0 1-1.132-1.13l.311-2.18A5 5 0 0 1 9.736 9.85zm3 1.414a1.12 1.12 0 0 0-1.586 0l-5.937 5.937a3 3 0 0 0-.849 1.697l-.123.86.86-.122a3 3 0 0 0 1.698-.849l5.937-5.937a1.12 1.12 0 0 0 0-1.586M11 4A1 1 0 0 1 10 5c-.998 0-1.702.008-2.253.06-.54.052-.862.141-1.109.267a3 3 0 0 0-1.311 1.311c-.134.263-.226.611-.276 1.216C5.001 8.471 5 9.264 5 10.4v3.2c0 1.137 0 1.929.051 2.546.05.605.142.953.276 1.216a3 3 0 0 0 1.311 1.311c.263.134.611.226 1.216.276.617.05 1.41.051 2.546.051h3.2c1.137 0 1.929 0 2.546-.051.605-.05.953-.142 1.216-.276a3 3 0 0 0 1.311-1.311c.126-.247.215-.569.266-1.108.053-.552.06-1.256.06-2.255a1 1 0 1 1 2 .002c0 .978-.006 1.78-.069 2.442-.064.673-.192 1.27-.475 1.827a5 5 0 0 1-2.185 2.185c-.592.302-1.232.428-1.961.487C15.6 21 14.727 21 13.643 21h-3.286c-1.084 0-1.958 0-2.666-.058-.728-.06-1.369-.185-1.96-.487a5 5 0 0 1-2.186-2.185c-.302-.592-.428-1.233-.487-1.961C3 15.6 3 14.727 3 13.643v-3.286c0-1.084 0-1.958.058-2.666.06-.729.185-1.369.487-1.961A5 5 0 0 1 5.73 3.545c.556-.284 1.154-.411 1.827-.475C8.22 3.007 9.021 3 10 3A1 1 0 0 1 11 4"></path></svg></button>
        <div className="flex flex-col mb-4 pt-7">
          <label className="block text-white mb-2">
            Save chat as:
          </label>
          <input
            type="text"
            placeholder="Save chat as..."
            value={chatName}
            onChange={(e) => setChatName(e.target.value)}
            className={inputClasses}
          />
          <center><button className={thickBorderButtonClasses} onClick={saveChat}>
            SAVE
          </button></center>
        </div>
        <div className="flex flex-col items-center w-full">
          <h2 className="text-white mb-2">Chat History:</h2>
          <div className=" bg-gray-800 mb-4 overflow-y-auto flex flex-col align-middle w-4/5" style={{ height: "35vh" }}>
            {savedChats.map((c, index) => (
              <div key={index} className="w-full border-white mb-1">
                <form onSubmit={(e) => {
                  e.preventDefault(); // Prevent form submission
                  fetchChatMessages(e.target.elements[0].value); // Fetch chat messages
                }}>
                  <input type="hidden" value={c['uid']} />
                  <button type="submit" className="h-10 text-white w-[100%]" style={{ border: "1px solid black" }}>{c['name']}</button>
                </form>
              </div>
            ))}
          </div>
        </div>
        <div className=" bg-black flex flex-col justify-center items-center p-2 w-full">
          <h3 className="text-white font-bold p-3 md:font-semibold md:text-sm">Post your DOUBT</h3>
          <div className="messageBox w-full">
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
              {/* {imageUploaded && alert("Image uploal̥ded successfully")} */}
              
            </div>
            <input
              required
              placeholder="Write here..."
              type="text"
              value={doubt}
              onChange={(e) => setDoubt(e.target.value)}
              id="messageInput"
              // className={inputClasses}
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


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useSession } from "../contexts/SessionContext";
// import "../styles/sidebar.css";

// const buttonClasses = "w-full mb-2 bg-600 text-white rounded";
// const thickBorderButtonClasses =
//   "w-4/5 mb-2 bg-gray-800 rounded-xl text-white text-xs rounded p-2 border-4 border-black";
// const activeButtonClasses =
//   "w-full mb-2 bg-600 text-white rounded border border-white";
// const hoverActiveButtonClasses = "hover:bg-black active:bg-black";

// const ChatComponent = ({ onChatSaved, onChatSelected }) => {
//   const { user, loading } = useSession();
//   const [doubt, setDoubt] = useState("");
//   const [chatName, setChatName] = useState("");
//   const [savedChats, setSavedChats] = useState([]);
//   const [imageUploaded, setImageUploaded] = useState(false);
//   const [file, setFile] = useState(null);

//   const fetchSavedChats = async () => {
//     try {
//       const response = await axios.post("http://127.0.0.1:5000/get_saved_chats", { cred: user });
//       const chats = response.data;
//       setSavedChats(chats);
//     } catch (e) {
//       console.log(`error: ${e}`);
//       alert("error");
//     }
//   };

//   const fetchChatMessages = async (chatId) => {
//     try {
//       const response = await axios.post("http://127.0.0.1:5000/get_chat_messages", { id: chatId, cred: user });
//       const messages = response.data;
//       onChatSelected(messages);
//     } catch (e) {
//       console.log(`error: ${e}`);
//       alert("Error fetching chat messages");
//     }
//   };

//   useEffect(() => {
//     fetchSavedChats();
//   }, []);

//   const saveChat = async () => {
//     try {
//       if (chatName === "") {
//         alert("please provide the name");
//       } else {
//         const storedMessages = [];
//         var i = 0;
//         while (i < sessionStorage.length - 1) {
//           const message = JSON.parse(sessionStorage.getItem(`message_${i}`));
//           storedMessages.push(message);
//           i++;
//         }
//         const response = await axios.post(
//           "http://127.0.0.1:5000/save_chat",
//           {
//             name: chatName,
//             chat: storedMessages,
//             user: user,
//           },
//           {
//             withCredentials: true,
//           }
//         );
//         if (response.data.status === 1) {
//           const keysToRemove = [];
//           for (let i = 0; i < sessionStorage.length; i++) {
//             const key = sessionStorage.key(i);
//             if (key.startsWith("message_")) {
//               keysToRemove.push(key);
//             }
//           }
//           keysToRemove.forEach((key) => {
//             sessionStorage.removeItem(key);
//           });
//           fetchSavedChats();
//           onChatSaved();
//         }
//         alert(response.data.message);
//       }
//     } catch (e) {
//       console.log("error : ", e);
//       alert("Error in saving chat");
//     }
//     setChatName("");
//   };

//   const handleNewChat = () => {
//     if (sessionStorage.length > 1) {
//       const confirmNewChat = window.confirm("Do you want to start a new chat without saving the current one?");
//       if (confirmNewChat) {
//         const keysToRemove = [];
//         for (let i = 0; i < sessionStorage.length; i++) {
//           const key = sessionStorage.key(i);
//           if (key.startsWith("message_")) {
//             keysToRemove.push(key);
//           }
//         }
//         keysToRemove.forEach((key) => {
//           sessionStorage.removeItem(key);
//         });
//         onChatSelected([]);
//       }
//     } else {
//       onChatSelected([]);
//     }
//   };

//   const handlePostDoubtToBackend = async (e) => {
//     e.preventDefault();
//     try {
//       if (!user) {
//         alert("Please log in to post your doubt.");
//         return;
//       }

//       console.log(`Posting doubt to backend: ${doubt}`);
//       const formData = new FormData();
//       formData.append("user", JSON.stringify(user));
//       formData.append("question", doubt);
//       formData.append("image", file);
//       const response = await axios.post(
//         "http://127.0.0.1:5000/post_question",
//         formData,
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "multipart/form-data",
//           }
//         }
//       );
//       console.log("Response from backend:", response.data.message);
//       alert(response.data.message);
//       setDoubt("");
//     } catch (error) {
//       console.error("Error posting doubt to backend:", error);
//       alert("Error posting doubt. Please try again.");
//     }
//   };

//   const handleFileUpload = (file) => {
//     if (file) {
//       setImageUploaded(true);
//       setFile(file);
//       alert("Image uploaded successfully!");
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="chatComponent bg-black flex flex-col items-center justify-center w-full h-full sm:overflow-scroll">
//       <div className="bg-red-500 p-4 text-white flex flex-col justify-center items-center w-full sm:w-fit">
//         <button className="w-full flex justify-end pr-2 -mt-3" onClick={handleNewChat}>
//           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" className="icon-xl-heavy">
//             <path d="M15.673 3.913a3.121 3.121 0 1 1 4.414 4.414l-5.937 5.937a5 5 0 0 1-2.828 1.415l-2.18.31a1 1 0 0 1-1.132-1.13l.311-2.18A5 5 0 0 1 9.736 9.85zm3 1.414a1.12 1.12 0 0 0-1.586 0l-5.937 5.937a3 3 0 0 0-.849 1.697l-.123.86.86-.122a3 3 0 0 0 1.698-.849l5.937-5.937a1.12 1.12 0 0 0 0-1.586M11 4A1 1 0 0 1 10 5c-.998 0-1.702.008-2.253.06-.54.052-.862.141-1.109.267a3 3 0 0 0-1.311 1.311c-.134.263-.226.611-.276 1.216C5.001 8.471 5 9.264 5 10.4v3.2c0 1.137 0 1.929.051 2.546.05.605.142.953.276 1.216a3 3 0 0 0 1.311 1.311c.263.134.611.226 1.216.276.617.05 1.41.051 2.546.051h3.2c1.137 0 1.929 0 2.546-.051.605-.05.953-.142 1.216-.276a3 3 0 0 0 1.311-1.311c.126-.247.215-.569.266-1.108.053-.552.06-1.256.06-2.255a1 1 0 1 1 2 .002c0 .978-.006 1.78-.069 2.442-.064.673-.192 1.27-.475 1.827a5 5 0 0 1-2.185 2.185c-.592.302-1.232.428-1.961.487C15.6 21 14.727 21 13.643 21h-3.286c-1.084 0-1.958 0-2.666-.058-.728-.06-1.369-.185-1.96-.487a5 5 0 0 1-2.186-2.185c-.302-.592-.428-1.233-.487-1.961C3 15.6 3 14.727 3 13.643v-3.286c0-1.084 0-1.958.058-2.666.06-.729.185-1.369.487-1.961A5 5 0 0 1 5.73 3.545c.556-.284 1.154-.411 1.827-.475C8.22 3.007 9.021 3 0 0 1 10 5c-.998 0-1.702.008-2.253.06-.54.052-.862.141-1.109.267a3 3 0 0 0-1.311 1.311c-.134.263-.226.611-.276 1.216C5.001 8.471 5 9.264 5 10.4v3.2c0 1.137 0 1.929.051 2.546.05.605.142.953.276 1.216a3 3 0 0 0 1.311 1.311c.263.134.611.226 1.216.276.617.05 1.41.051 2.546.051h3.2c1.137 0 1.929 0 2.546-.051.605-.05.953-.142 1.216-.276a3 3 0 0 0 1.311-1.311c.126-.247.215-.569.266-1.108.053-.552.06-1.256.06-2.255a1 1 0 1 1 2 .002c0 .978-.006 1.78-.069 2.442-.064.673-.192 1.27-.475 1.827a5 5 0 0 1-2.185 2.185c-.592.302-1.232.428-1.961.487C15.6 21 14.727 21 13.643 21h-3.286c-1.084 0-1.958 0-2.666-.058-.728-.06-1.369-.185-1.96-.487a5 5 0 0 1-2.186-2.185c-.302-.592-.428-1.233-.487-1.961C3 15.6 3 14.727 3 13.643v-3.286c0-1.084 0-1.958.058-2.666.06-.729.185-1.369.487-1.961A5 5 0 0 1 5.73 3.545c.556-.284 1.154-.411 1.827-.475C8.22 3.007 9.021 3 10 3A1 1 0 0 1 11 4"></path></svg></button>
//         <div className="bg-black flex flex-col mb-4 pt-7 w-full">
//           <label className="block text-white mb-2">
//             Save chat as:
//           </label>
//           <input
//             type="text"
//             placeholder="Save chat as..."
//             value={chatName}
//             onChange={(e) => setChatName(e.target.value)}
//             className="p-2 mb-2 bg-zinc-800 text-white rounded border border-white sm:w-fit"
//           />
//           <button className={thickBorderButtonClasses} onClick={saveChat}>
//             SAVE
//           </button>
//         </div>
//         <h2 className="block text-white mb-2 w-full">Chat History:</h2>
//         <div className="bg-gray-800 mb-4 overflow-y-auto flex flex-col align-middle w-full" style={{ maxHeight: "35vh" }}>
//           {savedChats.map((c, index) => (
//             <div key={index} className="w-full border-white mb-1">
//               <form onSubmit={(e) => {
//                 e.preventDefault(); // Prevent form submission
//                 fetchChatMessages(e.target.elements[0].value); // Fetch chat messages
//               }}>
//                 <input type="hidden" value={c['uid']} />
//                 <button type="submit" className="h-10 text-white w-full" style={{ border: "1px solid black" }}>{c['name']}</button>
//               </form>
//             </div>
//           ))}
//         </div>
//         <div className="bg-black flex flex-col justify-center items-center p-2 w-full">
//           <h3 className="text-white font-bold m-1">Post your DOUBT</h3>
//           <div className="messageBox w-3">
//             <div className="fileUploadWrapper">
//               <label htmlFor="file">
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 337 337">
//                   <circle strokeWidth="20" stroke="#6c6c6c" fill="none" r="158.5" cy="168.5" cx="168.5"></circle>
//                   <path strokeLinecap="round" strokeWidth="25" stroke="#6c6c6c" d="M167.759 79V259"></path>
//                   <path strokeLinecap="round" strokeWidth="25" stroke="#6c6c6c" d="M79 167.138H259"></path>
//                 </svg>
//                 <span className="tooltip">Add an image</span>
//               </label>
//               <input type="file" id="file" name="file" accept="image/*" onChange={(e) => handleFileUpload(e.target.files[0])} />
//             </div>
            
//             <input
//               required
//               placeholder="Write here..."
//               type="text"
//               value={doubt}
//               onChange={(e) => setDoubt(e.target.value)}
//               id="messageInput"
//               className=""
//             />
//             <button id="sendButton" onClick={handlePostDoubtToBackend}>
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 664 663">
//                 <path fill="none" d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"></path>
//                 <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="33.67" stroke="#6c6c6c" d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"></path>
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatComponent;

