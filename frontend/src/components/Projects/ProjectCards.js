import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";

function ProjectCards({ imgPath, isBlog, title, description }) {
  return (
    <Card className="project-card-view">
      <Card.Img variant="top" src={imgPath} alt="project-img" />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <br />
        {Array.isArray(description) ? (
          <ul style={{ paddingLeft: "20px" }}>
            {description.map((point, idx) => (
              <li key={idx} style={{ marginBottom: "6px", textAlign: "left" }}>{point}</li>
            ))}
          </ul>
        ) : (
          <Card.Text style={{ textAlign: "left" }}>{description}</Card.Text>
        )}
      </Card.Body>
    </Card>
  );
}

// function ProjectCards(props) {
//   return (
//     <Card className="project-card-view">
//       <Card.Img variant="top" src={props.imgPath} alt="project thumbnail" />
//       <Card.Body>
//         <Card.Title><b>{props.title}</b></Card.Title>
//         <br />
//         <Card.Text style={{ textAlign: "justify", whiteSpace: "pre-line" }}>
//           {props.description}
//         </Card.Text>

//         {/* GitHub Link - Uncomment if needed */}
//         {/* {props.ghLink && (
//           <Button variant="primary" href={props.ghLink} target="_blank">
//             <BsGithub /> &nbsp; {props.isBlog ? "Blog" : "GitHub"}
//           </Button>
//         )} */}

//         {/* Demo Link */}
//         {!props.isBlog && props.demoLink && (
//           <Button
//             variant="primary"
//             href={props.demoLink}
//             target="_blank"
//             style={{ marginLeft: "10px" }}
//           >
//             <CgWebsite /> &nbsp; Demo
//           </Button>
//         )}
//       </Card.Body>
//     </Card>
//   );
// }

export default ProjectCards;
