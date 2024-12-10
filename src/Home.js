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
          <h1 className="heading">WELCOME TO MY </h1>
          <h1 className="heading-two">PORTFOLIO</h1>
        </div>

        <div className="home-container-two">
          <div className="bio">
            <h2 className="sub-heading">About Me</h2>
            <div>
              <p>
                {" "}
                I am <b>Sejal Jain</b>, a passionate and driven designer with a
                strong foundation in Graphic Designing, User Interface and 2D
                Animation.{" "}
              </p>
              <p>
                I specialize in creating impactful designs that blend creativity
                and functionality. My work spans a variety of mediums, including
                branding, digital illustration, and user interface design,
                allowing me to bring a fresh and versatile approach to each
                project.
              </p>
              <p>
                Please explore my portfolio for a glimpse into my process, from
                conceptual sketches to final implementations. Each project
                reflects my commitment to quality, attention to detail, and a
                constant drive for innovation.
              </p>
            </div>
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
