import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../components/Navbar";
import axios from "axios";
import { useSession } from "../contexts/SessionContext";
import "../styles/showsolutions.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../components/Loading";

const Show = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: sessionLoading } = useSession();
  const [question, setQuestion] = useState(null);
  const [solutions, setSolutions] = useState([]);
  const [componentLoading, setComponentLoading] = useState(true);
  const [error, setError] = useState(null);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const fetchQuestionAndSolutions = async () => {
      try {
        const questionResponse = await axios.get(
          `https://studylighthouse.onrender.com/get_question/${id}`
        );
        setQuestion(questionResponse.data);

        const solutionsResponse = await axios.get(
          `https://studylighthouse.onrender.com/get_solutions/${id}`
        );
        setSolutions(solutionsResponse.data);

        setComponentLoading(false);
        setLoad(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data.");
        setComponentLoading(false);
        setLoad(false);
      }
    };

    fetchQuestionAndSolutions();
  }, [id]);

  if (load) {
    return <Loading />;
  }

  const handleLikeSolution = async (questionId, solutionId) => {
    try {
      await axios.post("https://studylighthouse.onrender.com/like_solution", {
        questionId,
        solutionId,
        userId: user.uid,
      });
      // Fetch updated solutions after liking
      const solutionsResponse = await axios.get(
        `https://studylighthouse.onrender.com/get_solutions/${questionId}`
      );
      setSolutions(solutionsResponse.data);
    } catch (error) {
      console.error("Error liking solution:", error);
      toast.error("Error liking solution.");
      // Handle error
    }
  };

  const handleFriendProfile = async (user_id) => {
    if (!user) {
      toast.error("Please log in to view solutions.");
      return;
    }

    try {
      navigate(`/friendprofile/${user_id}`); // Navigate to the solutions page with the question ID
    } catch (error) {
      console.error("Error navigating to solutions page:", error);
      setError("Failed to navigate to solutions page.");
    }
  };

  if (sessionLoading || componentLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-screen h-screen">
      <Header />
      <div className="w-full h-1/2">
        <p className="text-white lg:text-base md:text-sm sm:text-xs ml-5">
          Question
        </p>

        <div className="h-full w-full flex flex-col items-center p-4">
          {/* Render question details here */}
          {question.file_url &&
            question.question && ( // Check if question has both text and file URL (image)
              <div className="h-full w-full flex flex-col items-center">
                <img
                  src={question.file_url}
                  alt="Question"
                  style={{ width: "fit-content", height: "80%" }}
                />
                <h2 className="text-white">{question.question}</h2>
              </div>
            )}
          {question.file_url &&
            !question.question && ( // Check if question has only file URL (image)
              <img
                src={question.file_url}
                alt="Question"
                style={{ width: "fit-content", height: "100%" }}
              />
            )}
          {!question.file_url &&
            question.question && ( // Check if question has only text
              <h2 className="text-white">{question.question}</h2>
            )}
        </div>
        <p className="text-white lg:text-base md:text-sm sm:text-xs ml-5">
          Posted Solutions
        </p>

        <div className="overflow-y-auto w-full flex flex-col justify-center items-center gap-5">
          {/* Render solutions here */}
          {solutions.map((solution) => (
            <div
              key={solution.solution_id}
              className="w-3/5 flex flex-col justify-center align-center items-center overflow-auto border-white border-2 p-4 gap-2"
            >
              {solution.file_url &&
                solution.solution && ( // Check if solution has both text and file URL (image)
                  <div className="flex flex-col justify-center items-center gap-2">
                    <img
                      src={solution.file_url}
                      alt="Solution"
                      style={{ width: "50%", height: "50%" }}
                    />
                    <p className="text-white lg:text-base md:text-sm sm:text-xs">
                      {solution.solution}
                    </p>
                  </div>
                )}
              {solution.file_url &&
                !solution.solution && ( // Check if solution has only file URL (image)
                  <img
                    src={solution.file_url}
                    alt="Solution"
                    style={{ width: "50%", height: "50%" }}
                  />
                )}
              {!solution.file_url &&
                solution.solution && ( // Check if solution has only text
                  <p className="text-white lg:text-base md:text-sm sm:text-xs">
                    {solution.solution}
                  </p>
                )}
              <p
                className="text-white lg:text-base md:text-sm sm:text-xs"
                onClick={() => handleFriendProfile(solution.userId)}
              >
                Posted by: {solution.username}
              </p>
              <div
                className="likes"
                onClick={() => handleLikeSolution(id, solution.solution_id)}
              >
                <svg viewBox="-2 0 105 92" className="likes_svg">
                  <path d="M85.24 2.67C72.29-3.08 55.75 2.67 50 14.9 44.25 2 27-3.8 14.76 2.67 1.1 9.14-5.37 25 5.42 44.38 13.33 58 27 68.11 50 86.81 73.73 68.11 87.39 58 94.58 44.38c10.79-18.7 4.32-35.24-9.34-41.71Z"></path>
                </svg>
                <span className="likes_text">{solution.likes}</span>
              </div>
            </div>
          ))}
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Show;
