import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Green Elixir Ayurveda",
  description: "Pure Ayurveda for Modern Life - Herbal Supplements, Skincare, Hair Care & Wellness Essentials",
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Green Elixir',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: '#2D4A2D',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Flamenco:wght@300;400&family=Big+Shoulders+Display:wght@400;500;600;700;800;900&family=Orbitron:wght@400;500;600;700;800;900&family=Righteous&family=Cinzel:wght@400;500;600;700;800;900&family=Anton&family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
