import type { Metadata } from "next";
import { Space_Grotesk, Inter, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Vigyapun Limitless™ | Premium SaaS Marketing Agency",
  description:
    "We make SaaS brands impossible to ignore. Vigyapun Limitless is a premium SaaS marketing agency specializing in demand generation, growth strategy, and brand building for B2B SaaS companies.",
  keywords: [
    "SaaS marketing agency",
    "B2B SaaS marketing",
    "demand generation",
    "SaaS growth",
    "brand strategy",
    "digital marketing",
    "Vigyapun",
  ],
  openGraph: {
    title: "Vigyapun Limitless™ | Premium SaaS Marketing Agency",
    description:
      "We make SaaS brands impossible to ignore. Premium SaaS marketing, demand generation, and growth strategy.",
    type: "website",
    locale: "en_US",
    siteName: "Vigyapun Limitless™",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vigyapun Limitless™ | Premium SaaS Marketing Agency",
    description: "We make SaaS brands impossible to ignore.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${manrope.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
