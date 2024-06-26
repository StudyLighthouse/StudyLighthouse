import React from 'react';
import '../styles/studymaterialcard.css';

const StudyMaterialCard = ({ filename, fileUrl, material_name }) => {
    console.log(material_name,"in card")
	const handleDownload = () => {
		console.log(fileUrl)
		// Use anchor tag to trigger file download
		const link = document.createElement('a');
		link.href = fileUrl;
		link.download = filename;
		link.click();
	};

  return (
	<div className='maindiv sm:w-1/2 lg:w-3/4 md:w-full '>
    <div className="materialcard">
        <div className="text">
            <span>{ material_name }</span>
        </div>
        <div className="icons w-full">
            <a className="btn w-full" onClick={handleDownload}>
                <svg y="0" xmlns="http://www.w3.org/2000/svg" x="0" width="100" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" height="100" className="svg-icon">
                    <path strokeWidth="8" strokeLinejoin="round" strokeLinecap="round" fill="none" d="M31.8,64.5a14.5,14.5,0,0,1-3.2-28.7,17.5,17.5,0,0,1-.4-4,18.2,18.2,0,0,1,36-3.6h.3a18.2,18.2,0,0,1,3.7,36M39.1,75.4,50,86.3m0,0L60.9,75.4M50,86.3V42.7">
                    </path>
                </svg>
            </a>
        </div>
    </div>
</div>
  );
}

export default StudyMaterialCard;