import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = (e) => {
  e.preventDefault();

  if (!formData.name.trim() || !formData.message.trim()) {
    setStatus("Please fill in your name and message.");
    return;
  }

  const phoneNumber = "918124089016";

  const whatsappMessage = `Hello Medunraj,

Name: ${formData.name}
Email: ${formData.email || "Not Provided"}

Message:
${formData.message}`;

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  const newWindow = window.open(whatsappUrl, "_blank");

  if (newWindow) {
    setStatus("WhatsApp opened successfully.");
  } else {
    setStatus("Popup blocked. Please allow popups and try again.");
  }

  setTimeout(() => {
    setStatus("");
  }, 3000);

  setFormData({
    name: "",
    email: "",
    message: "",
  });
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

              <p>
                ⚡ Availability: Open to Freelance & Full-time Opportunities
              </p>
            </div>

            {/* SOCIAL LINKS */}
            <div className="mt-6 space-y-2">
              <p>
                🔗 LinkedIn:{" "}
                <a
                  href="https://linkedin.com/in/medunraj3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
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
                  className="underline"
                >
                  github.com/Medun3
                </a>
              </p>

              <p>
                🌐 Portfolio:{" "}
                <a
                  href="https://medunraj-portfolio.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  medunraj-portfolio.vercel.app
                </a>
              </p>
            </div>

            <p className="mt-6 text-gray-600 text-sm">
              Feel free to contact me through WhatsApp, LinkedIn, or Email for
              projects, collaborations, and job opportunities.
            </p>
          </div>

          {/* WHATSAPP FORM */}
          <form
            onSubmit={handleSubmit}
            className="order-1 md:order-2 bg-white/60 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl p-6 sm:p-8 space-y-4 sm:space-y-5"
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-4">
              Send a WhatsApp Message 💬
            </h3>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 sm:p-4 rounded-xl border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-600 outline-none transition"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email (Optional)"
              className="w-full p-3 sm:p-4 rounded-xl border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-600 outline-none transition"
            />

            <textarea
              rows="5"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message..."
              className="w-full p-3 sm:p-4 rounded-xl border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-600 outline-none transition resize-none"
            />

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 sm:py-4 px-4 text-base sm:text-lg rounded-xl font-semibold hover:bg-green-700 active:scale-95 transition duration-300"
            >
              Send via WhatsApp 💬
            </button>

            {status && (
              <p className="text-sm text-center text-gray-600">
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