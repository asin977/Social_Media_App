import React from 'react';
import { Link } from 'react-router-dom';

import MainImage from '../assets/images/wallpaper.jpg';

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
      <div style={headerStyle}>
        <div>
          <h1
            style={{
              fontSize: '50px',
              position: 'absolute',
              right: '1%',
              zIndex: '1',
            }}
          >
            🌐 Social Connect
          </h1>
          <div
            style={{
              position: 'absolute',
              right: '1%',
              zIndex: '1',
              bottom: '2px',
              top: '11%',
              fontSize: '24px',
            }}
          >
            <Link to="/" style={{ textDecoration: 'none' }}>
              Home
            </Link>
            <Link to="/" style={{ textDecoration: 'none', marginLeft: '20px' }}>
              Posts
            </Link>
          </div>

          <img
            src={MainImage}
            alt="mainImage"
            style={{
              backgroundPosition: 'center',
              objectFit: 'cover',
              backgroundSize: 'cover',
              width: '100%',
              position: 'relative',
              height: '145vh',
              marginTop: '-180px',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
