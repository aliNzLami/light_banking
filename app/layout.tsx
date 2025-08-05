import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif } from "next/font/google";
import "../assets/styles/main.css";
import "../assets/styles/corePanel.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const ibm = IBM_Plex_Serif({
  variable: "--font-ibm-plex-serif",
  weight: ['400', '700'],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "One More Light",
  description: "One more light out for banking platform in everyone's hands.",
  icons: {
    icon: "/assets/icons/logo.png"
  }
};

export default function RootLayout({ children,}: Readonly<{children: React.ReactNode;}>) {
  return (
      <html lang="en">
        <body
          className={`${inter.variable} ${ibm.variable} antialiased`}
        >
          {children}
        </body>
      </html>
  );
}
