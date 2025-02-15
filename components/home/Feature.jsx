import React from "react";
import Container from "../common/Container";
import Image from "next/image";
import image from "@/public/images/codesupply3.1.webp";
import { ChevronRight } from "lucide-react";
import image1 from "@/public/images/codesupply1.webp";
import image2 from "@/public/images/codesupply2.webp";
import image3 from "@/public/images/codesupply3.1.webp";
import Button from "../common/Button";
import Link from "next/link";

export default function Feature() {
  const highlights = [
    {
      id: 1,
      title:
        "Boost Your Fitness Journey with These Innovative Home Workout Routines",
      image: image1,
      category: "Travel",
      date: "Apr 13, 2023",
      comments: 3,
    },
    {
      id: 2,
      title: "Tips for Cultivating a Strong and Supportive Community",
      image: image2,
      category: "Travel",
      date: "Apr 23, 2023",
      comments: 3,
    },
    {
      id: 3,
      title: "Strategies for Dealing with Stress in Any Setting",
      image: image3,
      category: "Selfcare",
      date: "Jun 17, 2023",
      comments: 3,
    },
  ];

  const featurePost = {
    id: 1,
    title:
      "Boost Your Fitness Journey with These Innovative Home Workout Routines",
    image: image3,
    category: "Travel",
    date: "Apr 13, 2023",
  };

  return (
    <Container className="relative pb-4 px-0 border-t-[2px] mt-16 border-black overflow-hidden">
      <div className="pt-5 pb-7 text-md font-light flex items-center gap-2">
        <h3>Feature Post</h3>
        <ChevronRight className="w-5 h-5" />
      </div>
      
      {/* Hero Image */}
      <div className="relative block overflow-hidden">
        <div className="relative block ">
          <div className="relative h-[80vh] sm:h-[550px] sm:rounded-[4px] overflow-hidden">
            <Image
              src={featurePost.image}
              alt="hero"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              fill
              priority
              sizes="(max-width: 1280px) 100vw"
            />
          </div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-black/25" />

        {/* Content */}
        <div className="absolute inset-0 pt-5 text-white flex flex-col justify-between items-start text-center">
          <div className="px-4 flex-1 flex flex-col lg:max-w-[50%] text-left min-w-0">
            <Link href={`/post/${featurePost.id}`}  className="font-medium leading-9 transition-colors line-clamp-2 text-4xl">
              {featurePost.title}
            </Link>
            <div className="pt-2 flex items-center gap-2 text-sm">
              <Link href={`/${featurePost.category}`} className="font-medium bg-white text-black py-1 px-2 rounded-[2px]">
                {featurePost.category}
              </Link>
              <span className="text-gray-300">•</span>
              <span className="text-gray-200">{featurePost.date}</span>
            </div>
          </div>
          <div className="w-full">
            <Bottomtext posts={highlights} />
          </div>
        </div>
      </div>
    </Container>
  );
}

const Bottomtext = ({ posts }) => {
  return (
    <div className="flex flex-row text-left gap-4 border-t">
      <div className="px-4 py-6 flex flex-col gap-4 md:flex-row backdrop-blur-sm bg-white/10 w-full">
        {posts.map((post, index) => (
          <div key={index} className="flex-1 px-4">
            <Link href={`/post/${post.id}`} className="flex gap-5 group cursor-pointer">
              {/* Number and Image Container */}
              <div className="md:hidden lg:block relative w-[100px] aspect-square flex-shrink-0">
                <div className=" w-full h-full rounded-[4px] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={100}
                    height={100}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-between min-w-0">
                <h3 className="font-medium leading-snug hover:text-gray-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <div className="flex items-center gap-2 text-sm">
                  <Link href={`/${post.category}`} className="font-medium bg-white text-black py-1 px-2 rounded-[2px]">
                    {post.category}
                  </Link>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-600">{post.date}</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
