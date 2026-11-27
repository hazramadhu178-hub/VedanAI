import { responsiveImageProps, SectionLabel } from "./Shared.jsx";

const gallery = [
  {
    src: "/images/about-robotics.webp",
    alt: "Industrial robotic arm in a modern automated workspace",
    tag: "01 / WEB DEVELOPMENT",
    title: "Responsive Web Apps",
    variant: "wide",
  },
  {
    src: "/images/about-humanoid.webp",
    alt: "Humanoid robot representing human-centered interface design",
    tag: "02 / UI ENGINEERING",
    title: "Modern Interfaces",
    variant: "center",
  },
  {
    src: "/images/about-processor.webp",
    alt: "Computer processor and circuit board representing scalable software systems",
    tag: "03 / BACKEND SYSTEMS",
    title: "Backend Systems",
    variant: "wide",
  },
  {
    src: "/images/news-interface.webp",
    alt: "Abstract illuminated technology ring representing search optimization",
    tag: "04 / TECHNICAL SEO",
    title: "Search Optimization",
    variant: "center",
  },
  {
    src: "/images/news-compute.webp",
    alt: "Futuristic computer hardware module representing software engineering",
    tag: "05 / SOFTWARE ENGINEERING",
    title: "Digital Products",
    variant: "wide",
  },
];

function MarqueeTrack({ items, hidden = false }) {
  return (
    <div className="about-marquee__track" aria-hidden={hidden || undefined}>
      {items.map((image, index) => (
        <figure
          className={`about-gallery__frame about-gallery__frame--${image.variant} about-gallery__frame--${(index % 3) + 1}`}
          key={`${hidden ? "dup" : "main"}-${image.src}`}
        >
          <img
            src={image.src}
            {...responsiveImageProps(image.src, "(max-width: 700px) 86vw, 50vw")}
            alt={hidden ? "" : image.alt}
            loading="lazy"
            decoding="async"
          />
          <div className="about-gallery__sheen" aria-hidden="true" />
          <figcaption className="about-gallery__overlay">
            <span className="about-gallery__tag">{image.tag}</span>
            <strong className="about-gallery__title">{image.title}</strong>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export default function About() {
  return (
    <section className="about-section" id="about" aria-labelledby="about-heading">
      <div className="site-container about-section__intro" data-reveal>
        <SectionLabel>Who We Are</SectionLabel>
        <h2 id="about-heading">Custom Web, Backend, and Search Solutions for Business Needs</h2>
        <p className="about-section__description">
          VedanAI develops websites and web applications, builds backend functionality, and supports technical SEO. Each solution is shaped around the project brief, with a focus on clear user experiences and maintainable digital tools.
        </p>
      </div>
      <div className="about-marquee" aria-label="A closer look at our technology">
        <div className="about-marquee__viewport">
          <MarqueeTrack items={gallery} />
          <MarqueeTrack items={gallery} hidden />
        </div>
      </div>
    </section>
  );
}