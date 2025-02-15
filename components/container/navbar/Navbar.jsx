import React, { useState } from "react";
import Container from "../../common/Container";
import Link from "next/link";
import Fullcontainer from "../../common/Fullcontainer";
import { MenuIcon, Search } from "lucide-react";
import { useEffect } from "react";
import MobileSidebar from "../navbar/MobileSidebar";

export default function Navbar() {
  const data = [
    {
      name: "Food",
      link: "/food",
    },
    {
      name: "Fashion",
      link: "/fashion",
    },
    {
      name: "Travel",
      link: "/travel",
    },
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const li = "text-black text-lg relative after:absolute after:bottom-0 after:right-0 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setVisible(lastScrollY > currentScrollY || currentScrollY < 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <Fullcontainer
        className={`z-50 fixed top-0 left-0 w-full bg-white shadow-md px-4 transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Container className="py-4">
          <div className="flex justify-between items-center">
            {/* Menu Icon */}
            <div>
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="hover:bg-gray-100 p-2 rounded-full transition-colors lg:hidden "
              >
                <MenuIcon />
              </button>
              <Link href="/" className="text-2xl font-bold capitalize hidden lg:block ">maag</Link>
            </div>

            {/* Desktop Navigation */}
            <div className="gap-6 items-center hidden lg:flex">
              <Link href="/" className={li}>
                Home
              </Link>
              <div className="flex items-center gap-4">
                {data.map((item, index) => (
                  <Link href={item.link} className={li} key={index}>
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Search Icon */}
            <div>
              <Search />
            </div>
          </div>
        </Container>
      </Fullcontainer>

      {/* Mobile Sidebar */}
      <MobileSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
    </>
  );
}
