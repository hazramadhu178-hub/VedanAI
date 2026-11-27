import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { responsiveImageProps } from "./Shared.jsx";

export default function ContentModal({ item, label, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!item) return undefined;

    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        const focusable = closeRef.current?.closest("[role='dialog']")?.querySelectorAll("a[href], button:not([disabled])");
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus?.();
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div className="content-modal__backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="content-modal" role="dialog" aria-modal="true" aria-labelledby="content-modal-title">
        <button className="content-modal__close" type="button" onClick={onClose} ref={closeRef} aria-label="Close details">Close <span aria-hidden="true">x</span></button>
        <img
          className="content-modal__image"
          src={item.image}
          {...responsiveImageProps(item.image, "(max-width: 850px) 100vw, 850px")}
          alt=""
        />
        <div className="content-modal__body">
          <p className="section-label">{label}</p>
          <h2 id="content-modal-title">{item.title}</h2>
          <p className="content-modal__lead">{item.description}</p>
          {item.details?.map((detail) => <p key={detail}>{detail}</p>)}
          <Link className="content-modal__contact" to="/contact" onClick={onClose}>Start a conversation <span aria-hidden="true">&#8599;</span></Link>
        </div>
      </div>
    </div>
  );
}