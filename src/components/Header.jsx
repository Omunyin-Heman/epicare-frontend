import React, { useState } from "react";
import logo from "../assets/epicare-logo.jpg";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();

  // ✅ Navigate Home + scroll to top
  const goHome = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
  };

  // 🔹 Searchable items
  const searchItems = [
    { name: "Home", type: "page", path: "/" },
    { name: "Why Epicare?", type: "section", path: "#about" },
    { name: "How We Work", type: "section", path: "#programs" },
    { name: "Where We Work", type: "section", path: "#where" },
    { name: "Get Involved", type: "section", path: "#involved" },
    { name: "Contact", type: "section", path: "#contact" },
    { name: "Donate Now", type: "page", path: "/donate" },
  ];

  // 🔹 Handle typing (filter suggestions)
  const handleChange = (e) => {
    const term = e.target.value.toLowerCase();
    setQuery(term);
    if (term.length > 0) {
      setFiltered(
        searchItems.filter((item) =>
          item.name.toLowerCase().includes(term)
        )
      );
    } else {
      setFiltered([]);
    }
  };

  // 🔹 Handle selection from search
  const handleSelect = (item) => {
    if (item.type === "page") {
      navigate(item.path);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (item.type === "section") {
      window.location.hash = item.path;
    }
    setQuery("");
    setFiltered([]);
    setShowSearch(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-blue-700 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        
        {/* 🔹 Logo (clickable home) */}
        <div
          onClick={goHome}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <img src={logo} alt="Epicare Logo" className="h-20 w-auto" />
          <span className="text-2xl font-bold">Epicare</span>
        </div>

        {/* 🔹 Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <button onClick={goHome} className="hover:text-yellow-300">
            Home
          </button>
          <a href="#about" className="hover:text-yellow-300">Why Epicare?</a>
          <a href="#programs" className="hover:text-yellow-300">How We Work</a>
          <a href="#where" className="hover:text-yellow-300">Where We Work</a>
          <a href="#involved" className="hover:text-yellow-300">Get Involved</a>
          <a href="#contact" className="hover:text-yellow-300">Contact</a>

          {/* 🔹 Search Icon */}
          <FaSearch
            onClick={() => setShowSearch(!showSearch)}
            className="text-white text-xl cursor-pointer hover:text-yellow-300"
          />
        </nav>

        {/* 🔹 Donate Button (desktop only) */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={() => navigate("/donate")}
            className="bg-yellow-400 text-black px-4 py-2 rounded-md font-semibold hover:bg-yellow-300"
          >
            Donate Now
          </button>
        </div>

        {/* 🔹 Mobile Icons */}
        <div className="md:hidden flex items-center space-x-3">
          <FaSearch
            onClick={() => setShowSearch(!showSearch)}
            className="text-white text-xl cursor-pointer"
          />
          {menuOpen ? (
            <FaTimes
              onClick={() => setMenuOpen(false)}
              className="text-white text-2xl cursor-pointer"
            />
          ) : (
            <FaBars
              onClick={() => setMenuOpen(true)}
              className="text-white text-2xl cursor-pointer"
            />
          )}
        </div>
      </div>

      {/* 🔹 Animated Search Bar */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-blue-600 p-3 relative"
          >
            <input
              type="text"
              value={query}
              onChange={handleChange}
              placeholder="Search pages or sections..."
              className="w-full px-3 py-2 rounded text-black outline-none"
            />

            {/* 🔹 Suggestions */}
            {filtered.length > 0 && (
              <ul className="absolute left-0 right-0 bg-white text-black rounded shadow mt-2 z-50">
                {filtered.map((item, i) => (
                  <li
                    key={i}
                    onClick={() => handleSelect(item)}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔹 Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-blue-800 p-4 space-y-4"
          >
            <button onClick={goHome} className="block hover:text-yellow-300 w-full text-left">
              Home
            </button>
            <a href="#about" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-300">
              Why Epicare?
            </a>
            <a href="#programs" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-300">
              How We Work
            </a>
            <a href="#where" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-300">
              Where We Work
            </a>
            <a href="#involved" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-300">
              Get Involved
            </a>
            <a href="#contact" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-300">
              Contact
            </a>
            <button
              onClick={() => {
                navigate("/donate");
                setMenuOpen(false);
              }}
              className="w-full bg-yellow-400 text-black px-4 py-2 rounded-md font-semibold hover:bg-yellow-300"
            >
              Donate Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
