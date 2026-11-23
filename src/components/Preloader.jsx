import { useEffect, useState } from "react";
import { LogoMark } from "./Shared.jsx";

const MINIMUM_DISPLAY_TIME = 1050;
const MAXIMUM_WAIT_TIME = 2500;
const EXIT_DURATION = 550;

const wait = (duration) => new Promise((resolve) => window.setTimeout(resolve, duration));

function waitForPageLoad() {
  if (document.readyState === "complete") return Promise.resolve();
  return new Promise((resolve) => window.addEventListener("load", resolve, { once: true }));
}

function waitForHeroImage() {
  const heroImage = document.querySelector(".hero__hands img");
  if (!heroImage || heroImage.complete) return Promise.resolve();
  return new Promise((resolve) => {
    heroImage.addEventListener("load", resolve, { once: true });
    heroImage.addEventListener("error", resolve, { once: true });
  });
}

export default function Preloader({ onFinish }) {
  const [hasBoot] = useState(() => Boolean(document.getElementById("boot-preloader")));
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let mounted = true;
    let exitTimer;
    const bootEl = document.getElementById("boot-preloader");
    const startedAt = performance.now();
    const previousOverflow = document.body.style.overflow;
    const fontsReady = document.fonts?.ready || Promise.resolve();
    document.body.style.overflow = "hidden";

    Promise.race([
      Promise.allSettled([waitForPageLoad(), waitForHeroImage(), fontsReady]),
      wait(MAXIMUM_WAIT_TIME),
    ]).then(async () => {
      const remainingTime = Math.max(0, MINIMUM_DISPLAY_TIME - (performance.now() - startedAt));
      await wait(remainingTime);
      if (!mounted) return;
      if (bootEl) bootEl.classList.add("preloader--leaving");
      else setLeaving(true);
      exitTimer = window.setTimeout(() => {
        bootEl?.remove();
        onFinish();
      }, EXIT_DURATION);
    });

    return () => {
      mounted = false;
      window.clearTimeout(exitTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [onFinish]);

  if (hasBoot) return null;

  return (
    <div
      className={`preloader ${leaving ? "preloader--leaving" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading VedanAI"
    >
      <div className="preloader__orbit" aria-hidden="true">
        <svg className="preloader__ring" viewBox="0 0 320 320">
          <circle className="preloader__track" cx="160" cy="160" r="157" />
          <circle className="preloader__progress" cx="160" cy="160" r="157" />
        </svg>
        <div className="preloader__brand">
          <LogoMark className="preloader__symbol" />
          <span>VedanAI</span>
        </div>
      </div>
      <span className="sr-only">Preparing your VedanAI experience.</span>
    </div>
  );
}
