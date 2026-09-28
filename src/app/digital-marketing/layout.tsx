import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Marketing | Vigyapun Limitless™",
  description:
    "Social media, performance marketing, SEO, content, creative and web development that grow reach, engagement and revenue.",
};

export default function DigitalMarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
