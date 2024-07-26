import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Navbar";
import axios from "axios";
import "../styles/showsolutions.css";
import { useSession } from "../contexts/SessionContext";
import Loading from "../components/Loading";

const ShowSolved = () => {
  const { solutionId, userId } = useParams();
  const { loading } = useSession();
  const [question, setQuestion] = useState(null);
  const [solution, setSolution] = useState(null);
  const [error, setError] = useState(null);
  const[load, setLoad] = useState(false)

  console.log("userId:", userId, "solution_id:", solutionId);

  useEffect(() => {
    const fetchQuestionAndSolution = async () => {
      setLoad(true)
      if (userId && solutionId) {
        try {
          console.log("Fetching data with:", {
            solution_id: solutionId,
            user_id: userId,
          });
          const response = await axios.get(
            "https://studylighthouse.onrender.com/get_solution",
            {
              params: { solution_id: solutionId, user_id: userId },
            }
          );
          console.log("Response data:", response.data);
          setQuestion(response.data.question);
          setSolution(response.data.solution);
        } catch (error) {
          console.error("Error fetching data:", error);
          setError("Failed to fetch data.");
        } finally {
          setLoad(false)
        }
      } 
    };

    fetchQuestionAndSolution();
  }, [solutionId, userId]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  if(load || loading) {
    return <Loading />
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-screen h-screen">
      <Header />
      <div className="w-full h-1/2">
      <p className="text-white lg:text-base md:text-sm sm:text-xs ml-5">Question</p>

        <div className="h-full w-full flex flex-col items-center p-4">
          {/* Render question details here */}
          {question?.file_url && question?.question && (
            <div className="h-full w-full flex flex-col items-center">
              <img
                src={question.file_url}
                alt="Question"
                style={{ width: "fit-content", height: "80%" }}
              />
              <h2 className="text-white">{question.question}</h2>
            </div>
          )}
          {question?.file_url && !question?.question && (
            <img
              src={question.file_url}
              alt="Question"
              style={{ width: "fit-content", height: "100%" }}
            />
          )}
          {!question?.file_url && question?.question && (
            <h2 className="text-white">{question.question}</h2>
          )}
        </div>
        <p className="text-white lg:text-base md:text-sm sm:text-xs ml-5">solution</p>

        <div className="overflow-y-auto w-full flex flex-col justify-center items-center gap-5">
          {/* Render solution here */}
          {solution?.file_url && solution?.solution && (
            <div className="flex flex-col justify-center items-center gap-2">
              <img
                src={solution.file_url}
                alt="Solution"
                style={{ width:"50%",height:"50%" }}
              />
              <p className="text-white lg:text-base md:text-sm sm:text-xs">{solution.solution}</p>
            </div>
          )}
          {solution?.file_url && !solution?.solution && (
            <img
              src={solution.file_url}
              alt="Solution"
              style={{ width:"50%",height:"50%" }}
            />
          )}
          {!solution?.file_url && solution?.solution && (
            <p className="text-white lg:text-base md:text-sm sm:text-xs">{solution.solution}</p>
          )}
          <div className="likes">
            <svg viewBox="-2 0 105 92" className="likes_svg">
              <path d="M85.24 2.67C72.29-3.08 55.75 2.67 50 14.9 44.25 2 27-3.8 14.76 2.67 1.1 9.14-5.37 25 5.42 44.38 13.33 58 27 68.11 50 86.81 73.73 68.11 87.39 58 94.58 44.38c10.79-18.7 4.32-35.24-9.34-41.71Z"></path>
            </svg>
            <span className="likes_text">{solution?.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowSolved;
