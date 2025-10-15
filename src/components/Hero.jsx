function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 text-white py-24 px-6 overflow-hidden">
      {/* Decorative glowing circle */}
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg">
          Together for Stronger Communities
        </h2>

        <p className="text-lg md:text-xl text-white/90 font-light mb-10">
          Epicare is building resilient communities through <span className="font-semibold text-yellow-300">health</span>,{" "}
          <span className="font-semibold text-yellow-300">education</span>,{" "}
          <span className="font-semibold text-yellow-300">agriculture</span>, and{" "}
          <span className="font-semibold text-yellow-300">advocacy</span>.
        </p>

        <a
          href="#programs"
          className="inline-block bg-white text-orange-600 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl hover:bg-yellow-50 transform hover:scale-105 transition duration-300 ease-in-out"
        >
          Explore Our Programs →
        </a>
      </div>
    </section>
  );
}

export default Hero;
