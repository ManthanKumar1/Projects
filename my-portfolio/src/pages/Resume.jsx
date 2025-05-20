import React from "react";

const Resume = () => {
  const resumeUrl = "/resume/Manthan_CV.pdf";

  return (
    <section className="text-center mt-10">
      <h2 className="text-2xl font-semibold mb-4">Resume</h2>
      <a href={resumeUrl} download className="text-blue-600 underline hover:text-blue-800">
        Download My Resume
      </a>
      <div className="mt-6">
        <iframe
          src={resumeUrl}
          width="100%"
          height="600px"
          title="Resume Preview"
          className="border shadow-lg"
        ></iframe>
      </div>
    </section>
  );
};

export default Resume;
