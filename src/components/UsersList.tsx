import React from 'react';

import { useGetUserList } from '../apis/user/useGetUserList';
import UserIcon from '../assets/images/user.png';
import { UserListAPIResponse } from '../types/user';
import StatusIndicatorChip from './StatusIndicatorChip';

const UserList: React.FC = () => {
  const { data: users, isLoading, isError, error } = useGetUserList();

  if (isLoading) {
    return (
        <p>Loading users...</p>
    )
  }

  if (isError) {
    return (
        <p>Error: {error?.message}</p>
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyItems: 'start',
        flexGrow: 1,
        textAlign: 'justify',
        marginLeft: '200px',
        gap: '20px',
        marginTop: '50px',
      }}
    >
      {users?.map((user: UserListAPIResponse) => (
        <div
          key={user.id}
          style={{
            color: 'darkblue',
            maxWidth: '90%',
            marginBottom: '12px',
            borderBottom: '1px solid #ccc',
            paddingBottom: '12px',
          }}
        >
          <h2
            style={{
              color: 'darkblue',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '8px',
            }}
          >
            <StatusIndicatorChip status={user.status} />

            <img
              src={UserIcon}
              alt="user-icon"
              style={{ width: '50px', cursor: 'pointer' }}
            />

            {user.name}
          </h2>

          <p
            style={{
              color: 'black',
              fontFamily: 'regular',
            }}
          >
            {user.email}
          </p>
        </div>
      ))}
    </div>
  );
};

export default UserList;
