import "../styles/globals.css";
import ClientLayout from "@/components/layout/ClientLayout";
import { Metadata, Viewport } from "next";

const title = "BaanJo 2026";
const description = "หาคู่ที่จะไปว้าวุ่นกับคุณ - BaanJo 2026";

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
    url: "https://drive.google.com/uc?export=view&id=1yMOaaegvSLCXV2NdeRE1qTTppDcWrQp2",
    siteName: "BaanJo",
    images: [
      {
        url: "https://drive.google.com/uc?export=view&id=1yMOaaegvSLCXV2NdeRE1qTTppDcWrQp2",
        width: 1920,
        height: 1200,
        alt: "BaanJo Preview Image",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/cover.png"],
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
        <link rel="preload" href="/fonts/can_Rukdeaw01.ttf" as="font" type="font/ttf" crossOrigin="" />
        <link rel="preload" href="/images/2026/separated/Background.png" as="image" />
      </head>
      <body className="min-h-screen flex relative w-full bg-black" suppressHydrationWarning>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
