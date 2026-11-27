
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

export default function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const finishLoading = useCallback(() => setLoading(false), []);

  const page = {
    "/": "home",
    "/about": "about",
    "/services": "services",
    "/projects": "projects",
    "/contact": "contact",
  }[location.pathname] || "home";

  useEffect(() => {
    const titles = {
      home: "VedanAI | Web Development, Backend & SEO Software Agency",
      about: "About Us | VedanAI Software Studio",
      services: "Services | VedanAI",
      projects: "Projects | VedanAI",
      contact: "Contact Us | VedanAI Software Studio",
    };

    document.title = titles[page];
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
