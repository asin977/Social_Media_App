import React from 'react';

import { UserListAPIResponse } from '../types/user';

import UserIcon from '../assets/images/user.png';
import { ReactComponent as EditIcon } from '../assets/svg/edit.svg';

type UserDetailsCardProps = {
  user: UserListAPIResponse;
  onUserSelect: (user: UserListAPIResponse) => void;
  onEditBtnClick: (user: UserListAPIResponse) => void;
};

export const UserDetailsCard: React.FC<UserDetailsCardProps> = ({
  user,
  onUserSelect,
  onEditBtnClick
}) => {
  return (
    <div
      className='user-details-card'
      style={{
        border: '1px solid #ccc',
        padding: '50px',
        borderRadius: '8px',
        width: '100%',
        color: 'darkblue',
        backgroundColor: '#e3f2fd',
        boxShadow: '1px 2px 3px blue',
        opacity: '1',
        cursor: 'pointer',
      }}
      onClick={() => onUserSelect(user)}
    >
      <img
        src={UserIcon}
        alt="userIcon"
        style={{ width: '100px', position: 'absolute' }}
      />
      <h3 style={{ margin: '0 0 10px 0', textAlign: 'end' }}>{user.name}</h3>
      <p style={{ textAlign: 'end' }}>{user.email}</p>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={e => {
            e.stopPropagation();
            onEditBtnClick(user);
          }}
          style={{
            padding: '5px 10px',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '10px',
          }}
        >
          <span>
            <EditIcon width={20} height={20} />
          </span>
        </button>
      </div>
    </div>
  );
};