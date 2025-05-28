import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";

import aviation from "../../Assets/Projects/Aviation Application.png";
import commercial from "../../Assets/Projects/Commercial Transaction.png";
import messaging from "../../Assets/Projects/Messaging Application.png";
import product from "../../Assets/Projects/Product Management.png";
import retail from "../../Assets/Projects/Retail Store Application.png";
import yoga from "../../Assets/Projects/Yoga Application.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          <b>
            My Recent <strong className="purple">Works</strong>
          </b>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>

        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {/* Aviation Application */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={aviation}
              isBlog={false}
              title="Aviation Application"
              description={["Developed backend services using Node.js and MongoDB to manage flight data, bookings, and real-time updates.",
                "Implemented RESTful APIs for flight scheduling, booking management, and real-time notifications.",
                "Utilized MongoDB for secure and scalable data storage.",
                "Deployed the application on AWS for high availability and scalability.",
                "Leveraged AWS services to secure aviation data and optimize performance."]}
            />
          </Col>

          {/* B2B Commercial Transaction */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={commercial}
              isBlog={false}
              title="Commercial Transaction (B2B)"
              description={["Built and deployed a B2B backend system using Node.js and MySQL.",
                "Leveraged AWS infrastructure for high performance.",
                "Created RESTful APIs for seamless data integration.",
                "Optimized client interaction through robust endpoints.",
                "Ensured scalability using AWS solutions."]}
            />
          </Col>

          {/* Yoga App */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={yoga}
              isBlog={false}
              title="Yoga Application"
              description={["Built backend services using Node.js and MySQL for managing user data, class schedules, and subscriptions.",
                "Created REST APIs for registration, login, and class booking.",
                "Deployed on AWS to ensure high availability.",
                "Monitored performance with AWS Cloud tools.",
                "Secured data with AWS storage services."]}
            />
          </Col>

          {/* Retail Store App */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={retail}
              isBlog={false}
              title="Retail Store Application"
              description={["Developed backend with Node.js and MySQL for managing products, inventory, and orders.",
                "Built APIs for product listings, orders, and customer accounts.",
                "Deployed the application on AWS for scalability.",
                "Integrated secure payment processing.",
                "Ensured robust data management using AWS services."]}
            />
          </Col>

          {/* Messaging App */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={messaging}
              isBlog={false}
              title="Messaging Application"
              description={["Developed a full-stack messaging platform using React, Node.js, and MySQL.",
                "Implemented authentication and role-based access control.",
                "Built APIs for messaging and user management.",
                "Deployed on AWS with secure data handling.",
                "Maintained high availability through AWS monitoring."]}
            />
          </Col>

          {/* Paddle Detection */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={product}
              isBlog={false}
              title="Product Management"
              description={["Developed a full-featured product management platform where users can both purchase and list products for sale.",
                "Enabled seamless user experiences including registration, login, product browsing, and managing orders, wishlists, and carts.",
                "Integrated a seller module allowing users to act as vendors, adding and managing their own products.",
                "Built secure and efficient backend services using Node.js and MongoDB to handle user data and transactions.",
                "Deployed the application on AWS to ensure scalability, high availability, and optimized system performance."]}
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
