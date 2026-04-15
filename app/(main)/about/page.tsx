import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight, CheckCircle } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { statsData } from "@/lib/data";

export const metadata = {
  title: "About | JSB Interiors",
};

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-36 pb-24 px-6 bg-[#1e3b22] overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1600&q=80"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e3b22]/70 via-[#1e3b22]/50 to-[#1e3b22]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <AnimatedSection>
            <p className="text-[#c9a84c] text-sm tracking-widest uppercase mb-4">
              Our Story
            </p>

            <h1 className="text-[#f5f0e8] text-4xl md:text-5xl font-semibold mb-6">
              About JSB Interiors
            </h1>

            <span className="block w-12 h-[1px] bg-[#c9a84c] mb-6" />

            <p className="text-[#f5f0e8]/70 max-w-xl text-lg leading-relaxed">
              A father-son design studio built on 35 years of craft, passion and
              an unwavering commitment to the spaces we create.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* FOUNDERS */}
      <section className="py-28 px-6 bg-[#f5f0e8]">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-20">
            <p className="text-[#c9a84c] text-sm tracking-widest uppercase mb-3">
              The Team
            </p>
            <h2 className="text-[#1e3b22] text-4xl md:text-5xl font-semibold">
              Meet the Founders
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl mx-auto">
            {[
              {
                name: "Chandan P Suthar",
                phone: "9845047214",
                role: "Principal Designer & Co-Founder",
                bio: "With decades of experience in interior craftsmanship, Chandan brings a deep understanding of materials, proportion and the art of creating spaces that age beautifully.",
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
              },
              {
                name: "Jasraj C Jangid",
                phone: "8147605480",
                role: "Creative Director & Co-Founder",
                bio: "Jasraj fuses contemporary design sensibilities with JSB's craftsmanship heritage to create modern, liveable spaces.",
                img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80",
              },
            ].map((person, i) => (
              <AnimatedSection key={person.name} delay={i * 100}>
                <div>
                  <div className="relative aspect-[3/4] overflow-hidden mb-6">
                    <Image
                      src={person.img}
                      alt={person.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  </div>

                  <p className="text-[#c9a84c] text-xs tracking-widest uppercase mb-1">
                    {person.role}
                  </p>

                  <h3 className="text-2xl font-semibold text-[#1e3b22] mb-3">
                    {person.name}
                  </h3>

                  <p className="text-[#1e3b22]/75 text-sm leading-relaxed mb-4">
                    {person.bio}
                  </p>

                  <a
                    href={`tel:${person.phone}`}
                    className="flex items-center gap-2 text-[#1e3b22]/70 text-sm hover:text-[#c9a84c]"
                  >
                    <Phone size={14} />
                    {person.phone}
                  </a>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-28 px-6 bg-[#162b18]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          
          <AnimatedSection>
            <div className="aspect-square relative overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=85"
                alt=""
                fill
                className="object-cover"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <p className="text-[#c9a84c] text-sm tracking-widest uppercase mb-4">
              Our Philosophy
            </p>

            <h2 className="text-[#f5f0e8] text-4xl font-semibold mb-6">
              Design That Tells <span className="italic">Your Story</span>
            </h2>

            <span className="block w-12 h-[1px] bg-[#c9a84c] mb-6" />

            <p className="text-[#f5f0e8]/70 mb-6">
              Every space reflects its owner. Our process starts with listening.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {["Client-first", "On-time", "Quality", "Timeless"].map((v) => (
                <div key={v} className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-[#c9a84c]" />
                  <span className="text-[#f5f0e8]/70 text-sm">{v}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-28 px-6 bg-[#f5f0e8]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">

          <AnimatedSection>
            <p className="text-[#c9a84c] text-sm tracking-widest uppercase mb-4">
              Get in Touch
            </p>

            <h2 className="text-[#1e3b22] text-4xl font-semibold mb-6">
              Start a Conversation
            </h2>

            <span className="block w-12 h-[1px] bg-[#c9a84c] mb-6" />

            <p className="text-[#1e3b22]/75 mb-8">
              Let’s create something extraordinary together.
            </p>

            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin size={16} className="text-[#c9a84c]" />
                <span className="text-[#1e3b22]/70 text-sm">
                  Bangalore, India
                </span>
              </div>

              <div className="flex gap-3">
                <Phone size={16} className="text-[#c9a84c]" />
                <span className="text-[#1e3b22]/70 text-sm">
                  9845047214 / 8147605480
                </span>
              </div>

              <div className="flex gap-3">
                <Mail size={16} className="text-[#c9a84c]" />
                <span className="text-[#1e3b22]/70 text-sm">
                  jsbinteriors067@gmail.com
                </span>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 mt-8 bg-[#1e3b22] text-[#f5f0e8] hover:bg-[#2d5230]"
            >
              Contact Us
              <ArrowRight size={14} />
            </Link>
          </AnimatedSection>

          <AnimatedSection>
            <div className="aspect-square relative overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=900&q=85"
                alt=""
                fill
                className="object-cover"
              />
            </div>
          </AnimatedSection>

        </div>
      </section>
    </>
  );
}