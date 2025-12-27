//this modal holds the basic foundnation of all the popUps within this project
import React, { useEffect, useRef } from "react";


const DeleteModal = ({ isOpen, onClose, children, onCloseConfirm , fetchData}) => {
  const modalRef = useRef();

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Close on outside click
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
      onCloseConfirm();
      fetchData();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className=""
      onClick={handleOutsideClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        ref={modalRef}
        className="modal-content"
        style={{
          padding: "0",
          minWidth: "300px",
          maxWidth: "90%",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default DeleteModal;
