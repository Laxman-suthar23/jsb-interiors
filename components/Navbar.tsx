"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import logo from "../public/logo.png";
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomePage = pathname === "/";
  const isDark = !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#f5f0e8]/95 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-6"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className={`flex items-center gap-3 transition-colors duration-300 ${
            isDark ? "text-[#f5f0e8]" : "text-[#1e3b22]"
          }`}
        >
          <div className="w-9 h-9">
            <Image
              src={logo}
              alt="JSB Interiors"
              width={36}
              height={36}
              className="object-cover"
            />
          </div>
          <div>
            <span
              className="text-xs tracking-[0.2em] uppercase block"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
              }}
            >
              JSB Interiors
            </span>
            <span className="text-[0.6rem] tracking-[0.15em] uppercase opacity-60 block -mt-0.5">
              Est. 1989
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`nav-link transition-colors duration-300 ${
                  pathname === link.href ? "active" : ""
                } ${
                  isDark
                    ? "text-[#f5f0e8]/80 hover:text-[#f5f0e8]"
                    : "text-[#1e3b22]/70 hover:text-[#1e3b22]"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contact"
              className={`nav-link transition-colors duration-300 ${
                isDark
                  ? "text-[#ebde34] hover:text-[#ebde34]"
                  : "text-[#4f4f4a] hover:text-[#4f4f4a]"
              }`}
            >
              Free Consultation
            </Link>
            {/* <Link href="/contact" className="btn-primary text-xs">
              Free Consultation
            </Link> */}
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden p-2 transition-colors duration-300 ${
            isDark ? "text-[#f5f0e8]" : "text-[#1e3b22]"
          }`}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-400 overflow-hidden ${
          open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ backgroundColor: "#1e3b22" }}
      >
        <ul className="px-6 py-8 space-y-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block text-[#f5f0e8] nav-link text-base hover:text-[#c9a84c] transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="btn-outline inline-block mt-2"
            >
              Free Consultation
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
