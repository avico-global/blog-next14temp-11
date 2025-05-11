import React from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { sanitizeUrl } from "@/components/lib/myFun";

export default function MobileSidebar({ isOpen, onClose, staticPages, categories }) {
  return (
    <>
      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full w-[300px] bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4">
          {/* Close button */}
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
            title="Close Menu"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Links */}
          <nav className="mt-8">
            <ul className="space-y-4">
              {/* Static Pages */}
              {staticPages?.map((item, index) => (
                <li key={`static-${index}`}>
                  <Link 
                    href={item.href}
                    className="block py-2 text-lg hover:text-gray-600 transition-colors"
                    onClick={onClose}
                    title={item.page}
                  >
                    {item.page}
                  </Link>
                </li>
              ))}
              
              {/* Categories */}
              {categories?.map((item, index) => (
                <li key={`category-${index}`}>
                  <Link 
                    href={`/category/${sanitizeUrl(item.title)}`}
                    className="block py-2 text-lg hover:text-gray-600 transition-colors"
                    onClick={onClose}
                    title={item.title}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
          title="Close Menu Overlay"
        />
      )}
    </>
  );
}