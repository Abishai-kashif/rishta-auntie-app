import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Footer from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Rishta Connect - AI-Powered Matchmaking",
  description: "Find your perfect match with AI assistance from Rishta Auntie",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
