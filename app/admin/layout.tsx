"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderOpen, Star, LogOut, Menu, X, Mail } from "lucide-react";
import { signOut } from "next-auth/react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: <LayoutDashboard size={16} /> },
  { href: "/admin/projects", label: "Projects", icon: <FolderOpen size={16} /> },
  { href: "/admin/reviews", label: "Reviews", icon: <Star size={16} /> },
  { href: "/admin/messages", label: "Inquiries", icon: <Mail size={16} /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-cream">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 flex flex-col ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:flex bg-forest-dark min-h-screen`}>
        <div className="p-7 border-b border-cream/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-cream/30 flex items-center justify-center text-xs font-bold text-cream" style={{ fontFamily: "'Playfair Display', serif" }}>JSB</div>
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-cream" style={{ fontFamily: "'Playfair Display', serif" }}>Admin</p>
              <p className="text-[0.6rem] tracking-wider text-cream/40">JSB Interiors</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-5 space-y-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-4 py-3 text-xs tracking-wider uppercase font-medium transition-all duration-200 ${
                pathname === item.href
                  ? "text-cream bg-forest-mid"
                  : "text-cream/45 hover:text-cream/80 hover:bg-forest"
              }`}
              onClick={() => setOpen(false)}
            >
              {item.icon}{item.label}
            </Link>
          ))}
        </nav>
        <div className="p-5 border-t border-cream/10 space-y-4">
          <Link href="/" className="flex items-center gap-3 text-xs tracking-wider uppercase text-cream/35 hover:text-cream/60 transition-colors">
            <LogOut size={15} />View Site
          </Link>
          <button 
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center gap-3 text-xs tracking-wider uppercase text-red-300/50 hover:text-red-300 transition-colors"
          >
            <LogOut size={15} />Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {open && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 border-b bg-cream border-forest/10">
          <button onClick={() => setOpen(!open)} className="lg:hidden p-1.5 text-forest/60 hover:text-forest">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="text-sm font-semibold text-forest/70 tracking-wide ml-2 lg:ml-0" style={{ fontFamily: "'Playfair Display', serif" }}>
            {navItems.find((n) => n.href === pathname)?.label ?? "Admin Panel"}
          </h1>
          <span className="text-xs text-forest/35 tracking-widest">JSB Interiors Admin</span>
        </header>
        <main className="flex-1 p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}
