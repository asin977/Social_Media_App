import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { useGetUserList } from '../apis/user/useGetUserList';
import AddUserModal from '../components/AddModalUser';
import { UserListAPIResponse } from '../types/user';
import ErrorContainer from '../components/ErrorContainer';
import { UserDetailsCard } from './UserDetailsCard';

const UserList = () => {
  const { data: users, isLoading, isError, error, refetch } = useGetUserList();
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserListAPIResponse | null>(null);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
        <ClipLoader color="#1976d2" size={60} />
      </div>
    );
  }

  if (isError) {
    return <ErrorContainer message={error?.message || 'Something went wrong'} />;
  }

  return (
    <>
      <h1 style={{ fontSize: '50px', fontWeight: 'bold', color: 'darkblue', marginLeft: '40px' }}>
        Users
      </h1>

      <button
        onClick={() => setIsAddModalVisible(true)}
        style={{
          marginLeft: '40px',
          marginBottom: '20px',
          padding: '10px 20px',
          backgroundColor: '#1976d2',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Add User
      </button>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '30px',
          padding: '0 30px',
        }}
      >
        {(users || []).map(user => (
          <UserDetailsCard
            key={user.id}
            user={user}
            onUserSelect={() => setSelectedUser(user)}
            onEditBtnClick={() => {}} 
          />
        ))}
      </div>

      <AddUserModal
        isOpen={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onSuccess={() => {
          setIsAddModalVisible(false);
          refetch(); 
        }}
      />
    </>
  );
};

export default UserList;
