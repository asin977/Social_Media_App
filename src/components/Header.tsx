import React from 'react';

import UserIcon from '../assets/images/UserIcon.png';

export const Header = () => (
  <div
    style={{
      padding: '1rem',
      background: '#023E8A',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      cursor: 'pointer',
    }}
  >
    <h2
      style={{
        color: '#FFF',
        fontSize: '25px',
        margin: '0px',
        marginRight: '18px',
      }}
    >
      SOCIAL
    </h2>
    <img
      src={UserIcon}
      alt="User Icon"
      style={{ height: '50px', marginRight: '12px' }}
    />
  </div>
);
