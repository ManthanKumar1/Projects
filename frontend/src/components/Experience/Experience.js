import React from "react";
import "./Experience.css";
import Particle from "../Particle";
import { FaBriefcase } from "react-icons/fa";

const experienceData = [
    {
        title: "Node.js Developer",
        company: "Global Infotech Pvt. Ltd.",
        duration: "Jan 2023 – Present",
        details: [
            "Developed RESTful APIs using Node.js and Express",
            "Managed MySQL and MongoDB databases",
            "Deployed services on AWS with proper CI/CD integration",
            "Led backend architecture design for scalable systems"
        ],
    },
    {
        title: "Backend Developer",
        company: "Beta IT Technology",
        duration: "Aug 2021 – Dec 2022",
        details: [
            "Built and maintained backend services using Node.js",
            "Worked closely with frontend teams to deliver full-stack features",
            "Integrated third-party APIs and payment gateways",
            "Optimized performance of legacy systems"
        ],
    },
    {
        title: "Backend Developer",
        company: "Z to A IT Solutions",
        duration: "May 2020 – July 2021",
        details: [
            "Designed backend for web applications with secure authentication",
            "Developed CRUD operations and data modeling in MongoDB",
            "Participated in daily Agile standups and sprint planning",
            "Wrote unit tests and documentation for maintainable code"
        ],
    },
    {
        title: "Node.js Developer Intern",
        company: "S.R. Web Solutions Pvt. Ltd.",
        duration: "Dec 2019 – Mar 2020",
        details: [
            "Assisted in building backend services using Node.js and Express.js",
            "Created and optimized APIs for data retrieval and manipulation",
            "Worked with MySQL to manage relational data and improve query performance",
            "Participated in team code reviews and agile sprint planning"
        ],
    },
    {
        title: "Java Developer Intern",
        company: "APS Mind Pvt. Ltd.",
        duration: "May 2019 – July 2019",
        details: [
            "Built and maintained backend modules using Java",
            "Developed a College Management System to handle student and teacher records",
            "Integrated MySQL database for efficient data storage and retrieval",
            "Created user-friendly forms for admin to enter and manage academic data",
        ],
    },
];

function Experience() {
    return (
        <div className="experience-container">
            <Particle />
            <h1 className="experience-title"><u><b>Professional Experience</b></u></h1>
            <h5>Roles and responsibilities throughout my professional journey in software development.</h5>
            <br />
            <div className="experience-grid">
                {experienceData.map((exp, index) => (
                    <div key={index} className="experience-card">
                        <div className="experience-icon">
                            <FaBriefcase size={30} color="#6c63ff" />
                        </div>
                        <h2>{exp.title}</h2>
                        <h3>{exp.company}</h3>
                        <p className="experience-duration">{exp.duration}</p>
                        <ul>
                            {exp.details.map((detail, i) => (
                                <li key={i}>{detail}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Experience;
