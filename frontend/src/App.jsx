
import { useCallback, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Preloader from "./components/Preloader.jsx";
import AeroBackground from "./components/AeroBackground.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";

const pageMetadata = {
  home: {
    title: "VedanAI | Software Development & AI Solutions",
    description:
      "VedanAI builds custom websites, web applications, AI-enabled software and automation for businesses in India and worldwide. Explore practical digital solutions.",
    path: "/",
  },
  about: {
    title: "About VedanAI | Software Development Studio",
    description:
      "Meet VedanAI, a software development studio for startups and enterprises, focused on web development, backend engineering and search-driven digital strategy.",
    path: "/about",
  },
  services: {
    title: "Web Development, Backend & SEO Services | VedanAI",
    description:
      "Explore VedanAI web development, static websites, backend engineering, SEO and website maintenance. Flexible software services built for performance and growth.",
    path: "/services",
  },
  projects: {
    title: "VedanAI Software Projects & Case Studies",
    description:
      "Explore VedanAI software project previews across web development, e-commerce and SEO analytics. Our full case study showcase is currently in development.",
    path: "/projects",
  },
  contact: {
    title: "Contact VedanAI | Start a Software Project",
    description:
      "Contact VedanAI to discuss a website, web application, backend, SEO or automation project. Share your goals and our team will respond within one business day.",
    path: "/contact",
  },
};

export default function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const finishLoading = useCallback(() => setLoading(false), []);

  const pathname = location.pathname.replace(/\/+$/, "") || "/";
  const page = {
    "/": "home",
    "/about": "about",
    "/services": "services",
    "/projects": "projects",
    "/contact": "contact",
  }[pathname] || "home";

  useEffect(() => {
    const metadata = pageMetadata[page];
    document.title = metadata.title;
    document.querySelector('meta[name="description"]').setAttribute(
      "content",
      metadata.description
    );
    document.querySelector('link[rel="canonical"]').setAttribute(
      "href",
      new URL(metadata.path, "https://vedanai.pages.dev").href
    );
  }, [page]);

  useEffect(() => {
    const targetId = location.hash.slice(1);

    if (!targetId) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }

    const timeout = window.setTimeout(() => {
      const target = document.getElementById(targetId);

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    }, 100);

    return () => window.clearTimeout(timeout);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const elements = [...document.querySelectorAll("[data-reveal]")];
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion || !window.IntersectionObserver) {
      elements.forEach((element) => {
        element.classList.remove("will-reveal");
        element.classList.add("is-visible");
      });
      return undefined;
    }

    const viewportH = window.innerHeight || 900;

    elements.forEach((element, idx) => {
      const rect = element.getBoundingClientRect();

      element.style.setProperty(
        "--reveal-delay",
        `${(idx % 3) * 70}ms`
      );

      if (rect.top > viewportH * 0.96) {
        element.classList.remove("is-visible");
        element.classList.add("will-reveal");
      } else {
        element.classList.remove("will-reveal");
        element.classList.add("is-visible");
      }
    });

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("will-reveal");
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -30px 0px" }
    );

    elements.forEach((element) => {
      if (element.classList.contains("will-reveal")) {
        revealObserver.observe(element);
      }
    });

    return () => revealObserver.disconnect();
  }, [page]);

  useEffect(() => {
    if (!window.IntersectionObserver) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const sections = [
      ...document.querySelectorAll("main > section, .site-footer"),
    ];

    const syncSvgs = (section, running) => {
      if (section.classList.contains("visualizer-section")) return;

      section.querySelectorAll("svg").forEach((svg) => {
        if (running && !reducedMotion) {
          svg.unpauseAnimations?.();
        } else {
          svg.pauseAnimations?.();
        }
      });
    };

    const viewportObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const active = entry.isIntersecting;

          entry.target.classList.toggle("is-offscreen", !active);
          syncSvgs(entry.target, active);
        });
      },
      { rootMargin: "220px 0px" }
    );

    sections.forEach((section) => viewportObserver.observe(section));

    return () => viewportObserver.disconnect();
  }, [page]);

  return (
    <>
      <AeroBackground paused={loading} />

      {loading && <Preloader onFinish={finishLoading} />}

      <div
        className={`site-shell ${loading ? "" : "site-shell--ready"}`}
        inert={loading || undefined}
        aria-busy={loading}
      >
        <Navbar page={page} />

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </>
  );
}
