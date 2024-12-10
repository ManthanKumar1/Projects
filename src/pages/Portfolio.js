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
  const designTwo = [
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
  ];

  return (
    <div className="portfolio-container">
      <h1 className="portfolio-title">Graphic Designs</h1>
      <div className="portfolio-grid">
        <div className="portfolio-item">
          <img
            src={designs[0]?.imageUrl}
            alt={designs[0].title}
            className="portfolio-image"
          />
          <h3 className="portfolio-item-title">{designs[0].title}</h3>
          <p className="portfolio-item-description">{designs[0].description}</p>
        </div>
        <div className="portfolio-item-two">
          <img
            src={designs[2]?.imageUrl}
            alt={designs[0].title}
            className="portfolio-image"
          />
          <h3 className="portfolio-item-title">{designs[0].title}</h3>
          <p className="portfolio-item-description">{designs[0].description}</p>
        </div>
      </div>
      <div className="portfolio_grid">
        <div className="portfolio-item-three">
          <img
            src={designs[1]?.imageUrl}
            alt={designs[1].title}
            className="portfolio-image"
          />
          <h3 className="portfolio-item-title">{designs[1].title}</h3>
          <p className="portfolio-item-description">{designs[1].description}</p>
        </div>
      </div>

      <div className="portfolio_grid">
        <div className="portfolio-item-three">
          <img
            src={designs[3]?.imageUrl}
            alt={designs[3].title}
            className="portfolio-image"
          />
          <h3 className="portfolio-item-title">{designs[3].title}</h3>
          <p className="portfolio-item-description">{designs[3].description}</p>
        </div>
      </div>
      <div className="portfolio-Two">
        {designTwo.map((design, index) => (
          <div key={index} className="portfolio-item-four">
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
