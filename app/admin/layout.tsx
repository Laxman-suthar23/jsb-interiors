"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderOpen, Star, LogOut, Menu, X } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: <LayoutDashboard size={16} /> },
  { href: "/admin/projects", label: "Projects", icon: <FolderOpen size={16} /> },
  { href: "/admin/reviews", label: "Reviews", icon: <Star size={16} /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#f5f0e8" }}>
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 flex flex-col ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:flex`}
        style={{ backgroundColor: "#162b18", minHeight: "100vh" }}>
        <div className="p-7 border-b" style={{ borderColor: "rgba(245,240,232,0.08)" }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border flex items-center justify-center text-xs font-bold" style={{ borderColor: "rgba(245,240,232,0.3)", color: "#f5f0e8", fontFamily: "'Playfair Display', serif" }}>JSB</div>
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#f5f0e8", fontFamily: "'Playfair Display', serif" }}>Admin</p>
              <p className="text-[0.6rem] tracking-wider opacity-40" style={{ color: "#f5f0e8" }}>JSB Interiors</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-5 space-y-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-4 py-3 text-xs tracking-wider uppercase font-medium transition-all duration-200 ${
                pathname === item.href
                  ? "text-[#f5f0e8] bg-[#2d5230]"
                  : "text-[#f5f0e8]/45 hover:text-[#f5f0e8]/80 hover:bg-[#1e3b22]"
              }`}
              onClick={() => setOpen(false)}
            >
              {item.icon}{item.label}
            </Link>
          ))}
        </nav>
        <div className="p-5 border-t" style={{ borderColor: "rgba(245,240,232,0.08)" }}>
          <Link href="/" className="flex items-center gap-3 text-xs tracking-wider uppercase text-[#f5f0e8]/35 hover:text-[#f5f0e8]/60 transition-colors">
            <LogOut size={15} />View Site
          </Link>
        </div>
      </aside>

      {/* Overlay */}
      {open && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 border-b" style={{ backgroundColor: "#f5f0e8", borderColor: "rgba(30,59,34,0.1)" }}>
          <button onClick={() => setOpen(!open)} className="lg:hidden p-1.5 text-[#1e3b22]/60 hover:text-[#1e3b22]">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="text-sm font-semibold text-[#1e3b22]/70 tracking-wide ml-2 lg:ml-0" style={{ fontFamily: "'Playfair Display', serif" }}>
            {navItems.find((n) => n.href === pathname)?.label ?? "Admin Panel"}
          </h1>
          <span className="text-xs text-[#1e3b22]/35 tracking-widest">JSB Interiors Admin</span>
        </header>
        <main className="flex-1 p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}
