import React from 'react';

import UserIcon from '../assets/images/group.png';

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
        margin: '0px',
        color: '#fff',
        marginRight: '20px',
        fontFamily: 'bold',
        fontSize: '30px',
      }}
    >
      SOCIAL
    </h2>
    <img
      src={UserIcon}
      alt="User Icon"
      style={{ height: '40px', marginRight: '12px' }}
    />
  </div>
);
