import { SectionLabel } from "./Shared.jsx";

const testimonials = [
  {
    name: "Web development",
    role: "Responsive websites and web applications",
    quote: "Project work can include interface development, responsive layouts, and integration of the features agreed for the build.",
  },
  {
    name: "Backend development",
    role: "Server-side functionality and APIs",
    quote: "Backend work can support application features through server-side logic, API endpoints, and project-specific integrations.",
  },
  {
    name: "Technical SEO",
    role: "Technical and on-page foundations",
    quote: "SEO work can address technical setup and on-page structure to make a site easier for search engines to understand.",
  },
];

function Rating() {
  return (
    <div className="testimonial-rating"><span>Service overview</span></div>
  );
}

function TestimonialsTrack({ hidden = false }) {
  const looped = [...testimonials, ...testimonials];
  return (
    <div className="testimonials-marquee__track" aria-hidden={hidden || undefined}>
      {looped.map((testimonial, index) => (
        <figure className="testimonial-card" key={`${hidden ? "dup" : "main"}-${testimonial.name}-${index}`}>
          <Rating />
          <blockquote>{testimonial.quote}</blockquote>
          <figcaption>
            <span><strong>{testimonial.name}</strong><small>{testimonial.role}</small></span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="testimonials-section" aria-labelledby="testimonials-heading">
      <div className="site-container">
        <div className="testimonials-section__intro" data-reveal>
          <SectionLabel>Our Services</SectionLabel>
          <h2 id="testimonials-heading">Ways We Can Support Your Project</h2>
        </div>
      </div>
      <div className="testimonials-marquee" role="marquee" aria-label="Service overviews, continuously scrolling">
        <div className="testimonials-marquee__viewport">
          <TestimonialsTrack />
          <TestimonialsTrack hidden />
        </div>
      </div>
    </section>
  );
}
