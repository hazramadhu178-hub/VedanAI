import { Link } from "react-router-dom";
import Icon from "../components/Icons.jsx";
import {
  ArrowIcon,
  ButtonLink,
  responsiveImageProps,
  SectionLabel,
} from "../components/Shared.jsx";
import "../styles/about.css";

const stats = [
  { value: "Web", label: "Web development" },
  { value: "API", label: "Backend development" },
  { value: "SEO", label: "Technical SEO" },
  { value: "UI", label: "User interfaces" },
];

const process = [
  {
    title: "Discover",
    description: "We clarify the project goals, intended users, and requirements.",
    icon: "spark",
  },
  {
    title: "Design",
    description: "We plan the interface structure and implementation approach.",
    icon: "layers",
  },
  {
    title: "Develop",
    description: "We implement the agreed features and review them against the requirements.",
    icon: "cube",
  },
  {
    title: "Launch",
    description: "We prepare the agreed work for release and review its behavior.",
    icon: "arrow",
  },
  {
    title: "Grow",
    description: "Follow-up improvements and maintenance can be discussed as part of the project scope.",
    icon: "chart",
  },
];

const values = [
  {
    title: "Quality First",
    description: "We treat every project as our own, with clean code, thoughtful design and attention to the smallest detail.",
    icon: "shield",
  },
  {
    title: "Transparent Process",
    description: "Clear communication, honest timelines and full visibility at every step of the journey.",
    icon: "network",
  },
  {
    title: "Quality Assurance",
    description: "Testing and review are part of the development process, with attention to functionality and performance.",
    icon: "automation",
  },
  {
    title: "Ongoing Support",
    description: "Maintenance and follow-up work can be discussed as part of a project's scope.",
    icon: "heart",
  },
];

const stack = ["React", "Vite", "JavaScript", "CSS", "Node.js", "Express"];

function TechTrack({ hidden = false }) {
  const items = [...stack, ...stack];
  return (
    <div className="tech-marquee__track" aria-hidden={hidden || undefined}>
      {items.map((tech, index) => (
        <span className="tech-pill" key={`${hidden ? "dup" : "main"}-${tech}-${index}`}>{tech}</span>
      ))}
    </div>
  );
}

export default function AboutPage() {
  return (
    <section className="about-page" id="about" aria-labelledby="about-heading">
      <div className="site-container about-page__inner">
        {/* ---------- Hero ---------- */}
        <div className="about-hero" data-reveal>
          <p className="about-hero__eyebrow">
            <span className="about-hero__dot" aria-hidden="true" />
            About Our Studio
          </p>
          <h1 id="about-heading">
            We Design, Build &amp; Scale<br />
            Software That Moves<br />
            Business Forward.
          </h1>
          <p className="about-hero__lead">
            VedanAI is a software development studio offering web development, backend engineering, and technical SEO. We shape each project around its goals, scope, and users.
          </p>
          <div className="about-hero__actions">
            <ButtonLink to="/services">EXPLORE OUR SERVICES</ButtonLink>
            <Link className="about-ghost-button" to="/contact">Talk to our team <ArrowIcon /></Link>
          </div>


        </div>

        {/* ---------- Story ---------- */}
        <div className="about-story" id="about-story" data-reveal>
          <div className="about-story__media">
            <img
              src="/images/about-robotics.webp"
              {...responsiveImageProps("/images/about-robotics.webp", "(max-width: 700px) 90vw, 50vw")}
              alt="Industrial robotic arm in a modern automated workspace"
              loading="lazy"
              decoding="async"
            />
            <div className="about-story__badge">
              <strong>AI</strong>
              <span>Software<br />Studio</span>
            </div>
          </div>
          <div className="about-story__content">
            <SectionLabel>Who We Are</SectionLabel>
            <h2>Software Development for Practical Business Needs</h2>
            <p>
              VedanAI builds websites and web applications, develops backend functionality, and supports technical SEO. Project requirements guide the solution, from the interface to the underlying implementation.
            </p>
            <p>
              Our work focuses on clear user experiences, maintainable code, and performance-conscious delivery.
            </p>
            <ul className="about-story__list">
              <li><Icon name="shield" />Performance considered in implementation</li>
              <li><Icon name="chart" />Technical SEO support available</li>
              <li><Icon name="layers" />Scope shaped around project needs</li>
            </ul>
          </div>
        </div>

        {/* ---------- Stats ---------- */}
        <div className="about-stats" data-reveal>
          {stats.map(({ value, label }) => (
            <div className="about-stat" key={value}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>

        {/* ---------- Process ---------- */}
        <div className="about-process" id="about-process" data-reveal>
          <div className="about-process__intro">
            <SectionLabel>Our Approach</SectionLabel>
            <h2>How We Bring Ideas to Life</h2>
            <p>A clear process for understanding requirements, building the solution, and preparing it for release.</p>
          </div>
          <ol className="about-process__grid">
            {process.map(({ title, description, icon }) => (
              <li className="about-step" key={title}>
                <div className="about-step__head">
                  <span className="about-step__icon"><Icon name={icon} /></span>
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* ---------- Values ---------- */}
        <div className="about-values" data-reveal>
          <div className="about-values__intro">
            <SectionLabel>Why Choose Us</SectionLabel>
            <h2>What Sets Us Apart</h2>
          </div>
          <div className="about-values__grid">
            {values.map(({ title, description, icon }) => (
              <article className="about-value" key={title}>
                <span className="about-value__icon"><Icon name={icon} /></span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>

        {/* ---------- Tech stack ---------- */}
        <div className="about-stack" data-reveal>
          <SectionLabel>Technologies in This Project</SectionLabel>
          <div className="tech-marquee" role="marquee" aria-label="Technologies used in this project, continuously scrolling">
            <div className="tech-marquee__viewport">
              <TechTrack />
              <TechTrack hidden />
            </div>
          </div>
        </div>

        {/* ---------- CTA ---------- */}
        <div className="about-cta" data-reveal>
          <div>
            <h2>Let&rsquo;s Build Something<br />Great Together</h2>
            <p>Tell us about your project and discuss a path from idea to release.</p>
          </div>
          <ButtonLink to="/contact">START A CONVERSATION</ButtonLink>
        </div>
      </div>
    </section>
  );
}
