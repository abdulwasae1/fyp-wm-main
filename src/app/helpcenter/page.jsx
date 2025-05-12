import React from "react";
import MarketingLayout from "@/app/about/layout";
import { Container } from "@/components";
import { FadeInSection } from "@/components/FadeInSection";
import { HelpCircle, BookOpenCheck, MessageSquareHeart, ShieldCheck, Send } from "lucide-react";

const HelpCenterPage = () => {
    return (
        <MarketingLayout>
            <section className="w-full py-16 flex flex-col items-center justify-center px-4 md:px-8">
                <Container>
                    <div className="flex flex-col items-center text-center gap-16 max-w-5xl mx-auto p-6 bg-indigo-950/10 backdrop-blur-sm rounded-2xl">

                        {/* Help Center Introduction */}
                        <FadeInSection direction="bottom">
                            <div className="flex flex-col items-center gap-6">
                                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-gray-50 to-gray-400">
                                    Trimix Help Center
                                </h1>
                                <p className="text-lg text-muted-foreground max-w-3xl">
                                    Need assistance? You&apos;re in the right place. Explore our resources, guides, and support options to get the help you need — fast and easy.
                                </p>
                            </div>
                        </FadeInSection>

                        {/* Help Topic 1 - Getting Started */}
                        <div className="flex flex-col md:flex-row items-center gap-10 w-full">
                            <FadeInSection direction="left">
                                <BookOpenCheck className="w-20 h-20 text-primary" />
                            </FadeInSection>
                            <FadeInSection direction="bottom" delay={1}>
                                <div className="flex-1 text-left">
                                    <h2 className="text-3xl font-semibold">Getting Started Guide</h2>
                                    <p className="text-muted-foreground mt-4">
                                        Learn how to set up your account, upload your first video, and create your first short-form masterpiece with our step-by-step beginner tutorials.
                                    </p>
                                </div>
                            </FadeInSection>
                        </div>

                        {/* Help Topic 2 - Common Questions */}
                        <div className="flex flex-col md:flex-row-reverse items-center gap-10 w-full mt-20">
                            <FadeInSection direction="right">
                                <HelpCircle className="w-20 h-20 text-primary" />
                            </FadeInSection>
                            <FadeInSection direction="bottom" delay={1}>
                                <div className="flex-1 text-left">
                                    <h2 className="text-3xl font-semibold">Frequently Asked Questions</h2>
                                    <p className="text-muted-foreground mt-4">
                                        Find quick answers to the most common questions about Trimix features, subscriptions, and troubleshooting.
                                    </p>
                                </div>
                            </FadeInSection>
                        </div>

                        {/* Help Topic 3 - Contact Support */}
                        <div className="flex flex-col md:flex-row items-center gap-10 w-full mt-20">
                            <FadeInSection direction="left">
                                <MessageSquareHeart className="w-20 h-20 text-primary" />
                            </FadeInSection>
                            <FadeInSection direction="bottom" delay={1}>
                                <div className="flex-1 text-left">
                                    <h2 className="text-3xl font-semibold">Contact Support Team</h2>
                                    <p className="text-muted-foreground mt-4">
                                        Can&apos;t find what you need? Our friendly support team is available 24/7 to assist you through chat or email.
                                    </p>
                                </div>
                            </FadeInSection>
                        </div>

                        {/* Help Topic 4 - Privacy and Security */}
                        <div className="flex flex-col md:flex-row-reverse items-center gap-10 w-full mt-20">
                            <FadeInSection direction="right">
                                <ShieldCheck className="w-20 h-20 text-primary" />
                            </FadeInSection>
                            <FadeInSection direction="bottom" delay={1}>
                                <div className="flex-1 text-left">
                                    <h2 className="text-3xl font-semibold">Privacy & Security Policies</h2>
                                    <p className="text-muted-foreground mt-4">
                                        Learn how we protect your data, ensure safe transactions, and maintain transparency with our robust privacy standards.
                                    </p>
                                </div>
                            </FadeInSection>
                        </div>

                        {/* Help Topic 5 - Submit Feedback */}
                        <div className="flex flex-col md:flex-row items-center gap-10 w-full mt-20">
                            <FadeInSection direction="left">
                                <Send className="w-20 h-20 text-primary" />
                            </FadeInSection>
                            <FadeInSection direction="bottom" delay={1}>
                                <div className="flex-1 text-left">
                                    <h2 className="text-3xl font-semibold">Submit Feedback</h2>
                                    <p className="text-muted-foreground mt-4">
                                        Help us improve! Share your thoughts, suggestions, and ideas — because your experience matters.
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

export default HelpCenterPage;