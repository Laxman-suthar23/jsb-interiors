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
                        <p className="text-forest/80 text-sm leading-relaxed whitespace-pre-line">
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
              <div className="bg-forest p-6 sm:p-10 min-h-[500px] flex flex-col justify-center">
                {status === "success" ? (
                  <AnimatedSection direction="fade" className="flex flex-col items-center justify-center text-center py-10">
                    <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle size={40} className="text-gold" />
                    </div>
                    <h3 className="text-cream text-2xl font-semibold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Message Sent Successfully!
                    </h3>
                    <p className="text-cream/60 text-base max-w-sm leading-relaxed mb-10">
                      Thank you for reaching out to JSB Interiors. Our team has received your inquiry and will get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="px-8 py-3 border border-gold text-gold text-xs tracking-[0.2em] uppercase font-semibold hover:bg-gold hover:text-forest transition-all"
                    >
                      Send Another Message
                    </button>
                  </AnimatedSection>
                ) : (
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-6">
                    <h3 className="sm:col-span-2 text-2xl font-semibold text-cream mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Send a Message
                    </h3>
                    <div className="flex flex-col">
                      <label className="text-[0.65rem] tracking-[0.2em] uppercase text-gold mb-2 font-semibold">
                        Your Name
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="form-input-dark"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[0.65rem] tracking-[0.2em] uppercase text-gold mb-2 font-semibold">
                        Email Address
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        className="form-input-dark"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                    <div className="sm:col-span-2 flex flex-col">
                      <label className="text-[0.65rem] tracking-[0.2em] uppercase text-gold mb-2 font-semibold">
                        Subject
                      </label>
                      <input
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className="form-input-dark"
                        placeholder="How can we help you?"
                        required
                      />
                    </div>
                    <div className="sm:col-span-2 flex flex-col">
                      <label className="text-[0.65rem] tracking-[0.2em] uppercase text-gold mb-2 font-semibold">
                        Message
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        className="form-input-dark resize-none"
                        placeholder="Tell us about your project..."
                        required
                      />
                    </div>
                    <div className="sm:col-span-2 pt-4">
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full flex items-center justify-center gap-3 py-4 bg-gold text-forest text-xs tracking-[0.2em] uppercase font-bold hover:opacity-90 transition-all disabled:opacity-50"
                      >
                        {status === "loading" ? "Sending Enquiry..." : "Send Message"}
                        <Send size={14} />
                      </button>
                      {status === "error" && (
                        <p className="text-red-400 text-xs mt-3 text-center">Failed to send message. Please try again or call us directly.</p>
                      )}
                    </div>
                  </form>
                )}
              </div>
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
