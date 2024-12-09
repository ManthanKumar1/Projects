import React from "react";
import "./Projecthiglis.css";
import laptop from "../assests/laptop2.png";
const ProjectHighlight = () => {
  return (
    <section className="projects-section">
      <h2>My Projects Highlight</h2>
      <button className="explore-more-button">Explore More</button>
      <div className="project-card">
        <img src={laptop} alt="project" />
        <h3>3D Environment and Character</h3>
        <div className="projectbio">
          <p className="projectbio">
            Choosing a fantasy world 3D environment with a Chinese theme and
            featuring a turtle as a central character allows a visually
            captivating and culturally rich experience that resonates with
            audiences. Fantasy environments let me push the boundaries of
            creativity, blending real-world elements with imaginative, mystical
            features. A Chinese-inspired setting adds layers of symbolism and
            tradition, such as lush landscapes, pagodas, and ethereal water
            scenes, creating a sense of ancient beauty and spiritual depth.
            <b>2D and 3D Animations</b>.
          </p>
          <p>
            The turtle, a revered symbol in Chinese culture representing
            longevity, wisdom, and protection, fits seamlessly into this world.
            Portraying the turtle as a 3D character in water allows for dynamic
            movement, adding life and fluidity to the environment. Additionally,
            the water setting enhances the calm, meditative qualities often
            associated with Chinese landscapes. This combination of elements
            provides a unique storytelling opportunity, inviting viewers into a
            world of tranquility, wonder, and cultural reverence.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProjectHighlight;
