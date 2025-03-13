import React from "react";
import Container from "../common/Container";
import Image from "next/image";
import image from "@/public/images/codesupply3.1.webp";
import { ChevronRight } from "lucide-react";

import Link from "next/link";
import { sanitizeUrl } from "../lib/myFun";

export default function Feature({ blog_list, imagePath }) {
  const featuredPost = blog_list?.find((item) => item.isFeatured) || null;

  const remainingPosts =
    blog_list?.filter((item) => !item.isFeatured).slice(0, 3) || [];

  return (
    <Container className="relative pb-4 px-0 border-t-[2px] mt-16 border-black overflow-hidden">
      <div className="pt-5 pb-7 text-md font-light flex items-center gap-2">
        <h3>Feature Post</h3>
        <ChevronRight className="w-5 h-5" />
      </div>

      {featuredPost && (
        <div className="relative block overflow-hidden">
          <div className="relative block ">
            <div className="relative h-[80vh] sm:h-[550px] sm:rounded-[4px] overflow-hidden group">
              <Image
                src={
                  featuredPost.image
                    ? `${imagePath}/${featuredPost.image}`
                    : "/no-image.png"
                }
                alt={
                  featuredPost.altImage ||
                  featuredPost.tagline ||
                  "Article Thumbnail"
                }
                title={
                  featuredPost.altImage ||
                  featuredPost.tagline ||
                  "Article Thumbnail"
                }
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                fill
                priority
                sizes="(max-width: 1280px) 100vw"
              />
              <div className="absolute inset-0 bg-black/25 transition-opacity duration-500 group-hover:bg-black/40" />
            </div>
          </div>

          <div className="absolute inset-0 pt-5 text-white flex flex-col justify-between items-start text-center">
            <div className="px-4 flex-1 flex flex-col lg:max-w-[50%] text-left min-w-0">
              <Link
                href={`/${encodeURI(sanitizeUrl(featuredPost.title))}`}
                className="font-medium leading-9 transition-all duration-500 ease-out line-clamp-2 text-4xl group-hover:translate-y-1"
                title={featuredPost.title}
              >
                {featuredPost.title}
              </Link>
              <div className="pt-2 flex items-center gap-2 text-sm transition-all duration-500 ease-out group-hover:translate-y-1">
                <Link
                  href={`/${featuredPost.article_category}`}
                  className="font-medium bg-white text-black py-1 px-2 rounded-[2px] transition-transform duration-300 ease-out hover:scale-105"
                  title={featuredPost.article_category}
                >
                  {featuredPost.article_category}
                </Link>
                <span className="text-gray-300">•</span>
                <span className="text-gray-200">
                  {featuredPost.published_at}
                </span>
              </div>
            </div>
            <div className="w-full">
              <Bottomtext posts={remainingPosts} imagePath={imagePath} />
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

const Bottomtext = ({ posts, imagePath }) => {
  return (
    <div className="flex flex-row text-left gap-4 border-t">
      <div className="px-4 py-6 flex flex-col gap-4 md:flex-row backdrop-blur-sm bg-white/10 w-full">
        {posts.map((post, index) => (
          <div key={index} className="flex-1 px-4">
            <div className="flex gap-5 group cursor-pointer">
              <div className="md:hidden lg:block relative w-[100px] aspect-square flex-shrink-0">
                <div className="w-full h-full rounded-[4px] overflow-hidden">
                  <Image
                    src={
                      post.image
                        ? `${imagePath}/${post.image}`
                        : "/no-image.png"
                    }
                    alt={post.altImage || post.tagline || "Article Thumbnail"}
                    title={post.altImage || post.tagline || "Article Thumbnail"}
                    width={100}
                    height={100}
                    className="object-cover w-full h-full transition-all duration-500 ease-out group-hover:scale-110 group-hover:brightness-90"
                  />
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between min-w-0">
                <Link
                  href={`/${encodeURI(sanitizeUrl(post.title))}`}
                  className="font-medium leading-snug transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:text-gray-200"
                >
                  {post.title}
                </Link>
                <div className="flex items-center gap-2 text-sm transition-all duration-300 ease-out group-hover:translate-x-1">
                  <Link
                    href={`/${post.article_category}`}
                    className="font-medium bg-white text-black py-1 px-2 rounded-[2px] transition-transform duration-300 ease-out hover:scale-105"
                    title={post.article_category}
                  >
                    {post.article_category}
                  </Link>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-600">{post.published_at}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
