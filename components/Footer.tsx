import Link from "next/link";
import { Mail, Phone, MapPin, Share2, Globe } from "lucide-react";
import Image from "next/image";
import logo from '../public/logo.png';
export default function Footer() {
  return (
    <footer className="bg-[#162b18] text-[#f5f0e8]">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
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
                  className="text-sm tracking-[0.2em] uppercase block"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                  }}
                >
                  Interiors
                </span>
                <span className="text-[0.6rem] tracking-[0.15em] uppercase opacity-50 block -mt-0.5">
                  Est. 1989
                </span>
              </div>
            </div>
            <p className="text-[#f5f0e8]/55 text-sm leading-relaxed mb-6">
              Crafting elegant, timeless spaces that reflect the soul of those
              who inhabit them.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-9 h-9 border border-[#f5f0e8]/20 flex items-center justify-center hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors"
                aria-label="Instagram"
              >
                <Share2 size={15} />
              </a>
              <a
                href="#"
                className="w-9 h-9 border border-[#f5f0e8]/20 flex items-center justify-center hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors"
                aria-label="Website"
              >
                <Globe size={15} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3
              className="text-xs tracking-[0.25em] uppercase mb-6 text-[#c9a84c]"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}
            >
              Navigation
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/projects", label: "Projects" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#f5f0e8]/55 hover:text-[#f5f0e8] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3
              className="text-xs tracking-[0.25em] uppercase mb-6 text-[#c9a84c]"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}
            >
              Services
            </h3>
            <ul className="space-y-3">
              {[
                "Apartment Design",
                "Villa Design",
                "Cottage Design",
                "Space Planning",
                "Furniture Curation",
                "Lighting Design",
              ].map((s) => (
                <li key={s}>
                  <span className="text-[#f5f0e8]/55 text-sm">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="text-xs tracking-[0.25em] uppercase mb-6 text-[#c9a84c]"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}
            >
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin
                  size={14}
                  className="text-[#c9a84c] mt-1 flex-shrink-0"
                />
                <span className="text-[#f5f0e8]/55 text-sm leading-relaxed">
                  #17, Jyothi Shree, 1st Cross,
                  <br />
                  Brindavan Nagar, Taverekere,
                  <br />
                  Bangalore 560029
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-[#c9a84c] flex-shrink-0" />
                <div className="text-sm">
                  <a
                    href="tel:9845047214"
                    className="text-[#f5f0e8]/55 hover:text-[#f5f0e8] transition-colors block"
                  >
                    9845047214
                  </a>
                  <a
                    href="tel:8147605480"
                    className="text-[#f5f0e8]/55 hover:text-[#f5f0e8] transition-colors block"
                  >
                    8147605480
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-[#c9a84c] flex-shrink-0" />
                <a
                  href="mailto:jsbinteriors067@gmail.com"
                  className="text-[#f5f0e8]/55 hover:text-[#f5f0e8] text-sm transition-colors"
                >
                  jsbinteriors067@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#f5f0e8]/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#f5f0e8]/35 text-xs tracking-wide">
            © {new Date().getFullYear()} JSB Interiors. All rights reserved.
          </p>
          <p className="text-[#f5f0e8]/35 text-xs tracking-wide">
            Jasraj C Jangid & Chandan P Suthar
          </p>
        </div>
      </div>
    </footer>
  );
}
