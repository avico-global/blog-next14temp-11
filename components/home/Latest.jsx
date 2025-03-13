import React, { useState } from "react";
import Container from "../common/Container";
import Image from "next/image";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Button from "../common/Button";
import { sanitizeUrl } from "../lib/myFun";

export default function Latest({ blogs, imagePath }) {
  const [visibleBlogs, setVisibleBlogs] = useState(6);
  const displayedBlogs = blogs?.slice(0, visibleBlogs);

  const handleSeeMore = () => {
    setVisibleBlogs((prevVisibleBlogs) => prevVisibleBlogs + 6);
  };

  return (
    <Container className="border-t-[2px] mt-16 border-black">
      <div className="pt-5 pb-7 text-md font-light flex items-center gap-2">
        <h3>Latest</h3>
        <ChevronRight className="w-5 h-5" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Trending Post - Left Side */}
        {displayedBlogs?.[0] && (
          <div className="border-r border-gray-300">
            <BlogCard
              blog={displayedBlogs[0]}
              imagePath={imagePath}
              isFeature={true}
            />
          </div>
        )}

        {/* Blog Posts - Right Side */}
        {displayedBlogs?.length > 1 && (
          <div className="space-y-5">
            {displayedBlogs.slice(1, 4).map((blog, index) => (
              <React.Fragment key={index}>
                <BlogCard blog={blog} imagePath={imagePath} isFeature={false} />
                {index !== displayedBlogs.slice(1).length - 1 && (
                  <div className="border-b border-gray-300"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {visibleBlogs < blogs?.length && (
        <Button onClick={handleSeeMore} className="mt-10 mx-auto block">
          See More Articles
        </Button>
      )}
    </Container>
  );
}

function BlogCard({ blog, imagePath, isFeature }) {
  return (
    <article className="group cursor-pointer">
      <Link
        href={`/${sanitizeUrl(
          blog.title
        )}`}
        title={blog.title}
      >
        {isFeature ? (
          // Feature card layout
          <>
            <div className="relative h-[400px] rounded-[4px] overflow-hidden mb-6">
              <Image
                src={
                  blog.image ? `${imagePath}/${blog.image}` : "/no-image.png"
                }
                alt={blog.altImage || blog.tagline || "Featured Post"}
                title={blog.altImage || blog.tagline || "Featured Post"}
                fill
                className="object-cover transform transition-all duration-500 ease-in-out group-hover:scale-110"
              />
            </div>
            <div className="space-y-3 pr-3">
              <div className="flex items-center gap-3 text-sm">
                <span className="text-gray-600">{blog.article_category}</span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-600">{blog.published_at}</span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-600">by {blog.author}</span>
              </div>
              <h2 className="text-2xl font-bold leading-snug transition-all duration-300 group-hover:text-primary group-hover:translate-x-1">
                {blog.title}
              </h2>
              <p className="text-gray-600 leading-relaxed transition-all duration-300 group-hover:translate-x-1">
                {blog.tagline}
              </p>
            </div>
          </>
        ) : (
          // Regular card layout
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="relative w-full sm:w-[50%] aspect-[5.3/3] flex-shrink-0 rounded-lg overflow-hidden">
              <Image
                src={
                  blog.image ? `${imagePath}/${blog.image}` : "/no-image.png"
                }
                alt={blog.altImage || blog.tagline || "Blog Post"}
                title={blog.altImage || blog.tagline || "Blog Post"}
                fill
                className="object-cover transform transition-all duration-500 ease-in-out group-hover:scale-110"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h2 className="text-xl font-bold leading-snug transition-all duration-300 group-hover:text-primary group-hover:translate-x-1">
                  {blog.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 transition-all duration-300 group-hover:translate-x-1">
                  {blog.tagline}
                </p>
              </div>
              <div className="flex items-center gap-3 text-sm border-t pt-3 border-gray-300">
                <span className="text-gray-600">{blog.published_at}</span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-600">by {blog.author}</span>
              </div>
            </div>
          </div>
        )}
      </Link>
    </article>
  );
}
