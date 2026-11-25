import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { ArrowIcon, ButtonLink, SectionLabel } from "./Shared.jsx";
import ContentModal from "./ContentModal.jsx";

const projects = [
  {
    id: "project-web",
    title: "Web Development Projects",
    image: "/images/project-nlp.webp",
    description: "We build fast, responsive websites and web applications that convert visitors into customers. From marketing sites to complex platforms, our engineering delivers speed, accessibility and results.",
    industry: "Web Development",
    country: "Germany",
    tech: ["Rc", "Nx", "JS"],
    details: ["The challenge was to modernize an aging website into a fast, accessible platform that could scale with the business.", "Our team designed a component-driven front end that loads instantly, ranks well and gives editors full control over their content."],
  },
  {
    id: "project-commerce",
    title: "E-commerce Website Build",
    image: "/images/project-commerce.webp",
    description: "We create online stores that boost sales and customer engagement, with smooth checkout flows, product management, and performance tuning. Our builds help brands sell more and grow faster.",
    industry: "E-commerce",
    country: "Singapore",
    tech: ["Nx", "Shp", "Js"],
    details: ["A fast-growing retail brand needed an online store that connected inventory, payments and marketing in one place.", "We delivered a high-performance storefront with a streamlined checkout and analytics that tie every sale back to its source."],
  },
  {
    id: "project-backend",
    title: "Backend & API Development",
    image: "/images/project-vision.webp",
    description: "We build scalable APIs, secure databases and reliable server architecture that power your product behind the scenes. Our backend solutions keep everything fast, safe and always online.",
    industry: "Backend Systems",
    country: "United States",
    tech: ["Nd", "Pg", "Az"],
    details: ["A growing product needed a backend that could handle rapid traffic spikes without downtime or data loss.", "We architected a resilient API layer with secure databases, automated scaling and monitoring that keeps everything running smoothly."],
  },
  {
    id: "project-seo",
    title: "SEO & Search Analytics",
    image: "/images/project-data.webp",
    description: "We optimize websites for search engines and turn traffic into measurable growth. From technical SEO to content strategy and analytics, our work lifts rankings and builds lasting visibility.",
    industry: "Search & Growth",
    country: "Canada",
    tech: ["Gt", "Gsc", "G4"],
    details: ["Organic traffic had plateaued despite steady content investment, making it hard to grow without paid spend.", "We built a clear SEO foundation that fixes technical issues, sharpens content strategy and tracks results against real business goals."],
  },
];

function useProjectLayers(showcaseRef) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const showcase = showcaseRef.current;
    const anchors = [...showcase.querySelectorAll(".project-stack__anchor")];
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference) and (min-height: 660px)");
    let active = 0;
    let frame = 0;

    const updateActive = () => {
      frame = 0;
      const height = window.innerHeight;
      const tops = anchors.map((anchor) => anchor.getBoundingClientRect().top);
      const current = Math.max(0, tops.findLastIndex((top) => top <= height * .55));
      if (current !== active) {
        active = current;
        setActiveIndex(current);
      }
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActive);
    };

    const syncLayout = () => {
      showcase.toggleAttribute("data-layered", motion.matches);
      scheduleUpdate();
    };

    syncLayout();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", syncLayout);
    motion.addEventListener("change", syncLayout);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", syncLayout);
      motion.removeEventListener("change", syncLayout);
    };
  }, [showcaseRef]);

  return activeIndex;
}

function revealFocusedProject(event) {
  const button = event.currentTarget;
  if (!button.matches(":focus-visible") || !button.closest("[data-layered]")) return;

  const { left, top, width, height } = button.getBoundingClientRect();
  const visibleTarget = document.elementFromPoint(left + width / 2, top + height / 2);
  if (!button.contains(visibleTarget)) {
    button.closest(".project-showcase").previousElementSibling.scrollIntoView({ block: "start", behavior: "instant" });
  }
}

export default function Projects() {
  const showcaseRef = useRef(null);
  const activeIndex = useProjectLayers(showcaseRef);
  const [selectedProject, setSelectedProject] = useState(null);
  const closeModal = useCallback(() => setSelectedProject(null), []);

  return (
    <section className="projects-section" id="projects" aria-labelledby="projects-heading">
      <div className="site-container projects-section__intro" data-reveal>
        <SectionLabel>Our Projects</SectionLabel>
        <span className="heading-capsule" aria-hidden="true" />
        <h2 id="projects-heading">See the Results That Reflect Our Hard Work</h2>
        <ButtonLink href="#project-web">VIEW MORE PROJECTS</ButtonLink>
      </div>
      <div className="projects-section__showcases" ref={showcaseRef}>
        <nav className="projects-jump" aria-label="Jump to a case study">
          {projects.map((project, index) => (
            <a href={`#${project.id}`} aria-label={`Go to ${project.title}`} aria-current={index === activeIndex ? "location" : undefined} key={project.id}>{index + 1}</a>
          ))}
        </nav>
        <div className="project-stack">
          {projects.map((project, index) => (
            <Fragment key={project.id}>
              <div className="project-stack__anchor" id={project.id} />
              <article className={`project-showcase project-showcase--${index + 1} ${index % 2 ? "project-showcase--right" : ""}`} aria-labelledby={`${project.id}-title`}>
                <div className="project-showcase__frame">
                  <img className="project-showcase__image" src={project.image} alt="" loading="lazy" decoding="async" />
                  <div className="project-showcase__scrim" />
                  <div className="project-showcase__content">
                    <h3 id={`${project.id}-title`}>{project.title}</h3>
                    <p className="project-showcase__description">{project.description}</p>
                    <div className="project-showcase__meta">
                      <span>Industry: <b>{project.industry}</b></span>
                      <span>Country: <b>{project.country}</b></span>
                    </div>
                    <div className="project-showcase__technologies">
                      <span>Core Technologies:</span>
                      <div>{project.tech.map((technology) => <span className="tech-mark" title={technology} key={technology}>{technology}</span>)}</div>
                    </div>
                    <button className="neon-button project-showcase__button" type="button" onFocus={revealFocusedProject} onClick={() => setSelectedProject(project)}>
                      <span>READ MORE</span><span className="neon-button__arrow"><ArrowIcon /></span>
                    </button>
                  </div>
                </div>
              </article>
            </Fragment>
          ))}
        </div>
      </div>
      <ContentModal item={selectedProject} label="VedanAI Case Study" onClose={closeModal} />
    </section>
  );
}