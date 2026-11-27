import { Link } from "react-router-dom";
import { ArrowIcon } from "./Shared.jsx";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Home", to: "/" },
      { label: "About us", to: "/about" },
      { label: "Our services", to: "/services" },
      { label: "Our projects", to: "/projects" },
      { label: "Latest news", to: "/#news" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Web development", to: "/services/web-development" },
      { label: "Static websites", to: "/services/static-website-design" },
      { label: "Backend development", to: "/services/backend-development" },
      { label: "SEO service", to: "/services/seo-digital-growth" },
      { label: "Contact us", to: "/contact" },
    ],
  },
];

function OrbitMark() {
  return (
    <svg className="footer-contact__art" viewBox="0 0 140 86" fill="none" aria-hidden="true">
      <circle cx="35" cy="49" r="21" />
      <circle cx="69" cy="38" r="21" />
      <circle cx="103" cy="27" r="21" />
      <path d="M45 67c9 4 18 2 25-4M78 56c9 4 18 2 25-4" />
      <circle className="footer-contact__art-dot" cx="123" cy="27" r="3" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link className="footer-brand__logo" to="/" aria-label="VedanAI, back to home">
              <img src="/images/logo.png" alt="" />
            </Link>
            <p className="footer-brand__description">
              VedanAI provides web development, backend engineering, static website design, and technical SEO services.
            </p>
          </div>

          <nav className="footer-nav" aria-label="Footer navigation">
            {columns.map(({ title, links }) => (
              <div className="footer-nav__column" key={title}>
                <h2>{title}</h2>
                <ul>
                  {links.map(({ label, to }) => <li key={label}><Link to={to}>{label}</Link></li>)}
                </ul>
              </div>
            ))}
          </nav>

          <div className="footer-contact">
            <OrbitMark />
            <div className="footer-contact__details">
              <p>LET&apos;S CONNECT</p>
              <a className="footer-contact__email" href="mailto:hello@vedanai.com">hello@vedanai.com</a>
              <Link className="footer-contact__project" to="/contact">Start a project <ArrowIcon /></Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} VedanAI. All rights reserved.</span>
          <Link className="footer-bottom__top" to="/" aria-label="Back to top">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6" /></svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}