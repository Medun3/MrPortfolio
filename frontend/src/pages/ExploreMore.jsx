import { Link } from "react-router-dom";
import explore1 from "../assets/explore1.png";
import explore2 from "../assets/explore2.png";
import explore3 from "../assets/explore3.png";
function ExploreMore() {
  return (
    <section className="min-h-screen bg-black text-white px-6 md:px-16 py-20">
      
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <p className="uppercase tracking-[6px] text-yellow-500 text-sm mb-4">
          Development • Innovation • Technology
        </p>

        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
          Explore More
        </h1>

        <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
          Explore my journey as a Full Stack MERN Developer. From building
          responsive user interfaces to developing scalable backend systems,
          I create modern web applications that solve real-world problems and
          deliver exceptional user experiences.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-6xl mx-auto">

        {/* Card 1 */}
        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:scale-105 duration-300 backdrop-blur-sm">
          <img
            src={explore1}
            alt="Full Stack Development"
            className="w-full h-72 object-left-top p-3 rounded-3xl"
          />

          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-3">
              Full Stack Development
            </h2>

            <p className="text-gray-400 leading-relaxed">
              Building powerful and scalable web applications using MongoDB,
              Express.js, React.js, and Node.js with modern development
              practices.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:scale-105 duration-300 backdrop-blur-sm">
          <img
            src={explore2}
            alt="UI UX Design"
            className="w-full h-72 object-left-top p-3 rounded-3xl"
          />

          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-3">
              UI/UX Design
            </h2>

            <p className="text-gray-400 leading-relaxed">
              Designing clean, responsive, and user-friendly interfaces that
              provide seamless experiences across desktop, tablet, and mobile
              devices.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:scale-105 duration-300 backdrop-blur-sm">
          <img
            src={explore3}
            alt="Project Solutions"
            className="w-full h-72 object-left-top p-3 rounded-3xl"
          />

          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-3">
              Project Solutions
            </h2>

            <p className="text-gray-400 leading-relaxed">
              Transforming ideas into real-world digital products through
              efficient coding, API integration, database management, and
              performance optimization.
            </p>
          </div>
        </div>

      </div>

      {/* Additional Highlights */}
      <div className="max-w-6xl mx-auto mt-24">
        <h2 className="text-4xl font-bold mb-10 text-center">
          What I Can Help You With
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-3">
              Frontend Development
            </h3>
            <p className="text-gray-400">
              React.js, JavaScript, Tailwind CSS, Responsive Design.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-3">
              Backend Development
            </h3>
            <p className="text-gray-400">
              Node.js, Express.js, REST APIs, Authentication & Security.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-3">
              Database Management
            </h3>
            <p className="text-gray-400">
              MongoDB integration, data modeling, and optimization.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-3">
              Portfolio & Business Sites
            </h3>
            <p className="text-gray-400">
              Professional websites for startups, businesses, and personal
              branding.
            </p>
          </div>

        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-24">
        <h3 className="text-3xl font-bold mb-4">
          Have a Project in Mind?
        </h3>

        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Whether you're looking for a developer to build a new product,
          improve an existing application, or collaborate on exciting ideas,
          I'm ready to help.
        </p>

        <Link to="/contact">
          <button className="px-10 py-4 rounded-full bg-yellow-500 text-black font-semibold hover:scale-105 duration-300">
            Contact Me
          </button>
        </Link>
      </div>

    </section>
  );
}

export default ExploreMore;