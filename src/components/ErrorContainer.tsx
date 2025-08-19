import React from 'react';

type ErrorContainerProps = {
  message: string;
};

export const ErrorContainer: React.FC<ErrorContainerProps> = ({ message }) => (
  <div
    style={{
      padding: '20px',
      backgroundColor: '#fdecea',
      color: '#b71c1c',
      borderRadius: '8px',
      textAlign: 'center',
      margin: '20px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
    }}
  >
    <strong>Error:</strong> {message}
  </div>
);
