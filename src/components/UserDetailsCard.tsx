import React from 'react';

import { UserListAPIResponse } from '../types/user';
import StatusIndicatorChip from './StatusIndicatorChip';

import UserIcon from '../assets/images/user.png';

type UserDetailsCardProps = {
  user: UserListAPIResponse;
  onUserSelect: (user: UserListAPIResponse) => void;
};

export const UserDetailsCard: React.FC<UserDetailsCardProps> = ({
  user,
  onUserSelect,
}) => {
  return (
    <div
      className="user-details-card"
      style={{
        border: '1px solid #ccc',
        padding: '20px',
        borderRadius: '8px',
        width: '100%',
        color: 'darkblue',
        backgroundColor: '#e3f2fd',
        boxShadow: '1px 2px 3px blue',
        cursor: 'pointer',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
      }}
      onClick={() => onUserSelect(user)}
    >
      <img
        src={UserIcon}
        alt="User icon"
        style={{ width: '80px', height: '80px', borderRadius: '50%' }}
      />

      <div style={{ flex: 1 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <div style={{ position: 'absolute', left: '29px', bottom: '63px' }}>
            <StatusIndicatorChip status={user.status === 'active'} />
          </div>

          <h3 style={{ margin: '0 0 10px 8px', textAlign: 'end' }}>
            {user.name}
          </h3>
        </div>
        <p style={{ textAlign: 'end', margin: 0 }}>{user.email}</p>
      </div>
    </div>
  );
};
