export function Brand({ footer = false }) {
  return (
    <a className={`brand ${footer ? "brand--footer" : ""}`} href="#home" aria-label="VedanAI, back to home">
      <img className="brand-logo" src="/images/logo.png" alt="" />
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