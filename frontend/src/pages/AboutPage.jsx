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
  { value: "5K+", label: "Projects Successfully Delivered" },
  { value: "95%", label: "Client Satisfaction Rate" },
  { value: "12+", label: "Years of Experience" },
  { value: "60+", label: "Engineers & Designers" },
];

const process = [
  {
    title: "Discover",
    description: "We dig into your goals, users and market to define what success really looks like.",
    icon: "spark",
  },
  {
    title: "Design",
    description: "We shape intuitive interfaces and clear architecture before a single line ships.",
    icon: "layers",
  },
  {
    title: "Develop",
    description: "Clean, scalable code built with modern frameworks and tested at every stage.",
    icon: "cube",
  },
  {
    title: "Launch",
    description: "Rigorous QA, performance tuning and a smooth deployment you can count on.",
    icon: "arrow",
  },
  {
    title: "Grow",
    description: "Ongoing support, SEO and optimization that keeps your product moving forward.",
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
    title: "On-Time Delivery",
    description: "We ship when we say we will, without cutting corners or compromising on performance.",
    icon: "automation",
  },
  {
    title: "Long-Term Partnership",
    description: "We build relationships, not just projects — supporting your growth long after launch day.",
    icon: "heart",
  },
];

const stack = ["HTML", "CSS", "Tailwind CSS", "JavaScript", "React", "Node.js", "SQL"];

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
            We are a full-service software studio helping ambitious businesses modernize, launch and grow through web development, backend engineering, and search-driven strategy.
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
              <strong>12+</strong>
              <span>Years of<br />Excellence</span>
            </div>
          </div>
          <div className="about-story__content">
            <SectionLabel>Who We Are</SectionLabel>
            <h2>A Team of Engineers, Designers &amp; Strategists</h2>
            <p>
              Founded on the belief that great software should feel effortless, VedanAI brings together deep engineering expertise and human-centered design. We partner with startups and enterprises alike to turn complex challenges into fast, reliable products.
            </p>
            <p>
              From a first landing page to a full-scale platform, we care about the details that make a difference — performance, accessibility, and results you can measure.
            </p>
            <ul className="about-story__list">
              <li><Icon name="shield" />Built for performance &amp; security</li>
              <li><Icon name="chart" />Optimized for search &amp; growth</li>
              <li><Icon name="layers" />Designed to scale with you</li>
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
            <p>A proven, collaborative process that keeps projects on track and clients in the loop from day one.</p>
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
          <SectionLabel>Technologies We Work With</SectionLabel>
          <div className="tech-marquee" role="marquee" aria-label="Technologies we work with, continuously scrolling">
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
            <p>Tell us about your project and we&rsquo;ll map the fastest path from idea to launch.</p>
          </div>
          <ButtonLink to="/contact">START A CONVERSATION</ButtonLink>
        </div>
      </div>
    </section>
  );
}
