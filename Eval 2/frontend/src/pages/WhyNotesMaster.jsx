import React from "react";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";

const WhyNoteMaster = () => {
  return (
    <>
      <SiteHeader />
      <section className="bg-white text-black p-16 max-w-7xl mx-auto space-y-12">
        <header className="text-center space-y-6">
          <h1 className="text-5xl font-bold">Why Choose NoteMaster?</h1>
          <p className="text-lg text-gray-700">With NoteMaster, you have everything you need to keep life organized. Use it for note-taking, project planning, and to find what you need, when you need it.</p>
          <button className="bg-black text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-gray-800 transition">Start for Free</button>
          <p className="text-gray-600 text-sm">Already have an account? <a href="#" className="text-black font-semibold underline">Log in now</a></p>
        </header>
        
        <article className="grid grid-cols-1 md:grid-cols-1 gap-16 items-center">
          <figure>
            <img src="about.webp" alt="Organizing notes" className="h-150 w-[calc(3/4 - 2rem)] rounded-xl shadow-lg w-3/4 mx-auto" />
            <blockquote className="text-2xl italic font-light border-l-4 border-black pl-4 mt-12 text-center">
              "The secret to getting ahead is getting started. NoteMaster helps you take that first step."
            </blockquote>
          </figure>
        </article>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-bold">🚀 Effortless Note-Taking</h3>
            <p className="text-lg text-gray-700 leading-relaxed">Capture ideas in seconds with an intuitive interface.</p>
          </div>
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-bold">🔒 Safe & Secure</h3>
            <p className="text-lg text-gray-700 leading-relaxed">Your notes are encrypted for maximum privacy.</p>
          </div>
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-bold">📱 Sync Anytime</h3>
            <p className="text-lg text-gray-700 leading-relaxed">Seamlessly access your notes from any device.</p>
          </div>
        </div>

        <div className="space-y-16">
          <h2 className="text-3xl font-semibold text-center">Powerful Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-center ">
            <div className="space-y-6 ">
              <h3 className="text-2xl font-bold">📂 Smart Organization</h3>
              <p className="text-lg text-gray-700 leading-relaxed">Categorize your notes with notebooks, tags, and folders.</p>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">🌐 Instant Sync</h3>
              <p className="text-lg text-gray-700 leading-relaxed">Stay connected across multiple devices.</p>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">📝 Rich Formatting</h3>
              <p className="text-lg text-gray-700 leading-relaxed">Highlight key ideas with bold, italics, and lists.</p>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">📎 Attach & Save</h3>
              <p className="text-lg text-gray-700 leading-relaxed">Store images, PDFs, and files alongside your notes.</p>
            </div>
          </div>
        </div>

        <div className="text-center space-y-8">
          <h2 className="text-3xl font-semibold">Experience NoteMaster Today</h2>
          <p className="text-lg text-gray-700 leading-relaxed">Join a community that values organized thinking and increased productivity.</p>
          <button className="mt-6 bg-black text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-gray-800 transition">Sign Up for Free</button>
        </div>
      </section>
      <SiteFooter />
    </>
  );
};

export default WhyNoteMaster;