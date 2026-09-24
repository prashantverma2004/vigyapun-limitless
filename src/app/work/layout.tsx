import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work & Case Studies | Vigyapun Limitless™",
  description:
    "Real results for real SaaS companies. Explore our case studies and see how we've helped B2B SaaS brands achieve extraordinary growth.",
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
