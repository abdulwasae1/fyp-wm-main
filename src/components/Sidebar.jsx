"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  HardDrive,
  Star,
  FileText,
  Zap,
  Wrench,
  Boxes,
  UserCircle,
  Settings as SettingsIcon,
  LifeBuoy,
  Clipboard,
  ChevronLeft,
  SunMedium,
} from "lucide-react";
import SidebarModelCanvas from "@/components/InfinityModel"; // adjust path if needed
import { ThemeToggle } from "@/components/ThemeToggle"

// import { Canvas } from '@react-three/fiber';
// import { InfinityModel } from './InfinityModel';

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

  const container = {
    closed: {
      width: 68,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      width: 260,
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

  return (
<motion.aside
  initial="open"
  animate="open"
  variants={container}
  style={{ }}
  className="h-screen sticky top-0 flex flex-col justify-between overflow-hidden
             shadow-xl border-r border-white/10 rounded-r-2xl"
>
  {/* Logo */}
  <div className="flex text-center h-16 px-5">
    <motion.div variants={iconContainer} className="flex items-center justify-center">
      {/* <ThemeToggle /> */}
    </motion.div>
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
              className="px-4 mb-2 text-[10px] uppercase tracking-widest whitespace-nowrap overflow-hidden"
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
                  <div className="flex items-center px-4 w-full">
                    <motion.div variants={iconContainer} className="flex items-center justify-center">
                      <Icon size={20} className={`shrink-0 ${active ? "text-amber-400" : ""}`} />
                    </motion.div>
                    <motion.span
                      variants={label}
                      className="ml-12 font-medium whitespace-nowrap select-none overflow-hidden pl-4"
                    >
                      {name}
                    </motion.span>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      ))}
          {/* 3D Model at bottom */}
    <div className="w-full h-80 px-2 py-4">
      <SidebarModelCanvas />
    </div>
    </nav>


  </div>
</motion.aside>

  );
}