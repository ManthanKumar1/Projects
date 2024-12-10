import React from "react";
import "./AppDesign.css"; // Add styles in a separate CSS file for customization
// Add styles in a separate CSS file for customization
import FirstImage from "../assests/cab1.png";
import Second from "../assests/cab2.png";
import Third from "../assests/cab3.png";
import Fourth from "../assests/cab4.png";

const UserInterface = () => {
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
  ];

  return (
    <div className="portfolio-container-Two">
      <h1 className="portfolio-title">User interface Design ( Desktop)</h1>
      <div className="portfolio-User-grid">
        {designs.map((design, index) => (
          <div key={index} className="portfolio-App-item">
            <img
              src={design?.imageUrl}
              alt={design.title}
              className="portfolio-App-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserInterface;
