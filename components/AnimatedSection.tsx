"use client";

import { useInView } from "react-intersection-observer";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "fade";
}

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const baseStyle: React.CSSProperties = {
    transitionProperty: "opacity, transform",
    transitionDuration: "0.75s",
    transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    transitionDelay: `${delay}ms`,
  };

  const hiddenStyles: Record<string, React.CSSProperties> = {
    up: { opacity: 0, transform: "translateY(40px)" },
    left: { opacity: 0, transform: "translateX(40px)" },
    right: { opacity: 0, transform: "translateX(-40px)" },
    fade: { opacity: 0, transform: "none" },
  };

  const visibleStyle: React.CSSProperties = {
    opacity: 1,
    transform: "translateY(0) translateX(0)",
  };

  const style: React.CSSProperties = {
    ...baseStyle,
    ...(inView ? visibleStyle : hiddenStyles[direction]),
  };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
