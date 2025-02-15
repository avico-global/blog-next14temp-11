import React, { useState } from "react";
import Container from "../common/Container";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import image1 from "@/public/images/codesupply1.webp";
import image2 from "@/public/images/codesupply2.webp";
import image3 from "@/public/images/codesupply3.1.webp";
import image4 from "@/public/images/codesupply4.webp";

const highlights = [
  { id: 1, title: "Boost Your Fitness Journey", image: image1, category: "Travel", date: "Apr 13, 2023", comments: 3 },
  { id: 2, title: "Cultivating a Strong Community", image: image2, category: "Travel", date: "Apr 23, 2023", comments: 3 },
  { id: 3, title: "Strategies for Dealing with Stress", image: image3, category: "Selfcare", date: "Jun 17, 2023", comments: 3 },
  { id: 4, title: "Sustainable Living Solutions", image: image4, category: "Style", date: "Apr 25, 2023", comments: 5 },
  { id: 5, title: "Fitness Home Workout Routines", image: image1, category: "Travel", date: "Apr 13, 2023", comments: 3 },
];

export default function Popular() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = highlights.length - 4; // Adjust based on visible items

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? maxIndex : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? 0 : prevIndex - 1));
  };

  return (
    <Container className="pb-10 border-t-[2px] mt-16 border-black relative">
      <div className="pt-5 pb-7 text-md font-light flex items-center gap-2">
        <h3>Latest</h3>
        <ChevronRight className="w-5 h-5" />
      </div>

      {/* Header with Navigation (Visible only on LG screens) */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Highlights</h2>
        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`p-2 rounded-full transition-colors ${
              currentIndex === 0 ? "text-gray-300 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className={`p-2 rounded-full transition-colors ${
              currentIndex >= maxIndex ? "text-gray-300 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Slider */}
      <div className="relative">
        {/* Mobile Navigation Arrows */}
        <div className="absolute inset-0 flex justify-between items-center px-2 z-10 lg:hidden">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`p-2 bg-black/50 text-white rounded-full ${
              currentIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-black/70"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className={`p-2 bg-black/50 text-white rounded-full ${
              currentIndex >= maxIndex ? "opacity-30 cursor-not-allowed" : "hover:bg-black/70"
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Slider Track */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {highlights.map((post) => (
              <div key={post.id} className="w-[60%] sm:w-[50%] md:w-[33.33%] lg:w-[25%] flex-shrink-0 px-2">
                <Link href="/">
                  <article className="group cursor-pointer relative overflow-hidden">
                    <div className="relative aspect-[3/4] rounded-[4px] overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
                      <div className="absolute inset-0 py-4 flex flex-col justify-between">
                        <h3 className="px-4 text-white font-medium text-lg leading-tight group-hover:text-gray-200 transition-colors">
                          {post.title}
                        </h3>
                        <div className="items-center border-t pt-4 border-white/50 text-xs text-white">
                          <div className="px-4 flex items-center gap-2">
                            <span className="bg-white text-black px-4 py-1 rounded-[4px]">
                              {post.category}
                            </span>
                            <span>{post.date}</span>
                            <span>•</span>
                            <span>{post.comments}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
