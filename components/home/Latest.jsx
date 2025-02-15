import React from "react";
import Container from "../common/Container";
import Section from "./Section";
import Image from "next/image";
import image2 from "@/public/images/codesupply2.webp";
import image3 from "@/public/images/codesupply3.1.webp";
import image1 from "@/public/images/codesupply1.webp";
import image4 from "@/public/images/codesupply4.webp";
import { ChevronRight } from "lucide-react";

const data = [
  {
    title: "Cultivating a Garden of Wellness and Tranquility",
    description:
      "Insights into daily wellness and effective home decor strategies are shared to enhance everyday living and create nurturing spaces.",
    image: image1,
    date: "May 13, 2023",
    author: "Elliot Alderson",
    category: "Style",
    link: "/trending",
  },
  {
    title: "Thriving in Urban Environments: Tips for City ",
    description:
      "In the Age of Information, news media faces both unprecedented opportunities and significant challenges.",
    image: image2,
    date: "Jul 10, 2023",
    author: "Elliot Alderson",
    category: "Selfcare",
    link: "/trending",
  },
  {
    title: "Trending Tips for City Living",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad modi tenetur impedit architecto qui. Quis quisquam, expedita in cupiditate doloremque et autem suscipit illum nostrum sapiente porro numquam dolore excepturi.",
    image: image3,
    date: "2024-01-01",
    author: "John Doe",
    link: "/trending",
  },
  {
    title: "Trending Tips for City Living",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad modi tenetur impedit architecto qui. Quis quisquam, expedita in cupiditate doloremque et autem suscipit illum nostrum sapiente porro numquam dolore excepturi.",
    image: image4,
    date: "2024-01-01",
    author: "John Doe",
    link: "/trending",
  },
];

export default function Trending() {
  const trendingPost = data[0];
  const blogPosts = data.slice(1);

  return (
    <Container className=" border-t-[2px] mt-16 border-black">
      <div className="pt-5 pb-7 text-md font-light flex items-center  gap-2">
        <h3> Latest</h3>
        <ChevronRight className="w-5 h-5" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Trending Post - Left Side */}
        <div className="border-r border-gray-300">
          <article className="group cursor-pointer pr-3">
            <div className="relative h-[400px] rounded-[4px] overflow-hidden mb-6">
              <Image
                src={trendingPost.image}
                alt={trendingPost.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <span className="text-gray-600">{trendingPost.category}</span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-600">{trendingPost.date}</span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-600">by {trendingPost.author}</span>
              </div>
              <h1 className="text-2xl font-bold leading-snug hover:text-gray-600 transition-colors">
                {trendingPost.title}
              </h1>
              <p className="text-gray-600 leading-relaxed">
                {trendingPost.description}
              </p>
            </div>
          </article>
        </div>

        {/* Blog Posts - Right Side */}
        {blogPosts.length > 0 && <Section posts={blogPosts} />}
      </div>
    </Container>
  );
}
