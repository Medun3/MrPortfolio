import { motion } from "framer-motion";
import {
  Code2,
  Smartphone,
  Database,
  Palette,
  ShieldCheck,
  Bug,
} from "lucide-react";

const services = [
  {
    icon: <Code2 size={40} />,
    title: "Frontend Development",
    description:
      "Responsive and modern web applications using React.js, Tailwind CSS, and JavaScript.",
  },
  {
    icon: <Database size={40} />,
    title: "Backend Development",
    description:
      "Secure backend APIs and database integration using Node.js, Express.js, and MongoDB.",
  },
  {
    icon: <Smartphone size={40} />,
    title: "Mobile App Development",
    description:
      "Cross-platform mobile applications with clean UI and smooth user experience.",
  },
  {
    icon: <Palette size={40} />,
    title: "UI/UX Design",
    description:
      "Creative and user-friendly interface designs focused on modern trends and usability.",
  },
  {
    icon: <Bug size={40} />,
    title: "Testing & Debugging",
    description:
      "Finding and fixing bugs, improving website performance, and ensuring smooth functionality.",
  },
  {
    icon: <ShieldCheck size={40} />,
    title: "Website Maintenance",
    description:
      "Maintaining websites, updating features, and optimizing security and performance.",
  },
];

const Services = () => {
  return (
    <section
      id="services"
      className="bg-white text-white py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 pb-16">


        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-bold mb-16 text-black"
        >
          SERVICES
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">

          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              className="
                relative
                bg-[#181818]
                border border-gray-800
                rounded-3xl
                p-10
                overflow-hidden
                group
                transition-all
                duration-500
                hover:border-red-500
                hover:shadow-[0_0_30px_rgba(239,68,68,0.25)]
              "
            >

              {/* Glow Effect */}
              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-br
                  from-red-500/10
                  to-transparent
                  opacity-0
                  group-hover:opacity-100
                  transition duration-500
                "
              />

              {/* Icon */}
              <div
                className="
                  mb-6
                  text-red-500
                  group-hover:scale-110
                  transition duration-300
                "
              >
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-4">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 leading-7">
                {service.description}
              </p>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Services;