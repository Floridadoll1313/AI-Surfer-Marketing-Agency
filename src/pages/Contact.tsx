import React from "react";
import PageWrapper from "../components/PageWrapper";

export default function Contact() {
  return (
    <PageWrapper>
      <h1 className="text-4xl font-bold text-cyan-300 mb-6">
        Contact
      </h1>

      <p className="text-lg text-cyan-200 mb-10">
        Reach out anytime — the tide is always listening.
      </p>

      <form className="max-w-xl mx-auto bg-black/40 p-6 rounded-xl shadow-neon backdrop-blur-md">
        <label className="block mb-4">
          <span className="text-cyan-300 font-semibold">Your Name</span>
          <input
            type="text"
            className="w-full mt-2 p-3 rounded-lg bg-black/60 border border-cyan-500/40 text-white focus:border-cyan-300 outline-none"
            placeholder="Enter your name"
          />
        </label>

        <label className="block mb-4">
          <span className="text-cyan-300 font-semibold">Email</span>
          <input
            type="email"
            className="w-full mt-2 p-3 rounded-lg bg-black/60 border border-cyan-500/40 text-white focus:border-cyan-300 outline-none"
            placeholder="you@example.com"
          />
        </label>

        <label className="block mb-6">
          <span className="text-cyan-300 font-semibold">Message</span>
          <textarea
            className="w-full mt-2 p-3 rounded-lg bg-black/60 border border-cyan-500/40 text-white focus:border-cyan-300 outline-none h-32"
            placeholder="Tell me what’s on your mind…"
          />
        </label>

        <button
          type="submit"
          className="w-full py-3 bg-cyan-400 text-black font-bold rounded-lg shadow-neon hover:bg-cyan-300 transition"
        >
          Send Message
        </button>
      </form>
    </PageWrapper>
  );
}