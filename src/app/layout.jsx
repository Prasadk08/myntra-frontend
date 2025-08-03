import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProviderWrapper from "./provider";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full min-h-screen flex flex-col scroll-smooth`}
      >
        <ProviderWrapper>
          <Navbar />
          <Toaster position="top-center" reverseOrder={false} />
          <main className="flex-grow relative pt-16">{children}</main>
          <Footer />
        </ProviderWrapper>
      </body>
    </html>
  );
}
