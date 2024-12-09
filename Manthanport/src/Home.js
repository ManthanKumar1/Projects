import React from "react";
import "./Home.css"; // To add custom styling
import profileImage from "../src/assests/profile.png";
import ProjectHighlight from "./pages/ProjectHigh";
import Portfolio from "./pages/Portfolio";
import UIDesign from "./pages/UIDesign";
import AppSteps from "./pages/AppSteps";
import AppDesign from "./pages/AppDesign";
import UserInterface from "./pages/UserInterface";
import ContactSection from "./pages/ContactSection";

const Home = () => {
  return (
    <div className="app">
      <div className="home-container">
        <div className="content">
          <h1 className="heading">WELCOME TO MY PORTFOLIO</h1>
          <button className="explore-btn">EXPLORE WORKS</button>
        </div>

        <div className="home-container-two">
          <div className="bio">
            <h2 className="sub-heading">Let’s get know about me closer</h2>
            <p>
              Sejal Jain from India (New Delhi). With a strong foundation in
              design principles and a passion for crafting visual narratives, I
              specialize in creating impactful designs that blend creativity and
              functionality. My work spans a variety of mediums, including{" "}
              <b>branding, digital illustration, and user interface design</b>,
              allowing me to bring a fresh and versatile approach to each
              project. Along with that I have experience in{" "}
              <b>2D and 3D Animations</b>.
            </p>
            <p>
              Please explore my portfolio for a glimpse into my process, from
              conceptual sketches to final implementations. Each project
              reflects my commitment to quality, attention to detail, and a
              constant drive for innovation.
            </p>
          </div>
          <div className="image">
            <img src={profileImage} alt="Sejal Jain" />
          </div>
        </div>
      </div>
      <ProjectHighlight />
      <Portfolio />
      <UIDesign />
      <AppSteps />
      <AppDesign />
      <UserInterface />
      <ContactSection />
    </div>
  );
};

export default Home;
