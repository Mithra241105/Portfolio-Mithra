import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono, Special_Elite, Caveat, Cabin_Sketch } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: 'swap',
});

const specialElite = Special_Elite({
  variable: "--font-special-elite",
  subsets: ["latin"],
  weight: "400",
  display: 'swap',
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: 'swap',
});

const cabinSketch = Cabin_Sketch({
  weight: ["400", "700"],
  variable: "--font-chalk",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mithra-portfolio.com"), // Update this domain before deployment
  description: "Classified portfolio and project dossier.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${ibmPlexMono.variable} ${specialElite.variable} ${caveat.variable} ${cabinSketch.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
