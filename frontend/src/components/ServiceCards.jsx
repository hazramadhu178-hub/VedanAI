import { useState } from "react";
import { ArrowIcon, responsiveImageProps } from "./Shared.jsx";

const capabilities = [
  {
    id: "01",
    label: "CAPABILITY · 01",
    title: "Custom Web Development",
    role: "Full-Stack Solutions",
    image: "/images/about-processor.webp",
    imageAlt: "Computer processor and circuit board representing modern web applications",
    metric: "RESPONSIVE · 100% CROSS-DEVICE",
    summary: "Launch fast, responsive websites and web apps built with modern frameworks that convert visitors into customers.",
    modules: ["Stack / React & Next.js", "UI / Responsive Design"],
    tilt: "-2.4deg",
    drop: "18px",
  },
  {
    id: "02",
    label: "CAPABILITY · 02",
    title: "Static Website Design",
    role: "Fast & Optimized Sites",
    image: "/images/about-humanoid.webp",
    imageAlt: "Humanoid robot representing modern software technology",
    metric: "SPEED · SUB-SECOND LOAD",
    summary: "Lightning-fast static websites engineered for performance, security and effortless content delivery.",
    modules: ["Build / Static Hosting", "Core / Lighthouse Optimized"],
    tilt: "1.8deg",
    drop: "34px",
  },
  {
    id: "03",
    label: "CAPABILITY · 03",
    title: "Backend Development",
    role: "Scalable APIs & Databases",
    image: "/images/about-robotics.webp",
    imageAlt: "Industrial robotic arm in a modern automated workspace",
    metric: "RELIABILITY · 99.9% UPTIME",
    summary: "Robust APIs, secure databases and scalable server architecture that power your product behind the scenes.",
    modules: ["API / REST & GraphQL", "Data / Secure Databases"],
    tilt: "-1.1deg",
    drop: "12px",
  },
  {
    id: "04",
    label: "CAPABILITY · 04",
    title: "SEO & Digital Growth",
    role: "Search Visibility",
    image: "/images/news-compute.webp",
    imageAlt: "Futuristic computer hardware module",
    metric: "GROWTH · TOP-RANKING PAGES",
    summary: "Data-driven SEO strategies that lift your rankings, grow organic traffic and turn searches into revenue.",
    modules: ["Search / On-Page SEO", "Growth / Analytics & Reporting"],
    tilt: "2.2deg",
    drop: "26px",
  },
];

function MatrixGlyph() {
  return (
    <svg className="hang-card__matrix" viewBox="0 0 36 36" aria-hidden="true">
      <rect x="2" y="2" width="10" height="10" rx="1.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <rect x="5" y="5" width="4" height="4" fill="currentColor" />
      <rect x="24" y="2" width="10" height="10" rx="1.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <rect x="27" y="5" width="4" height="4" fill="currentColor" />
      <rect x="2" y="24" width="10" height="10" rx="1.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <rect x="5" y="27" width="4" height="4" fill="currentColor" />
      <path d="M16 4h4v4h-4zm0 8h4v4h-4zm-4 4h4v4h-4zm8 0h4v4h-4zm4 4h4v4h-4zm-8 4h4v4h-4zm8 4h6v6h-6zm-10 2h4v4h-4zm12-10h4v4h-4z" fill="currentColor" />
    </svg>
  );
}

export default function ServiceCards() {
  const [flippedIndex, setFlippedIndex] = useState(1);

  const handleToggle = (index) => {
    setFlippedIndex((current) => (current === index ? -1 : index));
  };

  return (
    <section className="feature-grid site-container" aria-labelledby="capabilities-heading">
      <div className="feature-grid__header">
        <div className="feature-grid__title-col">
          <p className="feature-grid__eyebrow">
            <span className="feature-grid__dot" aria-hidden="true" />
            VedanAI &middot; SOFTWARE CAPABILITIES
          </p>
          <h2 className="feature-grid__heading" id="capabilities-heading">
            Built for intelligent
            <span>enterprise scale.</span>
          </h2>
        </div>

        <div className="feature-grid__aside">
            <p className="feature-grid__lead">
            Modular software systems, engineered together. Focused engineering designed to turn complexity into momentum.
          </p>
          <p className="feature-grid__badge">
            <span className="feature-grid__dot feature-grid__dot--green" aria-hidden="true" />
            04 SYSTEMS, ONE CORE
          </p>
        </div>
      </div>

      <div className="feature-grid__stage">
        <svg className="feature-grid__wire" viewBox="0 0 1200 68" preserveAspectRatio="none" aria-hidden="true">
          <path d="M 30 10 Q 600 42 1170 10" fill="none" stroke="rgba(148, 184, 236, 0.34)" strokeWidth="1.5" />
          {[148, 448, 752, 1052].map((x, idx) => {
            const t = x / 1200;
            const y = (1 - t) * (1 - t) * 10 + 2 * (1 - t) * t * 42 + t * t * 10;
            const cordEnd = idx === 1 ? 66 : idx === 3 ? 62 : 52;
            return (
              <g key={x}>
                <circle cx={x} cy={y} r="4" fill="#8bb4ec" />
                <line x1={x} y1={y} x2={x} y2={cordEnd} stroke="rgba(148, 184, 236, 0.38)" strokeWidth="1.4" />
              </g>
            );
          })}
        </svg>

        <div className="feature-grid__cards" aria-label="Our software capabilities">
          {capabilities.map((item, index) => {
            const isDetail = flippedIndex === index;
            return (
              <div
                className={`hang-slot hang-slot--${index + 1}`}
                style={{ "--hang-tilt": item.tilt, "--hang-drop": item.drop }}
                key={item.id}
              >
                <span className="hang-card__cord" aria-hidden="true" />
                <button
                  type="button"
                  className="hang-card"
                  onClick={() => handleToggle(index)}
                  aria-pressed={isDetail}
                  aria-label={`${item.title}, flip card`}
                  aria-describedby={isDetail ? `capability-${item.id}-description` : undefined}
                >
                  <span className="hang-card__clasp" aria-hidden="true">
                    <span />
                  </span>

                  <span className="hang-card__inner">
                    <span className="hang-card__face hang-card__front" aria-hidden={isDetail}>
                      <span className="hang-card__top">
                        <span>{item.label}</span>
                        <span>#{item.id}</span>
                      </span>
                      <span className="hang-card__media">
                        <img
                          src={item.image}
                          {...responsiveImageProps(item.image, "(max-width: 700px) 82vw, 300px")}
                          alt={item.imageAlt}
                          loading="lazy"
                          decoding="async"
                        />
                      </span>
                      <span className="hang-card__identity">
                        <strong>{item.title}</strong>
                        <span>{item.role}</span>
                      </span>
                      <span className="hang-card__foot">
                        <span>VIEW SPEC</span>
                        <span className="hang-card__action" aria-hidden="true">
                          <ArrowIcon />
                        </span>
                      </span>
                    </span>

                    <span className="hang-card__face hang-card__back" aria-hidden={!isDetail}>
                      <span className="hang-card__top">
                        <span>SPEC &middot; #{item.id}</span>
                        <span className="hang-card__pulse-chip" aria-hidden="true">AI</span>
                      </span>
                      <span className="hang-card__mini-head">
                        <img
                          src={item.image}
                          {...responsiveImageProps(item.image, "48px")}
                          alt=""
                          loading="lazy"
                          decoding="async"
                        />
                        <span>
                          <strong>{item.title}</strong>
                          <span>{item.role}</span>
                        </span>
                      </span>
                      <span className="hang-card__metric">
                        <span className="feature-grid__dot feature-grid__dot--green" aria-hidden="true" />
                        {item.metric}
                      </span>
                      <span className="hang-card__summary" id={`capability-${item.id}-description`}>{item.summary}</span>
                      <span className="hang-card__modules">
                        <span className="hang-card__modules-label">SELECTED MODULES</span>
                        {item.modules.map((mod) => (
                          <span className="hang-card__module-row" key={mod}>{mod}</span>
                        ))}
                      </span>
                      <span className="hang-card__back-foot">
                        <span className="hang-card__sign">
                          <small>VedanAI // {item.id}</small>
                          <b>CLICK TO FLIP</b>
                        </span>
                        <MatrixGlyph />
                      </span>
                    </span>
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
