import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Header from '../components/Navbar';
import ProblemsSolved from '../components/studycard';

const Friendprofile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/others_details?user_id=${id}`, {
          withCredentials: true,
        });
        console.log(response.data.user);
        setUserData(response.data.user);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [id]); // Use `id` instead of `user.id`
  console.log(userData);

  // Function to render stars based on the user's level
  const renderStars = (level) => {
    // Cap the level at 5
    const cappedLevel = Math.min(level, 5);
    const filledStars = "★".repeat(cappedLevel); // Filled stars
    const emptyStars = "☆".repeat(5 - cappedLevel); // Empty stars
    return filledStars + emptyStars;
  };

  return (
    <div className="bg-black text-white pt-2 rounded-lg w-full h-screen flex flex-col">
      <Header />
      {userData && (
        <div className="w-full">
          <h2 className="text-3xl font-bold text-left mb-4 ml-6 pt-4">{userData.name}'s Profile</h2>
          <div className="flex items-center mb-10 ml-4">
            <img className="w-16 h-16 rounded-full" src={userData.profileImage || "https://placehold.co/100x100"} alt="Profile Image" />
            <div className="ml-4">
              <p className="text-blue-400">@{userData.name}</p>
              <div className="flex items-center">
                {/* Display user's level as stars */}
                <span className="text-yellow-400 text-xl">
                  {renderStars(userData.level)}
                </span>
              </div>
            </div>
          </div>
          <div className="mb-4 ml-4">
            <p><strong>E-Mail:</strong> <a href={`mailto:${userData.email}`} className="text-blue-600 ml-4">{userData.email}</a></p>
            <br />
            <p><strong>GitHub URL:</strong> <a href={userData.github} className="text-blue-600 ml-4">{userData.newGithub}</a></p>
            <br />
            <p><strong>LinkedIn URL:</strong> <a href={userData.linkedin} className="text-blue-600 ml-4">{userData.newLinkedin}</a></p>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2 ml-4">Solved Problems:</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 ml-4 pt-2">
              {userData.posted_solutions && userData.posted_solutions.length > 0 ? (
                userData.posted_solutions.map((problem) => (
                  <ProblemsSolved
                    key={problem.solution_id}
                    userId={id}
                    solutionId={problem.solution_id}
                    question={problem.question}
                    solution={problem.solution}
                    likes={problem.likes}
                  />
                ))
              ) : (
                <p>No solved problems found.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Friendprofile;
