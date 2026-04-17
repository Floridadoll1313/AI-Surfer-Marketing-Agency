export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-center">
      <h1 className="text-5xl md:text-6xl font-bold mb-6 text-teal-400 drop-shadow-[0_0_10px_rgba(45,212,191,0.8)]">
        Ocean Tide Drop
      </h1>

      <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
        Creative Technology & Brand Systems for Founders.  
        We build modern, cinematic websites and customer experience systems 
        that help founders and small businesses launch with clarity, confidence, 
        and momentum.
      </p>

      <p className="text-teal-400 font-semibold mb-10">
        Based in West Ashley, Charleston, SC
      </p>

      <div className="flex justify-center gap-6 mt-8">
        <a
          href="/services"
          className="px-6 py-3 bg-teal-500 hover:bg-teal-400 rounded-lg text-black font-semibold transition shadow-[0_0_20px_rgba(45,212,191,0.3)]"
        >
          View Services
        </a>

        <a
          href="/contact"
          className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-teal-200 font-semibold transition"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}
