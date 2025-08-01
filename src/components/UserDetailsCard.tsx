import React from 'react';

import { UserListAPIResponse } from '../types/user';

import UserIcon from '../assets/images/user.png';
import { ReactComponent as DeleteIcon } from '../assets/svg/delete.svg';
import { ReactComponent as EditIcon } from '../assets/svg/edit.svg';

type UserDetailsCardProps = {
  user: UserListAPIResponse;
  onUserSelect: (user: UserListAPIResponse) => void;
  onEditBtnClick: (user: UserListAPIResponse) => void;
  onDelete: (userId: number) => void;
};

const UserDetailsCard: React.FC<UserDetailsCardProps> = ({
  user,
  onUserSelect,
  onEditBtnClick,
  onDelete,
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
      <h3 style={{ margin: '0 0 10px 0', textAlign: 'end', fontSize: '23px' }}>
        {user.name}
      </h3>
      <p style={{ textAlign: 'end', fontSize: '18px' }}>{user.email}</p>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '10px',
          marginTop: '10px',
        }}
      >
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
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <EditIcon width={20} height={20} />
        </button>

        <button
          onClick={e => {
            e.stopPropagation();
            onDelete(user.id);
          }}
          style={{
            padding: '5px 10px',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            fontFamily: 'bold',
          }}
        >
          <DeleteIcon width={20} height={20} />
        </button>
      </div>
    </div>
  );
};

export default UserDetailsCard;
