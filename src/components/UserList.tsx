import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';

import { useGetUserList, useDeleteUser } from '../apis/user';
import { UserListAPIResponse } from '../types/user';
import UserDetailsCard from './UserDetailsCard';
import EditUserModal from './EditUserModal';

const UserList: React.FC = () => {
  const { data: users, isLoading, isError, error } = useGetUserList();
  const { mutate: deleteUserMutation } = useDeleteUser();

  const [editUser, setEditUser] = useState<UserListAPIResponse | null>(null);

  const handleDeleteBtn = (userId: string) => {
    deleteUserMutation(userId);
  };

  const handleEditBtn = (user: UserListAPIResponse) => {
    setEditUser(user);
  };

  const handleCloseModalBtn = () => {
    setEditUser(null);
  };

  const handleSelectBtn = (user: UserListAPIResponse) => {
    console.log('Selected user:', user);
  };

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
        Error loading users: {error?.message || 'Something went wrong'}
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          justifyItems: 'start',
          textAlign: 'justify',
          marginLeft: '30px',
          marginRight: '30px',
          gap: '30px',
          marginTop: '50px',
          marginBottom: '50px',
        }}
      >
        {users?.map(user => (
          <UserDetailsCard
            key={user.id}
            user={user}
            onUserSelect={handleSelectBtn}
            onEditBtnClick={handleEditBtn}
            onDelete={handleDeleteBtn}
          />
        ))}
      </div>

      {editUser && (
        <EditUserModal user={editUser} onClose={handleCloseModalBtn} />
      )}
    </>
  );
};

export default UserList;
