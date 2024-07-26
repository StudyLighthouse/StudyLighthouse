import React, { useEffect, useState } from "react";
import Header from '../components/Navbar';
import axios from 'axios';
import ProblemsSolved from '../components/studycard';
import { useSession } from "../contexts/SessionContext";
import Loading from "../components/Loading";

export default function Profile() {
  const { user } = useSession();
  const [userData, setUserData] = useState(null);
  const [load, setLoad] = useState(true);


  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`https://studylighthouse.onrender.com/user_details?user_id=${user.uid}`, {
          withCredentials: true,
        });
        setUserData(response.data.user);
        setLoad(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setLoad(false);
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

  if(load) {
    return <Loading />
  }

  return (
    <div className="bg-black text-white min-h-screen w-screen flex flex-col">
      <Header />
      <h1 className="text-2xl font-bold mb-6 pt-4 italic text-center">Profile</h1>
      {userData && (
        <div>
          <div className="flex items-center mb-10 justify-center">
            <img className="w-24 h-24 md:w-36 md:h-36 lg:w-48 lg:h-48 rounded-full" src={userData.profileImage || "https://placehold.co/100x100"} alt="Profile Image" />
          </div>
          <div className="flex justify-center">
            <div className="flex items-center">
              <span className="text-yellow-400 text-xl md:text-2xl lg:text-3xl">
                {renderStars(userData.level)}
              </span>
            </div>
          </div>
          <div className="details flex flex-col md:flex-row md:justify-center items-center m-4 md:m-12">
            <div className="m-4 text-center md:text-left sm:text-left space-y-4 flex flex-col justify-center">
              <p><strong>Username  :</strong> <a href="/main" className="text-blue-800">{userData.name}</a></p>
              <p><strong>Contact  :</strong> <span className="text-blue-600">{userData.mobile}</span></p>
              <p><strong>E-Mail  :</strong> <a href={`mailto:${userData.email}`} className="text-blue-600 hover:underline">{userData.email}</a></p>
              <p><strong>GitHub URL  :</strong> <a href={userData.newGithub} className="text-blue-600 hover:underline">{userData.newGithub}</a></p>
              <p><strong>LinkedIn URL  :</strong> <a href={userData.newLinkedin} className="text-blue-600 hover:underline">{userData.newLinkedin}</a></p>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-center m-8 underline">Solved Problems</h2>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 lg:gap-12">
              {userData && userData.posted_solutions ? (
                userData.posted_solutions.map((problem) => (
                  <ProblemsSolved
                    key={problem.solution_id}
                    userId={user.uid}
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
}