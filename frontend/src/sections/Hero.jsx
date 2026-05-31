import hero from "../assets/bg1.jpeg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section id="hero" className="relative h-screen overflow-hidden">

      {/* Background Image */}
      <img
        src={hero}
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-center h-full px-6 md:px-16 text-white max-w-5xl">

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="tracking-[6px] uppercase text-sm md:text-base text-yellow-500"
        >
          Full Stack Developer • MERN Stack • Problem Solver
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-8xl font-bold my-5 leading-tight"
        >
          MEDUNRAJ
        </motion.h1>

        {/* Role */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1 }}
          className="text-xl md:text-3xl font-medium text-gray-200 mb-5"
        >
          Junior Software Engineer & MERN Stack Developer
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-base md:text-xl text-gray-300 leading-relaxed max-w-3xl"
        >
          Passionate about building modern, responsive, and scalable web
          applications. I specialize in React.js, Node.js, Express.js, and
          MongoDB, transforming ideas into powerful digital solutions with
          clean code and exceptional user experiences.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
          className="flex flex-wrap gap-4 mt-10"
        >
          <Link to="/explore">
            <button className="px-8 py-3 rounded-full bg-yellow-500 text-black font-semibold hover:scale-105 transition duration-300">
              Explore More
            </button>
          </Link>

          <Link to="/contact">
            <button className="px-8 py-3 rounded-full border border-white hover:bg-white hover:text-black transition duration-300">
              Contact Me
            </button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;