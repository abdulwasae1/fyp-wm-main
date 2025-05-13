import React from "react";
import MarketingLayout from "@/app/about/layout";
import { Container } from "@/components";
import { FadeInSection } from "@/components/FadeInSection";
import { 
    ClipboardCheck, 
    VideoIcon, 
    UserSquare, 
    FileText, 
    AlertTriangle, 
    CreditCard, 
    Copyright, 
    ExternalLink, 
    XSquare, 
    AlertCircle, 
    ShieldAlert,
    Gavel,
    RefreshCw
} from "lucide-react";

const TermsAndConditionsPage = () => {
    return (
        <MarketingLayout>
            <section className="w-full py-16 flex flex-col items-center justify-center px-4 md:px-8">
                <Container>
                    <div className="flex flex-col items-center text-center gap-16 max-w-5xl mx-auto p-6 bg-indigo-950/10 backdrop-blur-sm rounded-2xl">

                        {/* Terms & Conditions Introduction */}
                        <FadeInSection direction="bottom">
                            <div className="flex flex-col items-center gap-16">
                                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-gray-50 to-gray-400">
                                    Terms & Conditions
                                </h1>
                                <p className="text-lg text-muted-foreground max-w-3xl">
                                    Welcome to Trimix! These Terms & Conditions (&quot;Terms&quot;) govern your use of the Trimix platform, available via our website and applications (&quot;Service&quot;). By accessing or using Trimix, you agree to be bound by these Terms. If you do not agree, please do not use the Service.
                                </p>
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm text-muted-foreground">
                                        Effective Date: May 13, 2025
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Last Updated: May 13, 2025
                                    </p>
                                </div>
                            </div>
                        </FadeInSection>

                        {/* Section 1 - Acceptance of Terms */}
                        <div className="flex flex-col md:flex-row items-center gap-10 w-full mt-12">
                            <FadeInSection direction="left">
                                <ClipboardCheck className="w-20 h-20 text-primary" />
                            </FadeInSection>
                            <FadeInSection direction="bottom" delay={1}>
                                <div className="flex-1 text-left">
                                    <h2 className="text-3xl font-semibold">Acceptance of Terms</h2>
                                    <p className="text-muted-foreground mt-4">
                                        By creating an account, uploading content, or using any part of the Service, you affirm that you are at least 13 years old (16 in the EU) and capable of entering a binding contract. If you are using Trimix on behalf of an organization, you represent that you have the authority to bind that organization to these Terms.
                                    </p>
                                </div>
                            </FadeInSection>
                        </div>

                        {/* Section 2 - Description of Service */}
                        <div className="flex flex-col md:flex-row-reverse items-center gap-10 w-full mt-20">
                            <FadeInSection direction="right">
                                <VideoIcon className="w-20 h-20 text-primary" />
                            </FadeInSection>
                            <FadeInSection direction="bottom" delay={1}>
                                <div className="flex-1 text-left">
                                    <h2 className="text-3xl font-semibold">Description of Service</h2>
                                    <p className="text-muted-foreground mt-4">
                                        Trimix provides tools for:
                                    </p>
                                    <ul className="list-disc pl-5 mt-4 text-muted-foreground space-y-2">
                                        <li>Uploading long-form video content.</li>
                                        <li>Generating short-form clips using AI-powered transcription, segmentation, and captioning.</li>
                                        <li>Editing and exporting content.</li>
                                        <li>Publishing directly to integrated social platforms (e.g., YouTube Shorts, Instagram Reels, TikTok).</li>
                                    </ul>
                                    <p className="text-muted-foreground mt-4">
                                        We continuously improve and update the platform, which may involve changes to features or functionality.
                                    </p>
                                </div>
                            </FadeInSection>
                        </div>

                        {/* Section 3 - User Accounts */}
                        <div className="flex flex-col md:flex-row items-center gap-10 w-full mt-20">
                            <FadeInSection direction="left">
                                <UserSquare className="w-20 h-20 text-primary" />
                            </FadeInSection>
                            <FadeInSection direction="bottom" delay={1}>
                                <div className="flex-1 text-left">
                                    <h2 className="text-3xl font-semibold">User Accounts</h2>
                                    <p className="text-muted-foreground mt-4">
                                        To access most features, you must create an account. You agree to:
                                    </p>
                                    <ul className="list-disc pl-5 mt-4 text-muted-foreground space-y-2">
                                        <li>Provide accurate and complete information.</li>
                                        <li>Keep your credentials secure and confidential.</li>
                                        <li>Notify us immediately of any unauthorized use of your account.</li>
                                    </ul>
                                    <p className="text-muted-foreground mt-4">
                                        Trimix reserves the right to suspend or terminate accounts that violate these Terms.
                                    </p>
                                </div>
                            </FadeInSection>
                        </div>

                        {/* Section 4 - User Content & License */}
                        <div className="flex flex-col md:flex-row-reverse items-center gap-10 w-full mt-20">
                            <FadeInSection direction="right">
                                <FileText className="w-20 h-20 text-primary" />
                            </FadeInSection>
                            <FadeInSection direction="bottom" delay={1}>
                                <div className="flex-1 text-left">
                                    <h2 className="text-3xl font-semibold">User Content & License</h2>
                                    <p className="text-muted-foreground mt-4">
                                        You retain full ownership of your original uploaded content. However, by using Trimix, you grant us a limited, non-exclusive, royalty-free, worldwide license to:
                                    </p>
                                    <ul className="list-disc pl-5 mt-4 text-muted-foreground space-y-2">
                                        <li>Process, transcribe, and segment your content.</li>
                                        <li>Store and cache your media for performance and reliability.</li>
                                        <li>Display your processed clips and analytics within your dashboard.</li>
                                        <li>Improve our algorithms using anonymized or aggregated content, unless you opt out.</li>
                                    </ul>
                                    <p className="text-muted-foreground mt-4">
                                        You affirm that:
                                    </p>
                                    <ul className="list-disc pl-5 mt-4 text-muted-foreground space-y-2">
                                        <li>You own the content or have all necessary rights to use it.</li>
                                        <li>Your content does not infringe any intellectual property, privacy, or publicity rights of others.</li>
                                    </ul>
                                </div>
                            </FadeInSection>
                        </div>

                        {/* Section 5 - Prohibited Conduct */}
                        <div className="flex flex-col md:flex-row items-center gap-10 w-full mt-20">
                            <FadeInSection direction="left">
                                <AlertTriangle className="w-20 h-20 text-primary" />
                            </FadeInSection>
                            <FadeInSection direction="bottom" delay={1}>
                                <div className="flex-1 text-left">
                                    <h2 className="text-3xl font-semibold">Prohibited Conduct</h2>
                                    <p className="text-muted-foreground mt-4">
                                        You agree not to:
                                    </p>
                                    <ul className="list-disc pl-5 mt-4 text-muted-foreground space-y-2">
                                        <li>Use the Service for any unlawful or harmful purpose.</li>
                                        <li>Upload or share content that is violent, abusive, pornographic, defamatory, or promotes hate.</li>
                                        <li>Reverse-engineer, scrape, or exploit the platform.</li>
                                        <li>Interfere with the integrity or security of the platform or its users.</li>
                                    </ul>
                                    <p className="text-muted-foreground mt-4">
                                        Violation of this section may result in immediate suspension or termination.
                                    </p>
                                </div>
                            </FadeInSection>
                        </div>

                        {/* Section 6 - Subscription & Payment */}
                        <div className="flex flex-col md:flex-row-reverse items-center gap-10 w-full mt-20">
                            <FadeInSection direction="right">
                                <CreditCard className="w-20 h-20 text-primary" />
                            </FadeInSection>
                            <FadeInSection direction="bottom" delay={1}>
                                <div className="flex-1 text-left">
                                    <h2 className="text-3xl font-semibold">Subscription & Payment</h2>
                                    <p className="text-muted-foreground mt-4">
                                        Trimix offers free and premium plans. If you subscribe to a paid plan:
                                    </p>
                                    <ul className="list-disc pl-5 mt-4 text-muted-foreground space-y-2">
                                        <li>Fees are billed in advance, recurring monthly or annually.</li>
                                        <li>All charges are non-refundable unless otherwise stated.</li>
                                        <li>We use secure third-party processors for payments.</li>
                                        <li>You can cancel your subscription at any time through your account settings.</li>
                                    </ul>
                                </div>
                            </FadeInSection>
                        </div>

                        {/* Section 7 - Intellectual Property */}
                        <div className="flex flex-col md:flex-row items-center gap-10 w-full mt-20">
                            <FadeInSection direction="left">
                                <Copyright className="w-20 h-20 text-primary" />
                            </FadeInSection>
                            <FadeInSection direction="bottom" delay={1}>
                                <div className="flex-1 text-left">
                                    <h2 className="text-3xl font-semibold">Intellectual Property</h2>
                                    <p className="text-muted-foreground mt-4">
                                        All intellectual property related to Trimix (e.g., logo, design, software, AI models) is owned by or licensed to Trimix Technologies. You may not copy, modify, distribute, or reverse-engineer any part of the Service unless explicitly allowed.
                                    </p>
                                </div>
                            </FadeInSection>
                        </div>

                        {/* Section 8 - Third-Party Services */}
                        <div className="flex flex-col md:flex-row-reverse items-center gap-10 w-full mt-20">
                            <FadeInSection direction="right">
                                <ExternalLink className="w-20 h-20 text-primary" />
                            </FadeInSection>
                            <FadeInSection direction="bottom" delay={1}>
                                <div className="flex-1 text-left">
                                    <h2 className="text-3xl font-semibold">Third-Party Services</h2>
                                    <p className="text-muted-foreground mt-4">
                                        Trimix may integrate with third-party platforms (e.g., Google, TikTok, YouTube). You are responsible for complying with their respective terms and privacy policies when using these services via our platform.
                                    </p>
                                </div>
                            </FadeInSection>
                        </div>

                        {/* Section 9 - Termination */}
                        <div className="flex flex-col md:flex-row items-center gap-10 w-full mt-20">
                            <FadeInSection direction="left">
                                <XSquare className="w-20 h-20 text-primary" />
                            </FadeInSection>
                            <FadeInSection direction="bottom" delay={1}>
                                <div className="flex-1 text-left">
                                    <h2 className="text-3xl font-semibold">Termination</h2>
                                    <p className="text-muted-foreground mt-4">
                                        You may terminate your account at any time. Trimix may suspend or terminate your access for:
                                    </p>
                                    <ul className="list-disc pl-5 mt-4 text-muted-foreground space-y-2">
                                        <li>Violating these Terms.</li>
                                        <li>Engaging in behavior that harms the Service or its users.</li>
                                        <li>Inactivity for an extended period.</li>
                                    </ul>
                                    <p className="text-muted-foreground mt-4">
                                        Upon termination, your data may be deleted unless legally required to be retained.
                                    </p>
                                </div>
                            </FadeInSection>
                        </div>

                        {/* Section 10 - Disclaimers */}
                        <div className="flex flex-col md:flex-row-reverse items-center gap-10 w-full mt-20">
                            <FadeInSection direction="right">
                                <AlertCircle className="w-20 h-20 text-primary" />
                            </FadeInSection>
                            <FadeInSection direction="bottom" delay={1}>
                                <div className="flex-1 text-left">
                                    <h2 className="text-3xl font-semibold">Disclaimers</h2>
                                    <p className="text-muted-foreground mt-4">
                                        Trimix is provided "as is" and "as available." We do not guarantee:
                                    </p>
                                    <ul className="list-disc pl-5 mt-4 text-muted-foreground space-y-2">
                                        <li>Continuous or error-free service.</li>
                                        <li>That processed clips will meet your exact expectations.</li>
                                        <li>That all bugs or vulnerabilities will be immediately resolved.</li>
                                    </ul>
                                    <p className="text-muted-foreground mt-4">
                                        We disclaim all warranties to the fullest extent permitted by law.
                                    </p>
                                </div>
                            </FadeInSection>
                        </div>

                        {/* Section 12 - Governing Law */}
                        <div className="flex flex-col md:flex-row items-center gap-10 w-full mt-20">
                            <FadeInSection direction="right">
                                <Gavel className="w-20 h-20 text-primary" />
                            </FadeInSection>
                            <FadeInSection direction="bottom" delay={1}>
                                <div className="flex-1 text-left">
                                    <h2 className="text-3xl font-semibold">Governing Law</h2>
                                    <p className="text-muted-foreground mt-4">
                                        These Terms are governed by the laws of the United States, without regard to its conflict of law principles. Any disputes shall be resolved in the courts of California.
                                    </p>
                                </div>
                            </FadeInSection>
                        </div>

                        {/* Section 11 - Limitation of Liability */}
                        <div className="flex flex-col md:flex-row-reverse items-center gap-10 w-full mt-20">
                            <FadeInSection direction="left">
                                <ShieldAlert className="w-20 h-20 text-primary" />
                            </FadeInSection>
                            <FadeInSection direction="bottom" delay={1}>
                                <div className="flex-1 text-left">
                                    <h2 className="text-3xl font-semibold">Limitation of Liability</h2>
                                    <p className="text-muted-foreground mt-4">
                                        To the maximum extent permitted by law, Trimix is not liable for:
                                    </p>
                                    <ul className="list-disc pl-5 mt-4 text-muted-foreground space-y-2">
                                        <li>Loss of data, revenue, or profits.</li>
                                        <li>Any indirect, special, or consequential damages.</li>
                                        <li>Any damages resulting from unauthorized access or data breaches.</li>
                                    </ul>
                                    <p className="text-muted-foreground mt-4">
                                        Our total liability shall not exceed the amount paid by you to Trimix in the past 6 months.
                                    </p>
                                </div>
                            </FadeInSection>
                        </div>

                        {/* Section 13 - Changes to These Terms */}
                        <div className="flex flex-col md:flex-row items-center gap-10 w-full mt-20">
                            <FadeInSection direction="left">
                                <RefreshCw className="w-20 h-20 text-primary" />
                            </FadeInSection>
                            <FadeInSection direction="bottom" delay={1}>
                                <div className="flex-1 text-left">
                                    <h2 className="text-3xl font-semibold">Changes to These Terms</h2>
                                    <p className="text-muted-foreground mt-4">
                                        We may update these Terms from time to time. We&quot;ll notify users of significant changes via email or platform notification. Continued use of Trimix constitutes acceptance of the revised Terms.
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

export default TermsAndConditionsPage;