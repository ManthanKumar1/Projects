import React from "react";
import "./AppDesign.css"; // Add styles in a separate CSS file for customization
import FirstImage from "../assests/intro1.png";
import Second from "../assests/intro2.png";
import Third from "../assests/intro3.png";
import Fourth from "../assests/intro4.png";
import Five from "../assests/intro5.png";
import Six from "../assests/intro6.png";

const AppDesign = () => {
  const designs = [
    { imageUrl: FirstImage },
    { imageUrl: Second },
    { imageUrl: Third },
    { imageUrl: Fourth },
    { imageUrl: Five },
    { imageUrl: Six },
  ];

  return (
    <div className="portfolio-App">
      <div className="portfolio-App-grid">
        {designs.map((design, index) => (
          <div key={index} className="portfolio-App-item">
            <img
              src={design.imageUrl}
              alt={`Design ${index + 1}`}
              className="portfolio-App-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppDesign;
