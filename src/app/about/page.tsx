// src/app/about/page.tsx

import React from "react";
import { Container } from "@/components";
import { FadeInSection } from "@/components/FadeInSection";
import Image from "next/image";

const AboutPage = () => {
    return (
            <section className="w-full py-8 flex flex-col items-center justify-center px-4 md:px-8">
                <Container>
                    <div className="flex flex-col items-center text-center gap-12 max-w-5xl mx-auto">

                        {/* Project Introduction */}
                        <FadeInSection direction="bottom">
                            <div className="flex flex-col items-center gap-6">
                                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text ">
                                    About Us
                                </h1>
                                {/* <p className="text-lg text-muted-foreground max-w-3xl">
                                    Trimix AI is an innovative platform designed to revolutionize content creation.
                                    Our mission is simple: <strong>Maximize Your Content, Minimize Your Effort</strong>.
                                    Using advanced AI tools, Trimix helps users cut, clip, and create engaging short-form videos for businesses, creators, and marketers — quickly and efficiently.
                                </p>
                                <p className="text-lg text-muted-foreground max-w-3xl">
                                    Built with a focus on empowering brands and individuals, Trimix simplifies the journey from idea to viral content by offering features like video repurposing, content optimization, and effortless publishing.
                                </p> */}
                            </div>
                        </FadeInSection>

                        {/* Abdul Wasae Section */}
                        <div className="flex flex-col md:flex-row items-center gap-10 w-full p-6 bg-foreground1/30 backdrop-blur-md rounded-2xl">
                            {/* Image */}
                            <FadeInSection direction="left">
                                <div className="w-60 h-60 relative rounded-full overflow-hidden border-4 border-primary shadow-lg">
                                    <Image
                                        src="/images/wasae.jpg" // make sure image exists
                                        alt="Abdul Wasae"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </FadeInSection>

                            {/* Intro Text */}
                            <FadeInSection direction="bottom" delay={1}>
                                <div className="flex-1 text-left">
                                    <h2 className="text-3xl font-semibold">Abdul Wasae</h2>
                                    <p className="text-muted-foreground mt-4">
                                        Abdul Wasae is the brilliant mind behind the powerful backend infrastructure of Trimix AI.
                                        Specializing in scalable architectures, efficient database management, and API development,
                                        he ensures that the platform runs smoothly, securely, and efficiently — handling everything from user authentication to seamless video processing.
                                    </p>
                                </div>
                            </FadeInSection>
                        </div>

                        {/* Manan Shabbir Section */}
                        <div className="flex flex-col md:flex-row-reverse items-center gap-10 w-full mt-20 p-6 bg-foreground1/30 backdrop-blur-md rounded-2xl">
                            {/* Image */}
                            <FadeInSection direction="right">
                                <div className="w-60 h-60 relative rounded-full overflow-hidden border-4 border-primary shadow-lg">
                                    <Image
                                        src="/images/manan.jpeg" // make sure image exists
                                        alt="Manan Shabbir"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </FadeInSection>

                            {/* Intro Text */}
                            <FadeInSection direction="bottom" delay={1}>
                                <div className="flex-1 text-left">
                                    <h2 className="text-3xl font-semibold">Manan Shabbir</h2>
                                    <p className="text-muted-foreground mt-4">
                                        Manan Shabbir is the creative force responsible for the stunning frontend of Trimix AI.
                                        With a passion for elegant design systems, user experience, and performance optimization,
                                        he crafts beautiful interfaces that are not only visually appealing but also incredibly intuitive to use,
                                        bringing the vision of Trimix to life.
                                    </p>
                                </div>
                            </FadeInSection>
                        </div>
                        

                    </div>
                </Container>
            </section>
    );
};

export default AboutPage;
