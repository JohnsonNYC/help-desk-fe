import React, { useEffect, useRef } from "react";
import "animate.css";

const Modal = ({ children, isOpen, handleClose }) => {
  const drawerRef = useRef();

  const handleClickOutside = (event) => {
    if (drawerRef.current && !drawerRef.current.contains(event.target)) {
      handleClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`sc-modal__container ${
        isOpen ? "sc-modal__container--open" : "sc-modal__container--close"
      }`}
    >
      <div
        className={`sc-modal__wrapper animate__animated animate__fadeInRight`}
        ref={drawerRef}
      >
        <button className="sc-modal__btn" onClick={handleClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
