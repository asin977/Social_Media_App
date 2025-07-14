import React, { useEffect, useState } from 'react';

import { DataQueryKeys } from '../apis/data-query-keys';
import { useGetUserDetails } from '../apis/user';
import { UserListAPIResponse } from '../types/user';

const UserList = () => {
  const { data: fetchedUsers, isLoading, isError, error } = useGetUserDetails();

  const [users, setUsers] = useState<UserListAPIResponse[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(DataQueryKeys.USER_STORAGE_KEY);
    if (stored) {
      setUsers(JSON.parse(stored));
    } else if (fetchedUsers) {
      setUsers(fetchedUsers);
      localStorage.setItem(
        DataQueryKeys.USER_STORAGE_KEY,
        JSON.stringify(fetchedUsers),
      );
    }
  }, [fetchedUsers]);

  const handleDelete = (id: number) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem(
      DataQueryKeys.USER_STORAGE_KEY,
      JSON.stringify(updatedUsers),
    );
  };

  if (isLoading) {
    return <p>Loading users...</p>;
  }
  if (isError) {
    return <p>Error: {error?.message}</p>;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyItems: 'start',
        flexGrow: '1',
        textAlign: 'justify',
        marginLeft: '200px',
        gap: '20px',
        marginTop: '50px',
      }}
    >
      {users?.map(user => (
        <div style={{ color: 'darkblue', borderBottom: '1px solid lightgray' }}>
          <h2 key={user.id}>{user.name}</h2>

          <button
            onClick={() => handleDelete(user.id)}
            style={{
              backgroundColor: '#023e8a',
              color: 'white',
              marginLeft: '10px',
              position: 'absolute',
              right: '9%',
              border: 'none',
              padding: '8px 8px',
              fontSize: '18px',
              fontWeight: 'bold',
              marginTop: '-30px',
              borderRadius: '3px',
              cursor: 'pointer',
            }}
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                style={{ height: '30px', width: '30px' }}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </span>
          </button>

          <p style={{ color: 'black', fontFamily: 'regular' }}>{user.email}</p>
        </div>
      ))}
    </div>
  );
};

export default UserList;
