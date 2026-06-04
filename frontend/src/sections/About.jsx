import { motion } from "framer-motion";
import { Download } from "lucide-react";
import about from "../assets/bg4.png";
import { resumeDownloadUrl } from "../config/api";

const skills = [
  "React.js",
  "React Native",
  "Node.js",
  "Express.js",
  "MongoDB",
  "JavaScript",
  "Tailwind CSS",
  "REST APIs",
  "Git & GitHub",
];

const highlights = [
  { value: "MERN", label: "Primary stack" },
  { value: "UI", label: "Interface focus" },
  { value: "API", label: "Backend ready" },
];

const About = () => {
  return (
    <section id="about" className="overflow-hidden bg-[#f5f2ed] py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -left-8 bottom-8 hidden h-full w-full border border-black/25  rounded-lg md:block" />

          <motion.img
            src={about}
            alt="Medunraj M"
            className="relative z-10 h-[380px] w-full rounded-lg object-cover shadow-2xl sm:h-[460px] md:h-[560px]"
            whileHover={{ scale: 1.015 }}
            transition={{ type: "spring", stiffness: 120 }}
          />

          <div className="relative z-20 -mt-14 ml-auto w-[88%] rounded-lg bg-black p-5 text-white shadow-xl sm:w-80">
            <p className="text-xs font-semibold uppercase tracking-[3px] text-white/60">
              Junior Software Engineer
            </p>
            <p className="mt-2 text-lg font-semibold leading-snug">
              Frontend and full-stack developer building clean digital products.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[4px] text-gray-500">
            About Me
          </p>

          <h2 className="mb-6 text-4xl font-bold leading-tight text-black sm:text-5xl lg:text-6xl">
            I build useful web experiences with sharp, simple interfaces.
          </h2>

          <div className="space-y-4 text-base leading-8 text-gray-700">
            <p>
              I am <b className="text-black">Medunraj M</b>, a Junior Software
              Engineer specializing in frontend and full-stack development. I
              build scalable web and mobile applications using the MERN stack
              and React Native.
            </p>

            <p>
              I develop e-commerce systems, POS platforms, OTT platforms, and
              commission management applications with focus on UI quality,
              performance, and clean architecture.
            </p>

            <p>
              I enjoy solving practical product problems and keep improving
              across full-stack development, mobile apps, and API integration.
            </p>
          </div>

          <div className="my-8 grid grid-cols-3 divide-x divide-black/10 border-y border-black/10 py-5">
            {highlights.map((item) => (
              <div key={item.label} className="px-3 first:pl-0 sm:px-5">
                <p className="text-2xl font-bold text-black sm:text-3xl">
                  {item.value}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[2px] text-gray-500">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="mb-4 text-xl font-semibold text-black">Skills</h3>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <motion.span
                  key={skill}
                  whileHover={{ y: -2 }}
                  className="rounded-md border border-black/10 bg-white px-4 py-2 text-sm font-medium text-black shadow-sm"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>

          <motion.a
            href={resumeDownloadUrl}
            download="MedunrajM-JSE.pdf"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-black px-7 py-3 font-semibold text-white transition hover:bg-gray-800"
          >
            <Download size={18} />
            Download Resume
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
