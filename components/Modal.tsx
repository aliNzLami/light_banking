'use client'

import React, { useState, useEffect } from 'react';

// Modal component
const Modal = ({ isOpen, onClose, children }: {isOpen: boolean, onClose: Function, children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState(isOpen);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
      // Delay setting animate to true to trigger CSS transition
      setTimeout(() => setAnimate(true), 10);
    } else {
      // Animate out
      setAnimate(false);
      // Wait for transition to finish before unmounting
      const timeout = setTimeout(() => setShowModal(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!showModal) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-content ${animate ? 'show' : 'hide'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-button" onClick={onClose} aria-label="Close modal">
          &times;
        </button>
        <div>
            {children}
        </div>
      </div>
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.3);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          opacity: ${animate ? 1 : 0};
          transition: opacity 300ms ease;
        }

        .modal-content {
          background: #fff;
          padding: 20px;
          border-radius: 10px;
          max-width: 542px;
          width: 90%;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          transform: scale(0.95);
          opacity: 0;
          transition: all 300ms ease;
        }

        .modal-content.show {
          transform: scale(1);
          opacity: 1;
        }

        .modal-content.hide {
          transform: scale(0.95);
          opacity: 0;
        }

        .close-button {
          background: transparent;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #333;
          width: 100%;
          text-align: end;
        }

        /* Optional: add hover effect to close button */
        .close-button:hover {
          color: #000;
        }
      `}</style>
    </div>
  );
};

export default Modal;