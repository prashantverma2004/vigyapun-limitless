import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SaaS Marketing Agency | Vigyapun Limitless™",
  description:
    "The systematic approach to SaaS growth. Demand generation, brand positioning, and growth engineering for B2B SaaS companies.",
};

export default function SaaSMarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
