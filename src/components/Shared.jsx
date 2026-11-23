export function LogoMark({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 34 30" aria-hidden="true">
      <path d="M2 24h10l6-7H8z" fill="#28d3ec" />
      <path d="M8 16h11l6-8H14z" fill="#00efa6" />
      <path d="M16 7h10l5-6H21z" fill="#7b81ff" />
      <path d="M1 28h12l3-3H4z" fill="#3578f2" />
    </svg>
  );
}

export function Brand({ footer = false }) {
  return (
    <a className={`brand ${footer ? "brand--footer" : ""}`} href="#home" aria-label="VedanAI, back to home">
      <LogoMark className="brand-symbol" />
      <span className="brand-name">VedanAI</span>
    </a>
  );
}

export function ArrowIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 19 19 5M8 5h11v11" />
    </svg>
  );
}

export function ButtonLink({ href, children, className = "", onClick }) {
  return (
    <a className={`neon-button ${className}`} href={href} onClick={onClick}>
      <span>{children}</span>
      <span className="neon-button__arrow"><ArrowIcon /></span>
    </a>
  );
}

export function SectionLabel({ children, className = "" }) {
  return <p className={`section-label ${className}`}>{children}</p>;
}