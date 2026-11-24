import { useCallback, useEffect, useState } from "react";
import Preloader from "./components/Preloader.jsx";
import AeroBackground from "./components/AeroBackground.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";

const SERVICES_ROUTE = "#/services";
const ABOUT_ROUTE = "#/about";
const CONTACT_ROUTE = "#/contact";
const PROJECTS_ROUTE = "#/projects";
const getPageFromHash = () => {
  const hash = window.location.hash;
  if (hash === SERVICES_ROUTE || hash === "#services" || hash === "#services-features") return "services";
  if (hash === ABOUT_ROUTE || hash === "#about" || hash === "#about-story" || hash === "#about-process") return "about";
  if (hash === CONTACT_ROUTE || hash === "#contact" || hash === "#contact-form" || hash === "#contact-faq") return "contact";
  if (hash === PROJECTS_ROUTE || hash === "#projects") return "projects";
  return "home";
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(getPageFromHash);
  const finishLoading = useCallback(() => setLoading(false), []);

  useEffect(() => {
    if (page === "services") {
      document.title = "Services | VedanAI";
    } else if (page === "about") {
      document.title = "About Us | VedanAI Software Studio";
    } else if (page === "contact") {
      document.title = "Contact Us | VedanAI Software Studio";
    } else if (page === "projects") {
      document.title = "Projects Coming Soon | VedanAI";
    } else {
      document.title = "VedanAI | Web Development, Backend & SEO Software Agency";
    }
  }, [page]);

  useEffect(() => {
    const onHashChange = () => {
      const nextPage = getPageFromHash();
      setPage(nextPage);
      if (nextPage === "services") {
        if (window.location.hash === "#services-features") {
          window.setTimeout(() => document.getElementById("services-features")?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
        } else {
          window.scrollTo({ top: 0, behavior: "instant" });
        }
        return;
      }
      if (nextPage === "about") {
        const subId = ["#about-story", "#about-process"].includes(window.location.hash) ? window.location.hash.slice(1) : "";
        if (subId) {
          window.setTimeout(() => document.getElementById(subId)?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
        } else {
          window.scrollTo({ top: 0, behavior: "instant" });
        }
        return;
      }
      if (nextPage === "contact") {
        const subId = ["#contact-form", "#contact-faq"].includes(window.location.hash) ? window.location.hash.slice(1) : "";
        if (subId) {
          window.setTimeout(() => document.getElementById(subId)?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
        } else {
          window.scrollTo({ top: 0, behavior: "instant" });
        }
        return;
      }
      if (nextPage === "projects") {
        window.scrollTo({ top: 0, behavior: "instant" });
        return;
      }
      const targetId = window.location.hash.replace(/^#\/?/, "");
      window.setTimeout(() => {
        const target = targetId ? document.getElementById(targetId) : null;
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        else if (!targetId) window.scrollTo({ top: 0, behavior: "instant" });
      }, 60);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    const onAnchorClick = (event) => {
      const link = event.target.closest?.('a[href^="#"]');
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href || href === SERVICES_ROUTE || href === ABOUT_ROUTE || href === CONTACT_ROUTE || href === PROJECTS_ROUTE) return;
      if ((page === "services" || page === "about" || page === "contact" || page === "projects") && href.startsWith("#") && !href.startsWith("#/")) {
        event.preventDefault();
        window.location.hash = href;
      }
    };
    document.addEventListener("click", onAnchorClick);
    return () => document.removeEventListener("click", onAnchorClick);
  }, [page]);

  useEffect(() => {
    const elements = [...document.querySelectorAll("[data-reveal]")];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
      element.style.setProperty("--reveal-delay", `${(idx % 3) * 70}ms`);
      if (rect.top > viewportH * 0.96) {
        element.classList.remove("is-visible");
        element.classList.add("will-reveal");
      } else {
        element.classList.remove("will-reveal");
        element.classList.add("is-visible");
      }
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("will-reveal");
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06, rootMargin: "0px 0px -30px 0px" });

    elements.forEach((element) => {
      if (element.classList.contains("will-reveal")) revealObserver.observe(element);
    });
    return () => revealObserver.disconnect();
  }, [page]);

  useEffect(() => {
    if (!window.IntersectionObserver) return undefined;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sections = [...document.querySelectorAll("main > section, .site-footer")];

    const syncSvgs = (section, running) => {
      if (section.classList.contains("visualizer-section")) return;
      section.querySelectorAll("svg").forEach((svg) => {
        if (running && !reducedMotion) svg.unpauseAnimations?.();
        else svg.pauseAnimations?.();
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
      { rootMargin: "220px 0px" },
    );

    sections.forEach((section) => viewportObserver.observe(section));
    return () => viewportObserver.disconnect();
  }, [page]);

  return (
    <>
      <AeroBackground paused={loading} />
      {loading && <Preloader onFinish={finishLoading} />}
      <div className={`site-shell ${loading ? "" : "site-shell--ready"}`} inert={loading || undefined} aria-busy={loading}>
        <Navbar page={page} />
        <main>
          {page === "services" ? (
            <ServicesPage />
          ) : page === "about" ? (
            <AboutPage />
          ) : page === "contact" ? (
            <ContactPage />
          ) : page === "projects" ? (
            <ProjectsPage />
          ) : (
            <HomePage />
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}
