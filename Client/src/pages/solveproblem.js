import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../components/Navbar";
import { useSession } from "../contexts/SessionContext";
import "../styles/solveproblem.css";

const SolveProblem = () => {
  const { user } = useSession();
  const { state } = useLocation();
  const { questionDetails } = state;
  const [solutionText, setSolutionText] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      alert("Please log in to post your solution.");
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

      await axios.post('http://127.0.0.1:5000/post_solution', formData, {
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
    <div className="max-h-screen border m-0 flex flex-col">
      <Header />
      <div className="h-1/2 w-full">
        <div className="h-full w-full" style={{ border: "2px solid white" }}>
          {questionDetails.file_url && questionDetails.question && ( // Check if question has both text and file URL (image)
            <div>
              <img src={questionDetails.file_url} alt="Question" style={{ maxWidth: "100%" }} />
              <h2 className="text-white">{questionDetails.question}</h2>
            </div>
          )}
          {questionDetails.file_url && !questionDetails.question && ( // Check if question has only file URL (image)
            <img src={questionDetails.file_url} alt="Question" style={{ maxWidth: "100%" }} />
          )}
          {!questionDetails.file_url && questionDetails.question && ( // Check if question has only text
            <h2 className="text-white">{questionDetails.question}</h2>
          )}
        </div>
      </div>
      <div className="posting flex-grow flex items-end justify-center w-full">
        {/* <form className="file-upload-form" onSubmit={handleSubmit}> */}
        <div className="textArea flex-grow-0">
          <div className="input-form w-full">
            <textarea
              className="input"
              name="text"
              type="text"
              required
              rows="10"
              cols="80"
              value={solutionText}
              onChange={(e) => setSolutionText(e.target.value)}
            />
            <label className="textUser">Click Here</label>
          </div>
        </div>
        <p className="or-text">or</p>
        <div className="fileUpload flex-grow-0">
          <div className="file-upload-form">
            <label htmlFor="file" className="file-upload-label">
              <div className="file-upload-design">
                <svg viewBox="0 0 640 512" height="1em">
                  <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
                </svg>
                <p>Drag and Drop</p>
                <p>or</p>
                <span className="browse-button">Browse file</span>
              </div>
              <input
                id="file"
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
              {file && <p>{file.name}</p>}
            </label>
            <button className="submit-button" type="submit" onClick={handleSubmit}>Submit Solution</button>
          </div>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
};

export default SolveProblem;
