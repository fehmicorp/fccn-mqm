import type { Metadata, Viewport } from "next";
import { Inter, IBM_Plex_Sans  } from "next/font/google";
import { title, description, manifest, favicon, APP_Domain, Logo_image } from "@/app/config";
import "./globals.css";

import HeaderLayout from "@/components/header";
import FooterLayout from "@/components/footer";
import SidebarComponent from "@/components/sidebar";
import GAHeader from "@/components/header/GA";

// Fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const ibm = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-ibm",
  weight: ["600", "700"],
  display: "swap",
});
export const viewport: Viewport = {
  themeColor: "#0D47A1",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};
export const metadata: Metadata = {
  title: title,
  description: description,
  manifest: `${process.env.NODE_ENV === "production" ? "/mailer" : ""}${manifest}`,
  robots: "index, follow",
  alternates: {
    canonical: APP_Domain,
  },
  icons: {
    icon: favicon,
  },
  openGraph: {
    type: "website",
    url: APP_Domain,
    title: title,
    description: description,
    images: [Logo_image],
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
  },
};

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const baseHref =  process.env.NODE_ENV === "production" ? "/mailer" : "";
  return (
    <html lang="en" suppressHydrationWarning  className="scrollbar-hide">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
      </head>
      <body className={`${inter.variable} ${ibm.variable} antialiased`}>
        <GAHeader />
        <main className="relative h-screen min-h-screen w-full flex flex-col transition-colors duration-300">
          <HeaderLayout />
          <div className="flex">
            <SidebarComponent />
            <div className="mt-12 w-full xl:pl-72 lg:pl-64 sm:pl-16 pl-0 animate-in fade-in duration-500">
              {children}
              <FooterLayout />
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}