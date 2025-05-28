import "./Resume.css"; // Or the path where your CSS is stored
import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Particle from "../Particle";
import pdf from "../../Assets/../Assets/CV.pdf";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ResumeNew() {
  const [width, setWidth] = useState(1200);
  const [numPages, setNumPages] = useState(null);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // return (
  //   <div>
  //     <Container fluid className="resume-section">
  //       <Particle />

  //       <Row style={{ justifyContent: "center", position: "relative" }}>
  //         <Button
  //           variant="primary"
  //           href={pdf}
  //           target="_blank"
  //           style={{ maxWidth: "250px" }}
  //         >
  //           <AiOutlineDownload />
  //           &nbsp;Download CV
  //         </Button>
  //       </Row>

  //       {/* <Row className="resume">
  //         <Document
  //           file={pdf}
  //           onLoadSuccess={onDocumentLoadSuccess}
  //           className="d-flex flex-column align-items-center"
  //         >
  //           {Array.from(new Array(numPages), (el, index) => (
  //             <Page
  //               key={`page_${index + 1}`}
  //               pageNumber={index + 1}
  //               scale={width > 786 ? 1.7 : 0.6}
  //               className="resume-page" // 👈 add this class
  //             />
  //           ))}
  //         </Document>
  //       </Row> */}
  //     </Container>
  //   </div>
  // );
  return (
    <div>
      <Container fluid className="resume-section">
        <Particle />

        <Container className="resume-content">
          <h1 className="resume-heading">
            <b>
              My <strong className="purple">Resume</strong>
            </b>
          </h1>
          <p className="resume-subheading">
            Download my resume to explore my experience, skills, and professional background.
          </p>

          <div className="resume-download-wrapper">
            <Button variant="primary" href={pdf} target="_blank" size="lg">
              <AiOutlineDownload />
              &nbsp;Download CV
            </Button>
          </div>
        </Container>
      </Container>
    </div>
  );
}

export default ResumeNew;
