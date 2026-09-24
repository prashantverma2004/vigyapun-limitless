import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Vigyapun Limitless™",
  description:
    "We are Vigyapun Limitless. A boutique SaaS marketing agency built by SaaS veterans, for SaaS companies that refuse to blend in.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
