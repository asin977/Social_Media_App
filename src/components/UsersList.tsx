import React from 'react';

import { useGetUserList } from '../apis/user/useGetUserList';
import { UserListAPIResponse } from '../types/user';
import StatusIndicatorChip from './StatusIndicatorChip';

import UserIcon from '../assets/images/user.png';

const UserList: React.FC = () => {
  const { data: users, isLoading, isError, error } = useGetUserList();

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        justifyItems: 'start',
        textAlign: 'justify',
        marginLeft: '30px',
        marginRight: '30px',
        gap: '30px',
        margin: '20px',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingBottom: '20px',
      }}
    >
      {users?.map((user: UserListAPIResponse) => (
        <div
          key={user.id}
          style={{
            border: '1px solid blue',
            padding: '50px',
            borderRadius: '8px',
            width: '100%',
            color: 'darkblue',
            backgroundColor: ' rgb(227, 242, 253)',
            boxShadow: 'blue 1px 2px 3px',
            opacity: 1,
            cursor: ' pointer',
            position: 'relative',
          }}
        >
          <h2
            style={{
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '8px',
            }}
          >
            <StatusIndicatorChip status={user.isActive} />

            <img
              src={UserIcon}
              alt="user-icon"
              style={{ width: '50px', cursor: 'pointer' }}
            />
            {user.name}
          </h2>

          <p style={{ color: 'black', fontFamily: 'regular' }}>{user.email}</p>
        </div>
      ))}
    </div>
  );
};

export default UserList;
