import React from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "../common/Container";
import Rightbar from "../common/Rightbar";
import { ChevronRight } from "lucide-react";
import { sanitizeUrl } from "../lib/myFun";

export default function LatestPost({ blog_list = [], imagePath, about_me }) {
  // Remove the filter to show all blogs
  const allPosts = blog_list.slice(0, 8);

  return (
    <Container className="border-t-[2px] mt-16 border-black">
      <div className="pt-5 pb-7 text-md font-light flex items-center gap-2">
        <h3>Most Popular</h3>
        <ChevronRight className="w-5 h-5" />
      </div>
      <div className="flex flex-col gap-10 lg:gap-4 lg:flex-row">
        <div className="lg:w-[75%]">
          <div className="space-y-5">
            {allPosts.map((blog, index) => (
              <Link
                href={`/${sanitizeUrl(blog.title)}`}
                key={blog.id || index}
                title={`Read more about ${blog.title}`}
              >
                <article className="cursor-pointer group">
                  <div className="flex flex-col sm:flex-row gap-5">
                    <div className="relative w-full sm:w-[50%] aspect-[5.3/3] flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={`${imagePath}/${blog.image || "no-image.png"}`}
                        alt={blog.altImage || blog.title}
                        title={blog.altImage || blog.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between space-y-3 p-4 ">
                      <div>
                        <h2 className="text-xl font-bold leading-snug transition-colors duration-300 group-hover:text-gray-600">
                          {blog.title}
                        </h2>
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 transition-colors duration-300 group-hover:text-gray-900">
                          {blog.tagline}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 text-sm border-t pt-3 border-gray-300">
                        <span className="text-gray-600">
                          {blog.published_at}
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="text-gray-600">by {blog.author}</span>
                      </div>
                    </div>
                  </div>
                  {index !== allPosts.length - 1 && (
                    <div className="border-b border-gray-300 mt-5"></div>
                  )}
                </article>
              </Link>
            ))}
          </div>
        </div>

        <div className="lg:w-[25%] border-l border-gray-300 pl-3">
          <Rightbar
            about_me={about_me}
            blog_list={blog_list}
            imagePath={imagePath}
          />
        </div>
      </div>
    </Container>
  );
}
