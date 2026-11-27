import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowIcon, ButtonLink, responsiveImageProps, SectionLabel } from "./Shared.jsx";
import ContentModal from "./ContentModal.jsx";

const projects = [
  {
    id: "project-web",
    title: "Web Development Projects",
    image: "/images/project-nlp.webp",
    description: "An illustrative scenario showing how a website project might bring clear navigation, responsive layouts, and maintainable front-end code together.",
    industry: "Illustrative scenario",
    tech: ["React", "CSS", "JavaScript"],
    details: ["This is a representative project concept, not a published client case study.", "A real project scope, implementation, and results depend on the client's requirements."],
  },
  {
    id: "project-commerce",
    title: "E-commerce Website Build",
    image: "/images/project-commerce.webp",
    description: "An illustrative commerce website concept focused on product discovery, a clear purchase flow, and responsive presentation.",
    industry: "Illustrative scenario",
    tech: ["React", "JavaScript", "CSS"],
    details: ["This is a representative project concept, not a published client case study.", "Specific commerce integrations and outcomes depend on the agreed project scope."],
  },
  {
    id: "project-backend",
    title: "Backend & API Development",
    image: "/images/project-vision.webp",
    description: "An illustrative backend concept representing API endpoints and server-side functionality for a web application.",
    industry: "Illustrative scenario",
    tech: ["Node.js", "Express", "JavaScript"],
    details: ["This is a representative project concept, not a published client case study.", "The architecture and reliability requirements of a real backend depend on its use case."],
  },
  {
    id: "project-seo",
    title: "SEO & Search Analytics",
    image: "/images/project-data.webp",
    description: "An illustrative SEO concept showing technical and on-page considerations that support search discoverability.",
    industry: "Illustrative scenario",
    tech: ["Technical SEO", "Metadata", "Structured data"],
    details: ["This is a representative project concept, not a published client case study.", "Search visibility and performance outcomes depend on the site, competition, and work undertaken."],
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
        <SectionLabel>Illustrative Project Concepts</SectionLabel>
        <span className="heading-capsule" aria-hidden="true" />
        <h2 id="projects-heading">Explore Illustrative Project Concepts</h2>
        <ButtonLink to="#project-web">VIEW EXAMPLES</ButtonLink>
      </div>
      <div className="projects-section__showcases" ref={showcaseRef}>
        <nav className="projects-jump" aria-label="Jump to a project concept">
          {projects.map((project, index) => (
            <Link to={`#${project.id}`} aria-label={`Go to ${project.title}`} aria-current={index === activeIndex ? "location" : undefined} key={project.id}>{index + 1}</Link>
          ))}
        </nav>
        <div className="project-stack">
          {projects.map((project, index) => (
            <Fragment key={project.id}>
              <div className="project-stack__anchor" id={project.id} />
              <article className={`project-showcase project-showcase--${index + 1} ${index % 2 ? "project-showcase--right" : ""}`} aria-labelledby={`${project.id}-title`}>
                <div className="project-showcase__frame">
                  <img
                    className="project-showcase__image"
                    src={project.image}
                    {...responsiveImageProps(project.image, "(max-width: 1640px) 100vw, 1640px")}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="project-showcase__scrim" />
                  <div className="project-showcase__content">
                    <h3 id={`${project.id}-title`}>{project.title}</h3>
                    <p className="project-showcase__description">{project.description}</p>
                    <div className="project-showcase__meta">
                      <span>Industry: <b>{project.industry}</b></span>
                    </div>
                    <div className="project-showcase__technologies">
                      <span>Example technologies:</span>
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
      <ContentModal item={selectedProject} label="Illustrative Project Concept" onClose={closeModal} />
    </section>
  );
}