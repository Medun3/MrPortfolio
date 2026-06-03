import { useState } from "react";

import recipe1 from "../assets/recipe1.jpeg";
import recipe2 from "../assets/recipe2.jpeg";
import recipe3 from "../assets/recipe3.jpeg";
import recipe4 from "../assets/recipe4.jpg";
import recipe5 from "../assets/recipe5.jpg";
import recipe6 from "../assets/recipe6.jpg";
import recipe7 from "../assets/recipe7.jpg";
import recipe8 from "../assets/recipe8.jpg";

import ecom1 from "../assets/ecom1.jpg";
import ecom2 from "../assets/ecom2.jpg";
import ecom3 from "../assets/ecom3.jpeg";
import ecom4 from "../assets/ecom4.png";
import ecom5 from "../assets/ecom5.png";
import ecom6 from "../assets/ecom6.png";
import ecom7 from "../assets/ecom7.png";
import ecom8 from "../assets/ecom8.png";

import mobile1 from "../assets/mobile1.jpeg";
import mobile2 from "../assets/mobile2.jpeg";
import mobile3 from "../assets/mobile3.jpeg";
import mobile4 from "../assets/mobile4.jpeg";
import mobile5 from "../assets/mobile5.jpeg";
import mobile6 from "../assets/mobile6.jpeg";

import animal1 from "../assets/animal1.jpg";
import animal2 from "../assets/animal2.jpg";
import animal3 from "../assets/animal3.jpg";


import book1 from "../assets/book1.jpg";
import book2 from "../assets/book2.jpg";
import book3 from "../assets/book3.jpg";
import book4 from "../assets/book4.jpg";
import book5 from "../assets/book5.jpg";

import pf1 from "../assets/pf1.png";
import pf2 from "../assets/pf2.jpg";
import pf3 from "../assets/pf3.jpg";
import pf4 from "../assets/pf4.png";
import pf5 from "../assets/pf5.png";
import pf6 from "../assets/pf6.png";
import pf7 from "../assets/pf7.png";
import pf8 from "../assets/pf8.jpg";

import work from "../assets/work.png";
const projects = [
  {
    img: recipe2,
    gallery: [recipe1, recipe3, recipe4, recipe5, recipe6, recipe7, recipe8],
    title: "Recipe Management System",
    role: "Full Stack Developer (MERN)",
    description:
      "Full-stack recipe management app with authentication, CRUD operations, image upload, search, and favorites system for users.",
    tech: ["React.js", "Bootstrap", "Node.js", "Express.js", "MongoDB", "JWT"],
  },
 
  {
    img: animal1,
    gallery: [animal1, animal2, animal3],
    title: "Portfolio Website",
    role: "Full Stack Developer (MERN)",
    description:
      "Designed and developed a personal portfolio website to showcase projects, skills, and experience as a Full Stack Developer.",
    tech: ["Html", "Css", "Javascript"],
  },

  {
    img: book1,
    gallery: [book1, book2, book3, book4, book5],
    title: "Portfolio Website",
    role: "Full Stack Developer (MERN)",
    description:
      "Designed and developed a personal portfolio website to showcase projects, skills, and experience as a Full Stack Developer.",
    tech: ["Html", "Bootstrap", "Javascript"],  
  },
  
   {
    img: ecom2,
    title: "E-Commerce Website",
    gallery: [ecom1, ecom2, ecom3, ecom4, ecom5, ecom6, ecom7, ecom8],
    role: "Frontend + Backend Developer",
    description:
      "Developed a full-stack e-commerce platform with product listings, cart management, user authentication, and secure checkout features.",
    tech: ["React.js", "Tailwind CSS", "Node.js", "REST API"],
  },
  {
    img: pf1,
    gallery: [pf1, pf2, pf3, pf4, pf5, pf6, pf7, pf8],
    title: "Portfolio Website",
    role: "Full Stack Developer (MERN)",
    description:
      "Designed and developed a personal portfolio website to showcase projects, skills, and experience as a Full Stack Developer.",
   tech: ["React.js", "Tailwind CSS", "Node.js", "REST API"],
  },
  {
    img: mobile1,
    gallery: [mobile1, mobile2, mobile3, mobile4, mobile5, mobile6],
    title: "React Native Mobile Apps",
    role: "Mobile App Developer",
    description:
      "Created cross-platform mobile apps for e-commerce and health access systems with smooth UI/UX.",
    tech: ["React Native", "JavaScript", "API Integration"],
  },
];

const Work = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const handleOpen = (gallery) => {
    setSelectedImages(gallery);
    setIsGalleryOpen(true);
  };

  const handleClose = () => {
    setIsGalleryOpen(false);
    setSelectedImages([]);
  };
  
 
  const [zoomIndex, setZoomIndex] = useState(null);

const handleImageZoom = (index) => {
  setZoomIndex(index);
};

const closeZoom = () => {
  setZoomIndex(null);
};

const nextImage = () => {
  setZoomIndex((prev) =>
    prev === selectedImages.length - 1 ? 0 : prev + 1
  );
};

const prevImage = () => {
  setZoomIndex((prev) =>
    prev === 0 ? selectedImages.length - 1 : prev - 1
  );
};
  return (
    <section id="work" className="bg-black text-white py-24">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className="text-5xl font-bold mb-4">MY WORK</h2>

        <p className="text-gray-400 mb-12 max-w-2xl">
          A showcase of real-world projects I have built as a Full Stack
          Developer using MERN stack and React Native, focusing on performance,
          scalability, and user experience.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <article
              key={`${project.title}-${index}`}
              className="bg-[#111] rounded-xl overflow-hidden hover:scale-[1.03] transition duration-500"
            >
              <button
                type="button"
                onClick={() => handleOpen(project.gallery || [project.img])}
                className="block w-full"
                aria-label={`Open ${project.title} gallery`}
              >
                <img
                  src={project.img}
                  alt={project.title}
                  className="h-[320px] w-full object-fill rounded-t-xl"
                />
              </button>

              <div className="p-5">
                <h3 className="text-xl font-bold mb-1">{project.title}</h3>

                <p className="text-sm text-gray-400 mb-2">{project.role}</p>

                <p className="text-gray-300 text-sm mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, tIndex) => (
                    <span
                      key={`${tech}-${tIndex}`}
                      className="text-xs bg-white text-black px-2 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

{
  isGalleryOpen && (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 px-4 py-6">
      <div className="relative bg-[#111] p-4 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close gallery"
          className="absolute top-2 right-3 text-white text-2xl"
        >
          ×
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-8 max-h-[72vh] overflow-y-auto pr-1">
          {selectedImages.map((img, index) => (
            <img
              key={`${img}-${index}`}
              src={img}
              alt="Project gallery"
              onClick={() => handleImageZoom(index)}
              className="w-full h-[180px] sm:h-[200px] object-cover rounded-lg cursor-pointer hover:scale-105 transition duration-300"
            />
          ))}
        </div>
      </div>

      {/* Zoom View */}
      {zoomIndex !== null && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[60] p-4">
          
          {/* Close Button */}
          <button
            onClick={closeZoom}
            className="absolute top-4 right-4 text-white text-4xl"
          >
            ×
          </button>

          {/* Previous Button */}
          <button
            onClick={prevImage}
            className="absolute left-4 text-white text-5xl bg-black/40 px-4 py-2 rounded-full hover:bg-black/70 transition"
          >
            ❮
          </button>

          {/* Zoomed Image */}
          <img
            src={selectedImages[zoomIndex]}
            alt="Zoomed"
            className="max-w-full max-h-[80vh] object-contain rounded-lg"
          />

          {/* Next Button */}
          <button
            onClick={nextImage}
            className="absolute right-4 text-white text-5xl bg-black/40 px-4 py-2 rounded-full hover:bg-black/70 transition"
          >
            ❯
          </button>
        </div>
      )}
    </div>
  )
}

    </section>
  );
};

export default Work;
