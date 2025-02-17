import React, { useState, useEffect } from "react";
import Container from "../../common/Container";
import Link from "next/link";
import Fullcontainer from "../../common/Fullcontainer";
import { MenuIcon, Search } from "lucide-react";
import MobileSidebar from "../navbar/MobileSidebar";
import { sanitizeUrl } from "@/components/lib/myFun";
import Logo from "./Logo";

export default function Navbar({ 
  staticPages,
  categories,
  logo,
  imagePath,
  filteredBlogs,
  isActive,
  searchContainerRef,
  handleSearchToggle,
  handleSearchChange,
  searchQuery,
  openSearch 
}) {
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
            <div>
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="hover:bg-gray-100 p-2 rounded-full transition-colors lg:hidden"
              >
                <MenuIcon />
              </button>
                
                <Logo logo={logo} imagePath={imagePath} />

            </div>

            {/* Desktop Navigation */}
            <div className="gap-6 items-center hidden lg:flex">
              {staticPages?.map((item, index) => (
                <Link 
                  href={item.href} 
                  className={li} 
                  key={index}
                  title={item.page}
                >
                  {item.page}
                </Link>
              ))}
              <div className="flex items-center gap-4">
                {categories?.map((item, index) => (
                  <Link 
                    href={`/${sanitizeUrl(item.title)}`} 
                    className={li} 
                    key={index}
                    title={item.title}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Search Section */}
            <div className="relative" ref={searchContainerRef}>
              <Search 
                className="cursor-pointer"
                onClick={handleSearchToggle}
              />
              
              {openSearch && (
                <div className="fixed lg:absolute top-16 right-0 w-full lg:w-[650px]">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full p-2 border rounded-md shadow-xl"
                    placeholder="Search..."
                    autoFocus
                  />
                  
                  {searchQuery && (
                    <div className="absolute w-full bg-white shadow-2xl rounded-md mt-1">
                      {filteredBlogs?.length > 0 ? (
                        filteredBlogs.map((item, index) => (
                          <Link
                            key={index}
                            href={`/${sanitizeUrl(item.article_category)}/${sanitizeUrl(item.title)}`}
                            title={item.title}
                          >
                            <div className="p-2 hover:bg-gray-200 border-b">
                              {item.title}
                            </div>
                          </Link>
                        ))
                      ) : (
                        <div className="p-2">No articles found.</div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </Container>
      </Fullcontainer>

      <MobileSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        staticPages={staticPages}
        categories={categories}
      />
    </>
  );
}
