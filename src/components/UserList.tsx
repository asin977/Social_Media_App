import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';

import { useDeleteUser, useGetUserList } from '../apis/user';
import { UserListAPIResponse } from '../types/user';
import EditUserModal from './EditUserModal';
import ErrorContainer from './ErrorContainer';
import UserDetailsCard from './UserDetailsCard';

const UserList: React.FC = () => {
  const { data: users, isLoading, isError, error } = useGetUserList();
  const { mutate: deleteUserMutation } = useDeleteUser();

  const [activeUserForEditing, setActiveUserForEditing] =
    useState<UserListAPIResponse | null>(null);

  const handleDeleteBtnClick = (userId: string) => {
    deleteUserMutation(userId);
  };

  const handleEditBtnClick = (user: UserListAPIResponse) => {
    setActiveUserForEditing(user);
  };

  const handleCloseModalBtnClick = () => {
    setActiveUserForEditing(null);
  };

  const handleSelectBtn = (user: UserListAPIResponse) => {};

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <ClipLoader size={40} color="#023e8a" />
      </div>
    );
  }

  if (isError) {
    return (
      <div style={{ color: 'red', textAlign: 'center', marginTop: '30px' }}>
        <ErrorContainer message={error?.message || 'Something went wrong'} />
      </div>
    );
  }

  return (
    <>
      <h1
        style={{
          color: 'darkblue',
          fontSize: '50px',
          margin: '0',
          paddingTop: '20px',
          fontFamily: 'bold',
          textAlign: 'start',
          marginLeft: '35px',
        }}
      >
        Users
      </h1>
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
        {users?.map(user => (
          <UserDetailsCard
            key={user.id}
            user={user}
            onUserSelect={handleSelectBtn}
            onEditBtnClick={handleEditBtnClick}
            onDelete={handleDeleteBtnClick}
          />
        ))}
      </div>

      {activeUserForEditing && (
        <EditUserModal
          user={activeUserForEditing}
          onClose={handleCloseModalBtnClick}
        />
      )}
    </>
  );
};

export default UserList;
