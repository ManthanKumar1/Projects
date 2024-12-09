import React from "react";
import "./ContactSection.css"; // Importing the CSS file

const ContactSection = () => {
  return (
    <div className="contact-section">
      <h3 className="contact-heading">Get in Touch With Us</h3>
      <p className="contact-email">
        <a href="mailto:jainsejal844@gmail.com">jainsejal844@gmail.com</a>
      </p>
      <p className="contact-phone">+91 7303625286</p>
      <div className="social-icons">
        <a href="#" className="social-link">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="#" className="social-link">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#" className="social-link">
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </div>
  );
};

export default ContactSection;
