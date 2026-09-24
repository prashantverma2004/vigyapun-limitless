/* Vigyapun logo symbol, traced from the brand PNG (V mark + diamond) */
export const LOGO_GOLD = "#DECA1B";

export default function LogoSymbol({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="85 72 193 147"
      role="img"
      aria-label="Vigyapun Limitless"
    >
      <polygon
        points="85,104 117,72 181.5,136.5 246,72 278,104 210,172 181.5,143.5 153,172"
        fill="var(--color-cream)"
      />
      <polygon points="181.5,158 211.5,188.5 181.5,219 151.5,188.5" fill={LOGO_GOLD} />
    </svg>
  );
}
