import React from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "../common/Container";



export default function Articles({ articles }) {
  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {articles.map((article, index) => (
          <div key={index} className="flex flex-col pt-10">
            <Link href={`/${article.category}/${article.title.replace(/\s+/g, '-')}`}>
              <div className="relative w-full h-64 md:h-48 mb-4 overflow-hidden rounded-[4px] ">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover  hover:scale-105 transition-all duration-300"
                />
              </div>
            </Link>

            <Link href="#">
              <h2 className="text-xl font-semibold mb-2 hover:text-gray-700">
                {article.title}
              </h2>
            </Link>

            <div className="flex items-center space-x-4 text-sm">
              <Link href="#" className="text-black bg-gray-200 px-2 py-1 rounded-[4px]">
                {article.category}
              </Link>
              <span className="text-gray-500">{article.date}</span>
              <div className="flex items-center">
                <span className="text-gray-500">by</span>
                <Link href="#" className="ml-1 hover:text-gray-700">
                  {article.author}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
