"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Menu, X, Shield, type LucideIcon } from "lucide-react";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: LucideIcon;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    }
  });

  return (
    <>
      <motion.div
        initial={{
          opacity: 1,
          y: 0,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit fixed top-3 right-3 sm:top-4 sm:right-4 border border-white/20 rounded-full bg-black/40 backdrop-blur-lg z-[5000] px-2 sm:px-3 py-1 items-center justify-center space-x-1 sm:space-x-2 shadow-lg",
          className
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 mr-2">
          <div className="w-5 h-5 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xs">CI</span>
          </div>
          <span className="hidden lg:inline text-white font-medium text-xs">CarImport</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center space-x-1">
          {navItems.map((navItem, idx: number) => {
            const Icon = navItem.icon;
            return (
              <Link
                key={`desktop-link-${idx}`}
                href={navItem.link}
                className={cn(
                  "relative text-white/70 hover:text-white items-center flex space-x-1 text-xs transition-all duration-200 px-1.5 py-0.5 rounded-md hover:bg-white/10"
                )}
              >
                {Icon && <Icon className="h-3 w-3 sm:h-4 sm:w-4 text-white/70" />}
                <span className="text-xs">{navItem.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="sm:hidden text-white/70 hover:text-white transition-colors duration-200"
        >
          {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>

        {/* Contact Button */}
        <Link 
          href="/contacto"
          className="border border-blue-400/30 text-xs sm:text-sm font-medium relative text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-600/20 hover:bg-blue-600/30 transition-all duration-200 flex items-center space-x-1"
        >
          <Shield className="h-3 w-3" />
          <span className="hidden sm:inline">Contacta con nosotros</span>
          <span className="sm:hidden">Contacto</span>
        </Link>
      </motion.div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 right-3 sm:hidden z-[5000] bg-black/50 backdrop-blur-lg border border-white/20 rounded-2xl p-4 min-w-[240px] shadow-xl"
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((navItem, idx: number) => {
                const Icon = navItem.icon;
                return (
                  <Link
                    key={`mobile-link-${idx}`}
                    href={navItem.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 text-white/70 hover:text-white transition-colors duration-200 px-2 py-2 rounded-lg hover:bg-white/10"
                  >
                    {Icon && <Icon className="h-4 w-4 text-white/70" />}
                    <span className="text-sm">{navItem.name}</span>
                  </Link>
                );
              })}
            </div>
            
            {/* Mobile Contact Info */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="space-y-2">
                <Link
                  href="/contacto"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 text-white/70 hover:text-white transition-colors duration-200 px-2 py-2 rounded-lg hover:bg-white/10"
                >
                  <Shield className="h-4 w-4" />
                  <span className="text-sm">Contacta con nosotros</span>
                </Link>
                <div className="text-xs text-white/50 px-2">
                  +34 600 000 000
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};