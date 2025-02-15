import React from "react";
import Container from "@/components/common/Container";
import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  const data = [
    {
      heading: "Quick Links",
      links: [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms", href: "/terms" },
      ]
    },
    {
      heading: "Categories",
      links: [
        { name: "Technology", href: "/category/technology" },
        { name: "Lifestyle", href: "/category/lifestyle" },
        { name: "Travel", href: "/category/travel" },
        { name: "Food", href: "/category/food" },
        { name: "Fashion", href: "/category/fashion" },
      ]
    },
  ];

  return (
    <footer className="border-t mt-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16">
          {/* About Section */}
          <div className="col-span-1 space-y-6">
            <h3 className="font-bold text-5xl">MAAG</h3>
            <p className="text-gray-600 leading-relaxed">
              Welcome to our blog, where we share insights, stories, and
              inspiration for modern living. Join us in exploring the latest trends,
              tips, and ideas.
            </p>
            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-black transition-colors"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="/"
                className="text-gray-600 hover:text-black transition-colors"
              >
                <Instagram size={20} />
              </Link>
              <Link
                href="/"
                className="text-gray-600 hover:text-black transition-colors"
              >
                <Twitter size={20} />
              </Link>
            </div>
          </div>

          {/* Links Sections */}
          <div className="col-span-2 border-l px-8 space-y-8">
            {data.map((section) => (
              <div key={section.heading} className="space-y-4">
                <h3 className="font-bold text-lg">{section.heading}</h3>
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-600 hover:text-black transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Copyright */}
            <div className="pt-8 text-gray-600">
              <p>© {new Date().getFullYear()} MAAG. All rights reserved.</p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
