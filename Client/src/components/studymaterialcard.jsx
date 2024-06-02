import React from 'react';
import '../styles/studymaterialcard.css';

const StudyMaterialCard = () => {
  return (
	<div class="materialcard">
		<div class="text">
			<span>Lorem ipsum dolor sit amet</span>
			<p class="subtitle">Vivamus nisi purus</p>
		</div>
		<div class="icons">
			<a class="btn" href="#">
				<svg y="0" xmlns="http://www.w3.org/2000/svg" x="0" width="100" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" height="100" class="svg-icon">
					<path stroke-width="8" stroke-linejoin="round" stroke-linecap="round" fill="none" d="M31.8,64.5a14.5,14.5,0,0,1-3.2-28.7,17.5,17.5,0,0,1-.4-4,18.2,18.2,0,0,1,36-3.6h.3a18.2,18.2,0,0,1,3.7,36M39.1,75.4,50,86.3m0,0L60.9,75.4M50,86.3V42.7">
					</path>
				</svg>
			</a>
		</div>
	</div>
  );
}

export default StudyMaterialCard;