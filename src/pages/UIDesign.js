import React from "react";
import "./UIDesign.css"; // Add styles in a separate CSS file
import ImageProfile from "../assests/laptopthree.png";
const UIDesign = () => {
  return (
    <div className="ui-design-container">
      <h1 className="ui-design-title">User Interface Design</h1>
      <div className="ui-design-content">
        <div className="ui-design-image">
          <img
            src={ImageProfile}
            alt="UI Design Preview"
            className="ui-design-preview"
          />
        </div>
        <div className="ui-design-text">
          <h2>AIM:</h2>
          <p>
            The aim of our new car parking app is to simplify urban parking by
            helping users locate available spots in real-time, reserve spaces in
            advance, and access seamless payment options. Designed to reduce
            parking stress and save time, it empowers drivers with a smarter,
            more convenient parking experience.
          </p>
          <h2>FEATURES:</h2>
          <ul>
            <li>Convenience and efficiency.</li>
            <li>
              Real-time parking space availability, secure digital payments.
            </li>
            <li>Personalized recommendations based on parking history.</li>
            <li>"Find My Car" GPS tracker for smoother navigation.</li>
            <li>Pre-booking options and loyalty rewards for frequent users.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UIDesign;
