"use client";

import { Menu, X, Home, Car, Users, Settings, ShoppingCart, ExternalLink } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { FloatingNav } from "@/components/ui/floating-navbar";

function Header1() {
    const floatingNavItems = [
        {
            name: "Inicio",
            link: "#",
            icon: <Home className="h-3 w-3 sm:h-4 sm:w-4" />,
        },
        {
            name: "Por qué Importar",
            link: "#what-is-import",
            icon: <Car className="h-3 w-3 sm:h-4 sm:w-4" />,
        },
        {
            name: "Quiénes Somos",
            link: "#who-we-are",
            icon: <Users className="h-3 w-3 sm:h-4 sm:w-4" />,
        },
        {
            name: "Servicios",
            link: "#what-we-do",
            icon: <Settings className="h-3 w-3 sm:h-4 sm:w-4" />,
        },
        {
            name: "Stock",
            link: "#stock",
            icon: <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" />,
        },
        {
            name: "Catálogo",
            link: "/coches",
            icon: <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />,
        },
    ];

    return (
        <FloatingNav navItems={floatingNavItems} />
    );
}

export { Header1 };