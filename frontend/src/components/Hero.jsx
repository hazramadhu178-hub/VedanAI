import { ButtonLink, responsiveImageProps } from "./Shared.jsx";
import ServiceCards from "./ServiceCards.jsx";

const technologies = ["React", "Vite", "JavaScript", "CSS"];

export default function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero__content site-container">
        <div className="hero__copy">
          <p className="hero__eyebrow">VedanAI <span>/</span> SOFTWARE DEVELOPMENT STUDIO</p>
          <h1 id="hero-title">
            Empower Your Business
            <br />
            With Smarter Software.
          </h1>
          <p className="hero__description">
            VedanAI is a software development studio providing custom website and web application development, frontend and backend engineering, and technical SEO. We help businesses build practical digital experiences around their requirements.
          </p>
          <div className="hero__cta-wrap">
            <span className="hero__cta-glow" aria-hidden="true" />
            <ButtonLink to="/contact">BEGIN TODAY WITH US</ButtonLink>
          </div>
        </div>
      </div>

      <figure className="hero__hands">
        <img
          src="/images/hero-hands.webp"
          {...responsiveImageProps(
            "/images/hero-hands.webp",
            "(max-width: 1240px) 100vw, 1240px"
          )}
          alt="A metallic robotic hand and a human hand reaching toward each other"
          fetchPriority="high"
          loading="eager"
          decoding="sync"
        />
      </figure>

      <div className="hero__trust site-container">
        <p>Technologies Used on This Website</p>
        <ul>
          {technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
      </div>

      <ServiceCards />
    </section>
  );
}
