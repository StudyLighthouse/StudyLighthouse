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
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [rightSectionHeight, setRightSectionHeight] = useState(0); // State to store the height of the right section

  useEffect(() => {
    fetchStudyMaterials();
  }, []);

  useEffect(() => {
    // Update the height of the right section whenever studyMaterials change
    updateRightSectionHeight();
  }, [studyMaterials]);

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

  // Update the height of the right section
  const updateRightSectionHeight = () => {
    const rightSection = document.querySelector(".right-section");
    if (rightSection) {
      setRightSectionHeight(rightSection.clientHeight);
    }
  };

  // Filter study materials based on search term
  const filteredStudyMaterials = studyMaterials.filter(material =>
    material.material_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    // Update the height of the right section after a small delay to ensure DOM is updated
    setTimeout(updateRightSectionHeight, 100);
  };

  return (
    <div className="s_material">
      <Header onMenuToggle={handleMenuToggle} isMenuOpen={isMenuOpen} currentPage="StudyMaterials" />
      <div className="studyMaterialsContent">
        <div className={`left-section ${isMenuOpen ? "open" : ""}`} style={{ height: isMenuOpen ? rightSectionHeight + "px" : "auto" }}>
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input
            type="file"
            className="file-upload"
            onChange={handleFileChange}
          />
          <input
            type="text"
            className="material-name"
            placeholder="Material Name"
            value={materialName}
            onChange={handleMaterialNameChange}
          />
          <button className="postMaterialButton text-white border border-white" onClick={handlePostMaterial}>Post Material</button>
          {error && <div className="error">{error}</div>}
        </div>
        <div className={`right-section ${isMenuOpen ? "shifted" : ""}`}>
          <div className="study-materials">
            {filteredStudyMaterials.map((material) => (
              <StudyMaterialCard key={material.id} material_name={material.material_name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}