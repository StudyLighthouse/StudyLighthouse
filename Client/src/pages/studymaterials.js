import React, { useEffect } from "react";
import "../styles/studymaterials.css";
import Header from "../components/Navbar";
import ChatComponent from "../components/sidebar";
import StudyMaterialCard from "../components/studymaterialcard";

export default function StudyMaterials() {
  useEffect(() => {
    document.body.classList.add("s_materialBody");
    return () => {
      document.body.classList.remove("s_materialBody");
    };
  }, []);

  return (
    <div className="s_material w-full h-full pt-4 ml-0 flex flex-col">
      <Header />
      <img className="img1 absolute" src="Text,Speech Human.png" alt="Human" />
      <img className="img2 absolute" src="Text,Speech Robot.png" alt="Robot" />
      <div className="content flex-grow flex">
        <ChatComponent />
        <div className="feed">
          <div className="grps">
            <StudyMaterialCard />
            <StudyMaterialCard />
          </div>
          <div className="grps">
            <StudyMaterialCard />
            <StudyMaterialCard />
          </div>
          <div className="grps">
            <StudyMaterialCard />
            <StudyMaterialCard />
          </div>
          <div className="grps">
            <StudyMaterialCard />
            <StudyMaterialCard />
          </div>
          <div className="grps">
            <StudyMaterialCard />
            <StudyMaterialCard />
          </div>
          <div className="grps">
            <StudyMaterialCard />
            <StudyMaterialCard />
          </div>
          <div className="grps">
            <StudyMaterialCard />
            <StudyMaterialCard />
          </div>
        </div>
      </div>
    </div>
  );
}
