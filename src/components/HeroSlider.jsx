import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ✅ Import images
import img1 from "../assets/slide1.jpg";
import img2 from "../assets/slide2.jpg";
import img3 from "../assets/slide3.jpg";
import img4 from "../assets/slide4.jpg";
import img5 from "../assets/slide5.jpg";
import img6 from "../assets/slide6.jpg";

const slides = [
  { image: img1, title: "Donate to Make Impact", subtitle: "$1 Saves a Life" },
  { image: img2, title: "Every Donation Counts", subtitle: "Every Act of Kindness Changes a Life" },
  { image: img3, title: "Create Lasting Impact", subtitle: "Bring Hope Where It's Needed Most" },
  { image: img4, title: "Small Donations, Big Transformations", subtitle: "When You Give, They Rise" },
  { image: img5, title: "Together We Make Impact Possible", subtitle: "Your Support, Their Hope" },
  { image: img6, title: "Write a Story of Hope", subtitle: "Compassion in Action Starts with You" },
];

function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [showControls, setShowControls] = useState(true);

  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  // Auto-slide every 25 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 25000);
    return () => clearInterval(interval);
  }, [index]);

  // Hide controls after 3s idle
  useEffect(() => {
    let timeout;
    const show = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setShowControls(false), 3000);
    };
    window.addEventListener("mousemove", show);
    return () => {
      window.removeEventListener("mousemove", show);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section className="relative w-full h-[650px] overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.img
          key={slides[index].image}
          src={slides[index].image}
          alt={slides[index].title}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70"></div>

      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 text-white z-10">
        <motion.h1
          key={slides[index].title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-extrabold drop-shadow-xl max-w-3xl leading-tight"
        >
          {slides[index].title}
        </motion.h1>

        <motion.p
          key={slides[index].subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-lg md:text-2xl text-gray-200 mt-4 max-w-2xl"
        >
          {slides[index].subtitle}
        </motion.p>

        <motion.a
          href="#contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 font-semibold text-lg shadow-lg hover:from-orange-500 hover:to-pink-500 transition-all duration-300"
        >
          Get Involved 💖
        </motion.a>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute inset-0 flex justify-between items-center px-6 z-20">
        <motion.button
          onClick={prevSlide}
          whileHover={{ scale: 1.1 }}
          className={`bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition ${
            showControls ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <ChevronLeft size={30} />
        </motion.button>

        <motion.button
          onClick={nextSlide}
          whileHover={{ scale: 1.1 }}
          className={`bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition ${
            showControls ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <ChevronRight size={30} />
        </motion.button>
      </div>

      {/* Dots Navigation */}
      <div
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20 ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        } transition-opacity`}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === index ? "bg-pink-500 scale-125" : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroSlider;
