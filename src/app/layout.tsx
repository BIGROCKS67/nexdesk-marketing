import { ClientPortalProvider } from "@/contexts/ClientPortalContext";
import { AdminPortalProvider } from "@/contexts/AdminPortalContext";
import { SiteShell } from "@/components/layout/SiteShell";
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nexdesk-marketing.vercel.app"),
  title: {
    default: "NexDesk | Custom Business Systems & Enterprise Software",
    template: "%s | NexDesk",
  },
  description:
    "NexDesk builds custom CRM systems, HR platforms, recruitment software, accounting tools, client portals, workflow automations, dashboards, and high-performance websites.",
  keywords: [
    "custom CRM",
    "business software",
    "client portals",
    "HR systems",
    "enterprise websites",
    "Dubai software development",
  ],
  openGraph: {
    title: "NexDesk | Smarter Systems. Seamless Workflows.",
    description:
      "Custom business systems built for teams that outgrew spreadsheets.",
    type: "website",
    images: ["/og/nexdesk-og.svg"],
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} dark`}>
      <body className="min-h-screen font-sans antialiased">
        <ClientPortalProvider>
          <AdminPortalProvider>
            <SiteShell>{children}</SiteShell>
          </AdminPortalProvider>
        </ClientPortalProvider>
      </body>
    </html>
  );
}
