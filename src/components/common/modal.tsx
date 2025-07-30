import React from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        padding: '45px',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          width: '400px',
          maxWidth: '100%',
        }}
      >
        {children}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '15px',
          }}
        >
          <button
            onClick={onClose}
            style={{
              backgroundColor: '#023E8A',
              color: '#fff',
              padding: '6px 12px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontFamily:'bold',
              fontSize:"18px"
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
