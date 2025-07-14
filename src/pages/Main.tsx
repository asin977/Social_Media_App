import React from 'react';

const Main: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    fontFamily: 'bold',
    padding: '30 px',
    color: 'darkblue',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={{ fontSize: '40px' }}>🌐 Social Connect</h1>
      </header>
    </div>
  );
};

export default Main;
