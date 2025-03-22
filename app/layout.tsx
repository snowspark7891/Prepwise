 import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });
//
// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });
 // @ts-ignore
const monaSans = Mona_Sans({
     variable: "--font-mona-sans",
     subsets: ["latin"],
 });

export const metadata: Metadata = {
  title: "PrepWise",
  description: "Ai powered platform app for preparing for the interviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='dark'>
      <body
        className={`${monaSans.variable}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
