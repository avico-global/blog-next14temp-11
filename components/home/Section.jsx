import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Section({ posts }) {


  return (
    <div className="space-y-5">
      {posts.map((blog, index) => (
        <article key={index} className="cursor-pointer">
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="relative w-full sm:w-[50%] aspect-[5.3/3] flex-shrink-0 rounded-lg overflow-hidden">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h2 className="text-xl font-bold leading-snug hover:text-gray-600 transition-colors">
                  {blog.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                  {blog.description}
                </p>
              </div>
              <div className="flex items-center gap-3 text-sm border-t pt-3 border-gray-300">
                <span className="text-gray-600">{blog.date}</span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-600">by {blog.author}</span>
              </div>
            </div>
          </div>
          {/* Add bottom border except for last item */}
          {index !== posts.length - 1 && (
            <div className="border-b border-gray-300 mt-5"></div>
          )}
        </article>
      ))}
    </div>
  );
}
