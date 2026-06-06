import { useState } from "react";
import { contactUrl } from "../config/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus("Please fill all fields");
      return;
    }

    try {
      setIsSending(true);
      setStatus("Sending message...");

      console.log("Sending to:", contactUrl);

      const response = await fetch(contactUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      console.log("Response status:", response.status);
      console.log("Response data:", data);

      if (!response.ok) {
        throw new Error(data.message || "Unable to send message.");
      }

      setStatus("Message sent successfully. Please check your email for confirmation.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus(error.message || "Unable to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="bg-gray-100 py-24">
      <div className="max-w-7xl mx-auto px-5">


        <h2 className="text-5xl font-bold mb-10">CONTACT</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

          {/* LEFT INFO */}
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-semibold mb-4">
              Let’s Work Together 🚀
            </h3>

            <p className="text-gray-700 mb-6">
              I am a passionate Full Stack Developer (MERN) specializing in
              building responsive, scalable, and user-friendly web applications.
              I enjoy turning ideas into real-world digital products.
            </p>

            <div className="space-y-3 text-gray-800">

              <p>
                📧 Email:{" "}
                <a
                  href="mailto:medunraj3@gmail.com"
                  className="font-medium underline hover:text-black"
                >
                  medunraj3@gmail.com
                </a>
              </p>

              <p>
                📱 Phone:{" "}
                <a
                  href="tel:+918124089016"
                  className="font-medium underline hover:text-black"
                >
                  +91 81240 89016
                </a>
              </p>

              <p>📍 Location: Puducherry, India</p>

              <p>💼 Role: Junior Software Engineer</p>

              <p>⚡ Availability: Open to Freelance & Full-time Opportunities</p>

            </div>

            {/* SOCIAL LINKS */}
            <div className="mt-6 space-y-2">
              <p>
                🔗 LinkedIn:{" "}
                <a
                  href="https://linkedin.com/in/medunraj3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" underline"
                >
                  linkedin.com/in/medunraj3
                </a>
              </p>

              <p>
                💻 GitHub:{" "}
                <a
                  href="https://github.com/Medun3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black underline"
                >
                  https://github.com/Medun3
                </a>
              </p>
{/* 
              <p>
                🌐 Portfolio:{" "}
                <span className="text-gray-600">your-portfolio.com</span>
              </p> */}
            </div>

            <p className="mt-6 text-gray-600 text-sm">
              I usually respond within 24 hours. Feel free to reach out for
              collaboration, projects, or job opportunities.
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="order-1 md:order-2 bg-white/60 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl p-6 sm:p-8 space-y-4 sm:space-y-5"
          >

            <h3 className="text-lg sm:text-xl font-semibold mb-4">
              Send a Message ✉️
            </h3>

            {/* NAME */}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 sm:p-4 text-base rounded-xl border border-gray-300 focus:border-black focus:ring-2 focus:ring-black outline-none transition"
            />

            {/* EMAIL */}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-3 sm:p-4 text-base rounded-xl border border-gray-300 focus:border-black focus:ring-2 focus:ring-black outline-none transition"
            />

            {/* MESSAGE */}
            <textarea
              rows="5"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message..."
              className="w-full p-3 sm:p-4 text-base rounded-xl border border-gray-300 focus:border-black focus:ring-2 focus:ring-black outline-none transition resize-none"
            />

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isSending}
              className="w-full bg-black text-white py-3 sm:py-4 px-4 text-base sm:text-lg rounded-xl font-semibold hover:bg-gray-800 active:scale-95 transition duration-300 disabled:opacity-70"
            >
              {isSending ? "Sending..." : "Send Message 🚀"}
            </button>

            {/* STATUS */}
            {status && (
              <p className="text-xs sm:text-sm text-gray-600 text-center break-words">
                {status}
              </p>
            )}

          </form>

        </div>
      </div>
    </section>
  );
};

export default Contact;
