import React from "react";
import Container from "@/components/common/Container";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { sanitizeUrl } from "@/components/lib/myFun";
import { cn } from "@/components/lib/utils";
import MarkdownIt from "markdown-it";
import Logo from "../navbar/Logo";

export default function Footer({
  categories,
  imagePath,
  category,
  logo,
  about_me,
}) {
  const md = new MarkdownIt();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Terms & Conditions", href: "/terms-and-conditions" },
    { name: "Privacy Policy", href: "/privacy-policy" },
  ];
  const content = md.render(about_me.value || "");

  return (
    <footer className="border-t mt-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16">
          {/* About Section */}
          <div className="col-span-1 space-y-6">
            <Logo logo={logo} imagePath={imagePath} title="MAAG Logo" />

            <div
              className="mt-3 text-gray-600"
              dangerouslySetInnerHTML={{
                __html: `${content.slice(21, 200)}...`,
              }}
            />

          
          </div>

          {/* Links Sections */}
          <div className="flex  justify-between  border-l px-8 ">
            {/* Categories Section */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Categories</h3>
              <ul className="flex flex-col gap-x-6 gap-y-3">
                {categories?.map((item, index) => (
                  <li key={index}>
                    <a
                      href={`/${sanitizeUrl(item.title)}`}
                      title={item?.title || "Article Link"}
                      className={cn(
                        "text-gray-600 hover:text-black transition-colors",
                        category === item.title && "text-black"
                      )}
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links Section */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Quick Links</h3>
              <ul className="flex flex-col gap-x-6 gap-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-600 hover:text-black transition-colors"
                      title={`Visit ${link.name} page`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

           
          </div>
        </div>
      </Container>
    </footer>
  );
}
