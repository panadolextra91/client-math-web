import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Common/Navbar";
import { Footer } from "@/components/Common/Footer";

export const metadata: Metadata = {
  title: "Math Learning Game",
  description: "Practice math skills with fun arithmetic and equation challenges",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

