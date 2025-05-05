import React, { useState, useEffect, useRef } from "react";
import Container from "../../common/Container";
import Link from "next/link";
import Fullcontainer from "../../common/Fullcontainer";
import { MenuIcon, Search } from "lucide-react";
import MobileSidebar from "../navbar/MobileSidebar";
import { sanitizeUrl } from "@/components/lib/myFun";
import Logo from "./Logo";
import Image from "next/image";

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
  const searchResultsRef = useRef(null);

  // Add trending blogs state
  const trendingBlogs = blog_list?.slice(2, 6) || [];

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
      if (
        searchRef.current && 
        !searchRef.current.contains(event.target) && 
        !event.target.closest('input[type="text"]') &&
        !searchResultsRef.current?.contains(event.target)
      ) {
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
    if (!openSearch) {
      setSearchQuery('');
      setFilteredBlogs([]);
    }
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
              <div className="flex items-center capitalize gap-4">
                {categories?.map((item, index) => (
                  <Link 
                    href={`/category/${sanitizeUrl(item.title)}`} 
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
            </div>
          </div>
        </Container>
      </Fullcontainer>

      {/* New Search Overlay */}
      {openSearch && (
        <div className="fixed top-[72px] left-0 w-full bg-white shadow-lg z-40">
          <Container className="py-8">
            <h2 className="text-2xl font-bold mb-6">What are You Looking For?</h2>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full text-xl border border-gray-300 rounded-md outline-none bg-white p-4 mb-6  focus:ring-gray-500"
              placeholder="Search..."
              autoFocus
            />

            {searchQuery ? (
              // Search Results
              <div ref={searchResultsRef} className="border-t pt-6">
                {filteredBlogs?.length > 0 ? (
                  <div className="space-y-4">
                    {filteredBlogs.map((item, index) => (
                      <Link
                        key={index}
                        href={`/${sanitizeUrl(item?.title)}`}
                        title={item.title}
                        className="w-full text-left"
                      >
                        <div className="p-3 hover:bg-gray-100 rounded-md transition-colors">
                          <h3 className="font-medium">{item.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{item.tagline}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-600 py-8">
                    No articles found.
                  </div>
                )}
              </div>
            ) : (
              // Trending Section
              <div className="border-t pt-6">
                <h3 className="text-xl font-semibold mb-6">Trending now</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {trendingBlogs.map((blog, index) => (
                    <Link
                      key={index}
                      href={`/${sanitizeUrl(blog.title)}`}
                      className="group"
                    >
                      <div className="relative aspect-[16/9] mb-3 rounded-lg overflow-hidden">
                        <Image
                          src={blog.image ? `${imagePath}/${blog.image}` : "/no-image.png"}
                          alt={blog.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h4 className="font-bold group-hover:text-gray-600 transition-colors mb-3">
                        {blog.title}
                      </h4>
                      <div className="flex items-center justify-between text-sm text-gray-600 border-t pt-3 border-gray-300">
                        <span>by {blog.author}</span>
                        <span>{blog.published_at}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </Container>
        </div>
      )}

      <MobileSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        staticPages={staticPages}
        categories={categories}
      />
    </>
  );
}
