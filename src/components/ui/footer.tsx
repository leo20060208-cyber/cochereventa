"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Globe, Facebook, Instagram, Twitter, Youtube, Linkedin, Heart } from "lucide-react";
import Link from "next/link";
import { getSiteSettings, type SiteSettings } from "@/lib/data";
import { useState, useEffect } from "react";

export function Footer() {
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    const loadSettings = () => {
      setSiteSettings(getSiteSettings());
    };
    
    loadSettings();
    
    // Refresh every 2 seconds to catch updates from moderation
    const interval = setInterval(loadSettings, 2000);
    
    return () => clearInterval(interval);
  }, []);
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };

  const socialLinks = [
    { name: "Facebook", icon: Facebook, url: siteSettings?.facebookUrl || "https://facebook.com", color: "hover:text-blue-400" },
    { name: "Instagram", icon: Instagram, url: siteSettings?.instagramUrl || "https://instagram.com", color: "hover:text-pink-400" },
    { name: "Twitter", icon: Twitter, url: siteSettings?.twitterUrl || "https://twitter.com", color: "hover:text-blue-300" },
    { name: "YouTube", icon: Youtube, url: siteSettings?.youtubeUrl || "https://youtube.com", color: "hover:text-red-400" },
    { name: "LinkedIn", icon: Linkedin, url: siteSettings?.linkedinUrl || "https://linkedin.com", color: "hover:text-blue-500" },
  ];

  const quickLinks = [
    { name: "Catálogo", href: "/coches" },
    { name: "Por qué Importar", href: "#what-is-import" },
    { name: "Quiénes Somos", href: "#who-we-are" },
    { name: "Servicios", href: "#what-we-do" },
    { name: "Contacto", href: "/contacto" },
  ];

  const legalLinks = [
    { name: "Política de Privacidad", href: "/privacy" },
    { name: "Términos de Servicio", href: "/terms" },
    { name: "Política de Cookies", href: "/cookies" },
    { name: "Aviso Legal", href: "/legal" },
  ];

  return (
    <footer className="relative w-full bg-transparent border-t border-white/10">
      
      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Atención al Cliente */}
            <motion.div variants={fadeInUp}>
              <h4 className="text-sm font-medium text-white mb-3">
                Atención al Cliente
              </h4>
              <div className="space-y-2">
                <div className="flex items-center text-white/70">
                  <Phone className="h-3 w-3 mr-2 text-blue-400" />
                  <span className="text-xs">{siteSettings?.contactPhone || "+34 600 000 000"}</span>
                </div>
                <div className="flex items-center text-white/70">
                  <Mail className="h-3 w-3 mr-2 text-blue-400" />
                  <span className="text-xs">{siteSettings?.contactEmail || "info@carimport.com"}</span>
                </div>
              </div>
            </motion.div>

            {/* Redes Sociales */}
            <motion.div variants={fadeInUp}>
              <h4 className="text-sm font-medium text-white mb-3">
                Síguenos
              </h4>
              <div className="flex space-x-2">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-200"
                    >
                      <Icon className="h-4 w-4 text-white/70" />
                    </a>
                  );
                })}
              </div>
            </motion.div>

            {/* Newsletter */}
            <motion.div variants={fadeInUp}>
              <h4 className="text-sm font-medium text-white mb-3">
                Newsletter
              </h4>
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Tu email"
                  className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 text-xs"
                />
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-lg transition-colors">
                  Suscribirse
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-white/10"
        >
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-center">
              <p className="text-white/60 text-xs">
                {siteSettings?.footerCopyright || "© 2024 CarImport. Todos los derechos reservados."}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
