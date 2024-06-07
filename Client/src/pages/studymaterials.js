// StudyMaterials.js
import React, { useState, useEffect } from "react";
import "../styles/studymaterials.css";
import Header from "../components/Navbar";
import StudyMaterialCard from "../components/studymaterialcard";
import axios from "axios";
import { useSession } from "../contexts/SessionContext";

export default function StudyMaterials() {
  const { user, loading } = useSession();
  const [file, setFile] = useState(null);
  const [materialName, setMaterialName] = useState("");
  const [error, setError] = useState("");
  const [studyMaterials, setStudyMaterials] = useState([]);

  useEffect(() => {
    fetchStudyMaterials();
  }, []);

  const fetchStudyMaterials = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get_study_materials");
      setStudyMaterials(response.data);
    } catch (error) {
      console.error("Error fetching study materials:", error.response);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleMaterialNameChange = (e) => {
    setMaterialName(e.target.value);
  };

  const handlePostMaterial = async (event) => {
    event.preventDefault();

    if (!user) {
      alert("Please log in to post your doubt.");
      return;
    }

    if (!file || !materialName) {
      setError("Please select a file and enter a name");
      return;
    }

    const formData = new FormData();
    formData.append("user", JSON.stringify(user));
    formData.append("file", file);
    formData.append("materialName", materialName);

    try {
      await axios.post("http://localhost:5000/post_study_material", formData, {
        withCredentials: true, // Ensure cookies are sent with the request
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Clear the form and error state on successful posting
      setFile(null);
      setMaterialName("");
      setError("");
      // Fetch and update the study materials list
      fetchStudyMaterials();
    } catch (error) {
      console.error("Error posting study material:", error.response);
      setError("Failed to post study material. Please try again later.");
    }
  };

  return (
    <div className="s_material w-full h-full pt-4 ml-0 flex flex-col">
      <Header />
      {/* Study materials content */}
      <div className="study-materials">
        {studyMaterials.map((material, index) => (
          <StudyMaterialCard key={index} filename={material.filename} fileUrl={material.file_url} />
        ))}
      </div>

      {/* File upload section */}
      <div className="file-upload">
        <input type="file" onChange={handleFileChange} />
      </div>

      {/* Material name input */}
      <div className="material-name">
        <input
          type="text"
          placeholder="Enter material name"
          value={materialName}
          onChange={handleMaterialNameChange}
        />
      </div>

      {/* Error message */}
      {error && <div className="error">{error}</div>}

      {/* Post button */}
      <button onClick={handlePostMaterial}>Post Material</button>
    </div>
  );
}
