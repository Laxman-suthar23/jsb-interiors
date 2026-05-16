"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <>
      {/* HERO */}
      <section className="relative pt-36 pb-24 px-6 bg-forest overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest/70 via-forest/50 to-forest" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <AnimatedSection>
            <p className="text-gold text-sm tracking-widest uppercase mb-4">
              Connect With Us
            </p>

            <h1 className="text-cream text-4xl md:text-5xl font-semibold mb-6">
              Contact JSB Interiors
            </h1>

            <span className="block w-12 h-[1px] bg-gold mb-6" />

            <p className="text-cream/70 max-w-xl text-lg leading-relaxed">
              Whether you have a specific project in mind or just want to
              explore possibilities, we’re here to help.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-28 px-6 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Info */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                <h2 className="section-title text-forest mb-8">
                  Let’s Talk About <br />
                  <span className="italic text-gold text-4xl">Your Project</span>
                </h2>

                <div className="space-y-10">
                  {[
                    {
                      icon: <MapPin size={18} />,
                      label: "Visit Our Studio",
                      value: "#17, Jyothi Shree, 1st Cross,\nBrindavan Nagar, Taverekere,\nBangalore 560029",
                    },
                    {
                      icon: <Phone size={18} />,
                      label: "Call Us Directly",
                      value: "+91 98450 47214\n+91 81476 05480",
                    },
                    {
                      icon: <Mail size={18} />,
                      label: "Email Us",
                      value: "jsbinteriors067@gmail.com",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6">
                      <div className="w-11 h-11 bg-forest flex items-center justify-center text-gold flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-[0.7rem] tracking-[0.2em] uppercase text-forest/40 mb-1">
                          {item.label}
                        </p>
                        <p className=" text-forest/80 text-sm leading-relaxed whitespace-pre-line">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <AnimatedSection className="bg-forest p-8 sm:p-14 shadow-2xl relative overflow-hidden border border-cream/5">
                {/* Accent line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gold" />
                
                {status === "success" ? (
                  <div className="flex flex-col items-center justify-center text-center py-12">
                    <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mb-8">
                      <CheckCircle size={40} className="text-gold" />
                    </div>
                    <h3 className="text-cream text-3xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Message Received
                    </h3>
                    <p className="text-cream/60 text-base max-w-sm leading-relaxed mb-10">
                      Thank you for contacting JSB Interiors. We've received your enquiry and will respond within 24 hours.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="px-10 py-4 bg-gold text-forest text-xs tracking-[0.25em] uppercase font-bold hover:opacity-90 transition-all shadow-lg"
                    >
                      New Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-8">
                    <div className="sm:col-span-2 mb-2">
                      <h3 className="text-3xl font-bold text-cream mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Send a Message
                      </h3>
                      <p className="text-cream/40 text-sm tracking-wide">Fields marked with * are required.</p>
                    </div>

                    <div className="flex flex-col">
                      <label className="text-[0.65rem] tracking-[0.2em] uppercase text-gold mb-2.5 font-bold">
                        Full Name *
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="form-input-dark p-2"
                        placeholder="Your Name"
                        required
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-[0.65rem] tracking-[0.2em] uppercase text-gold mb-2.5 font-bold">
                        Email Address *
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        className="form-input-dark p-2"
                        placeholder="example@gmail.com"
                        required
                      />
                    </div>

                    <div className="sm:col-span-2 flex flex-col">
                      <label className="text-[0.65rem] tracking-[0.2em] uppercase text-gold mb-2.5 font-bold">
                        Subject *
                      </label>
                      <input
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className="form-input-dark p-2"
                        placeholder="How can we assist you today?"
                        required
                      />
                    </div>

                    <div className="sm:col-span-2 flex flex-col">
                      <label className="text-[0.65rem] tracking-[0.2em] uppercase text-gold mb-2.5 font-bold">
                        Your Message *
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        className="form-input-dark p-2 resize-none"
                        placeholder="Tell us about your space, timeline, and vision..."
                        required
                      />
                    </div>

                    <div className="sm:col-span-2 pt-4">
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full flex items-center justify-center gap-3 py-5 bg-gold text-forest text-xs tracking-[0.25em] uppercase font-bold hover:opacity-90 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:translate-y-0 shadow-lg shadow-black/20"
                      >
                        {status === "loading" ? "Sending Inquiry..." : "Submit Message"}
                        <Send size={14} />
                      </button>
                      
                      {status === "error" && (
                        <div className="mt-4 p-4 bg-red-950/30 border border-red-500/20 text-red-400 text-xs text-center flex items-center justify-center gap-2">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                          Delivery failed. Please try again or call us directly.
                        </div>
                      )}
                    </div>
                  </form>
                )}
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="pb-28 px-6 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="w-full h-80 bg-forest/10 relative overflow-hidden border border-forest/10 flex items-center justify-center">
            <p className="text-forest/30 text-xs tracking-[0.3em] uppercase">Studio Location Map</p>
          </div>
        </div>
      </section>
    </>
  );
}
