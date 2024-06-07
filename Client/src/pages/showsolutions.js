import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Navbar";
import axios from "axios";
import { useSession } from "../contexts/SessionContext";
import "../styles/showsolutions.css"

const Show = () => {
  const { id } = useParams();
  const { user, loading: sessionLoading } = useSession(); 
  const [question, setQuestion] = useState(null);
  const [solutions, setSolutions] = useState([]);
  const [componentLoading, setComponentLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestionAndSolutions = async () => {
      try {
        const questionResponse = await axios.get(`http://127.0.0.1:5000/get_question/${id}`);
        setQuestion(questionResponse.data);

        const solutionsResponse = await axios.get(`http://127.0.0.1:5000/get_solutions/${id}`);
        setSolutions(solutionsResponse.data);

        setComponentLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data.");
        setComponentLoading(false);
      }
    };

    fetchQuestionAndSolutions();
  }, [id]);

  const handleLikeSolution = async (questionId, solutionId) => {
    try {
      await axios.post("http://127.0.0.1:5000/like_solution", { questionId, solutionId, userId: question.uid });
      // Fetch updated solutions after liking
      const solutionsResponse = await axios.get(`http://127.0.0.1:5000/get_solutions/${questionId}`);
      setSolutions(solutionsResponse.data);
    } catch (error) {
      console.error("Error liking solution:", error);
      // Handle error
    }
  };
  

  if (sessionLoading || componentLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Header />
      <div>
        {/* Render question details here */}
        <h2 className="text-white">{question.question}</h2>
        {/* Render solutions here */}
        {solutions.map((solution) => (
          <div key={solution.id}>
            {solution.file_url ? ( // Check if solution has a file URL (image)
              <img src={solution.file_url} alt="Solution" style={{ maxWidth: "100%" }} />
            ) : (
              <p className="text-white">{solution.solution}</p> // Render text solution if there's no file URL
            )}
            <p className="text-white">Posted by: {solution.username}</p>
            <div className="likes" onClick={() => handleLikeSolution(id, solution.id)}>
              <svg viewBox="-2 0 105 92" className="likes_svg">
                <path d="M85.24 2.67C72.29-3.08 55.75 2.67 50 14.9 44.25 2 27-3.8 14.76 2.67 1.1 9.14-5.37 25 5.42 44.38 13.33 58 27 68.11 50 86.81 73.73 68.11 87.39 58 94.58 44.38c10.79-18.7 4.32-35.24-9.34-41.71Z"></path>
              </svg>
              <span className="likes_text">{solution.likes}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Show;
