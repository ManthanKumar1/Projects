import React from "react";
import "./Academics.css";
import Particle from "../Particle";
import { FaGraduationCap } from "react-icons/fa"
import MernCertificate from '../../Assets/Certificates/Mern.jpg'

const academicsData = [
  {
    title: "Bachelor's of Computer Applications",
    institution: "Guru Gobind Singh Indraprastha University, New Delhi",
    duration: "2017 - 2020",
    // cgpa: "In Progress",
    details: [
      "Focused on core Computer Science concepts and software development",
      "Specialized in Web Development and Backend Technologies",
      "Key courses: Data Structures, Database Management Systems, Web Technologies",
      "Built practical projects using Node.js and MySQL"
    ],
  },
  {
    title: "Senior Secondary Education",
    institution: "Central Board Of Secondary Education, New Delhi",
    duration: "2016 - 2017",
    // cgpa: "8.5",
    details: [
      "Accountancy, Business Studies, Economics, Information Practices, and Mathematics",
      "Senior Secondary Completion in Commerce Stream",
      "Focus on Financial Accounting, Business Laws, and Economic Principles"
    ],
  },
  {
    title: "Secondary Education",
    institution: "Central Board Of Secondary Education, New Delhi",
    duration: "2014 - 2015",
    // cgpa: "9.09",
    details: [
      "Curriculum based on NCERT guidelines",
      "Completed Secondary School Education",
      "Strong foundation in Mathematics, Science, Social Science, and English"
    ],
  },
];

let certificates = [
  {
    certificate: MernCertificate,
    title: "MERN Stack"
  },
]

function Academics() {
  return (
    <div className="academics-container">
      <Particle />
      <h1 className="academics-title"><b>My Academic Journey</b></h1>
      <h5>My academic journey, courses, and educational achievements that have shaped my technical expertise.</h5>
      <br />
      <br />
      <h1><b>Education</b></h1>
      <br />
      <div className="academics-grid">
        {academicsData.map((edu, index) => (
          <div key={index} className="academic-card">
            <div className="academic-icon">
              <FaGraduationCap size={30} color="#6c63ff" />
            </div>
            <h2>{edu.title}</h2>
            <h3>{edu.institution}</h3>
            <p className="academic-duration">{edu.duration}</p>
            {/* <p className="academic-cgpa">CGPA: {edu.cgpa}</p> */}
            <ul>
              {edu.details.map((detail, i) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <br />
      <br />
      <hr />

      <h1><b>Certificates</b></h1>
      <br />
      <div className="academics-grid">
        {certificates.map((edu, index) => (
          <div key={index} className="academic-card">
            <div className="academic-icon">
              <FaGraduationCap size={30} color="#6c63ff" />
            </div>
            <img
              src={edu.certificate}
              alt={`Certificate - ${edu.title}`}
              style={{ width: "100%", height: "auto", borderRadius: "8px", marginTop: "10px", objectFit: "cover" }}
            />
            <h2 style={{ marginTop: "12px", marginLeft: "25%" }}>{edu.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Academics;
