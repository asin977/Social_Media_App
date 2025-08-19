import React from 'react';

import { UserListAPIResponse } from '../types/user';

import UserIcon from '../assets/images/user.png';

type UserDetailsCardProps = {
  user: UserListAPIResponse;
  onUserSelect: (user: UserListAPIResponse) => void;
  onEditBtnClick: (user: UserListAPIResponse) => void;
};

export const UserDetailsCard: React.FC<UserDetailsCardProps> = ({
  user,
  onUserSelect,
}) => {
  return (
    <div
      className="user-details-card"
      style={{
        border: '1px solid blue',
        padding: '50px',
        borderRadius: '8px',
        width: '100%',
        color: 'darkblue',
        backgroundColor: '#e3f2fd',
        boxShadow: '1px 2px 3px blue',
        opacity: '1',
        cursor: 'pointer',
        position: 'relative',
      }}
      onClick={() => onUserSelect(user)}
    >
      <img
        src={UserIcon}
        alt="userIcon"
        style={{
          width: '100px',
          position: 'absolute',
          top: '50px',
          left: '20px',
        }}
      />
      <h3 style={{ margin: '0 0 10px 0', textAlign: 'end' }}>{user.name}</h3>
      <p style={{ textAlign: 'end', fontSize: '18px' }}>{user.email}</p>
    </div>
  );
};
