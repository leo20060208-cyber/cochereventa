"use client";

import { motion } from "framer-motion";
import AnimatedCard from "@/components/ui/dynamic-border-animations-card";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export function WhatIsImport() {
  return (
    <section id="what-is-import" className="w-full py-12 md:py-24 lg:py-32 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="flex justify-center"
        >
          <AnimatedCard />
        </motion.div>
      </div>
    </section>
  );
}
