import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I’m <span className="purple">Manthan Kumar </span>
            from <span className="purple"> New Delhi, India. </span>
            I'm currently learning UI Design and Web development.
            <br />
            <br />
            I have completed my Bachelor's Degree in Computer Applications from Guru Gobind Singh Indraprastha University, New Delhi.
            <br />
            <br />
            My journey in programming began with an interest in solving complex problems. This led me to explore various programming languages and technologies, with a focus on web development.
            <br />
            <br />
            I'm passionate about building web applications and software that is not only functional but also intuitive and user-friendly. I believe in continuous learning and staying updated with the latest technologies.
            <br />
            <br />
            When I'm not coding, I enjoy exploring new technologies, contributing to open-source projects and playing video games.
          </p>
          {/* <ul>
            <li className="about-activity">
              <ImPointRight /> Playing Games
            </li>
            <li className="about-activity">
              <ImPointRight /> Watching Movie
            </li>
            <li className="about-activity">
              <ImPointRight /> Reading Self-Help Books
            </li>
          </ul> */}

          {/* <p style={{ color: "rgb(155 126 172)" }}>
            "Strive for progress, not perfection."{" "}
          </p>
          <footer className="blockquote-footer">ChatGPT</footer> */}
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
