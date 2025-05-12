// src/components/FadeInSection.tsx

"use client";

import { motion } from "framer-motion";
import React from "react";

interface FadeInSectionProps {
  children: React.ReactNode;
  direction?: "left" | "right" | "bottom";
  delay?: number;
}

export const FadeInSection = ({ children, direction = "bottom", delay = 0 }: FadeInSectionProps) => {
  let initial = { opacity: 0, x: 0, y: 0 };
  if (direction === "left") initial.x = -100;
  if (direction === "right") initial.x = 100;
  if (direction === "bottom") initial.y = 50;

  return (
    <motion.div
      initial={initial}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay, duration: 1 }}
    >
      {children}
    </motion.div>
  );
};
