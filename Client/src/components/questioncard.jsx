import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSession } from "../contexts/SessionContext";
import "../styles/questioncard.css";
import Loading from "./Loading";

const CardComponent = ({ question }) => {
  const navigate = useNavigate();
  const { user, loading } = useSession();
  const [error, setError] = useState("");
  const [load, setLoad] = useState(false);

  const handleCardClick = async () => {
    if (!user) {
      alert("Please log in to solve the problem.");
      return;
    }

    try {
      // Fetch the question details
      setLoad(true)
      const response = await axios.get(`https://studylighthouse.onrender.com/get_question/${question.id}`, {
        withCredentials: true,
      });
      const questionDetails = response.data;

      // Navigate to the solve page with question details
      navigate(`/solveproblem/${question.id}`, { state: { questionDetails } });
    } catch (error) {
      console.error("Error logging question view or fetching question details:", error);
      setError("Failed to log question view or fetch question details.");
    } finally {
      setLoad(false)
    }
  };

  if(load) {
    return <Loading />
  }

  const handleSolutionsClick = async () => {
    if (!user) {
      alert("Please log in to view solutions.");
      return;
    }

    try {
      navigate(`/solutions/${question.id}`); // Navigate to the solutions page with the question ID
    } catch (error) {
      console.error("Error navigating to solutions page:", error);
      setError("Failed to navigate to solutions page.");
    }
  };

  const handleFriendProfile = async (e) => {
    e.stopPropagation();

    if (!user) {
      alert("Please log in to view solutions.");
      return;
    }

    try {
      navigate(`/friendprofile/${question.uid}`); // Navigate to the solutions page with the question ID
    } catch (error) {
      console.error("Error navigating to solutions page:", error);
      setError("Failed to navigate to solutions page.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // Format the timestamp
  const formattedDate = new Date(question.timestamp).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
      <div className="que_container w-full">
        <div className="main w-full">
          <div className="quest_card w-full" onClick={handleCardClick}>
            <div className="card_content h-full">
              {question.question ? (
                <p className="text_m">{question.question}</p>
              ) : (
                <div className="click_to_show">Click to show the question</div>
              )}
            </div>
              <div className="quest_card_back w-full">
              </div>
          </div>
          <div className="btns">
            <div onClick={handleFriendProfile} className="bb">
              <button className="username_text text-black">{question.username}</button>
            </div>
            <div>
              <div className="timestamp">{formattedDate}</div>
              <center>
                <button onClick={handleSolutionsClick} className="bb">
                  Solutions
                </button>
              </center>
            </div>
          </div>
        </div>
      </div>
  );
};

export default CardComponent;
