import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Vigyapun Limitless™",
  description:
    "Get in touch with Vigyapun Limitless. Book a strategy call or send us a message about your SaaS growth goals.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
