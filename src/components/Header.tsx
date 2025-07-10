import React from 'react';

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
    <img
      src={UserIcon}
      alt="User Icon"
      style={{ height: '50px', marginRight: '12px' }}
    />
  </div>
);
