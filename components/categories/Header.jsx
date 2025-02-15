import React from "react";
import Container from "../common/Container";
import Link from "next/link";

export default function Header({ data, category }) {
  return (
    <Container className="pt-20">
      <div className="flex flex-row items-center gap-2 text-gray-500 text-sm ">
        <Link href={"/"} className=" text-black underline">Home</Link>
        <span>|</span>
        <h3 className="">{category}</h3>
      </div>
      <div className="mt-10" >
        <h2 className="text-4xl font-bold">{data.name}</h2>
        <p className="text-gray-500 w-full text-lg md:w-1/2 pt-3">{data.description}</p>
      </div>
    </Container>
  );
}
