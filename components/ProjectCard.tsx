"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  slug: string;
  clientName: string;
  type: string;
  location: string;
  duration: string;
  coverImage: string;
  index?: number;
}

export default function ProjectCard({
  title,
  slug,
  clientName,
  type,
  location,
  duration,
  coverImage,
  index = 0,
}: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`} className="group block">
      
      <div className="relative overflow-hidden bg-[#1e3b22]/5">
        
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* ✅ Always visible overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          {/* Index */}
          <div className="absolute top-4 left-4 w-9 h-9 bg-[#f5f0e8] flex items-center justify-center text-[#1e3b22] text-sm font-bold shadow">
            {String(index + 1).padStart(2, "0")}
          </div>

          {/* Type */}
          <div className="absolute top-4 right-4">
            <span className="bg-[#1e3b22]/80 text-[#f5f0e8] px-3 py-1 text-[0.65rem] tracking-widest uppercase backdrop-blur-sm">
              {type}
            </span>
          </div>

          {/* Arrow */}
          <div className="absolute bottom-4 right-4 w-10 h-10 bg-[#c9a84c] flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
            <ArrowUpRight size={16} className="text-[#1e3b22]" />
          </div>

          {/* ✅ ALWAYS VISIBLE TEXT */}
          <div className="absolute bottom-0 left-0 p-5 z-10 w-full">
            <p className="text-[#f5f0e8]/70 text-xs tracking-widest uppercase mb-1">
              {location}
            </p>

            <h3 className="text-[#f5f0e8] text-lg font-semibold leading-tight">
              {title}
            </h3>
          </div>
        </div>

        {/* Bottom Content */}
        <div className="p-5 border border-t-0 border-[#1e3b22]/10 bg-white">
          
          <p className="text-sm text-[#1e3b22]/70 mb-2">
            {clientName}
          </p>

          <div className="flex items-center justify-between">
            
            <span className="text-[0.7rem] text-[#1e3b22]/50 uppercase tracking-wider">
              {duration}
            </span>

            <span className="text-[0.7rem] text-[#1e3b22]/50 tracking-wide group-hover:text-[#c9a84c] transition-colors">
              View Project →
            </span>

          </div>
        </div>

      </div>
    </Link>
  );
}