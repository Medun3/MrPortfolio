import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import logo from "../assets/logo.png";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const closeMenu = () => setOpen(false);

  useEffect(() => {
    if (!location.hash) return;

    const scrollTimer = window.setTimeout(() => {
      const section = document.querySelector(location.hash);
      section?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);

    return () => window.clearTimeout(scrollTimer);
  }, [location.pathname, location.hash]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAnchorClick = (event, href) => {
    event.preventDefault();
    closeMenu();

    if (location.pathname !== "/") {
      navigate(`/${href}`);
      return;
    }

    const section = document.querySelector(href);
    section?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    navigate(href);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-10 py-0 flex justify-between items-center text-white bg-black/10 backdrop-blur-sm">
      {/* Logo */}
      <a
        href="#hero"
        onClick={(event) => handleAnchorClick(event, "#hero")}
        aria-label="Go to home"
      >
        <img src={logo} alt="Logo" className="h-20 w-auto" />
      </a>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-10 uppercase text-sm tracking-[3px]">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              onClick={(event) => handleAnchorClick(event, link.href)}
              className="hover:text-gray-300 transition"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile Menu Wrapper */}
      <div ref={menuRef} className="relative md:hidden">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="text-4xl"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <HiOutlineMenuAlt3 />
        </button>

        {/* Mobile Menu */}
        {open && (
          <ul className="absolute top-full right-0 mt-2 w-64 bg-black/95 backdrop-blur-md text-white flex flex-col items-center gap-6 py-8 rounded-lg shadow-lg uppercase text-sm tracking-[3px]">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(event) => handleAnchorClick(event, link.href)}
                  className="hover:text-gray-300 transition"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;