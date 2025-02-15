import React from "react";
import data from "@/jason/data.json";
import Rightbar from "../common/Rightbar";
import Container from "../common/Container";
import image2 from "@/public/images/codesupply2.webp";
import image3 from "@/public/images/codesupply3.1.webp";
import image1 from "@/public/images/codesupply1.webp";

export default function Text() {
  const rightbarPosts = [
    {
      id: 1,
      title:
        "Nurturing   Your Creative Side for a More Fulfilling Daily Routine",
      category: "Selfcare",
      date: "Aug 22, 2023",
      image: image1,
    },
    {
      id: 2,
      title: "Elevating Everyday Moments with Simple Yet Profound Changes",
      category: "Style",
      date: "Aug 19, 2023",
      image: image2,
    },
    {
      id: 3,
      title: "Balancing Modern Technology, Traditional Living Practice",
      category: "Travel",
      date: "Aug 12, 2023",
      image: image3,
    },
    {
      id: 4,
      title: "Nurturing Your Creative Side for a More Fulfilling Daily Routine",
      category: "Selfcare",
      date: "Aug 22, 2023",
      image: image1,
    },
    {
      id: 5,
      title: "Elevating Everyday Moments with Simple Yet Profound Changes",
      category: "Style",
      date: "Aug 19, 2023",
      image: image2,
    },
    {
      id: 6,
      title: "Balancing Modern Technology, Traditional Living Practice",
      category: "Travel",
      date: "Aug 12, 2023",
      image: image3,
    },
  ];


  return (
    <Container>
      <div className="flex flex-col gap-10 lg:gap-4 lg:flex-row py-20 ">
        <div className="lg:w-[75%] px-32 ">
          {data.map((item) => (
            <div key={item.id}>
              <h2 className="text-3xl font-bold">{item.title1}</h2>
              <p className="text-gray-500 text-xl leading-9">{item.description1}</p>
              <h2 className="text-2xl font-bold pt-10">{item.title2}</h2>
              <p className="text-gray-500 text-xl leading-9">{item.description2}</p>
              <h2 className="text-2xl font-bold pt-10">{item.title3}</h2>
              <p className="text-gray-500 text-xl leading-9">{item.description3}</p>
            </div>
          ))}
        </div>
        <div className="lg:w-[25%] border-l border-gray-300 pl-3">
          <Rightbar posts={rightbarPosts} />
        </div>
      </div>
    </Container>
  );
}
