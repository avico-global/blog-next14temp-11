import React, { useState, useEffect, useRef } from "react";
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
  blog_list,
  searchContainerRef
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [openSearch, setOpenSearch] = useState(false);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const searchRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setOpenSearch(false);
        setSearchQuery('');
        setFilteredBlogs([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchToggle = () => {
    setOpenSearch(!openSearch);
    setSearchQuery('');
    setFilteredBlogs([]);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredBlogs([]);
      return;
    }

    const filtered = blog_list?.filter((blog) =>
      blog.title.toLowerCase().includes(query.toLowerCase())
    ) || [];
    setFilteredBlogs(filtered);
  };

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
            <div className="flex items-center justify-end gap-3 text-gray-500 relative" ref={searchRef}>
              <Search 
                className="cursor-pointer"
                onClick={handleSearchToggle}
              />
              
              {openSearch && (
                <>
                  <div className="fixed lg:absolute top-16 lg:right-0 lg:ml-auto w-full lg:w-fit flex flex-col items-start justify-center lg:justify-end left-0">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="lg:text-xl border  border-gray-300 inputField rounded-md outline-none bg-white shadow-xl p-2 px-3 mx-auto transition-opacity duration-300 ease-in-out opacity-100 w-5/6 lg:w-[650px] focus:ring-2 focus:ring-yellow-500"
                      placeholder="Search..."
                      autoFocus
                    />
                    {searchQuery && (
                      <div className="lg:absolute top-full p-1 lg:p-3 right-0 bg-white shadow-2xl rounded-md mt-1 z-10 mx-auto w-5/6 lg:w-[650px]">
                        {filteredBlogs?.length > 0 ? (
                          filteredBlogs.map((item, index) => (
                            <Link
                              key={index}
                              title={item.title}
                              href={`/${sanitizeUrl(item.article_category)}/${sanitizeUrl(item?.title)}`}
                            >
                              <div className="p-2 hover:bg-gray-200 border-b text-gray-600">
                                {item.title}
                              </div>
                            </Link>
                          ))
                        ) : (
                          <div className="p-2 text-gray-600">
                            No articles found.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </>
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
