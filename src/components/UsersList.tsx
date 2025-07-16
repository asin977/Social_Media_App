import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import { useGetUserDetails } from '../apis/user';
import AddNewUser from './AddNewUser';

const UserList = () => {
  const { data: users, isLoading, isError, error } = useGetUserDetails();
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();

  const handleUserAdded = () => {
    queryClient.invalidateQueries('get-user-details');
  };

  if (isLoading) return (
      <p>Loading users...</p>
  ) 
  if (isError) return (
      <p>Error: {error?.message}</p>
  )

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        marginLeft: '200px',
        marginTop: '50px',
        gap: '20px',
        textAlign: 'justify',
      }}
    >
      {users?.map(user => (
        <div key={user.id} style={{ color: 'darkblue' }}>
          <h2>{user.name}</h2>
          <p style={{ color: 'black', fontFamily: 'regular' }}>{user.email}</p>
        </div>
      ))}

      <button
        onClick={() => setShowModal(true)}
        style={{
          width: '150px',
          padding: '10px',
          fontSize: '16px',
          fontWeight: 'bold',
          borderRadius: '5px',
          backgroundColor: '#023e8a',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        + Add User
      </button>

      {showModal && (
        <AddNewUser
          onClose={() => setShowModal(false)}
          onSuccess={handleUserAdded}
        />
      )}
    </div>
  );
};

export default UserList;
