import type { Metadata } from "next";
import { JetBrains_Mono, Inter, VT323 } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const pixelFont = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

export const metadata: Metadata = {
  title: "typr - Typing Speed Test",
  description: "Test and improve your typing speed with this minimal typing practice app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${pixelFont.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
