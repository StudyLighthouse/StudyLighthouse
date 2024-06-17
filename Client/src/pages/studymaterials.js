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
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setFile(null);
      setMaterialName("");
      setError("");
      fetchStudyMaterials();
    } catch (error) {
      console.error("Error posting study material:", error.response);
      setError("Failed to post study material. Please try again later.");
    }
  };


  const filteredStudyMaterials = studyMaterials.filter((material) =>
    material.material_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="s_material w-screen">
      <Header onMenuToggle={handleMenuToggle} isMenuOpen={isMenuOpen} currentPage="StudyMaterials" />
      <div className="studyMaterialsContent w-full h-full flex flex-row">
        <div className={`left-section w-1/5 ${isMenuOpen ? "open" : ""}`} style={{ height: isMenuOpen ? "100%" : "auto" }}>
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input
            type="file"
            className="file-upload mb-3"
            onChange={handleFileChange}
          />
          <input
            type="text"
            className="material-name mb-3 h-10 text-black"
            placeholder="Material Name"
            value={materialName}
            onChange={handleMaterialNameChange}
          />
          <button className="postMaterialButton text-white border border-white" onClick={handlePostMaterial}>Post Material</button>
          {error && <div className="error">{error}</div>}
        </div>
        <div className={`right-section w-screen h-full flex justify-center items-center ${isMenuOpen ? "shifted" : ""}`}>
          <div className="flex flex-wrap w-full h-full justify-start sm:gap-y-8 md:gap-y-8 lg:gap-x-32">
            {filteredStudyMaterials.map((material, index) => (
              <div key={material.material_id} className={`w-full sm:w-1/2 lg:w-1/4 p-2 ${index % 2 === 0 ? "first-item" : ""}`}>
                <StudyMaterialCard material_name={material.material_name} fileUrl={material.file_url} filename={material.filename} />
              </div>
            ))}
          </div>
        
        </div>
      </div>
    </div>
  );
}