import React from "react";
import "./Portfolio.css"; // Add styles in a separate CSS file for customization
import FirstImage from "../assests/intro1.png";
import Second from "../assests/intro2.png";
import Third from "../assests/intro3.png";
import Fourth from "../assests/intro4.png";
import Five from "../assests/intro5.png";
import Six from "../assests/intro6.png";

const AppDesign = () => {
  const designs = [
    {
      imageUrl: FirstImage, // Replace with actual image path
    },
    {
      imageUrl: Second, // Replace with actual image path
    },
    {
      imageUrl: Third, // Replace with actual image path
    },
    {
      imageUrl: Fourth, // Replace with actual image path
    },
    {
      imageUrl: Five, // Replace with actual image path
    },
    {
      imageUrl: Six, // Replace with actual image path
    },
  ];

  return (
    <div className="portfolio-container">
      <div className="portfolio-grid">
        {designs.map((design, index) => (
          <div key={index} className="portfolio-item">
            <img
              src={design?.imageUrl}
              alt={design.title}
              className="portfolio-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppDesign;
