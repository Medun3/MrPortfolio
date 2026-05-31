import { useEffect } from "react"
import { motion } from "framer-motion"
import logo from "../assets/fulllogo.png"

const Loader = ({ onFinish }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 4, duration: 1 }}
      onAnimationComplete={onFinish}
      className="fixed inset-0 bg-black flex flex-col justify-center items-center z-[100] overflow-hidden"
    >
      <motion.img
        src={logo}
        alt="logo"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full max-w-[720px] px-6 object-contain"
      />

      <div className="absolute bottom-10 w-full overflow-hidden">
        <motion.div
          animate={{ x: ["100%", "-100%"] }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "linear",
          }}
   className="whitespace-nowrap bg-gradient-to-r from-[#A67C00] via-[#FFD700] to-[#B8860B] bg-clip-text text-transparent text-xl md:text-3xl font-light tracking-[8px]"     className="
    whitespace-nowrap
    text-xl md:text-3xl
    font-light
    tracking-[8px]
    bg-[linear-gradient(180deg,#f8e7c1_0%,#e6c56a_25%,#d4af37_50%,#b8860b_75%,#7a5c12_100%)]
    bg-clip-text
    text-transparent
  " >
          - Junior Software Engineer -
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Loader
