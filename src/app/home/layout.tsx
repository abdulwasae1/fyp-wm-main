import { Footer, Navbar } from "@/components";
import { Metadata } from 'next'
import { defaultMetadata } from '@/lib/metadata'

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Trimix - Cut, Clip and Create!",
  description: "Maximize Your Content, Minimize Your Effort with our AI-powered video content repurposing tool",
}

interface Props {
  children: React.ReactNode;
}

const MarketingLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col items-center w-full">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
};

export default MarketingLayout
