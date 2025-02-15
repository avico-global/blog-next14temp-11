import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Article/Header";
import Navbar from "@/components/container/navbar/Navbar";
import Footer from "@/components/container/footer/Footer";
import image from "@/public/images/codesupply4.webp";
import Text from "@/components/Article/Text";
import Popular from "@/components/common/Popular";
export default function blogs() {
  const router = useRouter();
  const [client, setClient] = useState(false);
  const { blogs } = router.query;
  useEffect(() => {
    setClient(true);
  }, []);
  if (!client) return <div>Loading...</div>;

  const headerdata = {
    name: "title",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam minima, molestias voluptas, harum illum corrupti velit voluptate ullam voluptatibus sapiente, facere fugit deleniti? Ratione fugiat ipsam dignissimos necessitatibus nisi alias.",
    image: image,
  };


  return (
    <>
      <Navbar />
      <Header data={headerdata} />
      <Text/>
      <Popular/>
      <Footer/>
    </>
  );
}
