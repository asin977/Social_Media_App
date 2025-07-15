import React, { useEffect, useState } from 'react';
import { useGetUserDetails, useDeleteUser } from '../apis/user'; 
import { UserListAPIResponse } from '../types/user';

const UserList = () => {
  const { data: fetchedUsers, isLoading, isError, error } = useGetUserDetails();
  const [users, setUsers] = useState<UserListAPIResponse[]>([]);
  const { mutate: deleteUser } = useDeleteUser(); // Your DELETE mutation hook

  useEffect(() => {
    if (fetchedUsers?.length) {
      setUsers(fetchedUsers);
    }
  }, [fetchedUsers]);

  const handleDelete = (id: number) => {
    deleteUser(id, {
      onSuccess: () => {
        const updatedUsers = users.filter(user => user.id !== id);
        setUsers(updatedUsers);
      },
      onError: (err) => {
        console.error("Failed to delete user:", err);
      }
    });
  };

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error: {error?.message}</p>;
  if (!users.length) return <p>No users found.</p>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '200px', marginTop: '50px', gap: '20px' }}>
      {users.map(user => (
        <div key={user.id} style={{ color: 'darkblue', borderBottom: '1px solid lightgray', paddingBottom: '12px', position: 'relative' }}>
          <h2>{user.name}</h2>

          <button
            onClick={() => handleDelete(user.id)}
            style={{
              backgroundColor: '#023e8a',
              color: 'white',
              border: 'none',
              padding: '8px 8px',
              fontSize: '18px',
              fontWeight: 'bold',
              borderRadius: '3px',
              cursor: 'pointer',
              position: 'absolute',
              right: '9%',
              top: '10px',
            }}
            aria-label="Delete user"
          >
            🗑️
          </button>

          <p style={{ color: 'black', fontFamily: 'regular' }}>{user.email}</p>
        </div>
      ))}
    </div>
  );
};

export default UserList;
