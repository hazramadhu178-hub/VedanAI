import { useEffect, useId, useRef } from "react";
import { SectionLabel } from "./Shared.jsx";

const streamPositions = Array.from({ length: 19 }, (_, index) => 302 + index * 22);
const codeRows = Array.from({ length: 13 }, (_, index) => index);
const codeGlyphs = ["0", "1", "0", "{", "1", "0", "/", "1", "0", "}", "1", "1", "0"];
const energyMotes = Array.from({ length: 24 }, (_, index) => {
  const angle = index * 2.39996;
  return {
    x: 500 + Math.cos(angle) * (160 + index % 5 * 35),
    y: 645 + Math.sin(angle) * (110 + index % 4 * 60),
    radius: index % 3 === 0 ? 2.2 : 1.2,
  };
});

const inputTraces = [
  { path: "M205 375v112c0 72 26 92 94 92h65c65 0 73 20 73 76v36", code: "0101", duration: 4.4, phase: -1.2 },
  { path: "M252 358v111c0 76 22 83 88 83h42c67 0 82 27 82 105v33", code: "{AI}", duration: 3.8, phase: -3.4 },
  { path: "M306 340v118c0 65 10 74 73 74h35c55 0 76 42 76 119v40", code: "0x7F", duration: 4.2, phase: -2.1 },
  { path: "M795 375v112c0 72-26 92-94 92h-65c-65 0-73 20-73 76v36", code: "1010", duration: 4.4, phase: -4.3 },
  { path: "M748 358v111c0 76-22 83-88 83h-42c-67 0-82 27-82 105v33", code: "<data>", duration: 3.8, phase: -.8 },
  { path: "M694 340v118c0 65-10 74-73 74h-35c-55 0-76 42-76 119v40", code: "1100", duration: 4.2, phase: -3.7 },
  { path: "M500 380v310", code: "infer()", duration: 3.6, phase: -1.8 },
];

const outputTraces = [
  { path: "M467 825v38c0 40-74 45-74 98v29", code: "01", duration: 4.4, phase: -1.2 },
  { path: "M486 825v50c0 38-41 49-41 87v28", code: "{...}", duration: 3.8, phase: -3.4 },
  { path: "M514 825v50c0 38 41 49 41 87v28", code: "1.0", duration: 4.2, phase: -2.1 },
  { path: "M533 825v38c0 40 74 45 74 98v29", code: "</>", duration: 4.4, phase: -4.3 },
  { path: "M500 825v165", code: "001", duration: 3.8, phase: -.8 },
];

const outerTraces = [
  "M170 18v287c0 82 36 95 36 160v140",
  "M225 0v293c0 80 29 105 29 178v100",
  "M790 0v288c0 82-36 102-36 182v135",
  "M845 18v286c0 86-36 100-36 162v140",
  "M290 0v258",
  "M710 0v258",
].map((path) => ({ path }));

const traceGroups = [
  { name: "outer", traces: outerTraces },
  { name: "input", traces: inputTraces },
  { name: "output", traces: outputTraces },
];

function CircuitTrace({ trace, pathId, index }) {
  return (
    <g className={`circuit-trace circuit-trace--${index}`}>
      <use className="circuit-trace__rail" href={`#${pathId}`} />
      <use className="circuit-trace__trail" href={`#${pathId}`} />
      <use className="circuit-trace__glow" href={`#${pathId}`} />
      <use className="circuit-trace__pulse" href={`#${pathId}`} />
      <use className="circuit-trace__spark" href={`#${pathId}`} />
      {trace.code && (
        <g className="circuit-packet">
          <circle className="circuit-packet__bloom" r="19" />
          <circle className="circuit-packet__halo" r="11" />
          <circle className="circuit-packet__ring" r="6.5" />
          <circle className="circuit-packet__core" r="3.4" />
          <text className="circuit-packet__code" x="13" y="-10">{trace.code}</text>
          <animateMotion dur={`${trace.duration}s`} begin={`${trace.phase}s`} repeatCount="indefinite" calcMode="linear">
            <mpath href={`#${pathId}`} />
          </animateMotion>
        </g>
      )}
    </g>
  );
}

function CircuitScene() {
  const id = `vedanai-energy-${useId().replace(/:/g, "")}`;
  const sceneRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const svg = svgRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;

    // Pause both CSS and SVG timelines when the scene is offscreen or the tab is hidden.
    const syncPlayback = () => {
      const running = inView && !reducedMotion.matches && document.visibilityState !== "hidden";
      scene.classList.toggle("visualizer-scene--running", running);
      if (running) svg.unpauseAnimations?.();
      else svg.pauseAnimations?.();
    };

    const observer = window.IntersectionObserver ? new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncPlayback();
    }, { rootMargin: "80px 0px" }) : null;

    if (observer) observer.observe(scene);
    else inView = true;
    syncPlayback();
    reducedMotion.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);

    return () => {
      observer?.disconnect();
      reducedMotion.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
      svg.pauseAnimations?.();
    };
  }, []);

  const traceId = (name, index) => `${id}-${name}-${index}`;

  return (
    <div className="visualizer-scene" ref={sceneRef} role="img" aria-label="Bright energy trails and cascading code power a luminous processor, surrounded by rotating orbital rings and expanding energy waves.">
      <svg viewBox="0 0 1000 990" className="visualizer-scene__svg" ref={svgRef} aria-hidden="true">
        <defs>
          <linearGradient id={`${id}-rail`} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#1d5aeb" stopOpacity=".24" />
            <stop offset=".5" stopColor="#00f0ae" stopOpacity=".86" />
            <stop offset="1" stopColor="#168bd1" stopOpacity=".5" />
          </linearGradient>
          <linearGradient id={`${id}-beam`} x1="0" x2="1">
            <stop offset="0" stopColor="#00eda8" stopOpacity="0" />
            <stop offset=".25" stopColor="#00efa8" stopOpacity=".65" />
            <stop offset=".5" stopColor="#a5ffdc" />
            <stop offset=".75" stopColor="#00efa8" stopOpacity=".65" />
            <stop offset="1" stopColor="#00eda8" stopOpacity="0" />
          </linearGradient>
          <radialGradient id={`${id}-aura`}>
            <stop offset="0" stopColor="#00e5b8" stopOpacity=".45" />
            <stop offset=".4" stopColor="#008fad" stopOpacity=".24" />
            <stop offset=".7" stopColor="#1b62e4" stopOpacity=".1" />
            <stop offset="1" stopColor="#06102b" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${id}-stream-glow`}>
            <stop offset="0" stopColor="#00eda8" stopOpacity=".15" />
            <stop offset=".6" stopColor="#007a8c" stopOpacity=".06" />
            <stop offset="1" stopColor="#06102b" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${id}-core-fill`} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#103d47" />
            <stop offset=".48" stopColor="#0a1f3e" />
            <stop offset="1" stopColor="#07152c" />
          </linearGradient>
          <filter id={`${id}-beam-blur`}><feGaussianBlur stdDeviation="17" /></filter>
          <filter id={`${id}-chip-glow`}><feGaussianBlur stdDeviation="8" /></filter>
          <filter id={`${id}-logo-glow`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.4" result="bloom" />
            <feMerge><feMergeNode in="bloom" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <clipPath id={`${id}-stream-window`}><rect x="286" y="55" width="428" height="355" rx="12" /></clipPath>
          {traceGroups.flatMap(({ name, traces }) => traces.map((trace, index) => (
            <path d={trace.path} id={traceId(name, index)} pathLength="100" key={traceId(name, index)} />
          )))}
        </defs>

        <g className="visualizer-scene__atmosphere">
          <ellipse cx="500" cy="220" rx="290" ry="240" fill={`url(#${id}-stream-glow)`} />
          <ellipse className="reactor-aura" cx="500" cy="742" rx="325" ry="270" fill={`url(#${id}-aura)`} />
          {energyMotes.map((mote, index) => (
            <circle className={`energy-mote energy-mote--${index % 6}`} cx={mote.x} cy={mote.y} r={mote.radius} key={index} />
          ))}
        </g>

        <g className="visualizer-scene__outer-traces" stroke={`url(#${id}-rail)`}>
          {outerTraces.map((trace, index) => <CircuitTrace trace={trace} pathId={traceId("outer", index)} index={index} key={trace.path} />)}
        </g>

        <g className="visualizer-scene__streams" clipPath={`url(#${id}-stream-window)`}>
          {streamPositions.map((position, index) => (
            <g className="data-stream" transform={`translate(${position} 0)`} key={position}>
              <path className="data-stream__rail" d="M0 55v355" />
              <g className={`data-stream__glyphs data-stream__glyphs--${index % 5}`}>
                {[0, 364].map((offset) => (
                  <text className="data-stream__column" textAnchor="middle" transform={`translate(0 ${offset})`} key={offset}>
                    {codeRows.map((row) => (
                      <tspan x="0" y={70 + row * 28} className={(row + index) % 6 === 0 ? "data-stream__glyph--bright" : undefined} key={row}>
                        {codeGlyphs[(row + index * 3) % codeGlyphs.length]}
                      </tspan>
                    ))}
                  </text>
                ))}
              </g>
            </g>
          ))}
        </g>

        <g className="visualizer-scene__scan">
          <rect x="240" y="190" width="520" height="46" rx="23" fill={`url(#${id}-beam)`} filter={`url(#${id}-beam-blur)`} />
          <rect className="visualizer-scene__beam" x="268" y="205" width="464" height="7" rx="3.5" fill={`url(#${id}-beam)`} />
          <rect x="294" y="207" width="412" height="1.5" rx=".75" fill={`url(#${id}-beam)`} />
        </g>

        <g className="visualizer-scene__input-traces" stroke={`url(#${id}-rail)`}>
          {inputTraces.map((trace, index) => <CircuitTrace trace={trace} pathId={traceId("input", index)} index={index} key={trace.path} />)}
        </g>

        <g className="reactor-hud" transform="translate(500 742)">
          <circle className="reactor-hud__track" r="176" />
          <circle className="reactor-hud__track reactor-hud__track--inner" r="144" />
          <g className="reactor-hud__orbit">
            <circle className="reactor-hud__arc" r="176" pathLength="100" />
            <circle className="reactor-hud__satellite" cx="176" cy="0" r="3.5" />
            <circle className="reactor-hud__satellite reactor-hud__satellite--faint" cx="-176" cy="0" r="2" />
          </g>
          <g className="reactor-hud__orbit reactor-hud__orbit--counter">
            <circle className="reactor-hud__arc reactor-hud__arc--inner" r="144" pathLength="100" />
            <circle className="reactor-hud__satellite reactor-hud__satellite--cyan" cx="0" cy="144" r="3" />
          </g>
          <g transform="rotate(-18)">
            <ellipse className="reactor-hud__equator" rx="225" ry="72" />
          </g>
        </g>
        <g className="visualizer-scene__processor-rings">
          <rect className="processor-ring" x="409" y="651" width="182" height="182" rx="41" />
          <rect className="processor-ring processor-ring--second" x="409" y="651" width="182" height="182" rx="41" />
          <rect className="processor-ring processor-ring--third" x="409" y="651" width="182" height="182" rx="41" />
        </g>
        <g className="visualizer-scene__chip">
          <rect x="415" y="668" width="170" height="168" rx="38" fill="#061129" stroke="#124360" strokeWidth="2" />
          <rect x="419" y="661" width="162" height="162" rx="37" fill="#071b30" stroke="#267b8b" strokeWidth="2" />
          <rect className="processor-charge" x="419" y="661" width="162" height="162" rx="37" pathLength="100" />
          <rect x="435" y="677" width="130" height="130" rx="29" fill="#061329" stroke="#153c83" strokeWidth="1.5" />
          <rect x="446" y="688" width="108" height="108" rx="23" fill={`url(#${id}-core-fill)`} stroke="#278a9d" strokeWidth="1.5" />
          <rect className="processor-core-glow" x="453" y="695" width="94" height="94" rx="20" fill="none" stroke="#11dcbf" filter={`url(#${id}-chip-glow)`} />
          <g className="processor-logo" filter={`url(#${id}-logo-glow)`}>
            <path d="M466 752h40l12-15h-41z" fill="#1ac9e7" /><path d="M476 735h39l13-16h-40z" fill="#08eba7" /><path d="M487 718h37l11-12h-37z" fill="#7a84f8" />
            <path d="M465 768h44l5-6h-44z" fill="#527fff" />
          </g>
        </g>

        <g className="visualizer-scene__output-traces" stroke={`url(#${id}-rail)`}>
          {outputTraces.map((trace, index) => <CircuitTrace trace={trace} pathId={traceId("output", index)} index={index} key={trace.path} />)}
        </g>
      </svg>
    </div>
  );
}

export default function AIVisualization() {
  return (
    <section className="visualizer-section" aria-labelledby="visualization-heading">
      <div className="site-container visualizer-section__intro" data-reveal>
        <SectionLabel>Engineering &amp; Trust Building</SectionLabel>
        <h2 id="visualization-heading">Modern Software for Smarter Business</h2>
      </div>
      <CircuitScene />
    </section>
  );
}