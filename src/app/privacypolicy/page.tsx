import React from "react";
import MarketingLayout from "@/app/about/layout";
import { Container } from "@/components";
import { FadeInSection } from "@/components/FadeInSection";
import { Shield, Lock, UserCheck, Database, ScrollText, FileCheck, Globe, Scale, Bell, MessageSquare } from "lucide-react";

const PrivacyPolicyPage = () => {
    return (
        <MarketingLayout>
            <section className="w-full py-16 flex flex-col items-center justify-center px-4 md:px-8">
                <Container>
                    <div className="flex flex-col items-center text-center gap-16 max-w-5xl mx-auto p-6 bg-indigo-950/10 backdrop-blur-sm rounded-2xl">

                        {/* Privacy Policy Introduction */}
                        <FadeInSection direction="bottom">
                            <div className="flex flex-col items-center gap-16">
                                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-gray-50 to-gray-400">
                                    Privacy Policy
                                </h1>
                                <p className="text-lg text-muted-foreground max-w-3xl">
                                    At Trimix: Cut, Clip, Create, we take your privacy seriously. This Privacy Policy explains how we collect, use, store, and share your personal information when you use our platform. By accessing or using Trimix, you consent to the practices described in this policy.
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Effective Date: May 13, 2025
                                </p>
                            </div>
                        </FadeInSection>

                        {/* Section 1 - Information We Collect */}
                        <div className="flex flex-col md:flex-row items-center gap-10 w-full mt-12">
                            <FadeInSection direction="left">
                                <Database className="w-20 h-20 text-primary" />
                            </FadeInSection>
                            <FadeInSection direction="bottom" delay={1}>
                                <div className="flex-1 text-left">
                                    <h2 className="text-3xl font-semibold">Information We Collect</h2>
                                    <p className="text-muted-foreground mt-4">
                                        We collect the following categories of data to provide and improve our services:
                                    </p>
                                    <div className="mt-6 space-y-4">
                                        <div>
                                            <h3 className="text-xl font-medium">Personal Information</h3>
                                            <p className="text-muted-foreground mt-2">
                                                Account Information: Name, email address, profile photo, phone number, and password (hashed).
                                                Authentication Data: Login credentials, social login tokens (if applicable).
                                                Billing Details: Payment method (handled securely via third-party processors like Stripe or PayPal), invoices, and billing address (if applicable).
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-medium">User-Generated Content</h3>
                                            <p className="text-muted-foreground mt-2">
                                                Uploaded Videos: Long-form video content you upload for processing.
                                                Generated Clips: AI-generated short clips, captions, and metadata.
                                                Session Data: Edits, preferences, and usage history within the platform.
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-medium">Technical & Usage Data</h3>
                                            <p className="text-muted-foreground mt-2">
                                                Device and Browser Information: IP address, browser type, operating system, device ID.
                                                Cookies & Tracking: Session cookies, authentication tokens, and analytics data.
                                                Log Data: Timestamps, clicks, error reports, and feature usage.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </FadeInSection>
                        </div>

                        {/* Section 2 - How We Use Your Information */}
                        <div className="flex flex-col md:flex-row-reverse items-center gap-10 w-full mt-20">
                            <FadeInSection direction="right">
                                <FileCheck className="w-20 h-20 text-primary" />
                            </FadeInSection>
                            <FadeInSection direction="bottom" delay={1}>
                                <div className="flex-1 text-left">
                                    <h2 className="text-3xl font-semibold">How We Use Your Information</h2>
                                    <p className="text-muted-foreground mt-4">
                                        We use your data to:
                                    </p>
                                    <ul className="list-disc pl-5 mt-4 text-muted-foreground space-y-2">
                                        <li>Provide and personalize the Trimix experience.</li>
                                        <li>Process and transform uploaded media using our AI pipeline.</li>
                                        <li>Facilitate video editing, captioning, and social media integration.</li>
                                        <li>Communicate with you (e.g., service updates, feature launches, support).</li>
                                        <li>Improve our platform performance, stability, and security.</li>
                                        <li>Comply with legal obligations and prevent fraud or abuse.</li>
                                    </ul>
                                </div>
                            </FadeInSection>
                        </div>

                        {/* Section 3 - Sharing Your Information */}
                        <div className="flex flex-col md:flex-row items-center gap-10 w-full mt-20">
                            <FadeInSection direction="left">
                                <Globe className="w-20 h-20 text-primary" />
                            </FadeInSection>
                            <FadeInSection direction="bottom" delay={1}>
                                <div className="flex-1 text-left">
                                    <h2 className="text-3xl font-semibold">Sharing Your Information</h2>
                                    <p className="text-muted-foreground mt-4">
                                        We do not sell your personal information. We may share it only with:
                                    </p>
                                    <ul className="list-disc pl-5 mt-4 text-muted-foreground space-y-2">
                                        <li><span className="font-medium">Service Providers:</span> Trusted third-party vendors who assist with infrastructure, payment processing, video hosting, analytics, and authentication.</li>
                                        <li><span className="font-medium">Legal & Regulatory Authorities:</span> If required by law or to respond to valid legal requests.</li>
                                        <li><span className="font-medium">Business Transfers:</span> In the event of a merger, acquisition, or sale of assets, your data may be part of the transferred assets.</li>
                                    </ul>
                                </div>
                            </FadeInSection>
                        </div>

                        {/* Section 4 - Data Storage & Retention */}
                        <div className="flex flex-col md:flex-row-reverse items-center gap-10 w-full mt-20">
                            <FadeInSection direction="right">
                                <Lock className="w-20 h-20 text-primary" />
                            </FadeInSection>
                            <FadeInSection direction="bottom" delay={1}>
                                <div className="flex-1 text-left">
                                    <h2 className="text-3xl font-semibold">Data Storage & Retention</h2>
                                    <ul className="list-disc pl-5 mt-4 text-muted-foreground space-y-2">
                                        <li>All data is stored on secure, encrypted servers.</li>
                                        <li>Uploaded content and processed media are retained as long as your account is active or as needed to fulfill the service.</li>
                                        <li>You may request deletion of your content or account at any time.</li>
                                    </ul>
                                </div>
                            </FadeInSection>
                        </div>

                        {/* Section 5 - Your Rights & Choices */}
                        <div className="flex flex-col md:flex-row items-center gap-10 w-full mt-20">
                            <FadeInSection direction="left">
                                <UserCheck className="w-20 h-20 text-primary" />
                            </FadeInSection>
                            <FadeInSection direction="bottom" delay={1}>
                                <div className="flex-1 text-left">
                                    <h2 className="text-3xl font-semibold">Your Rights & Choices</h2>
                                    <p className="text-muted-foreground mt-4">
                                        Depending on your location, you may have rights such as:
                                    </p>
                                    <ul className="list-disc pl-5 mt-4 text-muted-foreground space-y-2">
                                        <li><span className="font-medium">Access:</span> Request a copy of your personal data.</li>
                                        <li><span className="font-medium">Rectification:</span> Correct inaccurate or incomplete data.</li>
                                        <li><span className="font-medium">Deletion:</span> Request removal of your account and content.</li>
                                        <li><span className="font-medium">Objection:</span> Opt out of certain processing (e.g., marketing emails).</li>
                                        <li><span className="font-medium">Data Portability:</span> Request export of your data in a machine-readable format.</li>
                                    </ul>
                                </div>
                            </FadeInSection>
                        </div>

                        {/* Section 6 - Security Practices */}
                        <div className="flex flex-col md:flex-row-reverse items-center gap-10 w-full mt-20">
                            <FadeInSection direction="right">
                                <Shield className="w-20 h-20 text-primary" />
                            </FadeInSection>
                            <FadeInSection direction="bottom" delay={1}>
                                <div className="flex-1 text-left">
                                    <h2 className="text-3xl font-semibold">Security Practices</h2>
                                    <p className="text-muted-foreground mt-4">
                                        We use industry-standard encryption, access controls, and secure coding practices to protect your information. However, no system is 100% secure, so we encourage users to use strong passwords and log out after use.
                                    </p>
                                </div>
                            </FadeInSection>
                        </div>

                        {/* Section 7 - Third-Party Integrations */}
                        <div className="flex flex-col md:flex-row items-center gap-10 w-full mt-20">
                            <FadeInSection direction="left">
                                <ScrollText className="w-20 h-20 text-primary" />
                            </FadeInSection>
                            <FadeInSection direction="bottom" delay={1}>
                                <div className="flex-1 text-left">
                                    <h2 className="text-3xl font-semibold">Third-Party Integrations</h2>
                                    <p className="text-muted-foreground mt-4">
                                        Trimix may integrate with third-party services (e.g., YouTube, TikTok, Google APIs). These services operate under their own privacy policies. We encourage you to review their terms before linking accounts.
                                    </p>
                                </div>
                            </FadeInSection>
                        </div>

                        {/* Section 8 - Children's Privacy */}
                        <div className="flex flex-col md:flex-row-reverse items-center gap-10 w-full mt-20">
                            <FadeInSection direction="right">
                                <Scale className="w-20 h-20 text-primary" />
                            </FadeInSection>
                            <FadeInSection direction="bottom" delay={1}>
                                <div className="flex-1 text-left">
                                    <h2 className="text-3xl font-semibold">Children's Privacy</h2>
                                    <p className="text-muted-foreground mt-4">
                                        Trimix is not intended for children under 13 (or 16 in the EU). We do not knowingly collect personal data from children. If you believe a child has provided us with information, please contact us so we can delete it.
                                    </p>
                                </div>
                            </FadeInSection>
                        </div>

                        {/* Section 9 - Changes to This Policy */}
                        <div className="flex flex-col md:flex-row items-center gap-10 w-full mt-20">
                            <FadeInSection direction="left">
                                <Bell className="w-20 h-20 text-primary" />
                            </FadeInSection>
                            <FadeInSection direction="bottom" delay={1}>
                                <div className="flex-1 text-left">
                                    <h2 className="text-3xl font-semibold">Changes to This Policy</h2>
                                    <p className="text-muted-foreground mt-4">
                                        We may update this Privacy Policy from time to time. We'll notify you of material changes via email or platform notification. Continued use of Trimix after updates implies acceptance of the revised policy.
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

export default PrivacyPolicyPage;