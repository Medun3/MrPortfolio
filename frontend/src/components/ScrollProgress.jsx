import { motion, useScroll } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{
        scaleX: scrollYProgress,
        transformOrigin: "0%",
      }}
      className="fixed top-0 left-0 right-0 h-1 bg-black z-[9999]"
    />
  );
};

export default ScrollProgress;