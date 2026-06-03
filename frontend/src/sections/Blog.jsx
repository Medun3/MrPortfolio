import { useState } from "react";
import { motion } from "framer-motion";
import {
  PenLine,
  Sparkles,
  Music4,
  Code2,
  Coffee,
  Laptop2,
  ArrowUpRight,
} from "lucide-react";

const blogs = [
  {
    icon: <PenLine size={32} />,
    title: "Building Things From Scratch",
    description:
      "I enjoy turning ideas into real projects — starting from blank screens and ending with something useful.",
    content:
      "In every project I start from the core idea: what problem am I solving, who will use it, and how can it stay simple. I prototype early, build iteratively, and keep the user experience smooth.",
    date: "May 2026",
  },
  {
    icon: <Sparkles size={32} />,
    title: "Minimal Design Thinking",
    description:
      "Less noise, more clarity. I focus on clean UI, spacing, and simple user experience.",
    content:
      "Minimal design is not about removing features — it is about removing distractions. I craft interfaces that feel calm, readable, and easy to navigate.",
    date: "April 2026",
  },
  {
    icon: <Music4 size={32} />,
    title: "Focus & Flow State",
    description:
      "Coding with music helps me stay in flow — where time disappears and ideas come alive.",
    content:
      "I use playlists, structure, and focused sprints to stay productive. When I find the right rhythm, complex bugs and creative design choices become easier to solve.",
    date: "March 2026",
  },

  // ➕ New Blogs
  {
    icon: <Code2 size={32} />,
    title: "MERN Stack Journey",
    description:
      "My experience learning and building full-stack applications using MongoDB, Express, React, and Node.",
    content:
      "I built real applications by combining MongoDB for data, Express and Node for backend APIs, and React for smooth frontend experiences. This journey taught me how to connect services reliably and ship full web products.",
    date: "Feb 2026",
  },
  {
    icon: <Coffee size={32} />,
    title: "Late Night Debugging",
    description:
      "Most bugs look scary in the night but become simple solutions in the morning.",
    date: "Jan 2026",
  },
  {
    icon: <Laptop2 size={32} />,
    title: "From Ideas to Deployment",
    description:
      "How I take a project from concept, design, development, and finally deploy it live.",
    content:
      "From wireframes to code, I keep every step focused on usability and performance. After development, I deploy with confidence, monitor results, and iterate based on feedback.",
    date: "Dec 2025",
  },
];

const Blog = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="blog" className="relative bg-black text-white py-24 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full blur-[130px] opacity-20" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-pink-600 rounded-full blur-[130px] opacity-20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5">


        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-14"
        >
          Creative Notes
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">

          {blogs.map((blog, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="
                relative
                rounded-3xl
                p-8
                border border-white/10
                bg-white/5
                backdrop-blur-xl
                shadow-lg
                overflow-hidden
                transition-all duration-300
                hover:border-white/20
                h-full
              "
            >
              {/* Glass Shine */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-40" />

              <div className="relative z-10 flex h-full flex-col">

                {/* Icon */}
                <div className="text-white/80 mb-4">
                  {blog.icon}
                </div>

                {/* Date */}
                <p className="text-xs text-gray-400 mb-3">
                  {blog.date}
                </p>

                {/* Title */}
                <h3 className="text-xl font-semibold mb-4">
                  {blog.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 text-sm leading-6 mb-4">
                  {blog.description}
                </p>

                {expandedIndex === index && (
                  <p className="text-gray-200 text-sm leading-6 mb-4">
                    {blog.content}
                  </p>
                )}

                <div className="mt-auto">
                  <button
                    type="button"
                    onClick={() => handleToggle(index)}
                    className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition"
                  >
                    {expandedIndex === index ? "Show Less" : "Read More"}
                    <ArrowUpRight size={16} />
                  </button>
                </div>

              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Blog;
