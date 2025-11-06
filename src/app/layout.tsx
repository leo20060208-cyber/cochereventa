import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "rkmgroup",
  description:
    "Importamos tu coche de Alemania, Francia o Italia, lo revisamos, gestionamos los papeles, pasamos la ITV y te lo entregamos listo para conducir.",
  openGraph: {
    title: "rkmgroup",
    description:
      "Importamos tu coche de Alemania, Francia o Italia, lo revisamos, gestionamos los papeles, pasamos la ITV y te lo entregamos listo para conducir.",
    images: [
      {
        url: "/LOGO.jpg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "rkmgroup",
    description:
      "Importamos tu coche de Alemania, Francia o Italia, lo revisamos, gestionamos los papeles, pasamos la ITV y te lo entregamos listo para conducir.",
    images: [
      "/LOGO.jpg",
    ],
  },
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
