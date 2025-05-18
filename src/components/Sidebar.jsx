"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LifeBuoy,
  HardDrive,
  Star,
  Clipboard,
  ChevronLeft,
} from "lucide-react";
import SidebarModelCanvas from "@/components/InfinityModel"; // adjust path if needed

const sections = [
  {
    title: "",
    items: [
      { label: "Help Center", icon: LifeBuoy, href: "/helpcenter" },
      { label: "Works With", icon: HardDrive, href: "/devices" },
      { label: "Privacy Policy", icon: Star, href: "/privacypolicy" },
      { label: "Terms & Conditions", icon: Clipboard, href: "/termsconditions" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Check screen size and update sidebar state
  useEffect(() => {
    // Function to check screen width and set sidebar state
    const checkScreenSize = () => {
      setIsSidebarOpen(window.innerWidth >= 768); // 768px is the default md breakpoint
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const container = {
    closed: {
      width: 64, // Keep a minimal width for icons
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      width: "15%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        delayChildren: 0.05,
      },
    },
  };

  const label = {
    closed: { 
      opacity: 0, 
      width: 0,
      transition: { 
        type: "tween",
        duration: 0.15 
      } 
    },
    open: {
      opacity: 1,
      width: "auto",
      transition: { 
        type: "tween",
        duration: 0.2,
        delay: 0.1
      },
    },
  };

  const iconContainer = {
    closed: { 
      x: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 30
      } 
    },
    open: { 
      x: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 30
      } 
    }
  };

  const chevron = {
    closed: { rotate: 180 },
    open: { rotate: 0 }
  };

  // Toggle sidebar function
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <motion.aside
      initial={isSidebarOpen ? "open" : "closed"}
      animate={isSidebarOpen ? "open" : "closed"}
      variants={container}
      className="h-screen sticky top-0 flex flex-col justify-between overflow-hidden
               shadow-xl border-r border-white/10 rounded-r-2xl"
    >
      {/* Logo and Toggle Button */}
      <div className="flex items-center justify-between h-16 px-3">
        <motion.div variants={iconContainer} className="flex items-center justify-center">
          {/* <ThemeToggle /> */}
        </motion.div>
        
        {/* Toggle Button */}
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <motion.div variants={chevron}>
            <ChevronLeft size={20} />
          </motion.div>
        </button>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-transparent px-2">
          {sections.map((section) => (
            <div key={section.title} className="mt-2 mb-4">
              {section.title && (
                <motion.p
                  variants={label}
                  className="px-4 mb-2 text-xs uppercase tracking-widest whitespace-nowrap overflow-hidden"
                >
                  {section.title}
                </motion.p>
              )}

              {section.items.map(({ label: name, icon: Icon, href }) => {
                const active = pathname === href;
                return (
                  <Link href={href} key={name} className="block mb-1">
                    <motion.div
                      whileHover={{ 
                        scale: 1.03, 
                        backgroundColor: "rgba(255, 255, 255, 0.12)",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
                      }}
                      className={`flex items-center rounded-lg transition-all duration-100 ease-in-out mt-2 py-2
                                ${active 
                                  ? "shadow-md shadow-white/5" 
                                  : ""}`}
                    >
                      <div className={`flex items-center ${isSidebarOpen ? 'px-4' : 'justify-center w-full'}`}>
                        <motion.div variants={iconContainer} className="flex items-center justify-center">
                          <Icon size={20} className={`shrink-0 ${active ? "text-amber-400" : ""}`} />
                        </motion.div>
                        {isSidebarOpen && (
                          <motion.span
                            variants={label}
                            className="ml-4 px-4 font-medium whitespace-nowrap select-none overflow-hidden"
                          >
                            {name}
                          </motion.span>
                        )}
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          ))}
        {isSidebarOpen && (
          <div className="relative w-full h-full overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <SidebarModelCanvas />
            </div>
          </div>
        )}
        </nav>
      </div>

    </motion.aside>
  );
}