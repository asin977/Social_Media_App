import React from 'react';
import { Link } from 'react-router-dom';

import UserIcon from '../assets/images/usersIcon.png';

export const Header = () => (
  <div
    style={{
      padding: '1rem',
      background: '#023e8a',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      cursor: 'pointer',
    }}
  >
    <h2
      style={{
        color: '#f8f9fa',
        fontSize: '25px',
        margin: '0px',
        fontFamily: 'bold',
        display: 'flex',
        marginRight: '15px',
      }}
    >
      SOCIAL
    </h2>
    <img
      src={UserIcon}
      alt="User Icon"
      style={{ height: '40px', marginRight: '12px' }}
    />
    <Link
      to="/home"
      style={{
        color: 'white',
        fontFamily: 'bold',
        borderRadius: '5px',
        fontSize: '18px',
        cursor: 'pointer',
        textDecoration: 'none',
      }}
    >
      HOME
    </Link>
  </div>
);
