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
      { label: "Web development", to: "/services" },
      { label: "Static websites", to: "/services" },
      { label: "Backend development", to: "/services" },
      { label: "SEO service", to: "/services" },
      { label: "Contact us", to: "/contact" },
    ],
  },
];

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" },
  { label: "X", href: "https://x.com/", icon: "x" },
  { label: "Instagram", href: "https://www.instagram.com/", icon: "instagram" },
  { label: "YouTube", href: "https://www.youtube.com/", icon: "youtube" },
];

function SocialIcon({ name }) {
  const paths = {
    linkedin: <path d="M5.3 7.9H2.4V21h2.9V7.9ZM3.9 2a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4ZM21.6 13.5c0-3.8-2-5.6-4.7-5.6-2.1 0-3 1.2-3.5 2V8.1h-2.9V21h2.9v-6.4c0-1.7.3-3.4 2.5-3.4s2.3 2 2.3 3.5V21h3v-7.5Z" />,
    x: <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-5-7.5L5.3 22H2.2l7.3-8.4L.8 2h6.5l4.5 6.8L18.9 2Zm-1.1 18h1.7L6.3 3.9H4.5L17.8 20Z" />,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="17.5" cy="6.5" r="1.2" /></>,
    youtube: <><path d="M21.5 7.2a2.9 2.9 0 0 0-2-2C17.8 4.7 12 4.7 12 4.7s-5.8 0-7.5.5a2.9 2.9 0 0 0-2 2A30.3 30.3 0 0 0 2 12c0 1.6.2 3.2.5 4.8a2.9 2.9 0 0 0 2 2c1.7.5 7.5.5 7.5.5s5.8 0 7.5-.5a2.9 2.9 0 0 0 2-2c.3-1.6.5-3.2.5-4.8s-.2-3.2-.5-4.8Z" /><path className="footer-socials__youtube-play" d="m10 15.2 5.2-3.2L10 8.8v6.4Z" /></>,
  };

  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{paths[name]}</svg>;
}

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
              We design modern software and websites that turn ambitious ideas into measurable momentum. Let&apos;s build what&apos;s next, together.
            </p>
            <ul className="footer-socials" aria-label="VedanAI on social media">
              {socials.map(({ label, href, icon }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens in a new tab)`}>
                    <SocialIcon name={icon} />
                  </a>
                </li>
              ))}
            </ul>
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