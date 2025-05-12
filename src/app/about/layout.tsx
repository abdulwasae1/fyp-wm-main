import { Footer, Navbar } from "@/components";
import SidebarModelCanvas2 from "@/components/InfinityModel-2";
import React from 'react'

interface Props {
    children: React.ReactNode;
}

const MarketingLayout = ({ children }: Props) => {
    return (
        <div className="flex flex-col items-center w-full">
            <Navbar />
            <div className="absolute ml-[-42%] mt-[-10%] -z-10 h-full w-full">
                <SidebarModelCanvas2 />
            </div>
            {children}
            <Footer />
        </div>
    )
};

export default MarketingLayout
