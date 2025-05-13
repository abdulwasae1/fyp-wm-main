import React from "react";
import MarketingLayout from "@/app/about/layout";
import { Container } from "@/components";
import { FadeInSection } from "@/components/FadeInSection";
import { MonitorSmartphone, Smartphone, Server, Globe, Wifi } from "lucide-react";

const TrimixAiPage = () => {
    return (
        <MarketingLayout>
            <section className="w-full py-16 flex flex-col items-center justify-center px-4 md:px-8">
                <Container>
                    <div className="flex flex-col items-center text-center gap-16 max-w-5xl mx-auto p-6 bg-indigo-950/20 backdrop-blur-sm rounded-2xl">
                        {/* Project Introduction */}
                        <FadeInSection direction="bottom">
                            <div className="flex flex-col items-center gap-6">
                                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-gray-50 to-gray-400">
                                    About Trimix AI
                                </h1>
                                <p className="text-lg text-muted-foreground max-w-3xl">
                                    Trimix AI is an innovative platform designed to revolutionize content creation.
                                    Our mission is simple: <strong>Maximize Your Content, Minimize Your Effort</strong>.
                                    Using advanced AI tools, Trimix helps users cut, clip, and create engaging short-form videos for businesses, creators, and marketers — quickly and efficiently.
                                </p>
                                <p className="text-lg text-muted-foreground max-w-3xl">
                                    Built with a focus on empowering brands and individuals, Trimix simplifies the journey from idea to viral content by offering features like video repurposing, content optimization, and effortless publishing.
                                </p>
                            </div>
                        </FadeInSection>

                    </div>
                </Container>
            </section>
        </MarketingLayout>
    );
};

export default TrimixAiPage;