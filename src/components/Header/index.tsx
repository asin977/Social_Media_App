import React from 'react';
import UserIcon from '../../assets/images/userIcon.png';

const Header = () => (
  <header
    style={{
      padding: '1rem',
      background: '#62b6cb',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
    }}
  >
    <img
      src={UserIcon}
      alt="User Icon"
      style={{ height: '40px', marginRight: '12px' }}
    />
  </header>
);

export default Header;
