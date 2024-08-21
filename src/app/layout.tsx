import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { VT323 } from "next/font/google";

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "My Jobs",
    template: "%s | My Jobs",
  },
  description: "Dashboard for tracking my job applications",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark" lang="en">
      <body className={`${vt323.className} min-w-[350px]`}>{children}</body>
    </html>
  );
}
