"use client";

import { Home, Car, Users, Settings, ShoppingCart, ExternalLink, type LucideIcon } from "lucide-react";
import { FloatingNav } from "@/components/ui/floating-navbar";

function Header1() {
    const floatingNavItems: Array<{
        name: string;
        link: string;
        icon: LucideIcon;
    }> = [
        {
            name: "Inicio",
            link: "#",
            icon: Home,
        },
        {
            name: "Por qué Importar",
            link: "#what-is-import",
            icon: Car,
        },
        {
            name: "Quiénes Somos",
            link: "#who-we-are",
            icon: Users,
        },
        {
            name: "Servicios",
            link: "#what-we-do",
            icon: Settings,
        },
        {
            name: "Stock",
            link: "#stock",
            icon: ShoppingCart,
        },
        {
            name: "Catálogo",
            link: "/coches",
            icon: ExternalLink,
        },
    ];

    return (
        <FloatingNav navItems={floatingNavItems} />
    );
}

export { Header1 };