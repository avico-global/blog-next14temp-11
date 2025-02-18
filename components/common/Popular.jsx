import React, { useState } from "react";
import Container from "../common/Container";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dayjs from "dayjs";
import { sanitizeUrl } from "../lib/myFun";

export default function Popular({ articles, imagePath }) {
  const highlights = articles?.filter((item) => item.isPopular);
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = highlights?.length - 4; // Adjust based on visible items

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? maxIndex : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? 0 : prevIndex - 1));
  };

  if (!highlights?.length) return null;

  return (
    <Container className="pb-10 border-t-[2px] mt-16 border-black relative">
      <div className="pt-5 pb-7 text-md font-light flex items-center gap-2">
        <h3>Popular</h3>
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
            {highlights.map((post, index) => (
              <div 
                key={post.id || `post-${index}`}
                className="w-[60%] sm:w-[50%] md:w-[33.33%] lg:w-[25%] flex-shrink-0 px-2"
              >
                <Link 
                  href={`/${sanitizeUrl(post.article_category)}/${sanitizeUrl(post.title)}`}
                  title={post.title}
                >
                  <article className="group cursor-pointer relative overflow-hidden">
                    <div className="relative aspect-[3/4] rounded-[4px] overflow-hidden">
                      <Image
                        src={`${imagePath}/${post.image}`}
                        alt={post.altImage || post.tagline || "No Thumbnail Found"}
                        title={post.altImage || post.tagline || post.title}
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
                              {post.article_category}
                            </span>
                            <span>{dayjs(post.published_at).format("MMM D, YYYY")}</span>
                            <span>•</span>
                            <span>{post.author}</span>
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
