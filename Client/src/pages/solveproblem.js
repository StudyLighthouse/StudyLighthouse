import React from "react";
import "../styles/solveproblem.css";
import Header from "../components/Navbar";
import Question from "../components/question";

export default function SolveProblem() {
  return (
    <div className="max-h-screen border m-0 flex flex-col">
      <Header />
      <Question />
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
            />
            <label className="textUser">Click Here</label>
          </div>
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
              <input id="file" type="file" />
            </label>
          </form>
        </div>
      </div>
    </div>
  );
}
