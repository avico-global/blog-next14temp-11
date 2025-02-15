import React from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

export default function MobileSidebar({ isOpen, onClose }) {
  const menuItems = [
    {
      name: "Home",
      link: "/",
    },
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
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Links */}
          <nav className="mt-8">
            <ul className="space-y-4">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link 
                    href={item.link}
                    className="block py-2 text-lg hover:text-gray-600 transition-colors"
                    onClick={onClose}
                  >
                    {item.name}
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
        />
      )}
    </>
  );
}