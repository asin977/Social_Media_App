import React from 'react';
import { Link } from 'react-router-dom';

import { routes } from '../routes';

import MainImage from '../assets/images/wallpaper.jpg';

const Home: React.FC = () => {
  return (
    <div style={{ fontFamily: 'bold', padding: '30 px', color: 'darkblue' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <h1
          style={{
            fontSize: '50px',
            position: 'absolute',
            right: '1%',
            zIndex: '1',
            top: '12px',
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
          <Link to={routes.users} style={{ textDecoration: 'none' }}>
            Users
          </Link>
          <Link
            to={routes.usersPosts}
            style={{ textDecoration: 'none', marginLeft: '20px' }}
          >
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
  );
};

export default Home;
