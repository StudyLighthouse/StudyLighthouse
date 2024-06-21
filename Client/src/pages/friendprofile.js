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
        const response = await axios.get(`https://studylighthouse.onrender.com/others_details?user_id=${id}`, {
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
    <div className="bg-black text-white pt-2 rounded-lg w-screen h-screen flex flex-col">
      <Header />
      {userData && (
        <div className="w-full">
          <h2 className="lg:text-3xl text-sm md:text-xl font-bold text-left mb-4 ml-6 pt-4 italic">{userData.name}'s Profile</h2>
          <div className="flex items-center mb-10 ml-4">
            <img className="w-24 h-24 md:w-36 md:h-36 lg:w-48 lg:h-48 rounded-full" src={userData.profileImage || "https://placehold.co/100x100"} alt="Profile Image" />
            <div className="ml-4">
              <p className="text-blue-400 text-xs md:text-sm lg:text-lg">@{userData.name}</p>
              <div className="flex items-center">
                {/* Display user's level as stars */}
                <span className="text-yellow-400 text-xl md:text-2xl lg:text-3xl">
                  {renderStars(userData.level)}
                </span>
              </div>
            </div>
          </div>
          <div className="mb-4 pl-10 text-left space-y-4 flex flex-col justify-center text-sm md:text-lg lg:text-xl">
            <p><strong>E-Mail:</strong> <a href={`mailto:${userData.email}`} className="text-blue-600 ml-4 hover:underline">{userData.email}</a></p>
            <br />
            <p><strong>GitHub URL:</strong> <a href={userData.newGithub} className="text-blue-600 ml-4 hover:underline">{userData.newGithub}</a></p>
            <br />
            <p><strong>LinkedIn URL:</strong> <a href={userData.newLinkedin} className="text-blue-600 ml-4 hover:underline">{userData.newLinkedin}</a></p>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-center m-8 underline">Solved Problems:</h2>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 lg:gap-12">
              {userData.posted_solutions && userData.posted_solutions.length > 0 ? (
                userData.posted_solutions.map((problem) => (
                  <ProblemsSolved
                    key={problem.solution_id}
                    userId={id}
                    solutionId={problem.solution_id}
                    question={problem.question ? problem.question : "Click here to view question"}
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
