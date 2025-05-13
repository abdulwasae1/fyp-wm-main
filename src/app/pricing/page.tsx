// src/app/pricing/page.tsx

import React from "react";
import MarketingLayout from "@/app/about/layout"; // adjust if needed
import { Container } from "@/components";
import { FadeInSection } from "@/components/FadeInSection";
import { pricingCards } from "@/constants"; // your pricing cards are already defined
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const PricingPage = () => {
    return (
        <MarketingLayout>
            <section className="w-full py-16 flex flex-col items-center justify-center px-4 md:px-8">
                <Container>
                    <div className="flex flex-col items-center text-center gap-16 max-w-5xl mx-auto">

                        {/* Pricing Introduction */}
                        <FadeInSection direction="bottom">
                            <div className="flex flex-col items-center gap-6">
                                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text ">
                                    Our Pricing Plans
                                </h1>
                                <p className="text-lg text-muted-foreground max-w-3xl">
                                    Choose the perfect plan to elevate your content strategy.
                                    Trimix offers flexible pricing options designed for creators, marketers, and businesses of every size.
                                </p>
                            </div>
                        </FadeInSection>

                        {/* Pricing Cards */}
                        <FadeInSection direction="bottom" delay={0.5}>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full mt-12">
                                {pricingCards.map((card) => (
                                    <Card
                                        key={card.title}
                                        className={cn("flex flex-col w-full border-neutral-700",
                                            card.title === "Unlimited Saas" && "border-2 border-primary"
                                        )}
                                    >
                                        <CardHeader className="border-b border-border">
                                            <span>
                                                {card.title}
                                            </span>
                                            <CardTitle className={cn(card.title !== "Unlimited Saas" && "text-muted-foreground")}>
                                                {card.price}
                                            </CardTitle>
                                            <CardDescription>
                                                {card.description}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="pt-6 space-y-3">
                                            {card.features.map((feature) => (
                                                <div key={feature} className="flex items-center gap-2">
                                                    <Zap className="w-4 h-4 fill-primary text-primary" />
                                                    <p>{feature}</p>
                                                </div>
                                            ))}
                                        </CardContent>
                                        <CardFooter className="mt-auto">
                                            <Link
                                                href="/dashboard"
                                                className={cn(
                                                    "w-full text-center text-primary-foreground bg-primary p-2 rounded-md text-sm font-medium",
                                                    card.title !== "Unlimited Saas" && "!bg-foreground1 !text-background"
                                                )}
                                            >
                                                {card.buttonText}
                                            </Link>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        </FadeInSection>

                    </div>
                </Container>
            </section>
        </MarketingLayout>
    );
};

export default PricingPage;
