
import { Link } from "react-router-dom";

const responsiveImages = {
  "/images/about-humanoid.webp": { width: 1024, height: 1536, candidates: [640, 800] },
  "/images/about-processor.webp": { width: 1672, height: 941, candidates: [640, 960] },
  "/images/about-robotics.webp": { width: 1774, height: 887, candidates: [640, 960] },
  "/images/hero-hands.webp": { width: 1672, height: 941, candidates: [640, 960] },
  "/images/news-compute.webp": { width: 1672, height: 941, candidates: [640, 960] },
  "/images/news-interface.webp": { width: 1254, height: 1254, candidates: [640, 960] },
  "/images/project-commerce.webp": { width: 1672, height: 941, candidates: [640, 960] },
  "/images/project-data.webp": { width: 1672, height: 941, candidates: [640, 960] },
  "/images/project-nlp.webp": { width: 1672, height: 941, candidates: [640, 960] },
  "/images/project-vision.webp": { width: 1672, height: 941, candidates: [640, 960] },
};

export function responsiveImageProps(src, sizes) {
  const image = responsiveImages[src];
  if (!image) return {};

  const base = src.slice(0, -5);
  const candidates = [
    ...image.candidates.map((width) => `${base}-${width}.webp ${width}w`),
    `${src} ${image.width}w`,
  ];

  return {
    width: image.width,
    height: image.height,
    srcSet: candidates.join(", "),
    sizes,
  };
}

export function Brand({ footer = false }) {
  return (
    <Link
      className={`brand ${footer ? "brand--footer" : ""}`}
      to="/"
      aria-label="VedanAI, back to home"
    >
      <img className="brand-logo" src="/images/logo.webp" alt="" width="501" height="498" />
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
