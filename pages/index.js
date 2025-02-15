import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/container/navbar/Navbar";
import Hero from "@/components/home/Hero";
import Footer from "@/components/container/footer/Footer";
import Trending from "@/components/home/Latest";
import Latest from "@/components/home/Latest";
import LatestPost from "@/components/home/LatestPost";
import Rightbar from '../components/common/Rightbar'
import Feature from '@/components/home/Feature'
import Popular from '@/components/common/Popular'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Latest/>
      <Popular />
      <Feature/>
      <LatestPost/>
      <Footer />
    </div>
  );
}
