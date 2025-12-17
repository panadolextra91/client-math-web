import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Common/Navbar";
import { Footer } from "@/components/Common/Footer";
import { SkipLink } from "@/components/Common/SkipLink";

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
        <SkipLink />
        <Navbar />
        <main id="main-content" className="flex-1" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

