import React from "react";
import Container from "../common/Container";
import Blogs from "./Section";
import Rightbar from "../common/Rightbar";
import image2 from "@/public/images/codesupply2.webp";
import image3 from "@/public/images/codesupply3.1.webp";
import image1 from "@/public/images/codesupply1.webp";
import image4 from "@/public/images/codesupply4.webp";
import { ChevronRight } from "lucide-react";

export default function LatestPost() {
  const data = [
    {
      title: "Cultivating a Garden of Wellness and Tranquility",
      description:
        "Insights into daily wellness and effective home decor strategies are shared to enhance everyday living and create nurturing spaces.",
      image: image1,
      date: "May 13, 2023",
      author: "Elliot Alderson",
      category: "Style",
      link: "/trending",
    },
    {
      title: "Thriving in Urban Environments: Tips for City Living",
      description:
        "In the Age of Information, news media faces both unprecedented opportunities and significant challenges.",
      image: image2,
      date: "Jul 10, 2023",
      author: "Elliot Alderson",
      category: "Selfcare",
      link: "/trending",
    },
    {
      title: "Trending3",
      description: "Trending blogs",
      image: image3,
      date: "2024-01-01",
      author: "John Doe",
      link: "/trending",
    },
    {
      title: "Trending4",
      description: "Trending blogs",
      image: image4,
      date: "2024-01-01",
      author: "John Doe",
      link: "/trending",
    },
    {
      title: "Cultivating a Garden of Wellness and Tranquility",
      description:
        "Insights into daily wellness and effective home decor strategies are shared to enhance everyday living and create nurturing spaces.",
      image: image1,
      date: "May 13, 2023",
      author: "Elliot Alderson",
      category: "Style",
      link: "/trending",
    },
    {
      title: "Thriving in Urban Environments: Tips for City Living",
      description:
        "In the Age of Information, news media faces both unprecedented opportunities and significant challenges.",
      image: image2,
      date: "Jul 10, 2023",
      author: "Elliot Alderson",
      category: "Selfcare",
      link: "/trending",
    },
    {
      title: "Trending3",
      description: "Trending blogs",
      image: image3,
      date: "2024-01-01",
      author: "John Doe",
      link: "/trending",
    },
  ];
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
    <Container className="border-t-[2px] mt-16 border-black">
      <div className="pt-5 pb-7 text-md font-light flex items-center  gap-2">
        <h3> Latest</h3>
        <ChevronRight className="w-5 h-5" />
      </div>
      <div className="flex flex-col gap-10 lg:gap-4 lg:flex-row   ">
        <div className="lg:w-[75%]">
          <Blogs posts={data} />
        </div>

        <div className="lg:w-[25%] border-l border-gray-300 pl-3">
          <Rightbar/>
        </div>
      </div>
    </Container>
  );
}
