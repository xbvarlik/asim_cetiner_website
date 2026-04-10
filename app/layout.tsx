import type { Metadata } from "next";
import { Geist, Geist_Mono, Lora } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-heading-family",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: {
    default:
      "Klinik Psikolog İstanbul - Asım Çetiner | Kadıköy Psikolojik Danışmanlık",
    template: "%s | Asım Çetiner",
  },
  description:
    "Kadıköy’de yüz yüze ve online danışmanlık. Klinik Psikolog Asım Çetiner ile bireysel, aile ve çift danışmanlığında bilimsel temelli destek.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
