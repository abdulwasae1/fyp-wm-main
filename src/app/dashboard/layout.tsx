import Sidebar from "@/components/Sidebar";
import { Footer, Navbar } from "@/components";
import React from "react";
import SidebarModelCanvas2 from "@/components/InfinityModel-2"

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Navbar />
            <div className="absolute ml-[-27%] mt-[-10%] -z-10 h-full w-full">
                <SidebarModelCanvas2 />
            </div>

        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
}