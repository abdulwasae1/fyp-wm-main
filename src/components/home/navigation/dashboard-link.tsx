"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const DashboardLink = () => {
  const pathname = usePathname();
  const isActive = pathname === "/dashboard";
  
  return (
    <Link 
      href="/dashboard" 
      className={`text-md hover:underline ${
        isActive ? "text-foreground font-medium border-b-2 border-foreground" : ""
      }`}
    >
      Dashboard
    </Link>
  );
};