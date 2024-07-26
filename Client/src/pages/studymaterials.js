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
      const response = await axios.get("https://studylighthouse.onrender.com/get_study_materials");
      setStudyMaterials(response.data);
    } catch (error) {
      console.error("Error fetching study materials:", error.response);
      alert("Error fetching study materials:", error.response);
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
      await axios.post("https://studylighthouse.onrender.com/post_study_material", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setFile(null);
      setMaterialName("");
      setError("");
      fetchStudyMaterials();
      alert(`${materialName} Posted Successfully.`);
    } catch (error) {
      console.error("Error posting study material:", error.response);
      alert("Error posting study material:", error.response);
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
    <div className="s_material w-screen h-screen">
      <Header onMenuToggle={handleMenuToggle} isMenuOpen={isMenuOpen} currentPage="StudyMaterials" />
      <div className="studyMaterialsContent w-full h-full flex flex-row">
        <div className={`left-section w-1/5 ${isMenuOpen ? "open" : ""}`} style={{ height: isMenuOpen ? "100%" : "auto" }}>
          <div className="container">
            <input
              type="text"
              name="text"
              className="input"
              placeholder="Type to search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
                <title>Search</title>
                <path
                  d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
                  fill="none"
                  stroke="currentColor"
                  strokeMiterlimit="10"
                  strokeWidth="32"
                ></path>
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  strokeWidth="32"
                  d="M338.29 338.29L448 448"
                ></path>
              </svg>
            </div>
          </div>
          <div className="middle-content  md:pb-10 sm:pb-10 lg:pb-0 flex flex-col items-center justify-end">
            <input
              type="file"
              className="file-upload mb-3 w-10/12"
              onChange={handleFileChange}
            />
            <input
              type="text"
              name="text"
              className="material-name mb-3 h-10 w-10/12 text-black"
              placeholder="Type Material Name"
              value={materialName}
              onChange={handleMaterialNameChange}
            />
            <button className="postMaterialButton text-white border w-10/12 border-white" onClick={handlePostMaterial}>Post Material</button>
            {error && <div className="error">{error}</div>}
          </div>
        </div>
        <div className={`right-section w-screen h-full flex justify-center items-center ${isMenuOpen ? "shifted" : ""}`}>
          <div className="grid w-full h-full gap-2 sm:gap-y-8 md:gap-8 lg:gap-8 grid-cols-1 md:grid-cols-3">
            {filteredStudyMaterials.map((material) => (
              <div key={material.material_id} className="p-2 w-full flex justify-center">
                <StudyMaterialCard 
                  material_name={material.material_name} 
                  fileUrl={material.file_url} 
                  filename={material.filename} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
