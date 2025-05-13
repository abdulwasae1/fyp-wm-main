// src/app/features/page.tsx

import React from "react";
import MarketingLayout from "@/app/about/layout"; // adjust if needed
import { Container } from "@/components";
import { FadeInSection } from "@/components/FadeInSection";
import { Zap } from "lucide-react";

const FeaturesPage = () => {
    return (
        <MarketingLayout>
            <section className="w-full flex flex-col items-center justify-center p-6 bg-foreground1/10 backdrop-blur-sm rounded-2xl md:px-8">
                <Container>
                    <div className="flex flex-col items-center text-center gap-16 max-w-5xl mx-auto">

                        {/* Features Introduction */}
                        <FadeInSection direction="bottom">
                            <div className="flex flex-col items-center gap-6">
                                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text ">
                                    Trimix Features
                                </h1>
                                <p className="text-lg text-muted-foreground max-w-3xl">
                                    Trimix offers a comprehensive solution to repurpose long-form video content into dynamic, social-media-ready short clips.
                                    Leveraging AI technologies, the platform automates transcription, speaker identification, segmentation, editing, and publishing — saving users hours of manual work.
                                </p>
                            </div>
                        </FadeInSection>

                        {/* Feature 1 - Video Transcription */}
                        <div className="flex flex-col md:flex-row items-center gap-10 w-full">
                            <FadeInSection direction="left">
                                <Zap className="w-20 h-20 text-primary" />
                            </FadeInSection>
                            <FadeInSection direction="bottom" delay={1}>
                                <div className="flex-1 text-left">
                                    <h2 className="text-3xl font-semibold">Automated Video Transcription</h2>
                                    <p className="text-muted-foreground mt-4">
                                        Using advanced speech recognition technology, Trimix converts video audio into accurate, editable text — enabling quick content generation and accessibility improvements.
                                    </p>
                                </div>
                            </FadeInSection>
                        </div>

                        {/* Feature 2 - Speaker Identification */}
                        <div className="flex flex-col md:flex-row-reverse items-center gap-10 w-full mt-20">
                            <FadeInSection direction="right">
                                <Zap className="w-20 h-20 text-primary" />
                            </FadeInSection>
                            <FadeInSection direction="bottom" delay={1}>
                                <div className="flex-1 text-left">
                                    <h2 className="text-3xl font-semibold">Speaker Identification & Labeling</h2>
                                    <p className="text-muted-foreground mt-4">
                                        Sophisticated diarization algorithms detect and label different speakers within a video, making conversations easier to follow and enhancing transcript usability.
                                    </p>
                                </div>
                            </FadeInSection>
                        </div>

                        {/* Feature 3 - Content Segmentation */}
                        <div className="flex flex-col md:flex-row items-center gap-10 w-full mt-20">
                            <FadeInSection direction="left">
                                <Zap className="w-20 h-20 text-primary" />
                            </FadeInSection>
                            <FadeInSection direction="bottom" delay={1}>
                                <div className="flex-1 text-left">
                                    <h2 className="text-3xl font-semibold">Content Segmentation</h2>
                                    <p className="text-muted-foreground mt-4">
                                        Powered by Natural Language Processing (NLP), Trimix intelligently segments transcribed text into short, thematically rich clips ideal for social media engagement.
                                    </p>
                                </div>
                            </FadeInSection>
                        </div>

                        {/* Feature 4 - Editing & Captioning */}
                        <div className="flex flex-col md:flex-row-reverse items-center gap-10 w-full mt-20">
                            <FadeInSection direction="right">
                                <Zap className="w-20 h-20 text-primary" />
                            </FadeInSection>
                            <FadeInSection direction="bottom" delay={1}>
                                <div className="flex-1 text-left">
                                    <h2 className="text-3xl font-semibold">Video Editing and Captioning</h2>
                                    <p className="text-muted-foreground mt-4">
                                        Quickly trim, adjust, and enhance your clips with built-in editing tools. Add auto-generated captions with one click to boost accessibility and viewer retention.
                                    </p>
                                </div>
                            </FadeInSection>
                        </div>

                        {/* Feature 5 - Direct Publishing */}
                        <div className="flex flex-col md:flex-row items-center gap-10 w-full mt-20">
                            <FadeInSection direction="left">
                                <Zap className="w-20 h-20 text-primary" />
                            </FadeInSection>
                            <FadeInSection direction="bottom" delay={1}>
                                <div className="flex-1 text-left">
                                    <h2 className="text-3xl font-semibold">Direct Social Media Publishing</h2>
                                    <p className="text-muted-foreground mt-4">
                                        Publish your finalized clips directly to Instagram, Facebook, YouTube, and more without leaving the Trimix platform — saving time and effort on multi-platform distribution.
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

export default FeaturesPage;
