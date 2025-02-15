import React from "react";
import Container from "../common/Container";
import { useRouter } from "next/router";
import { SlashIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Header({ data }) {
  const router = useRouter();
  const pathSegments = router.asPath.split("/");
  const category = pathSegments[1];
  const blogs = pathSegments[2];

  return (
    <Container className="pt-20 border-b border-gray-200 pb-6 ">
      <div className="flex flex-row items-center gap-2 text-gray-500 text-sm ">
        <Link href={"/"} className=" text-black underline">
          Home
        </Link>
        <span>|</span>
        <Link href={`/${category}`} className="text-black underline ">
          {category}
        </Link>
        <span>|</span>
        <h3 className="">{blogs.replace(/-/g, " ")}</h3>
      </div>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20  lg:gap-32 ">
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-bold">{data.name}</h2>
            <p className="text-gray-500 w-full text-lg pt-3">
              {data.description}
            </p>
          </div>
          <div className="flex items-center space-x-4 text-sm">
              <Link href="#" className="text-black bg-gray-200 px-2 py-1 rounded-[4px]">
                {category}
              </Link>
              <span className="text-gray-500">21 May 2003</span>
              <div className="flex items-center">
                <span className="text-gray-500">by Hamza Ali</span>

              </div>
            </div>
        </div>
        <div className="border rounded-[4px] overflow-hidden">
          <Image
            src={data.image}
            alt={data.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </Container>
  );
}
