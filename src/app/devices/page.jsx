import React from "react";
import MarketingLayout from "@/app/about/layout";
import { Container } from "@/components";
import { FadeInSection } from "@/components/FadeInSection";
import { MonitorSmartphone, Smartphone, Server, Globe, Wifi } from "lucide-react";

const DevicesPage = () => {
    return (
        <MarketingLayout>
            <section className="w-full py-16 flex flex-col items-center justify-center px-4 md:px-8">
                <Container>
                    <div className="flex flex-col items-center text-center gap-16 max-w-5xl mx-auto p-6 bg-indigo-950/30 backdrop-blur-sm rounded-2xl">

                        {/* Devices Introduction */}
                        <FadeInSection direction="bottom">
                            <div className="flex flex-col items-center gap-6">
                                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-gray-50 to-gray-400">
                                    Trimix Device Compatibility
                                </h1>
                                <p className="text-lg text-muted-foreground max-w-3xl">
                                    Trimix ensures a seamless experience across all your devices. Whether you&apos;re at your desk, on your phone, or using a tablet, Trimix optimizes performance for every screen size and system.
                                </p>
                            </div>
                        </FadeInSection>

                        {/* Device 1 - Cross-Platform Accessibility */}
                        <div className="flex flex-col md:flex-row items-center gap-10 w-full">
                            <FadeInSection direction="left">
                                <Globe className="w-20 h-20 text-primary" />
                            </FadeInSection>
                            <FadeInSection direction="bottom" delay={1}>
                                <div className="flex-1 text-left">
                                    <h2 className="text-3xl font-semibold">Cross-Platform Accessibility</h2>
                                    <p className="text-muted-foreground mt-4">
                                        Trimix operates flawlessly on Windows, macOS, Linux, Android, and iOS. No matter your preferred device, you can easily create, edit, and publish your content anywhere.
                                    </p>
                                </div>
                            </FadeInSection>
                        </div>

                        {/* Device 2 - Mobile Optimization */}
                        <div className="flex flex-col md:flex-row-reverse items-center gap-10 w-full mt-20">
                            <FadeInSection direction="right">
                                <Smartphone className="w-20 h-20 text-primary" />
                            </FadeInSection>
                            <FadeInSection direction="bottom" delay={1}>
                                <div className="flex-1 text-left">
                                    <h2 className="text-3xl font-semibold">Mobile-First Optimization</h2>
                                    <p className="text-muted-foreground mt-4">
                                        Designed with mobility in mind, Trimix offers a fully responsive interface and smart video processing techniques that work smoothly even on smaller screens.
                                    </p>
                                </div>
                            </FadeInSection>
                        </div>

                        {/* Device 3 - Desktop Efficiency */}
                        <div className="flex flex-col md:flex-row items-center gap-10 w-full mt-20">
                            <FadeInSection direction="left">
                                <MonitorSmartphone className="w-20 h-20 text-primary" />
                            </FadeInSection>
                            <FadeInSection direction="bottom" delay={1}>
                                <div className="flex-1 text-left">
                                    <h2 className="text-3xl font-semibold">Enhanced Desktop Performance</h2>
                                    <p className="text-muted-foreground mt-4">
                                        On desktop devices, Trimix takes advantage of greater processing power to deliver faster transcriptions, quicker edits, and more fluid multi-tasking.
                                    </p>
                                </div>
                            </FadeInSection>
                        </div>

                        {/* Device 4 - Smart Resource Management */}
                        <div className="flex flex-col md:flex-row-reverse items-center gap-10 w-full mt-20">
                            <FadeInSection direction="right">
                                <Server className="w-20 h-20 text-primary" />
                            </FadeInSection>
                            <FadeInSection direction="bottom" delay={1}>
                                <div className="flex-1 text-left">
                                    <h2 className="text-3xl font-semibold">Smart Resource Management</h2>
                                    <p className="text-muted-foreground mt-4">
                                        Trimix dynamically adjusts its resource usage based on your device&apos;s capabilities, ensuring a lightweight yet powerful experience without draining your battery or memory.
                                    </p>
                                </div>
                            </FadeInSection>
                        </div>

                        {/* Device 5 - Connectivity and Sync */}
                        <div className="flex flex-col md:flex-row items-center gap-10 w-full mt-20">
                            <FadeInSection direction="left">
                                <Wifi className="w-20 h-20 text-primary" />
                            </FadeInSection>
                            <FadeInSection direction="bottom" delay={1}>
                                <div className="flex-1 text-left">
                                    <h2 className="text-3xl font-semibold">Real-Time Connectivity and Sync</h2>
                                    <p className="text-muted-foreground mt-4">
                                        Thanks to real-time cloud syncing, your projects are always up-to-date across all your devices — start editing on your laptop, finish on your phone without missing a beat.
                                    </p>
                                </div>
                            </FadeInSection>
                        </div>

                    </div>
                </Container>
            </section>
        </MarketingLayout>
    );
};

export default DevicesPage;