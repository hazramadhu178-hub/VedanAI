import { Link } from "react-router-dom";
import { ArrowIcon, ButtonLink, responsiveImageProps, SectionLabel } from "../components/Shared.jsx";
import "../styles/comingsoon.css";

const teasers = [
  { image: "/images/project-nlp.webp", title: "Web Platform", category: "Web Development" },
  { image: "/images/project-commerce.webp", title: "Commerce Suite", category: "E-commerce" },
  { image: "/images/project-vision.webp", title: "Growth Engine", category: "SEO & Analytics" },
];

export default function ProjectsPage() {
  return (
    <section className="coming-page" id="projects" aria-labelledby="coming-heading">
      <div className="coming-page__glow" aria-hidden="true" />
      <div className="site-container coming-page__inner">
        {/* ---------- Hero ---------- */}
        <div className="coming-hero" data-reveal>
          <p className="coming-hero__eyebrow">
            <span className="coming-hero__dot" aria-hidden="true" />
            Our Projects
          </p>

          <div className="coming-hero__visual" aria-hidden="true">
            <svg viewBox="0 0 320 320" className="coming-orbit">
              <defs>
                <linearGradient id="comingArc" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#00eea6" />
                  <stop offset="1" stopColor="#25cde8" />
                </linearGradient>
              </defs>
              <circle cx="160" cy="160" r="140" fill="none" stroke="rgba(148,184,236,.18)" strokeWidth="1.5" />
              <circle cx="160" cy="160" r="112" fill="none" stroke="rgba(148,184,236,.14)" strokeWidth="1" strokeDasharray="3 8" />
              <circle className="coming-orbit__arc" cx="160" cy="160" r="140" fill="none" stroke="url(#comingArc)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="220 660" />
              <circle className="coming-orbit__arc coming-orbit__arc--inner" cx="160" cy="160" r="112" fill="none" stroke="#25cde8" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="120 580" />
              <circle className="coming-orbit__sat" cx="160" cy="20" r="6" fill="#00eea6" />
              <circle className="coming-orbit__sat coming-orbit__sat--two" cx="272" cy="160" r="4" fill="#25cde8" />
            </svg>
            <div className="coming-hero__badge">
              <strong>EXAMPLES</strong>
                <span>Illustrative<br />Concepts</span>
            </div>
          </div>

          <h1 id="coming-heading">Illustrative Project Concepts</h1>
          <p className="coming-hero__lead">
            Explore representative concepts for web development, commerce, and search projects. These examples are not published client case studies or reports of completed work.
          </p>

          <div className="coming-hero__actions">
            <ButtonLink to="/services">EXPLORE OUR SERVICES</ButtonLink>
            <Link className="coming-ghost-button" to="/contact">Talk to our team <ArrowIcon /></Link>
          </div>
        </div>

        {/* ---------- How to read these examples ---------- */}
        <div className="coming-progress" data-reveal>
          <div className="coming-progress__intro">
            <SectionLabel>Project Information</SectionLabel>
            <h2>Illustrative, Not Client Case Studies</h2>
            <p>The examples below describe possible project considerations. Actual requirements, implementations, and results vary by project.</p>
          </div>
          <div className="coming-progress__bars coming-progress__note">
            <p>Project scope</p>
            <p>Technology choices</p>
            <p>Delivery requirements</p>
          </div>
        </div>

        {/* ---------- Teasers ---------- */}
        <div className="coming-teasers" data-reveal>
          <SectionLabel>Preview</SectionLabel>
          <h2>Example Areas of Work</h2>
          <div className="coming-teasers__grid">
            {teasers.map(({ image, title, category }) => (
              <article className="teaser-card" key={title}>
                <img
                  src={image}
                  {...responsiveImageProps(image, "(max-width: 700px) 90vw, 33vw")}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                <div className="teaser-card__overlay">
                  <span className="teaser-card__badge">Illustrative Example</span>
                  <div>
                    <small>{category}</small>
                    <strong>{title}</strong>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ---------- Contact ---------- */}
        <div className="coming-notify" data-reveal>
          <div>
            <h2>Discuss a Project</h2>
            <p>Contact VedanAI to share your requirements and discuss a project scope.</p>
          </div>
          <ButtonLink to="/contact">CONTACT VEDANAI</ButtonLink>
        </div>
      </div>
    </section>
  );
}
