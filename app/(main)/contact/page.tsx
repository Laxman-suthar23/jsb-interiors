"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import Image from "next/image";
export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-24 px-6 bg-[#1e3b22] overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 opacity-40">
          <Image
            src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
            alt="Interior design workspace"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e3b22]/70 via-[#1e3b22]/50 to-[#1e3b22]" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto">
          <AnimatedSection>
            <p className="text-[#c9a84c] text-sm tracking-widest uppercase mb-4">
              Reach Out
            </p>

            <h1 className="text-[#f5f0e8] text-4xl md:text-5xl font-semibold mb-6">
              Contact Us
            </h1>

            <span className="block w-12 h-[1px] bg-[#c9a84c] mb-6" />

            <p className="text-[#f5f0e8]/70 max-w-xl text-lg leading-relaxed">
              Ready to begin your design journey? We'd love to hear from you.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Main content */}
      <section className="py-28 px-6 bg-[#f5f0e8]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Info */}
          <AnimatedSection direction="right">
            <p className="section-subtitle mb-4">Get in Touch</p>
            <h2 className="section-title text-[#1e3b22] mb-8">
              Let's Create Something <span className="italic">Beautiful</span>
            </h2>
            <span className="line-accent block mb-8" />
            <p className="prose-custom mb-12">
              Whether you have a new project in mind, a renovation, or simply
              want to explore design possibilities — our team is here to listen
              and guide you every step of the way.
            </p>

            <div className="space-y-6 mb-12">
              {[
                {
                  icon: <MapPin size={17} />,
                  title: "Studio Address",
                  value:
                    "#17, Jyothi Shree, 1st Cross,\nBrindavan Nagar, Taverekere,\nBangalore 560029",
                },
                {
                  icon: <Phone size={17} />,
                  title: "Phone",
                  value: "9845047214\n8147605480",
                },
                {
                  icon: <Mail size={17} />,
                  title: "Email",
                  value: "jsbinteriors067@gmail.com",
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-5">
                  <div className="w-11 h-11 bg-[#1e3b22] flex items-center justify-center text-[#c9a84c] flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[#1e3b22]/40 mb-1">
                      {item.title}
                    </p>
                    <p className="text-[#1e3b22]/80 text-sm leading-relaxed whitespace-pre-line">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://wa.me/919845047214?text=Hello%20JSB%20Interiors%2C%20I'd%20like%20a%20free%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#25D366] text-white text-sm font-medium tracking-wide hover:bg-[#1ebe5a] transition-colors"
            >
              <MessageCircle size={17} />
              Chat on WhatsApp
            </a>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection direction="left" delay={100}>
            <div className="bg-[#1e3b22] p-10">
              <h3
                className="text-xl font-semibold text-[#f5f0e8] mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Send a Message
              </h3>
              <p className="text-[#f5f0e8]/40 text-sm mb-8">
                We respond within 24 hours.
              </p>

              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <CheckCircle size={48} className="text-[#c9a84c] mb-5" />
                  <h4
                    className="text-[#f5f0e8] text-xl font-semibold mb-3"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Message Sent!
                  </h4>
                  <p className="text-[#f5f0e8]/50 text-sm max-w-xs">
                    Thank you for reaching out. We'll be in touch shortly.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-8 text-[#c9a84c] text-xs tracking-widest uppercase hover:underline"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[0.65rem] tracking-[0.2em] uppercase text-[#f5f0e8]/40 mb-2">
                        Full Name *
                      </label>
                      <input
                        required
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="form-input form-input-dark"
                      />
                    </div>
                    <div>
                      <label className="block text-[0.65rem] tracking-[0.2em] uppercase text-[#f5f0e8]/40 mb-2">
                        Phone
                      </label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 00000 00000"
                        className="form-input form-input-dark"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[0.65rem] tracking-[0.2em] uppercase text-[#f5f0e8]/40 mb-2">
                      Email *
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="form-input form-input-dark"
                    />
                  </div>
                  <div>
                    <label className="block text-[0.65rem] tracking-[0.2em] uppercase text-[#f5f0e8]/40 mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project…"
                      className="form-input form-input-dark resize-none"
                    />
                  </div>
                  {status === "error" && (
                    <p className="text-red-400 text-xs">
                      Something went wrong. Please try again or contact us
                      directly.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full flex items-center justify-center gap-3 py-4 text-sm font-medium tracking-[0.15em] uppercase transition-all duration-300"
                    style={{ background: "#c9a84c", color: "#1e3b22" }}
                  >
                    {status === "loading" ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Send size={15} />
                    )}
                    {status === "loading" ? "Sending…" : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Map embed */}
      <section className="pb-28 px-6 bg-[#f5f0e8]">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="w-full h-80 bg-[#1e3b22]/10 relative overflow-hidden border border-[#1e3b22]/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.0244862745947!2d77.6095!3d12.8955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDUzJzQ0LjAiTiA3N8KwMzYnMzQuMiJF!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(30%) contrast(1.1)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="JSB Interiors location"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
