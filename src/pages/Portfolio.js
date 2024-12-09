import React from "react";
import "./Portfolio.css"; // Add styles in a separate CSS file for customization
import FirstImage from "../assests/first.png";
import Second from "../assests/second.png";
import Third from "../assests/third.png";
import Fourth from "../assests/fouth.png";
import Five from "../assests/five.png";
import Six from "../assests/six.png";
import Seven from "../assests/seven.png";

const Portfolio = () => {
  const designs = [
    {
      title: "Logo Design",
      description: "Software - Adobe Photoshop",
      imageUrl: FirstImage, // Replace with actual image path
    },
    {
      title: "3D Perspective Environment",
      description: "Software - Adobe Illustrator",
      imageUrl: Second, // Replace with actual image path
    },
    {
      title: "Digital Painting",
      description: "Software - Adobe Photoshop",
      imageUrl: Third, // Replace with actual image path
    },
    {
      title: "Vector Art",
      description: "Software - Adobe Illustrator",
      imageUrl: Fourth, // Replace with actual image path
    },
    {
      title: "Low Ploty art",
      description: "Software - Adobe Illustrator",
      imageUrl: Five, // Replace with actual image path
    },
    {
      title: "Advertisement Design",
      description: "Software - Adobe Illustrator",
      imageUrl: Six, // Replace with actual image path
    },
    {
      title: "Artwork",
      description: "Software - Adobe Illustrator",
      imageUrl: Seven, // Replace with actual image path
    },
  ];

  return (
    <div className="portfolio-container">
      <h1 className="portfolio-title">Graphic Designs</h1>
      <div className="portfolio-grid">
        {designs.map((design, index) => (
          <div key={index} className="portfolio-item">
            <img
              src={design?.imageUrl}
              alt={design.title}
              className="portfolio-image"
            />
            <h3 className="portfolio-item-title">{design.title}</h3>
            <p className="portfolio-item-description">{design.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
