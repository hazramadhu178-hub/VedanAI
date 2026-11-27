
import { Link } from "react-router-dom";

export function Brand({ footer = false }) {
  return (
    <Link
      className={`brand ${footer ? "brand--footer" : ""}`}
      to="/"
      aria-label="VedanAI, back to home"
    >
      <img className="brand-logo" src="/images/logo.png" alt="" />
    </Link>
  );
}

export function ArrowIcon({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 19 19 5M8 5h11v11" />
    </svg>
  );
}

export function ButtonLink({ to, children, className = "", onClick }) {
  return (
    <Link className={`neon-button ${className}`} to={to} onClick={onClick}>
      <span>{children}</span>
      <span className="neon-button__arrow">
        <ArrowIcon />
      </span>
    </Link>
  );
}

export function SectionLabel({ children, className = "" }) {
  return <p className={`section-label ${className}`}>{children}</p>;
}
