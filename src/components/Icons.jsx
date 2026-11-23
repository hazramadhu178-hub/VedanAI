export default function Icon({ name, className = "" }) {
  const common = {
    className: `line-icon ${className}`,
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };

  const drawings = {
    spark: <><path d="m24 5 3.8 13.2L41 22l-13.2 3.8L24 39l-3.8-13.2L7 22l13.2-3.8L24 5Z" /><path d="m38 35 1.3 3.7L43 40l-3.7 1.3L38 45l-1.3-3.7L33 40l3.7-1.3L38 35ZM9 3l1.2 3.8L14 8l-3.8 1.2L9 13 7.8 9.2 4 8l3.8-1.2L9 3Z" /></>,
    network: <><circle cx="24" cy="24" r="7" /><circle cx="9" cy="11" r="3" /><circle cx="39" cy="11" r="3" /><circle cx="9" cy="38" r="3" /><circle cx="39" cy="38" r="3" /><path d="m18 19-7-6m19 6 7-6M18 29l-7 7m19-7 7 7" /></>,
    cube: <><path d="m24 4 18 10v20L24 44 6 34V14L24 4Z" /><path d="M6 14 24 25l18-11M24 25v19M15 9l18 31M33 9 15 40" /></>,
    automation: <><path d="M11 18V9h9m17 21v9h-9M10 35a16 16 0 0 0 26-4M38 13a16 16 0 0 0-26 4" /><path d="m24 17 2.2 5.8L32 25l-5.8 2.2L24 33l-2.2-5.8L16 25l5.8-2.2L24 17Z" /></>,
    chart: <><path d="M7 40h35M10 35V25h6v10m6 0V16h6v19m6 0V9h6v26" /><path d="m9 18 9-8 8 4 10-9" /></>,
    layers: <><path d="m24 5 18 10-18 10L6 15 24 5Zm-18 18 18 10 18-10M6 31l18 10 18-10" /></>,
    heart: <><path d="M24 41S6 30 6 17a9 9 0 0 1 18-2 9 9 0 0 1 18 2c0 13-18 24-18 24Z" /><path d="M10 24h8l3-6 5 12 3-6h9" /></>,
    bag: <><path d="M8 17h32l-2 25H10L8 17Z" /><path d="M17 19v-6a7 7 0 0 1 14 0v6" /><path d="m19 30 4 4 8-9" /></>,
    finance: <><circle cx="24" cy="24" r="18" /><path d="M29 17c-1-2-3-3-6-3-4 0-6 2-6 5 0 8 14 2 14 10 0 3-3 5-7 5-3 0-6-1-8-4m8-19v26" /></>,
    factory: <><path d="M6 41V24l12 6V19l11 6V12h13v29H6Z" /><path d="M13 36h3m7 0h3m7 0h3M33 18h5" /></>,
    shield: <><path d="M24 4 40 10v13c0 11-7 18-16 21C15 41 8 34 8 23V10L24 4Z" /><path d="m17 24 5 5 10-11" /></>,
    arrow: <><path d="M8 37 38 7M15 7h23v23" /></>,
  };

  return <svg {...common}>{drawings[name] || drawings.spark}</svg>;
}