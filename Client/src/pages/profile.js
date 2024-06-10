import React, { useEffect, useState } from "react";
import Header from '../components/Navbar';
import axios from 'axios';
import ProblemsSolved from '../components/studycard';
import { useSession } from "../contexts/SessionContext";

export default function Profile() {
  const { user } = useSession();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/user_details?user_id=${user.uid}`, {
          withCredentials: true,
        });
        setUserData(response.data.user);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [user.uid]);

  // Function to render stars based on the user's level
  const renderStars = (level) => {
    const cappedLevel = Math.min(level, 5);
    const filledStars = "★".repeat(cappedLevel);
    const emptyStars = "☆".repeat(5 - cappedLevel);
    return filledStars + emptyStars;
  };

  return (
    <div className="bg-black text-white p-4 min-h-screen flex flex-col">
      <Header />
      <h1 className="text-2xl font-bold mb-6 pt-4 italic">Profile</h1>
      {userData && (
        <div>
          <div className="flex items-center mb-10 ml-4">
            <img className="w-16 h-16 rounded-full" src={userData.profileImage || "https://placehold.co/100x100"} alt="Profile Image" />
            <div className="ml-0">
              <div className="flex items-center">
                <span className="text-yellow-400 ml-4 text-xl">
                  {renderStars(userData.level)}
                </span>
              </div>
            </div>
          </div>
          <div className="mb-4 ml-4">
            <p><strong>Username:</strong> <a href="/main" className="text-blue-800 ml-20">{userData.name}</a></p>
            <br></br>
            <p><strong>Contact:</strong> <span className="text-blue-600 ml-24">{userData.mobile}</span></p>
            <br></br>
            <p><strong>E-Mail:</strong> <a href={`mailto:${userData.email}`} className="text-blue-600 ml-24">{userData.email}</a></p>
            <br></br>
            <p><strong>GitHub URL:</strong> <a href={userData.github} className="text-blue-600 ml-16">{userData.newGithub}</a></p>
            <br></br>
            <p><strong>LinkedIn URL:</strong> <a href={userData.linkedin} className="text-blue-600 ml-12">{userData.newLinkedin}</a></p>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2 ml-4">Solved Problems:</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 ml-4 pt-2">
              {userData && userData.posted_solutions ? (
                userData.posted_solutions.map((problem) => (
                  <ProblemsSolved
                    key={problem.solution_id}
                    userId={user.uid}
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
}
