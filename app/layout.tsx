import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JSB Interiors | Premium Interior Design Studio",
  description:
    "JSB Interiors — a father-son studio with 35+ years of experience crafting elegant, timeless spaces. From villas to cottages, we blend classic craftsmanship with modern design.",
  keywords:
    "interior design, Bangalore, villa design, apartment design, cottage design, JSB Interiors",
  openGraph: {
    title: "JSB Interiors | Premium Interior Design Studio",
    description: "35+ years of crafting elegant, timeless spaces across India.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
