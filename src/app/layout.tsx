import type { Metadata } from "next";
import { Geist, Geist_Mono, Bruno_Ace } from "next/font/google";
import Navbar from "@/components/Navbar";
import AppLoader from "@/components/AppLoader"; // Added AppLoader import
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const brunoAce = Bruno_Ace({
  variable: "--font-bruno-ace",
  subsets: ["latin"],
  weight: ["400"],
});


export const metadata: Metadata = {
  title: "Lepus Camera",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${brunoAce.variable} antialiased`}
      >
        <AppLoader>
          <Navbar />
          {children}
        </AppLoader>
      </body>
    </html>
  );
}
