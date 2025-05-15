"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavLinks = () => {
  const pathname = usePathname();
  
  const links = [
    { href: "/home", label: "Home" },
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About Us" },
  ];

  return (
    <ul className="flex items-center justify-center gap-8">
      {links.map((link) => {
        const isActive = pathname === link.href;
        
        return (
          <li key={link.href}>
            <Link 
              href={link.href} 
              className={`hover:text-foreground/80 text-md ${
                isActive ? "text-foreground font-medium border-b-2 border-foreground" : ""
              }`}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};