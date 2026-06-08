import logo from "../assets/logo.png";
import { TiArrowUp } from "react-icons/ti";
const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="max-w-7xl mx-auto px-5">

        {/* TOP */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          {/* LOGO + NAME */}
          <h2 className="text-lg font-bold flex items-center gap-2">
            <img src={logo} alt="Medunraj Logo" className="h-12 w-12" />
            Medunraj
          </h2>

          <p className="text-gray-400 text-sm text-center md:text-right">
            Full Stack Developer (MERN) • Building modern web experiences
          </p>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-800 my-6"></div>

        {/* MIDDLE */}
        <div className="text-center mb-6">
          <p className="text-gray-500 text-sm italic">
            Crafting clean, scalable and user-focused digital experiences.
          </p>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">

          <p>© 2026 Medunraj. All Rights Reserved.</p>

          <div className="flex items-center gap-4">
            <a
              href="#hero"
              className="hover:text-white transition duration-300 flex items-center gap-1"
            >
              Back to Top <TiArrowUp size={25}/>
            </a>
            <a
              href="https://github.com/Medun3"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition duration-300"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/medunraj3"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition duration-300"
            >
              LinkedIn
            </a>

          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;