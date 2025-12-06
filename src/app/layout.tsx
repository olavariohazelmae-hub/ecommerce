import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import CustomProvider from "../providers/CustomProvider";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Aesthesionery | Recyclable Stationery",
  description: "Eco-friendly and aesthetic stationery for your daily needs.",
};

import { GoogleTagManager as GTMComponent } from "@/components/analytics/GoogleTagManager";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CustomProvider>
        <body className={`${inter.variable} ${playfair.variable} font-sans`}>
          <GTMComponent />
          {children}
          <Toaster />
          <Analytics />
        </body>
      </CustomProvider>
    </html>
  );
}
