"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

interface LightboxWrapperProps {
  images: string[];
  title: string;
}

export default function LightboxWrapper({ images, title }: LightboxWrapperProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () =>
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + images.length) % images.length : 0,
    );
  const nextImage = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % images.length : 0));

  return (
    <section className="pb-28 px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="mb-12">
          <h2 className="section-title text-forest mb-4">
            Project Gallery
          </h2>
          <span className="line-accent block" />
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {images.map((img, i) => (
            <AnimatedSection
              key={i}
              delay={i * 50}
              className={i === 0 ? "col-span-2 md:col-span-2 row-span-2" : ""}
            >
              <button
                onClick={() => openLightbox(i)}
                className={`relative overflow-hidden group w-full block ${i === 0 ? "aspect-[4/3]" : "aspect-square"}`}
              >
                <Image
                  src={img}
                  alt={`${title} ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-forest/0 group-hover:bg-forest/30 transition-colors duration-400 flex items-center justify-center">
                  <span className="text-white text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-forest/60 px-4 py-2">
                    View
                  </span>
                </div>
              </button>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-[#0e1c10]/96 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-cream/70 hover:text-cream border border-cream/20 hover:border-cream/50 transition-colors"
          >
            <X size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 md:left-8 w-12 h-12 flex items-center justify-center text-cream/70 hover:text-cream border border-cream/20 hover:border-cream/50 transition-colors"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 md:right-8 w-12 h-12 flex items-center justify-center text-cream/70 hover:text-cream border border-cream/20 hover:border-cream/50 transition-colors"
          >
            <ChevronRight size={22} />
          </button>
          <div
            className="relative max-w-5xl max-h-[85vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex]}
              alt={`${title} ${lightboxIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cream/40 text-xs tracking-widest">
            {lightboxIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </section>
  );
}
