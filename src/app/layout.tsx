import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '../styles/tailwind.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EPAS",
  description: "Emergency vehicle Pre-Alerting System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
