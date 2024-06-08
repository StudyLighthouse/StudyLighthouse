import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../components/Navbar";
import { useSession } from "../contexts/SessionContext";
import "../styles/solveproblem.css";

const SolveProblem = () => {
  const { user, loading } = useSession();
  const { state } = useLocation();
  const { questionDetails } = state;
  const [solution, setSolution] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleTextSolutionSubmit = async () => {
    if (!solution) {
      alert("Please provide a solution.");
      return;
    }

    if (!user) {
      alert("Please log in to post your doubt.");
      return;
    }

    try {
      await axios.post(
        "http://127.0.0.1:5000/post_solution",
        {
          questionId: questionDetails.question_id,
          question: questionDetails.question,
          UID: questionDetails.uid,
          solution,
          user: user,
        },
        {
          withCredentials: true,
        }
      );
      alert("Solution posted successfully.");
    } catch (error) {
      console.error("Error posting solution:", error);
      setError("Failed to post solution.");
    }
  };

  const handleFileSolutionSubmit = async (event) => {
    event.preventDefault();
    
    if (!user) {
        alert("Please log in to post your doubt.");
        return;
    }
    console.log(questionDetails.question_id)
    const formData = new FormData();
    formData.append('user', JSON.stringify(user)); // Assuming `user` is available in the context
    formData.append('questionId', questionDetails.question_id);
    formData.append('question', questionDetails.question); // Assuming `questionId` is available in the context
    formData.append('file', file); // Assuming `file` is available in the context

    try {
        axios.post('http://127.0.0.1:5000/post_file_solution', formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        // console.log('File uploaded successfully', response.data);
        alert("File uploaded successfully.");
    } catch (error) {
        console.error('Error uploading file:', error);
        setError("Failed to upload file.");
    }
};


  return (
    <div className="max-h-screen border m-0 flex flex-col">
      <Header />
      <div className="h-1/2 w-full">
        <div className="h-full w-full" style={{ border: "2px solid white" }}>
          <h4 className="text-white">{questionDetails.question}</h4>
        </div>
      </div>
      <div className="posting flex-grow flex items-end justify-center w-full">
        <div className="textArea flex-grow-0">
          <div className="input-form w-full">
            <textarea
              className="input"
              name="text"
              type="text"
              required
              rows="10"
              cols="80"
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
            />
            <label className="textUser">Click Here</label>
          </div>
          <button onClick={handleTextSolutionSubmit} className="submit-button">
            Submit Text Solution
          </button>
        </div>
        <p className="or-text">or</p>
        <div className="fileUpload flex-grow-0">
          <form className="file-upload-form">
            <label htmlFor="file" className="file-upload-label">
              <div className="file-upload-design">
                <svg viewBox="0 0 640 512" height="1em">
                  <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
                </svg>
                <p>Drag and Drop</p>
                <p>or</p>
                <span className="browse-button">Browse file</span>
              </div>
              <input id="file" type="file" onChange={(e) => setFile(e.target.files[0])} />
              {file && (
                <div>
                  <p>{file.name}</p>
                  <button className="upload-button" type="submit" onClick={handleFileSolutionSubmit}>Upload</button>
                </div>
              )}
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SolveProblem;
