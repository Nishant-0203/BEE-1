import React, { useState } from "react";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaUser, FaEnvelope, FaPaperPlane } from "react-icons/fa";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form submission handling
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields.");
      return;
    }
  
    setLoading(true);
    setSuccessMessage("");
  
    try {
      const response = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
  
      setSuccessMessage("Message sent successfully! We will get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <SiteHeader />
      <main className="flex-1 px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-[58rem] text-center">
          <h2 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl md:text-6xl">
            Get in Touch
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-gray-600 sm:text-lg sm:leading-7">
            We'd love to hear from you! Fill out the form below, and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-xl bg-white p-8 rounded-2xl shadow-lg">
          {successMessage && (
            <div className="mb-4 text-green-600 font-semibold text-center">{successMessage}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <div className="relative mt-2">
                <FaUser className="absolute left-3 top-3 text-gray-500" />
                <Input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="pl-10"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="relative mt-2">
                <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="pl-10"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <Textarea
                name="message"
                placeholder="Write your message here..."
                className="mt-2 resize-none border border-gray-300 focus:ring-2 focus:ring-blue-500"
                rows={5}
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Sending..." : <>
                <FaPaperPlane />
                Send Message
              </>}
            </Button>
          </form>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
