import "../styles/globals.css";
import ClientLayout from "@/components/layout/ClientLayout";
import { Metadata, Viewport } from "next";

const title = "BaanJo 2026 - ยอดนักสืบจิ๋ว";
const description = "BaanJo 2026 ยอดนักสืบจิ๋ว - ค้นหานักสืบของคุณ!";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title,
  description,

  openGraph: {
    title,
    description,
    url: "https://bannjo.vercel.app",
    siteName: "BaanJo 2026",
    images: [
      {
        url: "https://bannjo.vercel.app/images/%E0%B8%9B%E0%B8%81%E0%B9%80%E0%B8%A7%E0%B9%87%E0%B8%9B.webp",
        width: 1920,
        height: 1200,
        alt: "BaanJo 2026 ยอดนักสืบจิ๋ว",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["https://bannjo.vercel.app/images/%E0%B8%9B%E0%B8%81%E0%B9%80%E0%B8%A7%E0%B9%87%E0%B8%9B.webp"],
  },
};

// This is a Server Component (SSR)
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@600;700&family=Kanit:wght@600;700&family=Mitr:wght@500;600;700&family=Prompt:wght@600;700&display=swap" rel="stylesheet" />
        <link rel="preload" href="/fonts/can_Rukdeaw01.ttf" as="font" type="font/ttf" crossOrigin="" />
        <link rel="preload" href="/images/separated/Background.webp" as="image" />
      </head>
      <body className="min-h-screen flex relative w-full bg-black" suppressHydrationWarning>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
