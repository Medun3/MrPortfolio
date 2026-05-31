import SectionDots from "../components/SectionDots"
import Footer from "../components/Footer"

import Hero from "../sections/Hero"
import About from "../sections/About"
import Work from "../sections/Work"
import Services from "../sections/Services"
import Blog from "../sections/Blog"
import Contact from "../sections/Contact"

const Home = () => {
  return (
    <>
      <SectionDots />

      <Hero />
      <About />
      <Work />
      <Services />
      <Blog />
      <Contact />

      <Footer />
    </>
  )
}

export default Home
