import { useEffect, useState } from "react";

const MINIMUM_DISPLAY_TIME = 80;
const EXIT_DURATION = 220;

const wait = (duration) => new Promise((resolve) => window.setTimeout(resolve, duration));

export default function Preloader({ onFinish }) {
  const [hasBoot] = useState(() => Boolean(document.getElementById("boot-preloader")));
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let mounted = true;
    let exitTimer;
    const bootEl = document.getElementById("boot-preloader");
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    wait(MINIMUM_DISPLAY_TIME).then(() => {
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
          <img className="preloader__logo" src="/images/logo.png" alt="" />
        </div>
      </div>
      <span className="sr-only">Preparing your VedanAI experience.</span>
    </div>
  );
}
