import React from 'react';

interface CommonModalProps {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: string | number;
}

const Modal: React.FC<CommonModalProps> = ({
  isOpen,
  title,
  onClose,
  children,
  footer,
  width = '400px',
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          padding: '24px',
          borderRadius: '8px',
          width,
          maxWidth: '90%',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '15px',
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
          }}
        >
          &times;
        </button>

        {title && <h2 style={{ marginBottom: '15px' }}>{title}</h2>}

        <div>{children}</div>

        {footer && <div style={{ marginTop: '20px' }}>{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
