import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Vigyapun Limitless™",
  description:
    "End-to-end SaaS marketing capabilities. Demand generation, paid media, content strategy, brand creative, growth optimization, and analytics.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
