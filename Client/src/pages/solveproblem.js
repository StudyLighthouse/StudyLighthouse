import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../components/Navbar";
import { useSession } from "../contexts/SessionContext";
import "../styles/solveproblem.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MessageCircle } from "lucide-react";

const SolveProblem = () => {
  const { user } = useSession();
  const { state } = useLocation();
  const { questionDetails } = state;
  const [solutionText, setSolutionText] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      alert(`Selected file: ${selectedFile.name}`);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      toast.error("Please log in to post your solution.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('user', JSON.stringify(user));
      formData.append('questionId', questionDetails.question_id);
      formData.append('question', questionDetails.question);
      formData.append('UID', questionDetails.uid);
      console.log(questionDetails.uid)
      formData.append('solution', solutionText);
      if (file) {
        formData.append('file', file);
      }

      await axios.post('https://studylighthouse.onrender.com/post_solution', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert("Solution posted successfully.");
      setSolutionText(""); // Clear the text area
      setFile(null); // Clear the file input
    } catch (error) {
      console.error("Error posting solution:", error);
      setError("Failed to post solution.");
    }
  };

  return (
    <div className="max-h-screen w-screen m-0 flex flex-col">
      <Header />
      <div className="h-1/2 w-full ">
      <p className="text-white lg:text-base md:text-sm sm:text-xs ml-5">Question</p>
        <div className="h-full w-full flex flex-col items-center p-4" >
          {questionDetails.file_url && questionDetails.question && ( // Check if question has both text and file URL (image)
            <div className="h-full w-full flex flex-col items-center">
              <img src={questionDetails.file_url} alt="Question" style={{  width: "fit-content" ,height:"80%" }} />
              <h2 className="text-white">{questionDetails.question}</h2>
            </div>
          )}
          {questionDetails.file_url && !questionDetails.question && ( // Check if question has only file URL (image)
            <img src={questionDetails.file_url} alt="Question" style={{ width: "fit-content" ,height:"100%"}} />
          )}
          {!questionDetails.file_url && questionDetails.question && ( // Check if question has only text
            <h2 className="text-white">{questionDetails.question}</h2>
          )}
        </div>
      </div>
      <p className="text-white lg:text-base md:text-sm sm:text-xs ml-5">Post Your Solution</p>
      <div className="solution_posting flex-grow flex items-end justify-center w-full lg:flex-row md:flex-col sm:flex-col p-4">
        {/* <form className="file-upload-form" onSubmit={handleSubmit}> */}
        <div className="textArea flex-grow-0">
          <div className="input-form w-full ">
            <textarea
              className="input"
              name="text"
              type="text"
              required
              rows="7"
              cols="80"
              value={solutionText}
              onChange={(e) => setSolutionText(e.target.value)}
            />
            <label className="textUser">Click Here</label>
          </div>
        </div>
        <p className="or-text">or</p>
        <div className="fileUpload  justify-center flex">
          <div className="file-upload-form sm:w-full flex flex-col items-center justify-center rounded-lg">
            <label htmlFor="file" className="file-upload-label cursor-pointer sm:h-48 sm:w-48 flex flex-col items-center justify-center">
              <div className="file-upload-design sm:w-full flex flex-col items-center">
                <svg viewBox="0 0 640 512" height="1em" className="mb-2 sm:h-8">
                  <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
                </svg>  
                <p className="text-sm sm:w-full md:text-base lg:text-lg sm:text-sm  flex items-center justify-center">Drag and Drop</p>
                <p className="sm:text-sm md:text-base lg:text-lg">or</p>
                <span className="browse-button sm:w-4/5 text-blue-500 hover:text-blue-700">Browse file</span>
              </div>
              <input
                id="file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
          <ToastContainer />
        </div>
        {/* </form> */}
        <button className="submit-button lg:ml-3 md:mt-3 sm:mt-3" type="submit" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default SolveProblem;
