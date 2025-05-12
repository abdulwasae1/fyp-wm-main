"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Container } from "@/components";
import axiosInstance from "@/lib/axios"; // Update this path to match your actual axios file location

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Using your existing axios instance to make the API call
      const response = await axiosInstance.post("/api/subscribe", { email });
      
      setSuccess(true);
      setEmail("");
    } catch (err: any) {
      console.error("Failed to subscribe:", err);
      // Handle axios error responses
      const errorMessage = err.response?.data?.detail || 
                          err.response?.data?.message || 
                          err.message || 
                          "Failed to subscribe. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="relative z-[999999]">
      <div className="flex items-center justify-center w-full -mt-40">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between w-full px-4 md:px-8 rounded-lg lg:rounded-2xl border border-border/80 py-4 md:py-8">
          <div className="flex flex-col items-start gap-4 w-full">
            <h4 className="text-xl md:text-2xl font-semibold">
              Join our newsletter
            </h4>
            <p className="text-base text-muted-foreground">
              Be up to date with everything about AI builder
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 md:min-w-80 mt-5 md:mt-0 w-full md:w-max">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col md:flex-row items-center gap-2 w-full md:max-w-xs"
            >
              <Input
                required
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="focus-visible:ring-0 focus-visible:ring-transparent focus-visible:border-primary duration-300 w-full"
                disabled={loading}
              />
              <Button 
                type="submit" 
                size="sm" 
                variant="secondary" 
                className="w-full md:w-max"
                disabled={loading}
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
            {success && (
              <p className="text-green-600 text-sm mt-1">
                ✅ Thank you for subscribing!
              </p>
            )}
            {error && (
              <p className="text-red-600 text-sm mt-1">
                {error}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              By subscribing you agree with our{" "}
              <a href="#" className="underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}