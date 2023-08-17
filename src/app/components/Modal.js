import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import "../globals.css";

const Modal = ({ children, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    modalRef.current.classList.add('active');

    const handleOutsideClick = (event) => {
      if (!modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleModalClose = () => {
    modalRef.current.classList.remove('active');
    setTimeout(onClose, 300);
  };

  return createPortal(
    <div className="modal-overlay">
      onClick={onClose}
       <div
        ref={modalRef}
        className="modal-content transform transition-transform duration-300"
      >
        {children}
        <button
          className="modal-close"
          onClick={handleModalClose}
        >
          Close
        </button>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
