import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "@/components/container/navbar/Navbar.jsx";
import Articles from "@/components/categories/Articles.jsx";
import Header from "@/components/categories/Header.jsx";
import image1 from "@/public/images/codesupply3.1.webp";
import image2 from "@/public/images/codesupply3.2.webp";
import image3 from "@/public/images/codesupply3.3.webp";
import image4 from "@/public/images/codesupply3.4.webp";
import image5 from "@/public/images/codesupply4.webp";
import image6 from "@/public/images/codesupply3.1.webp";
import Rightbar from "@/components/common/Rightbar";
import Container from "@/components/common/Container";
import Footer from "@/components/container/footer/Footer";

export default function index() {
  const router = useRouter();
  const { categories } = router.query;
  const [client, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);
  
  if (!client) return <div>Loading...</div>;

  const category = {
    id: 1,
    name: "Travel",
    description:
      "Travel is a great way to explore the world and learn about different cultures.",
  };

  const articles = [
    {
      id: 4,
      title: "Finding Beauty and Inspiration in Your Everyday Surroundings",
      category: "Selfcare",
      date: "Jul 23, 2023",
      author: "Elliot Alderson",
      comments: 5,
      image: image4,
    },
    {
      id: 5,
      title: "Finding Beauty and Inspiration in Your Everyday Surroundings",
      category: "Selfcare",
      date: "Jul 23, 2023",
      author: "Elliot Alderson",
      image: image5,
    },
    {
      id: 6,
      title: "Finding Beauty and Inspiration in Your Everyday Surroundings",
      category: "Selfcare",
      date: "Jul 23, 2023",
      author: "Elliot Alderson",
      image: image6,
    },
    {
      id: 1,
      title: "Finding Beauty and Inspiration in Your Everyday Surroundings",
      category: "Selfcare",
      date: "Jul 23, 2023",
      author: "Elliot Alderson",
      comments: 5,
      image: image1,
    },
    {
      id: 2,
      title: "Finding Beauty and Inspiration in Your Everyday Surroundings",
      category: "Selfcare",
      date: "Jul 23, 2023",
      author: "Elliot Alderson",
      comments: 5,
      image: image2,
    },
    {
      id: 3,
      title: "Finding Beauty and Inspiration in Your Everyday Surroundings",
      category: "Selfcare",
      date: "Jul 23, 2023",
      author: "Elliot Alderson",
      comments: 5,
      image: image3,
    },
    {
      id: 4,
      title: "Finding Beauty and Inspiration in Your Everyday Surroundings",
      category: "Selfcare",
      date: "Jul 23, 2023",
      author: "Elliot Alderson",
      comments: 5,
      image: image4,
    },
    {
      id: 5,
      title: "Finding Beauty and Inspiration in Your Everyday Surroundings",
      category: "Selfcare",
      date: "Jul 23, 2023",
      author: "Elliot Alderson",
      image: image5,
    },
    {
      id: 6,
      title: "Finding Beauty and Inspiration in Your Everyday Surroundings",
      category: "Selfcare",
      date: "Jul 23, 2023",
      author: "Elliot Alderson",
      image: image6,
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
  ];

  return (
    <div>
      <Navbar />
      <Header data={category} category={categories} />
      <Container className=" flex flex-col gap-10 lg:gap-4 lg:flex-row  ">
        <div className="lg:w-[75%]">
          <Articles
            articles={articles}
          category={categories}
        />
        </div>
        <div className="border-[0.5px] border-gray-300"></div>
        <div className="lg:w-[25%]">
          <Rightbar  posts={rightbarPosts}  />
        </div>
      </Container>
      <Footer/>
    </div>
  );
}
