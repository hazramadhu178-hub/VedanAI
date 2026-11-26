import { useEffect, useState } from "react";
import { Brand, ButtonLink } from "./Shared.jsx";

const links = [
  { text: "Home", href: "#home", id: "home" },
  { text: "About Us", href: "#/about", id: "about" },
  { text: "Services", href: "#/services", id: "services" },
  { text: "Projects", href: "#/projects", id: "projects" },
  { text: "Contact Us", href: "#/contact", id: "contact" },
];

export default function Navbar({ page = "home" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(page === "services" ? "services" : page === "about" ? "about" : page === "contact" ? "contact" : page === "projects" ? "projects" : "home");

  useEffect(() => {
    if (page === "services") setActive("services");
    if (page === "about") setActive("about");
    if (page === "contact") setActive("contact");
    if (page === "projects") setActive("projects");
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-25% 0px -58% 0px" },
    );
    links.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [page]);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
      <div className="site-header__inner site-container flex items-center justify-between">
        <Brand />
        <nav className={`site-nav ${menuOpen ? "site-nav--open" : ""}`} id="main-navigation" aria-label="Main navigation">
          {links.map(({ text, href, id }) => (
            <a
              className={`site-nav__link ${active === id ? "site-nav__link--active" : ""}`}
              href={href}
              key={id}
              onClick={() => setMenuOpen(false)}
              aria-current={active === id ? "location" : undefined}
            >
              {text}
            </a>
          ))}
          <ButtonLink className="site-nav__mobile-cta" href="#contact" onClick={() => setMenuOpen(false)}>JOIN NOW</ButtonLink>
        </nav>
        <div className="site-header__actions">
          <ButtonLink className="site-header__cta" href="#contact">JOIN NOW</ButtonLink>
        </div>
        <button
          className={`menu-toggle ${menuOpen ? "menu-toggle--open" : ""}`}
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-controls="main-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span /><span />
        </button>
      </div>
    </header>
  );
}