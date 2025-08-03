'use client';
import React, { useState, useEffect, Component, ReactElement } from 'react';
import sidebarIcon from "@/assets/icons/hamburger.svg";
import Image from 'next/image';

function Offcanvas( { content }: {content: ReactElement} ) {

  const [isOpen, setIsOpen] = useState(false); 
  const [isVisible, setIsVisible] = useState(false); 

  const toggleOffcanvas = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsVisible(true);
      setTimeout(() => {
        setIsOpen(true);
      }, 10); 
    }
  };

  useEffect(() => {
    if (!isOpen && isVisible) {
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 300); 
      return () => clearTimeout(timeout);
    }
  }, [isOpen, isVisible]);

  return (
    <div className='flex items-center'>
      <div onClick={toggleOffcanvas} className='w-6.5' style={{ cursor: 'pointer', display: 'inline-block', borderRadius: '4px' }}>
        <Image 
            width={30}
            height={30}
            alt="Sidebar Button"
            src={sidebarIcon}
        />
      </div>

      {isVisible && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '270px',
            height: '100%',
            backgroundColor: '#fff',
            boxShadow: '-2px 0 5px rgba(0,0,0,0.3)',
            transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.3s ease-in',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
            <button onClick={toggleOffcanvas} style={{ fontSize: '1.2rem', background: 'none', border: 'none', cursor: 'pointer' }}>
              &times;
            </button>
          </div>
          
          {  content  }
        </div>
      )}
    
      {isVisible && isOpen && (
        <div
          onClick={toggleOffcanvas}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.3)',
            zIndex: 999,
          }}
        />
      )}
    </div>
  );
}

export default Offcanvas;